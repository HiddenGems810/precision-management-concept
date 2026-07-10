"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  { key: "PROPERTY_NAME", label: "Property Name", placeholder: "Stonegate Apartments", group: "Cover" },
  { key: "REPORT_MONTH", label: "Report Month", placeholder: "June 2026", group: "Cover" },
  { key: "COVER_PHOTO", label: "Cover Photo", placeholder: "Upload photo...", group: "Cover", type: "image" },
  
  { key: "MANAGER_NAME", label: "Manager Name", placeholder: "Sharnice Abner", group: "Property Info" },
  { key: "TELEPHONE", label: "Telephone", placeholder: "901-506-0255", group: "Property Info" },
  { key: "EMAIL", label: "Email", placeholder: "cm.stonegate@precisionmngmt.com", group: "Property Info" },
  { key: "ADDRESS", label: "Address", placeholder: "4500 Stonegate Dr.\nMemphis, TN 38128", group: "Property Info", type: "textarea" },
  
  { key: "TOTAL_UNITS", label: "Total Units", placeholder: "208", group: "Unit Mix" },
  { key: "MIX_1X1", label: "1x1 Count", placeholder: "72", group: "Unit Mix" },
  { key: "MIX_2X2", label: "2x2 Count", placeholder: "112", group: "Unit Mix" },
  { key: "MIX_3X3", label: "3x3 Count", placeholder: "24", group: "Unit Mix" },
  
  { key: "LEASING_TEXT", label: "Leasing & Marketing Overview", placeholder: "The property had 114 inquiries in June which included online inquiries, phone calls, and walk-ins.\n\nThere were 5 applicants and 2 approvals. There were 0 move ins and 9 move outs. This resulted in the property closing at 54.33% occupancy and 56.25% preleased. Our goal is to reach the property at 90% occupied or higher and decrease delinquency to 5% or less.", group: "Metrics", type: "textarea" },
  
  { key: "REVENUE_TEXT", label: "Revenue & NOI Overview", placeholder: "Total revenue was $82,078.38. Total expenses totaled $68,907.76 resulting in a total NOI of $15,746.24 Focus will remain on maximizing rent revenue as well as creating and collecting additional other income, decreasing overall expenses as well as inputting all invoices within the period they are owed.", group: "Metrics", type: "textarea" },
  
  { key: "DELINQUENCY_TEXT", label: "Delinquency Overview", placeholder: "Delinquent rent for the month was $40,433.27 in which $30,292.42 was affiliated with evictions/un-collectible.", group: "Metrics", type: "textarea" },
  
  { key: "MARKETING_TEXT", label: "Marketing Strategy", placeholder: "We are advertising the resident referral incentive to current residents. There is also marketing and advertising on Facebook market place and groups. Current special of waive application fee, and $500 off first full month of rent.", group: "Metrics", type: "textarea" },
  
  { key: "RENEWALS_TEXT", label: "Renewals Overview", placeholder: "There are 2 month-to-month leases and 0 expiring leases and 5 renewed. All residents with leases expiring thru the next 90 days will receive renewal notices as well as being emailed. We are currently not increasing at renewals. We will renew at the same rate temporarily. Month to month fees have been added to residents accounts.", group: "Operations", type: "textarea" },
  
  { key: "MAINTENANCE_TEXT", label: "Maintenance & Capital", placeholder: "Maintenance has completed unit 1804. It is pending flooring bid and clean. AHS has completed unit 1704. They have turned in keys for the remaining units and are pending a walk through.", group: "Operations", type: "textarea" },
  
  { key: "STAFFING_TEXT", label: "Staffing Overview", placeholder: "The property is currently fully staffed which consists of a full-time senior community manager, community manager, and 2 maintenance technicians.", group: "Operations", type: "textarea" }
];

function Header() {
  return (
    <div className="tk-exec-logo-container">
      <img src={logo} alt="Advanced Precision Group" className="tk-exec-logo" />
    </div>
  );
}

function Page1() {
  const f = useTemplateFields();
  const hasBg = f.COVER_PHOTO?.startsWith("data:");
  return (
    <section className="pdf-page tk-exec-report">
      <Header />
      
      <div className="tk-exec-title-block">
        <h1>{f.PROPERTY_NAME}</h1>
        <h2>EXECUTIVE SUMMARY</h2>
        <h3>{f.REPORT_MONTH}</h3>
      </div>
      
      <div className="tk-exec-cover-photo-container">
        {hasBg ? (
          <img src={f.COVER_PHOTO} className="tk-exec-cover-photo" alt="Property Cover" />
        ) : (
          <div className="tk-exec-cover-photo" style={{ background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
            Photo Area
          </div>
        )}
      </div>

      <div className="tk-exec-section">
        <h4 className="tk-exec-section-header">PROPERTY INFORMATION:</h4>
        <div className="tk-exec-info-grid">
          <div className="tk-exec-info-col">
            <p>{f.PROPERTY_NAME}</p>
            <p style={{ whiteSpace: "pre-wrap" }}>{f.ADDRESS}</p>
          </div>
          <div className="tk-exec-info-col" style={{ textAlign: "right" }}>
            <p>Manager: {f.MANAGER_NAME}</p>
            <p>Telephone: {f.TELEPHONE}</p>
            <p>Email: <span style={{ color: "#4f81bd", textDecoration: "none" }}>{f.EMAIL}</span></p>
          </div>
        </div>
      </div>
      
      <div className="tk-exec-unit-mix">
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Total Units: {f.TOTAL_UNITS}</p>
        <div className="tk-exec-unit-mix-row">
          <span>1x1</span><span>{f.MIX_1X1}</span>
        </div>
        <div className="tk-exec-unit-mix-row" style={{ marginTop: "5px" }}>
          <span>2x2</span><span>{f.MIX_2X2}</span>
        </div>
        <div className="tk-exec-unit-mix-row" style={{ marginTop: "5px" }}>
          <span>3x3</span><span>{f.MIX_3X3}</span>
        </div>
      </div>
      
      <div className="tk-exec-section" style={{ marginTop: "30px" }}>
        <h4 className="tk-exec-section-header">PROPERTY OVERVIEW:</h4>
      </div>
    </section>
  );
}

function Page2() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page tk-exec-report">
      <Header />
      
      <div className="tk-exec-body-text" style={{ marginTop: "20px" }}>
        {f.LEASING_TEXT}
      </div>

      <div className="tk-exec-section" style={{ marginTop: "60px" }}>
        <h4 className="tk-exec-section-header">REVENUE/NOI:</h4>
        <div className="tk-exec-body-text">
          {f.REVENUE_TEXT}
        </div>
      </div>

      <div className="tk-exec-section" style={{ marginTop: "20px" }}>
        <h4 className="tk-exec-section-header">DELINQUENCY:</h4>
        <div className="tk-exec-body-text">
          {f.DELINQUENCY_TEXT}
        </div>
      </div>

      <div className="tk-exec-section" style={{ marginTop: "40px" }}>
        <h4 className="tk-exec-section-header">LEASING AND MARKETING:</h4>
        <div className="tk-exec-body-text">
          {f.MARKETING_TEXT}
        </div>
      </div>
    </section>
  );
}

function Page3() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page tk-exec-report">
      <Header />
      
      <div className="tk-exec-section" style={{ marginTop: "20px" }}>
        <h4 className="tk-exec-section-header">RENEWALS:</h4>
        <div className="tk-exec-body-text">
          {f.RENEWALS_TEXT}
        </div>
      </div>

      <div className="tk-exec-section" style={{ marginTop: "10px" }}>
        <h4 className="tk-exec-section-header">MAINTENANCE AND CAPITAL</h4>
        <div className="tk-exec-body-text">
          {f.MAINTENANCE_TEXT}
        </div>
      </div>

      <div className="tk-exec-section" style={{ marginTop: "10px" }}>
        <h4 className="tk-exec-section-header">STAFFING:</h4>
        <hr style={{ width: "80px", borderTop: "2px solid #000", margin: "15px 0", marginLeft: 0 }} />
        <div className="tk-exec-body-text">
          {f.STAFFING_TEXT}
        </div>
      </div>
    </section>
  );
}

export default function ExecutiveReportTemplate() {
  return (
    <TemplateEditor fields={FIELDS} title="Executive Report">
      <div className="print-document">
        <Page1 />
        <Page2 />
        <Page3 />
      </div>
    </TemplateEditor>
  );
}
