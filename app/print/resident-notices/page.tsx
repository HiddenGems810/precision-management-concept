"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  { key: "PROPERTY_NAME",    label: "Property Name",       placeholder: "Stonegate Apartments",              group: "Property" },
  { key: "PROPERTY_ADDRESS", label: "Property Address",    placeholder: "4500 Stone Gate Dr, Memphis, TN 38128", group: "Property" },
  { key: "MANAGER_NAME",     label: "Manager Name",        placeholder: "Jordan Williams",              group: "Property" },
  { key: "LEASING_PHONE",    label: "Office Phone",        placeholder: "(404) 555-0192",               group: "Property" },
  { key: "LEASING_EMAIL",    label: "Office Email",        placeholder: "leasing@stonegateapartments.com",   group: "Property" },
  { key: "OFFICE_HOURS",     label: "Office Hours",        placeholder: "Mon–Fri 9am–5pm, Sat 10am–2pm", group: "Property" },
  { key: "RESIDENT_PORTAL_URL", label: "Resident Portal",  placeholder: "resident.precisionmngmt.com",  group: "Property" },
  // Notice-specific
  { key: "NOTICE_DATE",      label: "Notice Date",         placeholder: "August 1, 2025",               group: "Notice Details" },
  { key: "EFFECTIVE_DATE",   label: "Effective / Entry Date", placeholder: "August 8, 2025",            group: "Notice Details" },
  { key: "RESPONSE_DEADLINE",label: "Response / Deadline", placeholder: "August 6, 2025",              group: "Notice Details" },
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

function NoticeTemplate({
  label, kicker, title, subject, intro, bullets, closing, type = "standard",
}: {
  label: string; kicker: string; title: string; subject: string; intro: string;
  bullets: string[]; closing: string; type?: "standard" | "emergency";
}) {
  const f = useTemplateFields();
  return (
    <section className={`pdf-page${type === "emergency" ? " resident" : ""}`}>
      <Header label={label} />
      <div className="notice-title">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>Prepared for clear communication, resident support, and a transparent management process.</p>
      </div>
      <div className="notice-box">
        <p><strong>Subject:</strong> {subject}</p>
        <p>Dear Resident,</p>
        <p>{intro}</p>
        <ul>{bullets.map((b) => <li key={b}>{b}</li>)}</ul>
      </div>
      <p style={{ marginTop: "0.2in" }}>{closing}</p>
      <p style={{ marginTop: "0.2in" }}>
        If you have questions, please contact the leasing office at <strong>{f.LEASING_PHONE}</strong> or <strong>{f.LEASING_EMAIL}</strong>.<br />
        Office hours: {f.OFFICE_HOURS}.
      </p>
      <p>
        Sincerely,<br />
        <strong>{f.MANAGER_NAME}</strong><br />
        Property Manager, {f.PROPERTY_NAME}
      </p>
      <div className="support-strip">
        <b>Resident support</b>
        <span>Clear communication · Professionally managed · {f.PROPERTY_NAME}</span>
      </div>
      <Footer />
    </section>
  );
}

function MaintenanceNotice() {
  const f = useTemplateFields();
  return (
    <NoticeTemplate
      label="Resident notices / maintenance notice"
      kicker={`${f.PROPERTY_NAME} — resident communication`}
      title="Scheduled Maintenance Notice"
      subject={`Scheduled Maintenance — ${f.PROPERTY_NAME} — ${f.EFFECTIVE_DATE}`}
      intro={`We are writing to inform you of scheduled maintenance that will affect your community on ${f.EFFECTIVE_DATE}. We appreciate your patience and cooperation during this time.`}
      bullets={[
        `Maintenance date: ${f.EFFECTIVE_DATE}`,
        "Estimated duration: [Insert estimated time]",
        "Areas affected: [Insert scope — building, units, common area]",
        "Services affected: [e.g., hot water, parking, elevator — specify if applicable]",
      ]}
      closing="We will make every effort to minimize disruption and complete the work as efficiently as possible."
    />
  );
}

function InspectionNotice() {
  const f = useTemplateFields();
  return (
    <NoticeTemplate
      label="Resident notices / inspection notice"
      kicker={`${f.PROPERTY_NAME} — resident communication`}
      title="Annual Unit Inspection Notice"
      subject={`Unit Inspection Notice — ${f.EFFECTIVE_DATE}`}
      intro={`As part of our routine property management process, we will be conducting unit inspections at ${f.PROPERTY_NAME}. Your cooperation is appreciated.`}
      bullets={[
        `Inspection date: ${f.EFFECTIVE_DATE}`,
        "Inspection window: [Insert time window — e.g., 10:00 AM – 3:00 PM]",
        "You are not required to be home. Staff will use the master key with appropriate notice as required by your lease.",
        "Areas reviewed: general unit condition, smoke detectors, HVAC filters, plumbing",
      ]}
      closing={`If you have concerns about the inspection date or need to schedule an alternative time, please contact the office before ${f.RESPONSE_DEADLINE}.`}
    />
  );
}

function CommunityUpdate() {
  const f = useTemplateFields();
  return (
    <NoticeTemplate
      label="Resident notices / community update"
      kicker={`${f.PROPERTY_NAME} — community update`}
      title="Community Update"
      subject={`Community Update — ${f.PROPERTY_NAME} — ${f.NOTICE_DATE}`}
      intro={`We have an update to share with our residents at ${f.PROPERTY_NAME}. Please review the information below.`}
      bullets={[
        "[Describe update — new amenity, policy clarification, schedule change, etc.]",
        "[Effective date or relevant timeline]",
        "[Any action required by resident]",
        `Contact the office with questions at ${f.LEASING_PHONE}`,
      ]}
      closing={`Thank you for being a valued resident at ${f.PROPERTY_NAME}. We appreciate your cooperation.`}
    />
  );
}

function PaymentReminder() {
  const f = useTemplateFields();
  return (
    <NoticeTemplate
      label="Resident notices / payment reminder"
      kicker={`${f.PROPERTY_NAME} — resident communication`}
      title="Rent Payment Reminder"
      subject={`Rent Payment Reminder — Due ${f.RESPONSE_DEADLINE}`}
      intro={`This is a friendly reminder that rent is due on the 1st of each month. If you have not yet submitted your payment, please do so before ${f.RESPONSE_DEADLINE} to avoid a late fee.`}
      bullets={[
        `Pay online: ${f.RESIDENT_PORTAL_URL}`,
        `Pay by phone: ${f.LEASING_PHONE}`,
        `Pay in person at the leasing office during ${f.OFFICE_HOURS}`,
        "Late payments are subject to fees per your lease agreement",
      ]}
      closing="If you are experiencing difficulty with payment, please contact the leasing office to discuss your options before the due date."
    />
  );
}

function EmergencyUpdate() {
  const f = useTemplateFields();
  return (
    <NoticeTemplate
      type="emergency"
      label="Resident notices / emergency update"
      kicker={`${f.PROPERTY_NAME} — urgent notice`}
      title="Emergency Maintenance Update"
      subject={`Emergency Maintenance — ${f.EFFECTIVE_DATE}`}
      intro={`We are contacting all residents regarding an emergency maintenance situation at ${f.PROPERTY_NAME}. Please read this notice carefully.`}
      bullets={[
        "[Describe emergency — water main, power, HVAC, elevator, etc.]",
        `Estimated resolution: ${f.EFFECTIVE_DATE}`,
        "Staff is on-site and working to resolve the issue",
        `If you have an immediate concern, call ${f.LEASING_PHONE}`,
      ]}
      closing="We apologize for the inconvenience and will provide updates as information becomes available."
    />
  );
}

function PortalAnnouncement() {
  const f = useTemplateFields();
  return (
    <NoticeTemplate
      label="Resident notices / portal announcement"
      kicker={`${f.PROPERTY_NAME} — resident portal`}
      title="Resident Portal — Quick Reference"
      subject="Resident Portal Access & Features"
      intro={`The ${f.PROPERTY_NAME} resident portal is your central hub for managing your tenancy online. Here is what you can do.`}
      bullets={[
        "Pay rent and view payment history",
        "Submit and track maintenance requests",
        "View and download your lease documents",
        "Update your contact information",
        "Communicate with the management office",
      ]}
      closing={`Access your portal at ${f.RESIDENT_PORTAL_URL}. Contact the office at ${f.LEASING_PHONE} if you need help setting up your account.`}
    />
  );
}

export default function ResidentNoticesPage() {
  return (
    <TemplateEditor templateKey="resident-notices-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management resident notice templates">
        <MaintenanceNotice />
        <InspectionNotice />
        <CommunityUpdate />
        <PaymentReminder />
        <EmergencyUpdate />
        <PortalAnnouncement />
      </main>
    </TemplateEditor>
  );
}
