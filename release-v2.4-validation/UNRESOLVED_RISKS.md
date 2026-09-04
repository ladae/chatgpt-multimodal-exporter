# ROZBOR A KLASIFIKACE ZBYTKOVÝCH CHYB (UNRESOLVED RISKS) - V2.4

V souladu s bodem 5 zadání `AG_TASK_V2_4.md` jsou zbývající chyby, které nelze vyřešit na straně webového exporteru, klasifikovány striktně neutrálně bez nepodložených spekulací.

---

## Přehledová klasifikace zbývajících selhání

| Kategorie | Původní kód / zpráva | Počet v testu V2.3 | Striktní neutrální klasifikace dle AG_TASK_V2_4 | Technický stav / Důvod |
|---|---|:---:|---|---|
| **Primary HTTP 404** | `download meta 404` | 44 | **backend currently unavailable** | Endpoint backendu vrátil HTTP 404 Not Found. Objekt není na serveru dostupný. |
| **Sandbox meta 404** | `sandbox meta 404 "Library file not found"` | 16 | **backend currently unavailable** | Sandbox endpoint vrátil 404 pro knihovní soubor. |
| **Sandbox file_not_found** | `sandbox file_not_found` | 7 | **backend currently unavailable** | Cesta v sandboxu nebyla backendem nalezena. |
| **Primary HTTP 403** | `download meta 403: Forbidden` | 19 | **authorization rejected** | Server OpenAI zamítl přístup k souboru (HTTP 403). |
| **Expirovaný sandbox** | `ace_pod_expired` (HTTP 410) | 6 | **sandbox expired** | Server OpenAI vrátil detail ace_pod_expired; kontejner byl ukončen. |
| **Sandbox retry vyčerpán**| `status="retry"` po 5 pokusech | 6 | **unresolved** | Sandbox po 5 pokusech s odstupem až 10s nepřipravil download URL. |
| **CELKEM** | | **98** | *(čistý počet kandidátů bez 422 a FS chyb)* | |

---

## Poznámky k neopravitelným kategoriím

1. **backend currently unavailable (67 kandidátů: 44× primary 404 + 16× sandbox meta 404 + 7× sandbox file_not_found):**
   - Server OpenAI na požadavek odpovídá kódem 404. Na straně klienta nelze ověřit, z jakého důvodu backend soubor neposkytl, ani zda objekt existuje v interních úložištích OpenAI. Stav je proto transparentně evidován jako nedostupný na straně backendu.

2. **authorization rejected (19 kandidátů: HTTP 403 Forbidden):**
   - Požadavek s platným konverzačním tokenem i `conversation_id` byl backendem odmítnut. Z pohledu klienta je autorizace zamítnuta serverem.

3. **sandbox expired (6 kandidátů: ace_pod_expired):**
   - Odpověď backendu OpenAI explicitně deklaruje vypršení platnosti sandbox kontejneru (`ace_pod_expired`).

4. **unresolved (6 kandidátů: sandbox retry vyčerpán):**
   - Code Interpreter vrátil opakovaně status `retry` bez `download_url`. Diagnostický mechanismus 5 pokusů proběhl, ale soubor nebyl backendem uvolněn.
