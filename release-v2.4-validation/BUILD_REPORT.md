# BUILD REPORT - V2.4 Reporting Semantics, Library Fallback Guard & FileSystem Resilience

**Datum a čas buildu:** 2026-09-04T22:08:22.618Z  
**Pracovní větev:** `improve_autosave_reliability_audit`  
**Výchozí V2.3 commit:** `313a43f` (feat: fix residual repairable errors and edge-case resilience (V2.3))  
**Výchozí baseline commit:** `b2d5b7b`  

---

## 1. Prostředí a nástroje

- **Operační systém:** Windows 11
- **Node.js:** `v24.19.0`
- **pnpm:** `11.25.0`
- **TypeScript:** `5.9.3`
- **Vite:** `7.2.6`
- **vite-plugin-monkey:** `7.1.5`

---

## 2. Porovnání buildů

| Vlastnost | Referenční produkční build | Validační build V2 | Validační build V2.1 | Validační build V2.2 | Validační build V2.3 | Validační build V2.4 |
|---|---|---|---|---|---|---|
| **Cesta** | `C:\chatgpt-multimodal-exporter\dist\chatgpt-multimodal-exporter.user.js` | `release-v2-validation\chatgpt-multimodal-exporter.user.js` | `release-v2.1-validation\chatgpt-multimodal-exporter.user.js` | `release-v2.2-validation\chatgpt-multimodal-exporter.user.js` | `release-v2.3-validation\chatgpt-multimodal-exporter.user.js` | `release-v2.4-validation\chatgpt-multimodal-exporter.user.js` |
| **Velikost (B)** | 379 733 B | 404 482 B | 409 681 B | 416 394 B | 420 970 B | 424 873 B |
| **SHA256** | `679377913447967536A35BAB13A86D33D1435BBDCE8DC1E12904015167C54F8E` | `DC4D9C790C50A8C063F28F5EC8134277FD942E87A6DB1F0F7FDB73D66B44862C` | `0E34123CB9180ED87CFB00C1014EA3E2AD17BE44026B426A1B918C5794B38DC4` | `E0B13E0987E56184151AB6BDC69831BFE14324F2B40AFD43B8DB25F400DB2A8C` | `622A615EA1F3F498F846F799E640E1973226209CF2E83E2987F16925137E86FA` | `71FBCAD6D0B081B11E28472508E99C52B06B15CFCB58538EF43F4F4D383759DF` |
| **Stav** | **ZACHOVÁN (100% netknut)** | **ZACHOVÁN (100% netknut)** | **ZACHOVÁN (100% netknut)** | **ZACHOVÁN (100% netknut)** | **ZACHOVÁN (100% netknut)** | **PŘIPRAVEN K ŽIVÉMU TESTU** |

---

## 3. Průběh kompilace a testů

1. **TypeScript Typecheck (`tsc`):**
   - Výsledek: **ÚSPĚŠNÝ (0 chyb, strict mode)**
2. **Vite Userscript Build (`vite build`):**
   - Výsledek: **ÚSPĚŠNÝ (52 modulů zkompilováno)**
   - Výstupní soubor: `dist/chatgpt-multimodal-exporter.user.js` (414.92 kB)
3. **Automatizované testy (`pnpm test` / `node --test`):**
   - Celkem testů: **33**
   - Úspěšných: **33**
   - Selhalo: **0**
   - Doba běhu: **10.4 s**

Testované oblasti:
- `tests/reportingAndResilienceV24.test.mjs` (NOVÉ pro V2.4, 6 testů):
  - **Kandidáti vs Pokusy:** `computeAssetLedgerSummary` spolehlivě odlišuje unikátní kandidáty od celkového počtu stažení.
  - **Dvojité selhání:** Primary failure + fallback failure je vyhodnoceno jako přesně 1 failed candidate a 2 failed attempts.
  - **Záchrana fallbackem:** Primary failure + fallback success je vyhodnoceno jako 1 saved candidate.
  - **Sanitizace dlouhých cest:** Extrakce basename z cest `user-.../mnt/data/frame_0.jpg`, zachování přípony a eliminace koncových teček/mezer.
  - **Name is not allowed fallback:** Při odmítnutí jména v Chromium bezpečný deterministický fallback `asset_<hash>.<ext>` a zachování původního jména v metadatech.
  - **Stale handle reacquire:** Detekce `NotFoundError` a úspěšné znovuzískání handle z parent složky.
  - **Ochrana proti 422:** `isValidFilesApiId` odmítá interní identifikátory `libfile_` a `file_` s podtržítkem, čímž zamezuje marným HTTP požadavkům.
- `tests/resilienceV23.test.mjs` (4 testy): Ošetření DOS zařízení, `file-service://` ořezání, bounded sandbox retry, transient FS retry.
- `tests/rateLimiting.test.mjs` (6 testů): Retry-After parsování, AdaptiveRateLimiter dynamický pacing, zotavení z 429.
- `tests/assetLedger.test.mjs` (5 testů): HTTP kódy, sandbox normalizace, sediment resolving, knihovní fallback s ledgerem.
- `tests/inventory.test.mjs` (3 testy): Deduplikace inventáře, více scopů, aktualizace časových razítek.
- `tests/mutex.test.mjs` (3 testy): Volba lídra, standby tab, serializace operací se stavem.
- `tests/validation.test.mjs` (6 testů): Všech 5 stavů fail-closed validace.
