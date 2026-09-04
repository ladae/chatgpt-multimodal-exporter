# Antigravity task — V2.4

ŽIVÝ TEST V2.3 JE VYHODNOCEN.

NEUPRAVUJ inventory, conversation fetch, 429 pacing/backoff ani funkční
conversation_id autorizaci.

## OVĚŘENO Z V2.3 LIVE REPORTU

### KONVERZACE
- inventory: 200
- saved conversations: 200
- failed conversations: 0
- missing conversations: 0

### DŮLEŽITÉ
UI zobrazuje 115 asset errors, ale to NENÍ 115 unikátních assetů.

Aktuálně:
- failed ledger attempts: 115
- skutečně neúspěšné unikátní asset candidates: 104

Důvod:
11 kandidátů má dva neúspěšné ledger pokusy:
primary_file_id + library_file_id_fallback.

V2.2:
- unikátní failed candidates: 160

V2.3:
- unikátní failed candidates: 104
- 55 konkrétních V2.2 failures nyní success
- 1 V2.2 failed candidate není v aktuálním candidate setu, takže jej NEPOVAŽUJ za opravený.

### AKTUÁLNÍCH 104 UNIKÁTNÍCH FAILURE CANDIDATES
- 44 × primary HTTP 404
- 19 × primary HTTP 403
- 16 × sandbox meta 404 "Library file not found"
- 7 × sandbox file_not_found
- 6 × ace_pod_expired
- 6 × sandbox retry exhausted po 5 pokusech
- 5 × FileSystem: "A requested file or directory could not be found..."
- 1 × getFileHandle: "Name is not allowed"

DÁLE:
11 × library_file_id_fallback attempt -> HTTP 422 Invalid file_id
jsou DRUHÉ POKUSY stejných kandidátů, nikoli dalších 11 assetů.

## V2.3 LIVE VÝSLEDEK JEDNOTLIVÝCH FIXŮ

### Fix A - filename sanitization
- původně 6 × Name is not allowed
- success: 0
- 5 se změnilo na FileSystem "file/directory could not be found"
- 1 stále "Name is not allowed"
=> FIX A NENÍ SCHVÁLEN.

### Fix B - file-service://
- 5 konkrétních kandidátů bylo reálně zachráněno
- 1 starý failure se v novém candidate setu nevyskytl
=> 5 LIVE SUCCESS, šestý případ nehodnotit.

### Fix C - sandbox status retry
- původních 6 kandidátů
- live success: 0
- všech 6 po 5 pokusech stále "retry exhausted"
=> retry mechanism funguje technicky, ale NEPROKÁZAL recovery.

### Fix D - FileSystem transient retry
- 48 dřívějších "file/directory not found" nyní success
- cached-state případ nyní success
=> zde je skutečný výrazný live přínos.

### 403
- z původních 20 není žádný prokazatelně zachráněn
- 19 zůstalo HTTP 403
- 1 se změnil na HTTP 404

### LIBRARY FALLBACK
- 11 aktuálních fallback attempts
- success: 0
- failure: 11
- všech 11 HTTP 422 Invalid file_id
- 10 patří kandidátům s primary 403
- 1 patří kandidátu s primary 404

# ÚKOL V2.4

## 1. OPRAV REPORTING SEMANTIKU

Současný buildScanReport počítá:
failed_count = počet failure ledger entries.

To je chybně prezentováno jako počet chyb souborů.

Rozděl minimálně:
- total_candidate_assets
- saved_candidate_assets
- failed_candidate_assets
- total_download_attempts
- failed_download_attempts

Candidate identity určuj deterministicky minimálně podle:
- conversation_id
- message_id
- candidate_type
- original_ref

Pokud kandidát má primary failure + fallback failure,
musí být:
- 1 failed candidate
- 2 failed attempts

UI musí zobrazovat počet FAILED CANDIDATES, ne počet attempts.

Ledger jednotlivé pokusy zachovej.

## 2. LIBRARY_FILE_ID_FALLBACK

Nedělej další endpointy naslepo.

U všech 11 současných 422:
- vypiš raw library_file_id,
- raw candidate metadata, ze kterých hodnota vznikla,
- primary file_id,
- conversation_id,
- candidate type,
- původní message metadata relevantní k souboru.

Zjisti, co pole skutečně znamená.

Nevydávej file_* hodnotu za validní files/download ID jen proto,
že začíná "file_".

Použij fallback pouze tehdy, pokud máš doloženo, že daný typ ID
současný ChatGPT backend přijímá.

Pokud pro tento typ ID neexistuje doložený resolver:
- neprováděj nesmyslný HTTP 422 pokus,
- eviduj "fallback_not_applicable",
- nezvyšuj tím počet failed candidates.

## 3. FIX A - FILESYSTEM NÁZVY

Zjisti přesně všech 6 původních kandidátů:
- raw filename
- sanitized filename
- exception.name
- exception.message
- cílový parent folder

U "Name is not allowed":
pokud sanitizované jméno stále Chromium odmítne,
proveď bezpečný fallback na deterministický název, například
asset_<short-hash> + zachovaná přípona.

Původní jméno MUSÍ zůstat v ledger/meta.

U 5 současných "file or directory could not be found":
nejprve zjisti, zda selhává:
- getFileHandle,
- createWritable,
- parent directory handle,
- nebo jiný krok.

Nehádej.

Pokud je problém stale parent handle, reacquire handle bezpečně
z aktuálního conversation/attachments folderu a proveď jeden retry.

## 4. SANDBOX RETRY

Mechanismus 5 pokusů ponech jako funkční diagnostiku.

NEOZNAČUJ jej jako recovery fix, protože live success = 0/6.

Neprodlužuj čekání naslepo.
Nejdřív zjisti, zda odpověď status=retry obsahuje další metadata
nebo zda současný ChatGPT klient používá jiný mechanismus/polling.

## 5. 404 / file_not_found / ace_pod_expired / 403

Zatím je NEPROHLAŠUJ za trvale ztracené.

Pouze je klasifikuj jako:
- backend currently unavailable
- authorization rejected
- sandbox expired
- unresolved

Bez důkazu netvrď:
- že uživatel soubor smazal,
- že pochází z cizího GPT,
- že antivirus zamkl adresář,
- ani že fyzický blob neexistuje.

## 6. REGRESE

Musí zůstat:
- 200/200 conversation path funkční
- 429 fix beze změny
- file-service live úspěchy nerozbít
- controlled "Popis obrázku" zůstat 7/7
- inventory beze změny

## 7. TESTY

Přidej testy pro:
- candidate count != attempt count
- primary failure + fallback failure = 1 failed candidate / 2 failed attempts
- filename rejected -> deterministic safe fallback -> success
- stale parent handle -> reacquire -> success
- invalid/unverified library ID se nevolá naslepo

## 8. Vytvoř V2.4 odděleně

Na konci uveď:
- přesný diff proti V2.3
- tests pass/fail
- build path
- size
- SHA256
- které chyby očekáváš v live testu reálně odstranit
- SCHVÁLENO / NESCHVÁLENO K ŽIVÉMU TESTU

Potom se zastav.
