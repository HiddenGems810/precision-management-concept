# Template Field Map — Precision Management Property Marketing Toolkit

> **System purpose:** These fields create a consistent, editable layer across all property-level templates. Replace each `[FIELD]` with property-specific values. Every template in this system uses this field set — no custom fields per document.

---

## Core Fields

| Field | Description | Example |
|---|---|---|
| `[PROPERTY_NAME]` | Full property name as marketed | Oakwood Commons |
| `[PROPERTY_ADDRESS]` | Street address, city, state, ZIP | 1245 Riverside Dr, Atlanta, GA 30318 |
| `[UNIT_TYPE]` | Unit bedroom/bath configuration | 2-Bedroom / 1-Bath |
| `[RENT_AMOUNT]` | Monthly rent (starting or range) | Starting at $1,150/mo |
| `[AVAILABILITY_DATE]` | Next available move-in date | Available August 1, 2025 |
| `[SQUARE_FEET]` | Unit square footage | 875 sq ft |
| `[AMENITIES]` | Comma-separated amenity list | In-unit W/D, Central A/C, Covered Parking |
| `[LEASING_PHONE]` | Primary leasing line | (404) 555-0192 |
| `[LEASING_EMAIL]` | Leasing office email address | leasing@propertyname.com |
| `[APPLICATION_URL]` | Online application portal link | apply.precisionmngmt.com/oakwood |
| `[MAINTENANCE_CONTACT]` | Maintenance request line or portal | (404) 555-0199 or resident portal |
| `[OFFICE_HOURS]` | Leasing/office hours | Mon–Fri 9am–5pm, Sat 10am–2pm |
| `[RESIDENT_PORTAL_URL]` | Resident self-service portal URL | resident.precisionmngmt.com |
| `[QR_CODE]` | QR code linking to application or portal | *(insert QR code image)* |
| `[MANAGER_NAME]` | On-site or regional manager name | Jordan Williams |

---

## Template Usage Map

### Property Flyers (1BR / 2BR / 3BR / Available Units / Move-In Special / Overview / Amenity / Open House)
```
[PROPERTY_NAME]       — All flyers
[PROPERTY_ADDRESS]    — All flyers
[UNIT_TYPE]           — Unit-specific flyers
[RENT_AMOUNT]         — All flyers
[AVAILABILITY_DATE]   — All flyers
[SQUARE_FEET]         — Unit-specific flyers
[AMENITIES]           — Overview, Amenity, Open House flyers
[LEASING_PHONE]       — All flyers
[LEASING_EMAIL]       — All flyers
[APPLICATION_URL]     — All flyers
[QR_CODE]             — All flyers
[OFFICE_HOURS]        — Open House, Leasing Event flyers
```

### Leasing Brochure / Packet
```
[PROPERTY_NAME]       — Cover, overview, unit comparison
[PROPERTY_ADDRESS]    — Cover, contact sheet
[UNIT_TYPE]           — Unit comparison sheet
[RENT_AMOUNT]         — Unit comparison sheet
[SQUARE_FEET]         — Unit comparison sheet
[AMENITIES]           — Amenities sheet
[LEASING_PHONE]       — Contact page, application process
[LEASING_EMAIL]       — Contact page, application process
[APPLICATION_URL]     — Application process sheet
[QR_CODE]             — Cover, application sheet
[OFFICE_HOURS]        — Contact page
```

### Lease Renewal Communication
```
[PROPERTY_NAME]       — All renewal templates
[RESIDENT_PORTAL_URL] — Renewal letter, email, text copy
[LEASING_PHONE]       — Renewal letter, FAQ
[LEASING_EMAIL]       — Renewal email, FAQ
[OFFICE_HOURS]        — Renewal FAQ, door notice
[MANAGER_NAME]        — Renewal letter sign-off
[RENT_AMOUNT]         — Resident retention offer (new rate)
[AVAILABILITY_DATE]   — Renewal deadline date
```

### Move-In Kit
```
[PROPERTY_NAME]       — Welcome letter, all sheets
[PROPERTY_ADDRESS]    — Welcome letter, parking/trash info
[LEASING_PHONE]       — Office contact card, all sheets
[LEASING_EMAIL]       — Office contact card, all sheets
[MAINTENANCE_CONTACT] — Maintenance guide, contact card
[OFFICE_HOURS]        — Office contact card
[RESIDENT_PORTAL_URL] — Portal instruction sheet, utilities guide
[QR_CODE]             — Portal instruction sheet, welcome letter
[AMENITIES]           — Welcome letter intro
[MANAGER_NAME]        — Welcome letter sign-off
```

### Resident Notices / Operations Templates
```
[PROPERTY_NAME]       — All notices
[PROPERTY_ADDRESS]    — All notices (footer)
[LEASING_PHONE]       — All notices
[LEASING_EMAIL]       — All notices
[MAINTENANCE_CONTACT] — Maintenance notice, emergency update
[OFFICE_HOURS]        — Closure notice, all operational
[RESIDENT_PORTAL_URL] — Portal announcement, payment reminder
[MANAGER_NAME]        — All notices sign-off
```

### Floor Plans
```
[PROPERTY_NAME]       — Header
[PROPERTY_ADDRESS]    — Footer
[UNIT_TYPE]           — Header/Features
[SQUARE_FEET]         — Stats Sidebar
[RENT_AMOUNT]         — Stats Sidebar
[AVAILABILITY_DATE]   — Stats Sidebar
[AMENITIES]           — Features list
[LEASING_PHONE]       — Sidebar contact
[LEASING_EMAIL]       — Sidebar contact
```

### Business Cards / Staff Cards
```
[PROPERTY_NAME]       — Property manager card, leasing specialist card
[LEASING_PHONE]       — All cards
[LEASING_EMAIL]       — All cards
[APPLICATION_URL]     — QR-code contact card
[OFFICE_HOURS]        — Property manager card, leasing specialist card
[QR_CODE]             — QR-code contact card
[MANAGER_NAME]        — Property manager card
```

### Staff & Operations (Timesheets / Bonus Sheets)
```
[STAFF_NAME]          — All templates
[STAFF_TITLE]         — All templates
[PROPERTY_NAME]       — All templates
[MANAGER_NAME]        — Signature blocks
[PAY_PERIOD]          — Timesheet headers, bonus sheet performance period
[BONUS_AMOUNT]        — Bonus sheet highlight
```

---

## Fair Housing Notes

All templates in this system use field-neutral language. Do not populate fields with:
- Demographic descriptors in property names or headlines
- Language implying preferred resident types
- Neighborhood descriptors that could encode demographic bias

Use instead:
- Service-based language (`clear communication`, `professionally managed`, `resident support`)
- Feature-based language (`in-unit laundry`, `central A/C`, `covered parking`)
- Process-based language (`simple application`, `responsive maintenance`, `online portal`)

---

## Scaling This System

To adapt any template to a new property:

1. Copy the template file
2. Find/replace all `[FIELD]` values with property-specific content
3. Update the QR code to point to the correct application or portal URL
4. Replace the equal housing placeholder with the approved compliance statement
5. Submit for manager review before distributing

> All templates include a placeholder for the Equal Housing Opportunity logo and HUD compliance statement. Insert the approved language for each property's applicable program.

---

*Template Field Map — Precision Management Property Marketing & Move-In Communication System*
*Independent concept by Ger'Quia Abner*
