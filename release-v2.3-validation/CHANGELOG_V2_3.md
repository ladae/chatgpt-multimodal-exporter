# CHANGELOG V2.3 - Zbytkové opravitelné chyby a perzistentní odolnost

Verze V2.3 navazuje na plně funkční základ V2.2 (197/197 konverzací uloženo, 0 chyb 429, 2242/2420 assetů uloženo, řízený test 7/7 aktivních assetů). V2.3 se striktně zaměřuje **výhradně na opravitelné zbytkové chyby (přesně 17 případů)** ze 178 selhání identifikovaných v živém testu V2.2.

---

## 1. Implementované opravy (17 z 178 chyb)

### Fix A (6×): Ochrana proti `getFileHandle: "Name is not allowed"` (`src/utils.ts`)
- **Problém:** Windows a Chromium File System Access API odmítají názvy souborů končící tečkou nebo mezerou (např. `"report. "`, `"file."`) nebo názvy odpovídající DOS zařízením (`CON`, `PRN`, `AUX`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9`). Volání `getFileHandle(name)` v takovém případě selhávalo s `TypeError: Name is not allowed`.
- **Řešení:**
  1. Funkce `sanitize()` ořezává veškeré koncové tečky a mezery (`/[. ]+$/`).
  2. Pokud po očištění název odpovídá vyhrazeným zařízením systému Windows, doplní se bezpečný prefix (např. `"_con.txt"`).
  3. Odstraňují se řídicí ASCII znaky (`\x00-\x1f`, `\x7f`).
  4. Funkce `inferFilename()` aplikuje sanitizaci i po doplnění přípony z MIME typu.
  5. V ledgeru (`asset_ledger.jsonl`) a ve `failed_attachments` zůstává pro audit zaznamenána původní reference `original_ref` a původní surové jméno.

### Fix B (4×): Odstranění schématu `file-service://` zabraňující HTTP 422 (`src/utils.ts`, `src/files.ts`, `src/assetLedger.ts`)
- **Problém:** Některé novější přílohy v ChatGPT JSON datech obsahují identifikátor s interním URI schématem `file-service://file-...`. Při předání do koncového bodu `/backend-api/files/download/file-service://file-...` odpovídal server kódem **HTTP 422 Unprocessable Entity**.
- **Řešení:**
  1. `pointerToFileId()` detekuje předponu `file-service://` a čistě ji odstraňuje.
  2. V `collectFileCandidates()` se čistí `att.id`, `att.file_id`, `att.library_file_id` i content references.
  3. V `downloadCandidateWithLedger()` je zařazena dodatečná obranná kontrola před voláním files API.

### Fix C (6×): Bounded retry smyčka pro Sandbox `{"status":"retry"}` (`src/api.ts`)
- **Problém:** Při generování souborů přes Code Interpreter (Advanced Data Analysis) server v počátečních sekundách po dotazu vrací odpověď `{"status":"retry"}` bez pole `download_url`, protože soubor se v sandboxu teprve komprimuje/exportuje. Původní kód vyvolal okamžitou výjimku.
- **Řešení:**
  1. Do funkcí `downloadSandboxFile` a `downloadSandboxFileBlob` přidána ohraničená opakovací smyčka (až 4 opakování, celkem 5 pokusů).
  2. Exponenciální prodleva mezi pokusy: 1s, 2s, 3s, 4s (celkem až 10s čekání na dokončení přípravy souboru).
  3. Teprve po vyčerpání všech pokusů bez získání `download_url` je zaznamenána chyba do ledgeru s explicitním popisem.

### Fix D (1×): Ochrana proti přechodné chybě FileSystem `cached state changed` (`src/fileSystem.ts`)
- **Problém:** Při souběžné I/O aktivitě prohlížeče nebo zpoždění zámku souborového systému vyvolá File System Access API výjimku: `InvalidStateError: An attempt was made to access a handle whose cached state has changed`.
- **Řešení:**
  1. Funkce `writeFile`, `readFile` a `ensureFolder` implementují pomocnou detekci přechodných stavových chyb (`isTransientFsError`).
  2. Při detekci je zařazen 1 bezpečný opakovací pokus s prodlevou 150 ms.

---

## 2. Nedotčené a zachované komponenty

- **Inventář (`src/inventory.ts`):** 100% netknutý (spolehlivě objevil všech 197 konverzací v živém testu).
- **Pacing a rate limiting (`AdaptiveRateLimiter`):** 100% zachován (v testu V2.2 eliminoval všech 115 chyb HTTP 429).
- **Autorizace příloh (`conversation_id`):** 100% zachována (zredukovala chyby 403 z 444 na 20).
- **Referenční produkční build:** 100% netknutý (`679377913447967536A35BAB13A86D33D1435BBDCE8DC1E12904015167C54F8E`).
