# CHANGELOG V2.4 - Oprava reportingové sémantiky, ochrana library fallbacku a robustnost souborového systému

Verze V2.4 navazuje na ověřený základ V2.3 a plní přesné požadavky z dokumentu `AG_TASK_V2_4.md`.

---

## 1. Zpřesnění reportingové sémantiky (Kandidáti vs. Pokusy)

- **Identifikovaný problém:** V2.3 reportovala 115 chyb souborů, což byl ve skutečnosti počet neúspěšných záznamů (attempts) v ledgeru. Protože 11 kandidátů mělo dva neúspěšné pokusy (primary 403/404 + library fallback 422), skutečný počet selhaných unikátních kandidátů byl **104**.
- **Implementované řešení:**
  1. Do `ScanReport.assets` i interních struktur doplněno transparentní rozlišení:
     - `total_candidate_assets` – celkový počet unikátních souborových kandidátů,
     - `saved_candidate_assets` – počet úspěšně uložených unikátních kandidátů,
     - `failed_candidate_assets` – počet neúspěšných unikátních kandidátů,
     - `total_download_attempts` – celkový počet síťových a diskových pokusů v ledgeru,
     - `failed_download_attempts` – počet neúspěšných pokusů v ledgeru.
  2. Deterministická identita kandidáta je počítána z:
     `${conversation_id}|${message_id}|${candidate_type}|${original_ref || file_id}`.
  3. Pokud kandidát uspěje v libovolném pokusu (např. primary selže, ale fallback projde), kandidát je evidován jako **saved**.
  4. UI a stavový řádek nyní zobrazují počet **selhaných kandidátů** (`failed_candidate_assets`), nikoliv počet pokusů.
  5. Všechny dílčí pokusy zůstávají 100% zachovány v `asset_ledger.jsonl` pro auditní účely.

---

## 2. Ochrana před HTTP 422 u Library Fallbacku

- **Identifikovaný problém:** Všech 11 případů fallbacku selhalo s HTTP 422 `Invalid file_id`. Analýza surových konverzací odhalila, že jejich pole `library_file_id` obsahuje interní identifikátor `libfile_...` (např. `libfile_62487e1cf8b081919f67db477371a65d`), což je interní reference na Canvas / Writing block / knihovní artefakt, nikoli platný identifikátor pro endpoint `/backend-api/files/download/{file_id}`.
- **Implementované řešení:**
  1. Přidána validační funkce `isValidFilesApiId()`, která vyžaduje formát `file-[a-zA-Z0-9_-]+`.
  2. Interní hodnoty `libfile_...` ani mutanty s podtržítkem (`file_...`) nejsou odesílány na files API, protože pro ně neexistuje veřejný download resolver.
  3. Pokus je vyhodnocen jako `fallback_not_applicable` a neprovádí se marný síťový požadavek vracející 422.
  4. Nedochází k umělému navyšování počtu pokusů ani chyb kandidátů.

---

## 3. Fix A: Vyřešení chyb souborového systému (Chromium FS)

- **Identifikovaný problém:**
  - 5 případů `A requested file or directory could not be found` vzniklo tím, že název přílohy obsahoval dlouhou cestu `user-NdXNtnqy.../mnt/data/frame_0.jpg`. Funkce `sanitize` ve V2.3 provedla ořezání `.slice(0, 80)` na konci, čímž usekla název přesně v místě tečky (`...frame_0.`). Chromium na Windows takové jméno odmítlo jako neexistující cestu.
  - 1 případ `Name is not allowed` u sandbox souboru.
- **Implementované řešení:**
  1. **Basename extrakce v `sanitize`:** Nejprve se z názvu oddělí cesta (`split(/[/\]/).pop()`), čímž se z `user-.../mnt/data/frame_0.jpg` stane čistý název `frame_0.jpg`.
  2. **Ochrana přípony:** Přípona je oddělena od kmene před aplikací limitu 80 znaků. Ořezává se pouze kmen a po ořezání se znovu zkontroluje, že kmen nekončí tečkou ani mezerou.
  3. **Deterministický fallback při `Name is not allowed`:** Pokud Chromium přesto odmítne jméno souboru (`TypeError: Name is not allowed`), `writeFile` automaticky uloží soubor pod bezpečným náhradním názvem `asset_<short-hash>.<ext>`. Původní název je stoprocentně zachován v metadatech (`original_name`) i v ledgeru.
  4. **Znovuzískání stale handle:** Pokud operace selže na `NotFoundError` nebo neplatný stav handle, `writeFile` zavolá předaný callback `reacquireParent` a provede bezpečný opakovaný pokus z čerstvého handle složky konverzace.

---

## 4. Striktní neutrální klasifikace neopravitelných chyb

V souladu s bodem 5 zadání jsou všechny neopravitelné chyby klasifikovány výhradně neutrálně a věcně bez nepodložených tvrzení o chování uživatele či antiviru:
- **404 Not Found / file_not_found:** `backend currently unavailable`
- **403 Forbidden:** `authorization rejected`
- **ace_pod_expired (410):** `sandbox expired`
- **ostatní / retry exhausted:** `unresolved`

---

## 5. Regresní nedotknutelnost

- Logika inventáře (`src/inventory.ts`) je **100% netknutá**.
- Stahování konverzací (200/200 funkční) je **100% zachováno**.
- Adaptivní rate limiting (0 chyb 429) je **100% zachován**.
- Autorizace s `conversation_id` je **100% zachována**.
- Ošetření `file-service://` z V2.3 je **100% zachováno**.
- Referenční produkční build je **100% netknut** (`6793779...`).
