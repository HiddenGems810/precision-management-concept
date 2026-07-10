"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  // Resident
  { key: "RESIDENT_NAME",     label: "Resident Name",      placeholder: "Alex Johnson",                  group: "Resident" },
  { key: "UNIT_NUMBER",       label: "Unit Number",        placeholder: "Unit 204",                      group: "Resident" },
  { key: "LEASE_END_DATE",    label: "Current Lease End",  placeholder: "September 30, 2025",            group: "Resident" },
  // Renewal Terms
  { key: "RENEWAL_START",     label: "New Lease Start",    placeholder: "October 1, 2025",               group: "Renewal Terms" },
  { key: "RENEWAL_END",       label: "New Lease End",      placeholder: "September 30, 2026",            group: "Renewal Terms" },
  { key: "RENT_AMOUNT",       label: "New Monthly Rent",   placeholder: "$1,150/month",                  group: "Renewal Terms" },
  { key: "RENEWAL_DEADLINE",  label: "Response Deadline",  placeholder: "August 15, 2025",               group: "Renewal Terms" },
  // Property
  { key: "PROPERTY_NAME",     label: "Property Name",      placeholder: "Stonegate Apartments",               group: "Property" },
  { key: "MANAGER_NAME",      label: "Manager Name",       placeholder: "Jordan Williams",               group: "Property" },
  { key: "LEASING_PHONE",     label: "Leasing Phone",      placeholder: "(404) 555-0192",                group: "Property" },
  { key: "LEASING_EMAIL",     label: "Leasing Email",      placeholder: "leasing@stonegateapartments.com",    group: "Property" },
  { key: "OFFICE_HOURS",      label: "Office Hours",       placeholder: "Mon–Fri 9am–5pm, Sat 10am–2pm", group: "Property" },
  { key: "RESIDENT_PORTAL_URL", label: "Resident Portal",  placeholder: "resident.precisionmngmt.com",   group: "Property" },
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

function RenewalLetter() {
  const f = useTemplateFields();
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <section className="pdf-page">
      <Header label="Lease renewal / renewal letter template" />
      <div className="letterhead" style={{ marginTop: "0.45in" }}>
        <div className="tk-renewal-date"><span>{today}</span></div>
        <div className="tk-renewal-address">
          <p>Dear {f.RESIDENT_NAME},</p>
          <p><strong>Re: Lease Renewal — {f.PROPERTY_NAME}, {f.UNIT_NUMBER}</strong></p>
        </div>
        <div className="tk-renewal-body">
          <p>
            Your current lease at {f.PROPERTY_NAME} is scheduled to expire on <strong>{f.LEASE_END_DATE}</strong>.
            We appreciate your residency and would like to offer you the opportunity to renew your lease.
          </p>
          <div className="notice-box">
            <p><strong>Renewal offer summary</strong></p>
            <ul>
              <li><strong>New lease term:</strong> {f.RENEWAL_START} through {f.RENEWAL_END}</li>
              <li><strong>Monthly rent:</strong> {f.RENT_AMOUNT}</li>
              <li><strong>Response deadline:</strong> {f.RENEWAL_DEADLINE}</li>
              <li><strong>How to renew:</strong> Contact the leasing office or complete the renewal form through {f.RESIDENT_PORTAL_URL}</li>
            </ul>
          </div>
          <p>
            If you have questions about your renewal terms, the leasing office is available to assist you.
            We want to make this process as straightforward as possible.
          </p>
          <p>
            Please respond by <strong>{f.RENEWAL_DEADLINE}</strong> to confirm your renewal or to discuss your options.
            If we do not hear from you by that date, we will follow up to confirm your plans.
          </p>
          <p>Thank you for your continued residency. We value your tenancy and look forward to hearing from you.</p>
          <p>
            Sincerely,<br />
            <strong>{f.MANAGER_NAME}</strong><br />
            Property Manager, {f.PROPERTY_NAME}<br />
            {f.LEASING_PHONE} · {f.LEASING_EMAIL}<br />
            {f.OFFICE_HOURS}
          </p>
        </div>
        <div className="support-strip">
          <b>Resident support</b>
          <span>Clear communication · Service expectations · Simple next steps</span>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function RenewalFAQ() {
  const f = useTemplateFields();
  const faqs = [
    { q: "When is my lease renewal deadline?", a: `Your renewal offer expires on ${f.RENEWAL_DEADLINE}. Please contact the leasing office or respond through the resident portal before this date.` },
    { q: "How do I renew my lease?", a: `You can renew online at ${f.RESIDENT_PORTAL_URL}, by calling ${f.LEASING_PHONE}, or by visiting the office during ${f.OFFICE_HOURS}.` },
    { q: "Can I change my lease term?", a: "Contact the leasing office to discuss available lease term options. Month-to-month options may be available depending on current availability." },
    { q: "Why did my rent change?", a: `Rental adjustments reflect current market conditions and operating costs. Contact ${f.LEASING_EMAIL} to discuss your renewal rate.` },
    { q: "What if I want to move out?", a: "Please notify the leasing office in writing according to your lease notice requirements. We will provide a move-out checklist and timeline." },
    { q: "Who do I contact with renewal questions?", a: `${f.MANAGER_NAME} is available at ${f.LEASING_PHONE} or ${f.LEASING_EMAIL} during ${f.OFFICE_HOURS}.` },
  ];
  return (
    <section className="pdf-page">
      <Header label="Lease renewal / FAQ sheet" />
      <div className="intro">
        <p className="kicker">Renewal process</p>
        <h1>Your renewal questions, answered.</h1>
        <p>We want the renewal process to be transparent and simple. Here are answers to the most common questions we receive.</p>
      </div>
      <div className="tk-faq-grid">
        {faqs.map((faq) => (
          <div key={faq.q} className="tk-faq-item">
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="owner-cta" style={{ marginTop: "0.35in" }}>
        <div>
          <p className="kicker">Still have questions?</p>
          <h2>We&apos;re here to help.</h2>
        </div>
        <div>
          <b>{f.LEASING_PHONE}</b>
          <span>{f.LEASING_EMAIL}</span>
          <span>{f.OFFICE_HOURS}</span>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function RenewalDoorNotice() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page tk-flyer">
      <Header label="Lease renewal / door notice template" />
      <div className="tk-door-notice">
        <div className="tk-door-badge">Renewal Notice</div>
        <h1>Your lease is coming up for renewal.</h1>
        <p className="tk-door-body">
          We wanted to make sure you received this notice about your upcoming lease expiration.
          Your lease at <strong>{f.PROPERTY_NAME}</strong> is scheduled to expire on <strong>{f.LEASE_END_DATE}</strong>.
        </p>
        <div className="notice-box">
          <p><strong>To renew your lease:</strong></p>
          <ul>
            <li>Visit: <strong>{f.RESIDENT_PORTAL_URL}</strong></li>
            <li>Call: <strong>{f.LEASING_PHONE}</strong></li>
            <li>Email: <strong>{f.LEASING_EMAIL}</strong></li>
            <li>Stop by during: <strong>{f.OFFICE_HOURS}</strong></li>
          </ul>
          <p><strong>Please respond by {f.RENEWAL_DEADLINE}</strong></p>
        </div>
        <div className="support-strip">
          <b>Precision Management</b>
          <span>Clear communication · Resident support · Professionally managed</span>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function RetentionOffer() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page">
      <Header label="Lease renewal / resident retention offer" />
      <div className="intro">
        <p className="kicker">Special renewal offer — {f.PROPERTY_NAME}</p>
        <h1>We appreciate your residency.</h1>
        <p>As a valued resident, we are pleased to offer the following renewal terms as a thank-you for your continued tenancy.</p>
      </div>
      <div className="tk-retention-grid">
        <div className="tk-retention-highlight">
          <p className="kicker">Your renewal rate</p>
          <div className="tk-retention-rate">{f.RENT_AMOUNT}<small>/month</small></div>
          <p>Effective {f.RENEWAL_START} through {f.RENEWAL_END}</p>
        </div>
        <div className="tk-retention-details">
          <p className="kicker">What&apos;s included</p>
          <ul>
            <li>All current amenities and services continue</li>
            <li>Same unit — no relocation required</li>
            <li>Continued access to {f.RESIDENT_PORTAL_URL}</li>
            <li>Direct support from {f.MANAGER_NAME} at {f.LEASING_PHONE}</li>
          </ul>
          <p className="kicker" style={{ marginTop: "0.25in" }}>Respond by</p>
          <div className="tk-retention-deadline">{f.RENEWAL_DEADLINE}</div>
        </div>
      </div>
      <div className="owner-cta" style={{ marginTop: "0.4in" }}>
        <div>
          <p className="kicker">Accept your renewal offer</p>
          <h2>Renew online or contact your leasing office.</h2>
        </div>
        <div>
          <b>{f.RESIDENT_PORTAL_URL}</b>
          <span>{f.LEASING_PHONE} · {f.LEASING_EMAIL}</span>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default function LeaseRenewalPage() {
  return (
    <TemplateEditor templateKey="lease-renewal-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management lease renewal templates">
        <RenewalLetter />
        <RenewalFAQ />
        <RenewalDoorNotice />
        <RetentionOffer />
      </main>
    </TemplateEditor>
  );
}
