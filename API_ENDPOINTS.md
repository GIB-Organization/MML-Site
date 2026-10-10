# MML – API Contract (for Mobile)

Derived from the MML web site's client code (`src/app/services/api`, `src/app/models`). The backend controllers are the final source of truth. Items marked **⚠ confirm** could not be verified from the front end.

## 1. General

| Item | Value |
|---|---|
| Base URL (prod) | `https://mml.itarm-insurance.com/api/v1` |
| Base URL (dev) | `https://localhost:7117/api/v1` |
| Format | JSON, camelCase keys (`Content-Type: application/json`) |
| Auth | `Authorization: Bearer <accessToken>` (the web sends it on every request; public endpoints ignore it. ⚠ confirm which are anonymous) |
| Files | `multipart/form-data` (tickets), binary/PDF (policy file) |
| Languages | Bilingual fields: `nameAr` / `nameEn`, etc. The client picks by locale. |

### Response envelope
Most endpoints return:
```json
{ "message": "string?", "result": <T> }
```
Paged endpoints: `{ "message": "", "result": { "totalRecords": 0, "data": [ ... ] } }`.

**Exceptions (return the raw body with no envelope):** companies, policies, quotation, payment `createCheckout`, all lookup and address endpoints. Each section says which.

Errors: HTTP error status with body `{ "status": number, "message": string }`.

### Token handling
`login` / `register` return `token: { accessToken, refreshToken }`. On 401 call `POST /account/refreshToken` with the pair and store the new pair.

---

## 2. Auth – `/account`

### POST `/account/sendRegisterOtp`
Send an OTP to the phone before registering.
```json
// Request
{ "nationalId": "1234567890", "phoneNumber": "05xxxxxxxx" }
// Response: IResponse<string>
{ "message": "OTP sent", "result": "string" }
```

### POST `/account/register`
Create an account (after OTP).
```json
// Request
{ "fullName": "", "nationalId": "", "phoneNumber": "", "email": "", "password": "",
  "confirmPassword": "", "agreeTerms": true, "otpCode": "1234" }
// Response: IResponse<LoginResponse>  (see below)
```

### POST `/account/sendLoginOtp`
Validate email and password and send the login OTP.
```json
// Request
{ "email": "a@b.com", "password": "string" }
// Response: IResponse<string>
```

### POST `/account/login`
```json
// Request
{ "email": "a@b.com", "password": "string", "otpCode": "1234" }
// Response: IResponse<LoginResponse>
{
  "result": {
    "userId": "", "username": "", "fullName": "", "email": "", "phoneNumber": "",
    "nationalId": "", "bankName": "", "iban": "",
    "token": { "accessToken": "jwt", "refreshToken": "string" }
  }
}
```
The JWT claims also contain `nameid`, `fullName`, `phoneNumber`, `email`, `nationalId`, `bankName`, `iban`, `exp`.

### POST `/account/refreshToken`
```json
// Request
{ "accessToken": "old", "refreshToken": "old" }
// Response: IResponse<{ accessToken, refreshToken }>
```

### POST `/account/changeInfo`  🔒
Update the profile. Returns the updated user and a new token.
```json
// Request
{ "fullName": "", "email": "", "phoneNumber": "" }
// Response: IResponse<LoginResponse>
```

### POST `/account/changePassword`  🔒
```json
// Request
{ "oldPassword": "", "newPassword": "", "confirmPassword": "" }
// Response: IResponse<null>
```

### POST `/account/sendForgotPasswordOtp`
```json
// Request
{ "email": "", "nationalId": "" }
// Response: IResponse<string>
```

### POST `/account/resetPassword`
```json
// Request
{ "otp": "1234", "newPassword": "" }
// Response: IResponse<null>
```
⚠ confirm: the web sends no email or id here, so the backend probably identifies the user from the OTP or the previous step.

---

## 3. Insurance flow (MMP – Medical Malpractice)

Flow: **inquire** → **additionalData** (pricing options) → **quotation/quote** (offers) → **payment**.

### POST `/mmp/inquire`
Look up the person by national ID and open a request. Returns `refId`, which is used in all following steps.
```json
// Request
{ "idNumber": "1234567890", "startDate": "2026-10-01" }
// Response: IResponse<InquireResponse>
{ "result": { "refId": "guid", "idNumber": "", "startDate": "",
   "firstName": "", "fatherName": "", "grandFatherName": "", "familyName": "",
   "firstNameT": "", "fatherNameT": "", "grandFatherNameT": "", "familyNameT": "" } }
```
(`*T` = the English transliteration. The fields `maker`, `model`, `plateNumber`, etc. are legacy car fields and are not returned for MMP.)

### POST `/mmp/additionalData`
Submit the professional and insurance details. Returns pricing tiers.
```json
// Request (fields the MMP UI currently uses)
{
  "refId": "guid",
  "subProfessionId": 0,            // lookup category 6 (SubProfessions)
  "policyPeriod": 1,
  "experiencePeriodId": 0,         // lookup category 7 (ExperiencePeriods)
  "birthMonth": 1, "birthYear": 1985,
  "malpracticeClaimDeclared": false, "malpracticeClaimDetails": null,
  "hasPreviousInsurance": false, "previousPolicyNumber": null,
  "previousPolicyEndDate": null, "previousInsuranceCompanyCode": null,
  "retroactiveDate": null,
  "isPoliticallyExposedPerson": false
}
// Response: IResponse<AdditionalDataResponse>
{ "result": { "refId": "guid",
  "pricing": {
    "quotationReferenceNo": "", "policyEffectiveDate": "",
    "quotationDurations": [ { "duration": 1, "coverPlans": [ {
        "oneTimeOccurrence": 0, "aggregatedOccurrence": 0,
        "deductibles": [ { "deductibleID": 0, "policyPremium": 0, "taxableAmount": 0, "deductibleReferenceNo": "" } ]
    } ] } ] } } }
```
The request DTO also has optional legacy car-flow fields (`drivers`, `additionalDetails`, `promoCode`, `estimatedValue`, …). MMP does not use them.

---

## 4. Quotation – `/quotation`

### POST `/quotation/quote?insuranceCompanyID={id}`
Get the compare-offers result for one insurer (this is the MMP quote). **No envelope.**
```json
// Request
{
  "requestReferenceNo": "refId",
  "insuranceCompanyCode": 0,
  "insuranceTypeID": 0,
  "policyHolder": { "idTypeCode": 1, "id": "1234567890", "nationalityID": 0, "gender": 1 },
  "quotationDetails": {
    "policyEffectiveDate": "2026-10-01",
    "insuranceRiskInfo": {
      "professionID": 0, "subProfessionID": 0, "isSurgeon": false, "experiencePeriod": 0,
      "facilityDetails": { "practiceRegionID": [1], "facility": [ { "typeID": 0, "number": 0 } ] },
      "previousPolicyInfo": { "policyNumber": "", "insuranceCompanyCode": 0, "retroactiveDate": "", "uninterruptedDuration": 0 }
    }
  }
}
// Response
{
  "status": true,
  "errors": [ { "field": "", "message": "" } ],
  "quotation": { "requestReferenceNo": "", "quotationReferenceNo": "", "insuranceCompanyCode": 0,
                 "policyEffectiveDate": "", "subProfessionNameAr": "", "subProfessionNameEn": "",
                 "experiencePeriodNameAr": "", "experiencePeriodNameEn": "", "isSurgeon": false },
  "offers": [ {
      "insuranceCompanyId": 0, "companyKey": "", "companyNameAr": "", "companyNameEn": "", "companyLogo": "url",
      "quotationReferenceNo": "", "deductibleReferenceNo": "",
      "coverageYears": 1, "annualCoverageLimit": 0, "singleClaimLimit": 0,
      "deductibleId": 0, "deductibleValue": 0, "deductibleNameAr": "", "deductibleNameEn": "",
      "basicPremium": 0, "vatPercentage": 15, "vatAmount": 0, "total": 0,
      "priceBreakdown": [ { "typeId": 0, "amount": 0 } ],
      "features": [ { "id": 0, "typeId": 0 } ]
  } ]
}
```

### GET `/quotation/quote?referenceId={refId}&insuranceCompanyID={id}`
Legacy car-flow quotes. Returns an array (no envelope) of `Quotation`: `referenceId, quotationNo, quotationDate, quotationExpiryDate, statusCode, errors[], products[{productId, productNameAr/En, productPrice, deductibleValue, benefits[], priceDetails[]}]`. ⚠ Probably not needed for MMP.

---

## 5. Insurance companies – `/insuranceCompany`

### GET `/insuranceCompany/getAllCompanies`
List insurers. **No envelope**, returns `Company[]`.
```json
[ { "insuranceCompanyID": 0, "key": "", "order": 0, "grade": 0,
    "nameAr": "", "nameEn": "", "descAr": "", "descEn": "",
    "email": "", "mobileNumber": "", "homePhone": "", "fax": "", "webSite": null,
    "addressAr": "", "addressEn": "" } ]
```

---

## 6. Payment – `/payment`

### POST `/payment/createCheckout`  🔒
Create the payment checkout. **No envelope.**
```json
// Request
{ "referenceId": "refId", "companyId": 0, "productId": "string", "totalAmount": 0,
  "selectedBenfitCodes": [0],          // spelling is as in the API
  "bankName": "", "iban": "", "email": "", "phoneNumber": "",
  "paymentMethod": "VISA" }            // "VISA" | "MASTER" | "MADA"
// Response
{ "checkoutId": "string" }
```
The web then loads the payment gateway form with `checkoutId`. On return, it calls `GetPaymentStatus`.

### GET `/payment/GetPaymentStatus?checkoutId={id}&resourcePath={path}`  🔒
Confirm the result after the gateway redirect. `resourcePath` is returned by the gateway. Response is untyped on the client (`any`); ⚠ confirm the payload. Status enum: `1 = success, 2 = fail, 3 = pending`.

---

## 7. Policies – `/policy`  🔒

### GET `/policy/getAllPolicy`
Returns `Policy[]` (**no envelope**).
```json
[ { "policyId": "", "companyName": "", "policyStatus": 1, "policyStartDate": "", "policyEndDate": "",
    "policyLeftDays": "", "policyFileUrl": "url", "idNumber": "", "sequenceNumber": "",
    "najmStatus": 3, "carPlateChars": "", "carPlateNumber": 0, "carModel": "", "carBrand": "", "carYear": "" } ]
```
`policyStatus`: `1 = active, 2 = expired`. `najmStatus`: `1 = pending, 2 = failed, 3 = success`. The `car*` and `najm*` fields come from the Cars fork. ⚠ confirm they are populated for MMP.

### GET `/policy/getPolicyFileById?policyId={id}`
Get the policy document (PDF). The web also downloads `policyFileUrl` directly as a blob. ⚠ confirm whether this returns a URL or bytes.

---

## 8. Invoices – `/invoices`  🔒

### GET `/invoices/getAllInvoices`
```json
// IResponse<Invoice[]>
{ "result": [ { "id": "", "totalPrice": "", "detailsAr": "", "detailsEn": "", "invoiceDate": "", "invoiceUrl": "url", "email": "" } ] }
```

---

## 9. Cars – `/cars`  🔒 (legacy, from Cars fork)

### GET `/cars/getAllCars`
`IResponse<Car[]>`: `{ id, sequenceNumber, logoUrl, plateNumber, plateChars, model, brand, year }`.

### DELETE `/cars/deleteCar?id={id}`
`IResponse<string>`. Deletes the saved car.

---

## 10. Support tickets – `/supportTickets`  🔒

### GET `/supportTickets/getAllTickets`
```json
// IResponse<Ticket[]>
{ "result": [ { "id": "", "subject": "", "details": "", "lastMessage": "", "isReplied": false, "status": 1 } ] }
```
`status`: `1 = open, 2 = closed`.

### POST `/supportTickets/createTicket`
`multipart/form-data`, fields: `subject` (text), `details` (text), `file` (attachment).
Response: `IResponse<Ticket>`.

---

## 11. Lookups & address (reference data). **No envelope.**

### POST `/lookup/getLoockupsByCategoriesIds`
Body is an array of category IDs. `[5, 6, 7]`. (`Loockups` spelling is real.)
```json
// Response: dictionary keyed by category id
{ "5": [ { "lookupId": 0, "referenceId": 0, "orderNo": 0, "nameAr": "", "nameEn": "",
           "mappingCode": "", "categoryId": 5, "isDefult": false } ], "6": [ ... ] }
```
MMP categories: `5 = MainProfessions, 6 = SubProfessions, 7 = ExperiencePeriods, 8 = Deductibles, 9 = Declarations`.
⚠ The web enum also has legacy car IDs that overlap (1–9, 18). Use only the MMP meanings above.

### GET `/lookup?id={categoryId}`
Returns a single `Lookup` object for the category. (Web code types it as one `ILookup`. ⚠ confirm if it is an array.)

### GET `/lookup/getAllCountries`
`[ { "countryId": 0, "nameAr": "", "nameEn": "", "mappingCode": "" } ]`

### GET `/lookup/getAllRegions`
`[ { "regionId": 0, "nameAr": "", "nameEn": "" } ]`

### GET `/lookup/getAllCites`
(`Cites` spelling is real.) `[ { "cityId": 0, "nameAr": "", "nameEn": "", "mappingCode": "", "regionId": 0 } ]`

---

## 12. App settings – `/appSettings` (public content)

All are `GET` and return `IResponse<T>`.

| Endpoint | `result` |
|---|---|
| `/appSettings/getGeneralSettings` | `{ siteTitleAr/En, siteDescriptionAr/En, address, phone, email, instagram, facebook, youtube, x, showMedicalFaults, showMedicalInsurance, showCarInsurance, medicalFaultsUrl, medicalInsuranceUrl, carInsuranceUrl }` |
| `/appSettings/getSeoSettings` | Web SEO titles and descriptions (not needed for mobile) |
| `/appSettings/getPrivacyPolicy` | `{ contentAr, contentEn }` (HTML) |
| `/appSettings/getTerms` | `{ contentAr, contentEn }` (HTML) |

---

## 13. Website content

### POST `/mmp/contactUs`
```json
// Request
{ "fullName": "", "email": "", "phone": "", "subject": "", "message": "" }
// Response: IResponse<null>
```

### GET `/mmp/faqs`
`IResponse<Faq[]>`: `{ titleAr, titleEn, descriptionAr, descriptionEn }`.

### GET `/partners/getAllPartners`
`IResponse<Partner[]>`: `{ imageUrl, partnerName, email, phoneNumbers[] }`.

### GET `/blogs/getAllBlogs?limit={n}&page={n}`
Paged. `IResponse<{ totalRecords, data: Blog[] }>`. Blog: `{ id, slug, imageUrl, titleAr, titleEn, descriptionAr, descriptionEn, createdDate }`. ⚠ confirm whether `page` is 0-based or 1-based.

### GET `/blogs/getBySlug?slug={slug}`
`IResponse<Blog>`.
