"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";

const logoDark = "/assets/exports/logo-system/precision-management-official-logo.svg";
const logoLight = "/assets/exports/logo-system/precision-management-official-logo-reversed.svg";

const FIELDS: TemplateField[] = [
  { key: "PROPERTY_NAME", label: "Property Name", placeholder: "Stonegate Apartments", group: "Cover" },
  { key: "REPORT_MONTH", label: "Report Month", placeholder: "June 2026", group: "Cover" },
  { key: "COVER_PHOTO", label: "Cover Photo", placeholder: "Upload photo...", group: "Cover", type: "image" },
  { key: "LOGO_THEME", label: "Logo Theme", placeholder: "Light (for dark bg)", group: "Cover", type: "select", options: ["Light (for dark bg)", "Dark (for light bg)"] },
  
  { key: "MANAGER_NAME", label: "Manager Name", placeholder: "Sharnice Abner", group: "Property Info" },
  { key: "TELEPHONE", label: "Telephone", placeholder: "901-506-0255", group: "Property Info" },
  { key: "EMAIL", label: "Email", placeholder: "cm.stonegate@precisionmngmt.com", group: "Property Info" },
  { key: "ADDRESS", label: "Address", placeholder: "4500 Stonegate Dr.\nMemphis, TN 38128", group: "Property Info", type: "textarea" },
  
  { key: "TOTAL_UNITS", label: "Total Units", placeholder: "208", group: "Unit Mix" },
  { key: "MIX_1X1", label: "1x1 Count", placeholder: "72", group: "Unit Mix" },
  { key: "MIX_2X2", label: "2x2 Count", placeholder: "112", group: "Unit Mix" },
  { key: "MIX_3X3", label: "3x3 Count", placeholder: "24", group: "Unit Mix" },
  
  { key: "LEASING_TEXT", label: "Leasing & Marketing Overview", placeholder: "The property had 114 inquiries in June which included online inquiries, phone calls, and walk-ins.\n\nThere were 5 applicants and 2 approvals. There were 0 move ins and 9 move outs. This resulted in the property closing at 54.33% occupancy and 56.25% preleased. Our goal is to reach the property at 90% occupied or higher and decrease delinquency to 5% or less.", group: "Metrics", type: "textarea" },
  
  { key: "REVENUE_TEXT", label: "Revenue & NOI Overview", placeholder: "Total revenue was $82,078.38. Total expenses totaled $68,907.76 resulting in a total NOI of $15,746.24. Focus will remain on maximizing rent revenue as well as creating and collecting additional other income, decreasing overall expenses as well as inputting all invoices within the period they are owed.", group: "Metrics", type: "textarea" },
  
  { key: "DELINQUENCY_TEXT", label: "Delinquency Overview", placeholder: "Delinquent rent for the month was $40,433.27 in which $30,292.42 was affiliated with evictions/un-collectible.", group: "Metrics", type: "textarea" },
  
  { key: "MARKETING_TEXT", label: "Marketing Strategy", placeholder: "We are advertising the resident referral incentive to current residents. There is also marketing and advertising on Facebook market place and groups. Current special of waive application fee, and $500 off first full month of rent.", group: "Metrics", type: "textarea" },
  
  { key: "RENEWALS_TEXT", label: "Renewals Overview", placeholder: "There are 2 month-to-month leases and 0 expiring leases and 5 renewed. All residents with leases expiring thru the next 90 days will receive renewal notices as well as being emailed. We are currently not increasing at renewals. We will renew at the same rate temporarily. Month to month fees have been added to residents accounts.", group: "Operations", type: "textarea" },
  
  { key: "MAINTENANCE_TEXT", label: "Maintenance & Capital", placeholder: "Maintenance has completed unit 1804. It is pending flooring bid and clean. AHS has completed unit 1704. They have turned in keys for the remaining units and are pending a walk through.", group: "Operations", type: "textarea" },
  
  { key: "STAFFING_TEXT", label: "Staffing Overview", placeholder: "The property is currently fully staffed which consists of a full-time senior community manager, community manager, and 2 maintenance technicians.", group: "Operations", type: "textarea" }
];

function Header({ label, logoTheme = "Light (for dark bg)" }: { label: string, logoTheme?: string }) {
  const currentLogo = logoTheme === "Dark (for light bg)" ? logoDark : logoLight;
  return (
    <header className="print-header">
      <img src={currentLogo} alt="Precision Management" />
      <span style={{ color: "inherit" }}>PRECISION MANAGEMENT</span>
      <b style={{ color: "inherit" }}>{label}</b>
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

function Page1() {
  const f = useTemplateFields();
  const hasBg = f.COVER_PHOTO?.startsWith("data:");
  
  return (
    <section className="pdf-page tk-exec-cover" style={{ position: "relative", ...(hasBg ? { backgroundImage: `url(${f.COVER_PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { overflow: "hidden" }) }}>
      {hasBg && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28, 44, 68, 0.98), rgba(28, 44, 68, 0.6))", zIndex: 0 }} />}
      
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Header label="Executive Report / Property Overview" logoTheme={f.LOGO_THEME} />
        
        <div className="tk-exec-hero">
          <p className="kicker">Executive Summary • {f.REPORT_MONTH}</p>
          <h1>{f.PROPERTY_NAME}</h1>
          <p>{f.ADDRESS}</p>
        </div>

        <div className="tk-exec-metrics">
          <div><strong>{f.TOTAL_UNITS}</strong><span>Total Units</span></div>
          <div><strong>{f.MIX_1X1}</strong><span>1x1 Units</span></div>
          <div><strong>{f.MIX_2X2}</strong><span>2x2 Units</span></div>
          <div><strong>{f.MIX_3X3}</strong><span>3x3 Units</span></div>
        </div>

        <div className="tk-exec-contact">
          <span>{f.MANAGER_NAME}</span>
          <span>{f.TELEPHONE}</span>
          <span>{f.EMAIL}</span>
        </div>
      </div>

      <div style={{ zIndex: 1 }}>
        <Footer />
      </div>
    </section>
  );
}

function Page2() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page">
      <Header label="Executive Report / Financial & Marketing" logoTheme="Dark (for light bg)" />
      
      <div className="intro">
        <p className="kicker">Month in Review</p>
        <h1>Financial &amp; Marketing</h1>
        <p>Comprehensive breakdown of revenue, delinquency, and marketing initiatives for {f.REPORT_MONTH}.</p>
      </div>

      <div className="tk-exec-grid">
        <div className="tk-exec-block">
          <p className="kicker">Leasing &amp; Marketing</p>
          <h3>Monthly Inquiries &amp; Goals</h3>
          <p>{f.LEASING_TEXT}</p>
        </div>
        
        <div className="tk-exec-block">
          <p className="kicker">Revenue / NOI</p>
          <h3>Financial Performance</h3>
          <p>{f.REVENUE_TEXT}</p>
        </div>

        <div className="tk-exec-block">
          <p className="kicker">Delinquency</p>
          <h3>Collection Status</h3>
          <p>{f.DELINQUENCY_TEXT}</p>
        </div>

        <div className="tk-exec-block">
          <p className="kicker">Marketing Strategy</p>
          <h3>Active Campaigns</h3>
          <p>{f.MARKETING_TEXT}</p>
        </div>
      </div>

      <Footer />
    </section>
  );
}

function Page3() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page">
      <Header label="Executive Report / Operations & Staffing" logoTheme="Dark (for light bg)" />
      
      <div className="intro">
        <p className="kicker">Month in Review</p>
        <h1>Operations &amp; Staffing</h1>
        <p>Overview of property operations, maintenance requests, capital projects, and team updates.</p>
      </div>

      <div className="tk-exec-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="tk-exec-block">
          <p className="kicker">Renewals</p>
          <h3>Retention &amp; Leases</h3>
          <p>{f.RENEWALS_TEXT}</p>
        </div>

        <div className="tk-exec-block">
          <p className="kicker">Maintenance</p>
          <h3>Capital Projects</h3>
          <p>{f.MAINTENANCE_TEXT}</p>
        </div>

        <div className="tk-exec-block">
          <p className="kicker">Staffing</p>
          <h3>Team Updates</h3>
          <p>{f.STAFFING_TEXT}</p>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default function ExecutiveReportTemplate() {
  return (
    <TemplateEditor templateKey="executive-report" fields={FIELDS}>
      <div className="print-document">
        <Page1 />
        <Page2 />
        <Page3 />
      </div>
    </TemplateEditor>
  );
}
