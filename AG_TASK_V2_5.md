# AG TASK V2.5 — uzavření zbývajících lokálních FileSystem chyb po živém testu V2.4

Pracuj pouze na větvi `improve_autosave_reliability_audit`.

Výchozí stav: V2.4 commit `63d9a95b42870d549831fccb1bf506aec6d9eb45`.

NEUPRAVUJ inventory, conversation fetch, 429 pacing/backoff, conversation_id autorizaci, sandbox retry mechanismus, file-service řešení ani již funkční reporting candidate-vs-attempt semantics.

## ŽIVÝ TEST V2.4 — OVĚŘENO

Aktuální `scan_report.json`:
- status: `COMPLETE_WITH_ASSET_ERRORS`
- inventory total_found: 200
- inventory complete: true
- regular: 200 / ok
- projects: 103 / ok
- archived: 0 / ok
- inventory errors: []
- conversations expected: 200
- saved: 200
- failed: 0
- missing: 0
- controlled chat `Popis obrázku` (`6a997c4e-d6d8-83eb-b377-f9775819bd1c`): 7 assets / 0 failed

V2.4 reporting je nyní správný:
- total_candidate_assets: 1158
- saved_candidate_assets: 1059
- failed_candidate_assets: 99
- total_download_attempts: 1158
- failed_download_attempts: 99

Tedy žádné duplicitní fallback attempts v počtu chyb. 11 chybných 422 library fallback pokusů z V2.3 zmizelo — tuto logiku nerozbíjej.

## AKTUÁLNÍCH 99 SELHANÝCH KANDIDÁTŮ

- 40 × `primary_file_id`: `download meta 404: {"detail":"File not found"}`
- 19 × `primary_file_id`: `download meta 403: {"detail":"Forbidden"}`
- 16 × `sandbox_interpreter`: `sandbox download meta 404: {"detail":"Library file not found"}`
- 7 × `sandbox_interpreter`: `file_not_found`
- 6 × `sandbox_interpreter`: `ace_pod_expired`
- 6 × `sandbox_interpreter`: `retry vyčerpán po 5 pokusech`
- 4 × FileSystem: `A requested file or directory could not be found at the time an operation was processed.`
- 1 × FileSystem: `Failed to execute 'getFileHandle' on 'FileSystemDirectoryHandle': Name is not allowed.`

Tento úkol řeší POUZE posledních 5 lokálních FileSystem chyb. Ostatních 94 nyní pouze ponech a klasifikuj neutrálně. Nezkoušej nové endpointy ani další recovery cesty naslepo.

## PŘESNÝCH 5 ZBÝVAJÍCÍCH FILESYSTEM FAILURE

### 1
conversation: `6a9919fc-324c-83eb-8d4f-562767f5448a`
title: `Identifikace opravy kamery`
message: `8b4b90f9-aaf7-4031-89d9-dacbf1da877e`
candidate_type: `attachment`
file_id: `file_000000000310821094a761a86e276490`
error: `A requested file or directory could not be found at the time an operation was processed.`

### 2
conversation: `6a5e1b91-9594-83ed-90eb-c0fa5c347ac8`
title: `PZTS funkční zkoušky`
message: `5b206462-9608-4dd2-bcb2-75e531ab15ff`
candidate_type: `attachment`
file_id: `file_00000000c84481f4a52630d1e719f8e9`
library_file_id: `file_5b9299740a4081919c022ed2bb84b47e`
error: `A requested file or directory could not be found at the time an operation was processed.`

### 3
conversation: `6a7a3810-3f64-83eb-a2ae-87484e293b1f`
title: `Univerzální monitoring detektorů`
message: `40e153a1-a6ed-52aa-bc9e-9ccfd7d0cadd`
candidate_type: `sandbox-link`
original_ref: `sandbox:/workspace/scratch/b85c1af40a7f/ServerovnaMonitor/platformio.ini`
error: `Failed to execute 'getFileHandle' on 'FileSystemDirectoryHandle': Name is not allowed.`

### 4
conversation: `6a7472a9-8128-83eb-bf9f-85edb5517d72`
title: `Navrhni strukturu zprávy`
message: `10a1fec3-28e4-4dce-a6aa-12855c46962a`
candidate_type: `sandbox-link`
original_ref: `sandbox:/mnt/data/Zpráva%20o%20periodické%20kontrole%20a%20funkční%20zkoušce%20PZTS_ATC_Hrušov_2025.docx`
error: `A requested file or directory could not be found at the time an operation was processed.`

### 5
conversation: `6a54f74e-5e60-83eb-9621-94ca87be548b`
title: `CCTV funkční zkoušky`
message: `cb8e3a6d-8495-45b7-89ff-c92a7e746747`
candidate_type: `sandbox-link`
original_ref: `sandbox:/mnt/data/AT_Computers_Tesinska_CCTV_Priloha_5_Kontrola_sitove_infrastruktury_CCTV_z_ISAPI.docx`
error: `A requested file or directory could not be found at the time an operation was processed.`

## DŮLEŽITÉ ZJIŠTĚNÍ V KÓDU V2.4

Aktuální `saveConversationToDisk()` vytváří:

```ts
const attFolder = await ensureFolder(convFolder, 'attachments');
const reacquireAttFolder = async () => {
    return await ensureFolder(convFolder, 'attachments');
};
```

Toto není skutečné znovuzískání celé cesty. Callback znovu používá zachycený `convFolder` handle. Pokud je právě `convFolder` nebo jeho parent stale, retry zůstává na stejné stale hierarchii.

## ÚKOL V2.5

### A. Oprav skutečný reacquire attachment folderu

Při FileSystem `NotFoundError`, `InvalidStateError`, `state changed`, `could not be found` nesmí callback znovu použít starý `convFolder` jako výchozí bod.

Znovu projdi cestu z čerstvého root handle:
1. `getRootHandle()`
2. user folder podle `Cred.userLabel`
3. workspace folder `workspaceName`
4. category folder `categoryName`
5. conversation folder podle stejného `folderName` / conversation ID
6. `attachments`

Teprve nový `attachments` handle použij pro jeden bezpečný retry zápisu.

Nevytvářej nové paralelní složky a nerozbíjej existující `resolveConversationFolderName()` chování.

### B. `Name is not allowed` — zjisti, proč bezpečný fallback stále selhal

V2.4 má `deterministicSafeFilename()`, ale případ `platformio.ini` stále skončil `Name is not allowed`.

Neodhaduj příčinu. Přidej přesnou diagnostiku pro zápis souboru:
- operation stage: `getFileHandle` / `createWritable` / `write` / `close`
- original requested filename
- sanitized filename
- fallback filename
- attempt number
- exception.name
- exception.message
- zda proběhl reacquire parentu
- zda po reacquire vznikl nový handle

Pokud `getFileHandle()` odmítne i `asset_<hash>.<ext>`, proveď před posledním pokusem skutečný reacquire attachment folderu od rootu a znovu použij deterministický safe filename.

Maximálně jeden retry po reacquire. Žádné nekonečné smyčky.

### C. Zachovej original name

Původní jméno/reference musí zůstat v `metadata.json`/ledgeru. `saved_as` musí obsahovat skutečně použitý bezpečný lokální název.

### D. Nepřičítej backend změny k V2.5

Mezi V2.3 a V2.4 klesly primary 404 z 44 na 40. To NENÍ prokazatelně zásluha V2.4. Backend stav se mohl změnit. V reportu proto odděl:
- software-fixed FileSystem cases
- backend-state changes

### E. Testy

Přidej minimálně testy:
1. stale `convFolder` + fresh root -> rewalk celé cesty -> write success
2. stale attachments handle -> reacquire od root -> write success
3. original filename rejected -> deterministic fallback -> success
4. fallback filename rejected na starém handle -> root reacquire -> fallback success
5. original name zůstane v metadata, `saved_as` je skutečný fallback
6. žádná změna candidate-vs-attempt summary
7. žádná změna library fallback guard
8. žádná změna 429/inventory logic

## VÝSTUP

Vytvoř oddělený build:
`release-v2.5-validation/chatgpt-multimodal-exporter.user.js`

Na konci uveď:
- commit
- přesný diff proti V2.4
- tests pass/fail
- build path
- size
- SHA256
- které z 5 konkrétních FileSystem failures má změna pokrýt
- co zůstává NEOVĚŘENO do live testu
- `SCHVÁLENO / NESCHVÁLENO K ŽIVÉMU TESTU`

Potom se zastav. Neprováděj další široké změny.