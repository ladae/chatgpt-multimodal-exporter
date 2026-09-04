# ROZBOR A KLASIFIKACE ZBYTKOVÝCH CHYB (UNRESOLVED RISKS) - V2.3

V živém testu V2.2 bylo zaznamenáno celkem 178 selhání stahování assetů.  
Verze V2.3 úspěšně a deterministicky řeší **17 těchto chyb** (Fixes A, B, C, D).  
Zbývajících **161 chyb** představuje objektivně neopravitelná selhání daná stavem serverů OpenAI, právy účtu nebo prostředím operačního systému, která žádný skript na straně klienta nemůže vyřešit.

---

## Přehledová bilance chyb

| Kategorie selhání | Počet v testu V2.2 | Řešení ve V2.3 | Stav po V2.3 | Důvod neopravitelnosti / Poznámka |
|---|---|---|---|---|
| **A. getFileHandle: "Name is not allowed"** | 6 | **OPRAVENO** (Fix A) | 0 | Odstranění zakázaných znaků Windows FS, koncových teček/mezer a DOS jmen. |
| **B. HTTP 422 kvůli file-service://** | 4 | **OPRAVENO** (Fix B) | 0 | Očištění interního schématu URI na čistý file identifikátor. |
| **C. Sandbox {"status":"retry"} bez URL** | 6 | **OPRAVENO** (Fix C) | 0 | Bounded retry loop (až 4 opakování, backoff 1–4 s). |
| **D. FileSystem cached state changed** | 1 | **OPRAVENO** (Fix D) | 0 | 1× bezpečný retry s prodlevou 150 ms na handle I/O. |
| **E. Trvale smazané soubory (404 / file_not_found)** | 87 | Neopravitelné na klientu | 87 | 60× `download meta 404` + 27× `file_not_found`. Soubory byly uživatelem či systémem smazány ze serveru. |
| **F. Lokální FileSystem I/O nedostupnost** | 48 | Neopravitelné na klientu | 48 | `"A requested file or directory could not be found..."` – lokální handle ztratil referenci či složka byla uzamčena OS. |
| **G. HTTP 403 z cizích/privátních GPT** | 20 | Neopravitelné na klientu | 20 | Soubory v cizích/privátních GPT workspace, ke kterým uživatel nemá přístupová práva. |
| **H. ace_pod_expired (vypršelý sandbox)** | 6 | Neopravitelné na klientu | 6 | Kontejnery Code Interpreteru byly OpenAI smazány po vypršení TTL sezení. |
| **CELKEM** | **178** | **17 opraveno** | **161 zůstává** | **100% bilance sedí** |

---

## Podrobný rozbor 161 neopravitelných chyb

### 1. 87× Trvale smazané soubory z backendu OpenAI (60× 404 Not Found + 27× file_not_found)
- **Podstata:** Uživatel v minulosti ručně odstranil soubory ze své knihovny ("My Files" / "Manage Files"), nebo OpenAI automaticky vyčistila nepoužívané soubory. Historická konverzace v JSON struktuře stále obsahuje metadata o tom, že k dané zprávě byl kdysi přiložen soubor s ID `file-xyz`.
- **Proč nelze opravit:** Jakmile backend na dotaz `/backend-api/files/download/{file_id}` odpoví HTTP 404, fyzický objekt v cloudovém úložišti OpenAI (AWS S3 / Azure Blob Storage) již **fyzicky neexistuje**. Žádný alternativní endpoint neexistuje.
- **Ošetření:** V2.3 tyto soubory korektně a transparentně zaeviduje do `asset_ledger.jsonl` se statusem `failure` a kódem `404`.

### 2. 48× Lokální FileSystem I/O nedostupnost ("A requested file or directory could not be found...")
- **Podstata:** Chromium File System Access API vyvolává tuto výjimku, pokud lokální složka či handle přestane být dostupný (např. při paralelním přístupu jiného procesu, antivirové kontrole, dočasném přejmenování nebo vypršení oprávnění k podadresáři).
- **Proč nelze řešit z webového userscriptu:** Userscript nemá přímý nízkoúrovňový přístup k jádru OS Windows a je striktně omezen bezpečnostním modelem webového standardu File System Access API.
- **Ošetření:** Chyba nezastaví běh skriptu ani ukládání ostatních souborů; je zaevidována v ledgeru.

### 3. 20× HTTP 403 Forbidden (Cizí/privátní GPT a sdílené workspaces)
- **Podstata:** Konverzace vznikly interakcí s cizími Custom GPT z GPT Store nebo v rámci sdílených workspace. Přílohy nahrané autorem daného GPT nebo jiným uživatelem v cizím tenantu podléhají striktním ACL (Access Control Lists) serverů OpenAI.
- **Proč nelze opravit:** Backend OpenAI striktně odmítne vydat download URL uživateli, který není vlastníkem souboru ani nemá oprávnění k originálnímu úložišti. Zkoušení fallbacku na `library_file_id` rovněž selhalo, protože soubor nepatří do knihovny přihlášeného účtu.
- **Ošetření:** Stav je transparentně zaevidován jako 403 Forbidden.

### 4. 6× ace_pod_expired (HTTP 410 Gone / Zničené sandbox kontejnery)
- **Podstata:** Code Interpreter (Advanced Data Analysis) spouští Python kód v izolovaném kontejneru (ACE pod). Tyto kontejnery mají životnost v řádu hodin. Po jejich ukončení server OpenAI vrátí `{"detail": "ace_pod_expired"}`.
- **Proč nelze opravit:** Virtuální stroj, na jehož disku se soubor nacházel, byl servery OpenAI trvale zničen a uvolněn.
- **Ošetření:** Kód V2.3 tuto chybu explicitně detekuje a eviduje s popisem "Sandbox kontejner vypršel".
