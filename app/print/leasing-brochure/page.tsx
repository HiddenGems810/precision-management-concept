"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";
import { PdfViewer } from "../../components/PdfViewer";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  { key: "PROPERTY_NAME",    label: "Property Name",      placeholder: "Stonegate Apartments",               group: "Property" },
  { key: "COVER_PHOTO",      label: "Cover Photo",        placeholder: "Upload photo...",               group: "Property", type: "image" },
  { key: "LOGO_THEME",       label: "Logo Theme",         placeholder: "Light (for dark bg)",           group: "Property", type: "select", options: ["Light (for dark bg)", "Dark (for light bg)"] },
  { key: "PROPERTY_ADDRESS", label: "Property Address",   placeholder: "4500 Stone Gate Dr, Memphis, TN 38128", group: "Property" },
  { key: "AMENITIES",        label: "Key Amenities",      placeholder: "In-unit W/D, Central A/C, Covered Parking, Pool", group: "Property", type: "textarea" },
  // Pricing
  { key: "RENT_STUDIO",      label: "Studio Rent",        placeholder: "Starting at $850/mo",           group: "Pricing & Availability" },
  { key: "SQFT_STUDIO",      label: "Studio Sq Ft",       placeholder: "450 sq ft",                     group: "Pricing & Availability" },
  { key: "RENT_1BR",         label: "1BR Rent",           placeholder: "Starting at $950/mo",           group: "Pricing & Availability" },
  { key: "SQFT_1BR",         label: "1BR Sq Ft",          placeholder: "625 sq ft",                     group: "Pricing & Availability" },
  { key: "RENT_2BR",         label: "2BR Rent",           placeholder: "Starting at $1,150/mo",         group: "Pricing & Availability" },
  { key: "SQFT_2BR",         label: "2BR Sq Ft",          placeholder: "875 sq ft",                     group: "Pricing & Availability" },
  { key: "RENT_3BR",         label: "3BR Rent",           placeholder: "Starting at $1,375/mo",         group: "Pricing & Availability" },
  { key: "SQFT_3BR",         label: "3BR Sq Ft",          placeholder: "1,100 sq ft",                   group: "Pricing & Availability" },
  { key: "AVAILABILITY_DATE",label: "Next Available",     placeholder: "August 1, 2025",                group: "Pricing & Availability" },
  // Contact
  { key: "LEASING_PHONE",    label: "Leasing Phone",      placeholder: "(404) 555-0192",                group: "Contact" },
  { key: "LEASING_EMAIL",    label: "Leasing Email",      placeholder: "leasing@stonegateapartments.com",    group: "Contact" },
  { key: "APPLICATION_URL",  label: "Apply URL",          placeholder: "apply.precisionmngmt.com/stonegate", group: "Contact" },
  { key: "OFFICE_HOURS",     label: "Office Hours",       placeholder: "Mon–Fri 9am–5pm, Sat 10am–2pm", group: "Contact" },
];

function Header({ label, logoTheme = "Light (for dark bg)" }: { label: string, logoTheme?: string }) {
  const currentLogo = logoTheme === "Dark (for light bg)" 
    ? "/assets/exports/logo-system/precision-management-official-logo.svg" 
    : "/assets/exports/logo-system/reversed-logo.svg";

  return (
    <header className="print-header">
      <img src={currentLogo} alt="Precision Management" />
      <span style={{ color: logoTheme === "Dark (for light bg)" ? "inherit" : "inherit" }}>PRECISION MANAGEMENT</span>
      <b style={{ color: logoTheme === "Dark (for light bg)" ? "inherit" : "inherit" }}>{label}</b>
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

function BrochureCover() {
  const f = useTemplateFields();
  const hasBg = f.COVER_PHOTO?.startsWith("data:");
  const isPdf = hasBg && f.COVER_PHOTO.startsWith("data:application/pdf");
  return (
    <section className="pdf-page tk-brochure-cover" style={{ position: "relative", ...(hasBg && !isPdf ? { backgroundImage: `url(${f.COVER_PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { overflow: "hidden" }) }}>
      {isPdf && <PdfViewer dataUrl={f.COVER_PHOTO} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />}
      {hasBg && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28, 44, 68, 0.95), rgba(28, 44, 68, 0.4))", zIndex: 0 }} />}
      
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Header label="Leasing brochure / cover" logoTheme={f.LOGO_THEME} />
        <div className="tk-brochure-hero">
          <p className="kicker">Property overview</p>
          <h1>{f.PROPERTY_NAME}</h1>
          <p>{f.PROPERTY_ADDRESS}</p>
          <div className="tk-brochure-tagline">Professionally managed. Clear communication. Simple leasing process.</div>
        </div>
        <div className="tk-brochure-callouts">
          <div><strong>{f.RENT_1BR}</strong><span>Starting rent</span></div>
          <div><strong>{f.AVAILABILITY_DATE}</strong><span>Next available</span></div>
          <div><strong>{f.OFFICE_HOURS}</strong><span>Office hours</span></div>
        </div>
        <div className="tk-brochure-contact-strip">
          <span>{f.LEASING_PHONE}</span>
          <span>{f.LEASING_EMAIL}</span>
          <span>{f.APPLICATION_URL}</span>
        </div>
      </div>
      <div style={{ zIndex: 1 }}>
        <Footer />
      </div>
    </section>
  );
}

function PropertyOverview() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page">
      <Header label="Leasing brochure / property overview" />
      <div className="intro">
        <p className="kicker">About this property</p>
        <h1>{f.PROPERTY_NAME}</h1>
        <p>A professionally managed community offering quality housing, responsive maintenance, and clear resident communication. Located at {f.PROPERTY_ADDRESS}.</p>
      </div>
      <div className="tk-overview-grid">
        <div className="tk-overview-block">
          <p className="kicker">Management</p>
          <h3>Precision Management</h3>
          <p>Professional property management with hands-on oversight, compliance expertise, and resident-first service across conventional, student, and affordable housing.</p>
        </div>
        <div className="tk-overview-block">
          <p className="kicker">Availability</p>
          <h3>Current openings</h3>
          <p>Units available from {f.AVAILABILITY_DATE}. Contact the leasing office for current availability and waitlist options. Early application is encouraged.</p>
        </div>
        <div className="tk-overview-block">
          <p className="kicker">Amenities</p>
          <h3>Community features</h3>
          <p>{f.AMENITIES}</p>
        </div>
        <div className="tk-overview-block">
          <p className="kicker">Application process</p>
          <h3>Simple. Clear. Online.</h3>
          <p>Apply at {f.APPLICATION_URL} or visit the leasing office during {f.OFFICE_HOURS}. Decisions typically within 1–3 business days.</p>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function UnitComparisonSheet() {
  const f = useTemplateFields();
  const units = [
    { type: "Studio",          sqft: f.SQFT_STUDIO, rent: f.RENT_STUDIO, bath: "1" },
    { type: "1-Bedroom / 1-Bath", sqft: f.SQFT_1BR, rent: f.RENT_1BR, bath: "1" },
    { type: "2-Bedroom / 1-Bath", sqft: f.SQFT_2BR, rent: f.RENT_2BR, bath: "1" },
    { type: "2-Bedroom / 2-Bath", sqft: f.SQFT_2BR, rent: f.RENT_2BR, bath: "2" },
    { type: "3-Bedroom / 2-Bath", sqft: f.SQFT_3BR, rent: f.RENT_3BR, bath: "2" },
  ];
  const today = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return (
    <section className="pdf-page">
      <Header label="Leasing brochure / unit comparison" />
      <div className="intro">
        <p className="kicker">Available floor plans</p>
        <h1>Unit comparison</h1>
        <p>All pricing and availability current as of {today}. Contact the leasing office to confirm current rates and unit status.</p>
      </div>
      <table className="tk-comparison-table">
        <thead>
          <tr><th>Unit type</th><th>Sq ft</th><th>Baths</th><th>Monthly rent</th><th>Available</th></tr>
        </thead>
        <tbody>
          {units.map((u) => (
            <tr key={u.type}>
              <td>{u.type}</td><td>{u.sqft}</td><td>{u.bath}</td><td>{u.rent}</td><td>{f.AVAILABILITY_DATE}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="tk-comparison-note">
        <p>Prices and availability are subject to change without notice. Contact {f.LEASING_PHONE} or {f.LEASING_EMAIL} for current information.</p>
        <p>Equal Housing Opportunity — This community does not discriminate on the basis of race, color, national origin, religion, sex, familial status, or disability.</p>
      </div>
      <Footer />
    </section>
  );
}

function ApplicationProcessSheet() {
  const f = useTemplateFields();
  const steps = [
    { n: "01", title: "Submit your application", body: `Complete the online application at ${f.APPLICATION_URL} or pick up a paper application at the leasing office during ${f.OFFICE_HOURS}.` },
    { n: "02", title: "Application review", body: `Our team reviews your application within 1–3 business days. You will be notified by phone or email at ${f.LEASING_EMAIL}.` },
    { n: "03", title: "Approval and lease signing", body: "Upon approval, we will schedule a lease signing appointment. Review all terms carefully and ask any questions before signing." },
    { n: "04", title: "Move-in readiness", body: "We will confirm your move-in date, provide a move-in checklist, and schedule a unit walkthrough before your first day." },
    { n: "05", title: "Keys and welcome", body: "Collect your keys on move-in day, complete the condition report, and receive your resident welcome kit with all contact information." },
  ];
  return (
    <section className="pdf-page">
      <Header label="Leasing brochure / application process" />
      <div className="intro">
        <p className="kicker">How to apply</p>
        <h1>A straightforward leasing process.</h1>
        <p>We designed our application process to be clear, respectful of your time, and easy to navigate.</p>
      </div>
      <div className="tk-process-steps">
        {steps.map((s) => (
          <div key={s.n} className="tk-process-step">
            <span className="tk-step-num">{s.n}</span>
            <div><h3>{s.title}</h3><p>{s.body}</p></div>
          </div>
        ))}
      </div>
      <div className="owner-cta" style={{ marginTop: "0.4in" }}>
        <div><p className="kicker">Ready to apply?</p><h2>Start your application today.</h2></div>
        <div><b>{f.LEASING_PHONE}</b><span>{f.LEASING_EMAIL}</span><span>{f.APPLICATION_URL}</span></div>
      </div>
      <Footer />
    </section>
  );
}

export default function LeasingBrochurePage() {
  return (
    <TemplateEditor templateKey="leasing-brochure-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management leasing brochure templates">
        <BrochureCover />
        <PropertyOverview />
        <UnitComparisonSheet />
        <ApplicationProcessSheet />
      </main>
    </TemplateEditor>
  );
}
