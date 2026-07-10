"use client";
import "../../print/[asset]/print.css";
import "../../print/property-flyer/toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";
import { PdfViewer } from "../../components/PdfViewer";
const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  { key: "PROPERTY_NAME",    label: "Property Name",       placeholder: "Stonegate Apartments",               group: "Property" },
  { key: "PROPERTY_ADDRESS", label: "Property Address",    placeholder: "4500 Stone Gate Dr, Memphis, TN 38128", group: "Property" },
  { key: "FLOOR_PLAN_NAME",  label: "Floor Plan Name",     placeholder: "The Riverside",                 group: "Floor Plan" },
  { key: "FLOOR_PLAN_IMAGE", label: "Floor Plan Image",    placeholder: "Upload image...",               group: "Floor Plan", type: "image" },
  { key: "UNIT_TYPE",        label: "Unit Type",           placeholder: "2-Bedroom / 2-Bath",            group: "Floor Plan" },
  { key: "BEDROOM_COUNT",    label: "Bedrooms",            placeholder: "2",                             group: "Floor Plan" },
  { key: "BATHROOM_COUNT",   label: "Bathrooms",           placeholder: "2",                             group: "Floor Plan" },
  { key: "SQUARE_FEET",      label: "Square Feet",         placeholder: "1,050 sq ft",                   group: "Floor Plan" },
  { key: "RENT_AMOUNT",      label: "Starting Rent",       placeholder: "Starting at $1,150/mo",         group: "Floor Plan" },
  { key: "AVAILABILITY_DATE",label: "Next Available",      placeholder: "August 1, 2025",                group: "Floor Plan" },
  { key: "FEATURES",         label: "Features (one per line)", placeholder: "In-unit washer/dryer\nCentral A/C\nPrivate patio\nStainless appliances", group: "Floor Plan", type: "textarea" },
  // Contact
  { key: "LEASING_PHONE",    label: "Leasing Phone",       placeholder: "(404) 555-0192",                group: "Contact" },
  { key: "LEASING_EMAIL",    label: "Leasing Email",       placeholder: "leasing@stonegateapartments.com",    group: "Contact" },
  { key: "APPLICATION_URL",  label: "Apply URL",           placeholder: "apply.precisionmngmt.com/stonegate", group: "Contact" },
  { key: "OFFICE_HOURS",     label: "Office Hours",        placeholder: "Mon–Fri 9am–5pm, Sat 10am–2pm", group: "Contact" },
];

function Header({ label }: { label: string }) {
  return (
    <header className="print-header">
      <img src={logo} alt="Precision Management" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
      <span>PRECISION MANAGEMENT</span>
      <b>{label}</b>
    </header>
  );
}
function Footer() {
  return (
    <footer className="print-footer">
      Independent concept by Ger&apos;Quia Abner. Not commissioned by, affiliated with, or endorsed by Precision Management.
    </footer>
  );
}

function FloorPlanSheet() {
  const f = useTemplateFields();
  const features = f.FEATURES.split("\n").filter(Boolean);
  return (
    <section className="pdf-page">
      <Header label="Floor plan / property sheet" />

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: ".4in", marginTop: ".5in" }}>
        {/* Left: Floor plan area */}
        <div>
          <p className="kicker">{f.PROPERTY_NAME} — {f.FLOOR_PLAN_NAME}</p>
          <h1 style={{ fontSize: "22px", margin: ".1in 0", color: "#1c2c44" }}>{f.UNIT_TYPE}</h1>

          {f.FLOOR_PLAN_IMAGE?.startsWith("data:") ? (
            <div style={{ marginTop: ".15in", minHeight: "3.5in", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {f.FLOOR_PLAN_IMAGE.startsWith("data:application/pdf") ? (
                <PdfViewer dataUrl={f.FLOOR_PLAN_IMAGE} />
              ) : (
                <img src={f.FLOOR_PLAN_IMAGE} alt="Floor Plan" style={{ maxWidth: "100%", maxHeight: "4in", objectFit: "contain" }} />
              )}
            </div>
          ) : (
            <div style={{
              background: "#f3f4f6",
              border: "2px dashed #d6b055",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: ".1in",
              minHeight: "3.5in",
              padding: ".25in",
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d6b055" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
              </svg>
              <p style={{ fontSize: "9px", color: "#64748b", textAlign: "center", maxWidth: "2.5in", lineHeight: 1.5 }}>
                Floor plan image — upload from the sidebar
              </p>
              <p style={{ fontSize: "7px", color: "#94a3b8", textAlign: "center" }}>
                Recommended: 300 DPI PNG or PDF, landscape orientation
              </p>
            </div>
          )}
          <p style={{ marginTop: ".15in", fontSize: "7px", color: "#94a3b8", lineHeight: 1.5 }}>
            Floor plan is for illustrative purposes. Actual dimensions may vary. Contact the leasing office for precise measurements.
          </p>
        </div>

        {/* Right: Stats + Contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: ".25in" }}>
          {/* Stats */}
          <div style={{ background: "#1c2c44", padding: ".3in", color: "#fff" }}>
            <p style={{ fontSize: "7px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#d6b055" }}>Unit details</p>
            {[
              ["Bedrooms", f.BEDROOM_COUNT],
              ["Bathrooms", f.BATHROOM_COUNT],
              ["Square Feet", f.SQUARE_FEET],
              ["Starting Rent", f.RENT_AMOUNT],
              ["Available", f.AVAILABILITY_DATE],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.15)", padding: ".08in 0", fontSize: "9px" }}>
                <span style={{ color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".08em", fontSize: "7px" }}>{label}</span>
                <strong style={{ color: "#d6b055" }}>{value}</strong>
              </div>
            ))}
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div>
              <p className="kicker">Features included</p>
              <ul style={{ paddingLeft: ".15in", fontSize: "10px", lineHeight: 1.7, color: "#2c4263", marginTop: ".1in" }}>
                {features.map((feat) => <li key={feat}>{feat}</li>)}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div style={{ marginTop: "auto", borderTop: "2px solid #d6b055", paddingTop: ".2in" }}>
            <p className="kicker">Schedule a tour</p>
            <div className="tk-contact-row"><span>Phone</span><b>{f.LEASING_PHONE}</b></div>
            <div className="tk-contact-row"><span>Email</span><b>{f.LEASING_EMAIL}</b></div>
            <div className="tk-contact-row"><span>Apply</span><b>{f.APPLICATION_URL}</b></div>
            <div className="tk-contact-row"><span>Hours</span><b>{f.OFFICE_HOURS}</b></div>
          </div>

          <div className="tk-flyer-compliance">
            <p>Equal Housing Opportunity</p>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default function FloorPlanPage() {
  return (
    <TemplateEditor templateKey="floor-plan-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management floor plan template">
        <FloorPlanSheet />
      </main>
    </TemplateEditor>
  );
}
