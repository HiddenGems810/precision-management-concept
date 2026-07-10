"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  // Resident
  { key: "RESIDENT_NAME",       label: "Resident Name",       placeholder: "Alex Johnson",                  group: "Resident" },
  { key: "UNIT_NUMBER",         label: "Unit Number",         placeholder: "Unit 204",                      group: "Resident" },
  { key: "UNIT_TYPE",           label: "Unit Type",           placeholder: "2-Bedroom / 1-Bath",            group: "Resident" },
  { key: "MOVE_IN_DATE",        label: "Move-In Date",        placeholder: "August 1, 2025",                group: "Resident" },
  { key: "RENT_AMOUNT",         label: "Monthly Rent",        placeholder: "$1,150/month",                  group: "Resident" },
  // Property
  { key: "PROPERTY_NAME",       label: "Property Name",       placeholder: "Stonegate Apartments",               group: "Property" },
  { key: "PROPERTY_ADDRESS",    label: "Property Address",    placeholder: "4500 Stone Gate Dr, Memphis, TN 38128", group: "Property" },
  { key: "MANAGER_NAME",        label: "Manager Name",        placeholder: "Jordan Williams",               group: "Property" },
  // Contact
  { key: "LEASING_PHONE",       label: "Office Phone",        placeholder: "(404) 555-0192",                group: "Contact" },
  { key: "LEASING_EMAIL",       label: "Office Email",        placeholder: "leasing@stonegateapartments.com",    group: "Contact" },
  { key: "OFFICE_HOURS",        label: "Office Hours",        placeholder: "Mon–Fri 9am–5pm, Sat 10am–2pm", group: "Contact" },
  { key: "MAINTENANCE_CONTACT", label: "Maintenance Line",    placeholder: "(404) 555-0199",                group: "Contact" },
  { key: "RESIDENT_PORTAL_URL", label: "Resident Portal URL", placeholder: "resident.precisionmngmt.com",   group: "Contact" },
];

function Header({ label }: { label: string }) {
  return (
    <header className="print-header">
      <img src={logo} alt="Precision Management" />
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

function WelcomeLetter() {
  const f = useTemplateFields();
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <section className="pdf-page">
      <Header label="Move-in kit / welcome letter" />
      <div className="letterhead" style={{ marginTop: "0.45in" }}>
        <div className="tk-renewal-date"><span>{today}</span></div>
        <div className="tk-renewal-body">
          <p>Dear {f.RESIDENT_NAME},</p>
          <p><strong>Welcome to {f.PROPERTY_NAME}.</strong></p>
          <p>
            We are glad to have you as a resident. Our team is committed to clear communication, responsive maintenance,
            and a straightforward management experience. This packet gives you everything you need to settle in confidently.
          </p>
          <div className="notice-box">
            <p><strong>Your unit details</strong></p>
            <ul>
              <li><strong>Property:</strong> {f.PROPERTY_NAME}, {f.PROPERTY_ADDRESS}</li>
              <li><strong>Unit:</strong> {f.UNIT_NUMBER} — {f.UNIT_TYPE}</li>
              <li><strong>Move-in date:</strong> {f.MOVE_IN_DATE}</li>
              <li><strong>Monthly rent:</strong> {f.RENT_AMOUNT}</li>
              <li><strong>Resident portal:</strong> {f.RESIDENT_PORTAL_URL}</li>
            </ul>
          </div>
          <p>
            Inside this packet, you will find your move-in checklist, utilities setup guide, maintenance request process,
            resident portal instructions, and office contact card. Please keep this for reference.
          </p>
          <p>
            Sincerely,<br />
            <strong>{f.MANAGER_NAME}</strong><br />
            Property Manager, {f.PROPERTY_NAME}<br />
            {f.LEASING_PHONE} · {f.LEASING_EMAIL}
          </p>
        </div>
        <div className="support-strip">
          <b>Resident support</b>
          <span>Clear communication · Responsive maintenance · Simple next steps</span>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function MoveInChecklist() {
  const f = useTemplateFields();
  const sections = [
    {
      title: "Before move-in day",
      items: ["Confirm move-in date and time with leasing office", "Complete all lease documents and provide required signatures", "Arrange renters insurance (required)", "Schedule utilities connection (see utilities guide)", "Register on resident portal at " + f.RESIDENT_PORTAL_URL],
    },
    {
      title: "On move-in day",
      items: ["Pick up keys from leasing office during " + f.OFFICE_HOURS, "Complete move-in inspection form", "Document any existing damage with photos", "Test smoke detectors and HVAC", "Confirm trash/recycling schedule with office"],
    },
    {
      title: "First week",
      items: ["Submit any maintenance issues through " + f.RESIDENT_PORTAL_URL, "Update your address with USPS and relevant accounts", "Save leasing and maintenance contact numbers", "Review community rules in your lease"],
    },
  ];
  return (
    <section className="pdf-page">
      <Header label="Move-in kit / checklist" />
      <div className="intro">
        <p className="kicker">{f.PROPERTY_NAME} — {f.UNIT_NUMBER}</p>
        <h1>Move-In Checklist</h1>
        <p>Complete each section in order. Contact the office at {f.LEASING_PHONE} if you have questions at any step.</p>
      </div>
      {sections.map((sec) => (
        <div key={sec.title} className="tk-checklist-section">
          <p className="kicker">{sec.title}</p>
          <ul className="tk-checklist">
            {sec.items.map((item) => (
              <li key={item}><span className="tk-checkbox">☐</span> {item}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="support-strip">
        <b>{f.LEASING_PHONE}</b>
        <span>{f.LEASING_EMAIL} · {f.OFFICE_HOURS}</span>
      </div>
      <Footer />
    </section>
  );
}

function UtilitiesGuide() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page">
      <Header label="Move-in kit / utilities setup guide" />
      <div className="intro">
        <p className="kicker">{f.PROPERTY_NAME}</p>
        <h1>Utilities Setup Guide</h1>
        <p>Set up your utilities before or immediately after move-in. Contact the leasing office if you need local provider information.</p>
      </div>
      <div className="tk-utilities-grid">
        {[
          { name: "Electric", note: "Contact your local provider to establish service in your name before move-in." },
          { name: "Gas", note: "Contact your local gas provider if gas service is applicable to your unit." },
          { name: "Water / Sewer", note: "Included in rent at most Precision-managed properties. Confirm with your office." },
          { name: "Internet / Cable", note: "Resident-arranged. Ask the office for recommended providers in the area." },
          { name: "Trash / Recycling", note: "Included. Review pickup days with the leasing office on move-in day." },
          { name: "Renters Insurance", note: "Required. Obtain before or on move-in day. Minimum liability per your lease." },
        ].map((util) => (
          <div key={util.name} className="tk-utility-row">
            <strong>{util.name}</strong>
            <p>{util.note}</p>
          </div>
        ))}
      </div>
      <div className="support-strip">
        <b>Questions?</b>
        <span>{f.LEASING_PHONE} · {f.OFFICE_HOURS}</span>
      </div>
      <Footer />
    </section>
  );
}

function MaintenanceGuide() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page">
      <Header label="Move-in kit / maintenance request guide" />
      <div className="intro">
        <p className="kicker">{f.PROPERTY_NAME}</p>
        <h1>Maintenance Request Guide</h1>
        <p>Submitting a maintenance request is simple. Our team will respond within the timeframes below.</p>
      </div>
      <div className="tk-maintenance-options">
        <div className="tk-maintenance-option">
          <p className="kicker">Online (preferred)</p>
          <strong>Resident Portal</strong>
          <p>{f.RESIDENT_PORTAL_URL}</p>
          <p className="tk-small-note">Log in, select &ldquo;Submit Request&rdquo;, describe the issue, and attach a photo if possible.</p>
        </div>
        <div className="tk-maintenance-option">
          <p className="kicker">By phone</p>
          <strong>Maintenance Line</strong>
          <p>{f.MAINTENANCE_CONTACT}</p>
          <p className="tk-small-note">Available during office hours. For after-hours emergencies, call this number and select the emergency option.</p>
        </div>
      </div>
      <div className="notice-box" style={{ marginTop: "0.3in" }}>
        <p><strong>Response times</strong></p>
        <ul>
          <li><strong>Emergency (no heat, water leak, no entry):</strong> Within 24 hours</li>
          <li><strong>Urgent (appliance, plumbing, electrical):</strong> Within 48–72 hours</li>
          <li><strong>Routine (cosmetic, non-essential):</strong> Within 5–7 business days</li>
        </ul>
      </div>
      <Footer />
    </section>
  );
}

function OfficeContactCard() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page">
      <Header label="Move-in kit / office contact card" />
      <div className="intro">
        <p className="kicker">{f.PROPERTY_NAME} — important contacts</p>
        <h1>Keep this card handy.</h1>
        <p>Save these numbers. Our team is here to support you throughout your residency.</p>
      </div>
      <div className="tk-contact-card-grid">
        {[
          { role: "Leasing Office", phone: f.LEASING_PHONE, email: f.LEASING_EMAIL, hours: f.OFFICE_HOURS },
          { role: "Maintenance", phone: f.MAINTENANCE_CONTACT, email: f.RESIDENT_PORTAL_URL, hours: "24-hr emergency line" },
        ].map((c) => (
          <div key={c.role} className="tk-contact-card">
            <div className="tk-contact-card-header">{c.role}</div>
            <div className="tk-contact-row"><span>Phone</span><b>{c.phone}</b></div>
            <div className="tk-contact-row"><span>Portal / Email</span><b>{c.email}</b></div>
            <div className="tk-contact-row"><span>Hours</span><b>{c.hours}</b></div>
          </div>
        ))}
      </div>
      <div className="support-strip" style={{ marginTop: "0.4in" }}>
        <b>Resident portal: {f.RESIDENT_PORTAL_URL}</b>
        <span>Pay rent · Request maintenance · Review your lease · Contact support</span>
      </div>
      <Footer />
    </section>
  );
}

export default function MoveInKitPage() {
  return (
    <TemplateEditor templateKey="move-in-kit-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management move-in kit templates">
        <WelcomeLetter />
        <MoveInChecklist />
        <UtilitiesGuide />
        <MaintenanceGuide />
        <OfficeContactCard />
      </main>
    </TemplateEditor>
  );
}
