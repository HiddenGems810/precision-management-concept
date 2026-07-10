"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  // Card Details - Header
  { key: "BRAND_NAME", label: "Logo Subtext (Top)", placeholder: "PRECISION", group: "Header & Branding" },
  { key: "BRAND_NAME_2", label: "Logo Subtext (Bottom)", placeholder: "MANAGEMENT", group: "Header & Branding" },
  { key: "TAGLINE_1", label: "Header Main", placeholder: "PRECISION MANAGEMENT", group: "Header & Branding" },
  { key: "TAGLINE_2", label: "Header Sub", placeholder: "LEAD WITH PASSION. SERVE WITH PRECISION.", group: "Header & Branding" },
  
  // Card Details - Body
  { key: "ROLE_LABEL", label: "Property Name / Section Label", placeholder: "Stonegate Apartments", group: "Body Information" },
  { key: "NAME_MAIN", label: "Main Title/Name", placeholder: "Lead with Passion", group: "Body Information" },
  { key: "SUB_LABEL", label: "Subtitle / Description", placeholder: "Corporate Division", group: "Body Information" },
  
  // Contact
  { key: "CONTACT_PHONE", label: "Phone Number", placeholder: "(555) 123-4567", group: "Contact & Accent" },
  { key: "CONTACT_EMAIL", label: "Email Address", placeholder: "hello@precisionmngmt.com", group: "Contact & Accent" },
  { key: "CONTACT_WEBSITE", label: "Website", placeholder: "PRECISIONMNGMT.COM", group: "Contact & Accent" },
  { key: "BOTTOM_NOTE", label: "Bottom Note", placeholder: "INDEPENDENT CONCEPT BY GER'QUIA ABNER", group: "Contact & Accent" },

  // Back Side
  { key: "BACK_LINE_1", label: "Back Title", placeholder: "Precision Management", group: "Back Side Options" },
  { key: "BACK_LINE_2", label: "Back Subtitle", placeholder: "Professional property management", group: "Back Side Options" },
];

function BusinessCardPerfectMatch() {
  const f = useTemplateFields();

  return (
    <>
      <style>{`
        @media print {
          @page { size: 3.75in 2.25in; margin: 0; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; }
          .print-document { background: white !important; }
          .editor-sidebar, .intro { display: none !important; }
          .tk-biz-card-page { 
            width: 3.75in !important; 
            height: 2.25in !important; 
            margin: 0 !important; 
            page-break-after: always;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }
          /* Ensure the wrapper doesn't break page sizing and stacking in print */
          .biz-card-wrapper { 
            padding: 0 !important; 
            margin: 0 !important; 
            background: transparent !important;
            display: block !important;
          }
        }
      `}</style>

      {/* Screen Preview Wrapper */}
      <div className="biz-card-wrapper" style={{ padding: "0.62in", minHeight: "auto", display: "flex", flexDirection: "column", gap: "0.5in", alignItems: "center", background: "#f8fafc" }}>
        <div className="intro" style={{ marginTop: 0, textAlign: "center" }}>
          <p className="kicker">Standard 3.5" x 2.0" Business Card</p>
          <h1 style={{ fontSize: "24px" }}>Print-Ready Export</h1>
          <p>This layout is sized precisely to 3.75" x 2.25" to include a standard 0.125" bleed. When you export to PDF, it will generate exactly two pages perfectly sized for professional print shops.</p>
        </div>

        {/* Front of Card */}
        <div className="tk-biz-card-page" style={{
          width: "3.75in", height: "2.25in", background: "white", position: "relative",
          boxSizing: "border-box", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}>
          {/* Top Bar (Bleed) */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.15in", background: "#1c2c44" }} />
          {/* Bottom Bar (Bleed) */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "0.08in", background: "#d6b055" }} />

          {/* Safe Area Container */}
          <div style={{ position: "absolute", inset: "0.15in 0 0.08in 0", display: "flex", padding: "0.2in 0.25in 0.1in 0.25in" }}>
            
            {/* Left Logo Side */}
            <div style={{ width: "1.35in", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRight: "0.5px solid rgba(214, 176, 85, 0.3)", paddingRight: "0.25in", marginRight: "0.1in" }}>
              <img src={logo} style={{ width: "1.1in", height: "1.1in", objectFit: "contain" }} alt="Logo" />
            </div>
            
            {/* Right Side */}
            <div style={{ flex: 1, paddingTop: "0.05in", position: "relative", display: "flex", flexDirection: "column" }}>
              {/* Header */}
              <div style={{ marginBottom: "0.2in" }}>
                <div style={{ fontSize: "8px", fontWeight: 700, color: "#1c2c44", letterSpacing: "0.05em" }}>{f.TAGLINE_1}</div>
                {f.TAGLINE_2 && <div style={{ fontSize: "5.5px", fontWeight: 700, color: "#3d8c8f", letterSpacing: "0.08em", marginTop: "0.03in" }}>{f.TAGLINE_2}</div>}
              </div>
              
              {/* Body */}
              <div style={{ color: "#3d8c8f", fontSize: "6.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{f.ROLE_LABEL}</div>
              <div style={{ color: "#1c2c44", fontSize: "16px", fontWeight: 700, fontFamily: "serif", marginTop: "0.02in", letterSpacing: "-0.02em" }}>{f.NAME_MAIN}</div>
              <div style={{ color: "#1c2c44", fontSize: "7px", marginTop: "0.04in" }}>{f.SUB_LABEL}</div>
              
              {/* Bottom Section (pushed to bottom) */}
              <div style={{ marginTop: "auto", width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {f.CONTACT_PHONE && <div style={{ color: "#1c2c44", fontSize: "7px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{f.CONTACT_PHONE}</div>}
                  {f.CONTACT_EMAIL && <div style={{ color: "#1c2c44", fontSize: "7px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{f.CONTACT_EMAIL}</div>}
                  {f.CONTACT_WEBSITE && <div style={{ color: "#1c2c44", fontSize: "7px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{f.CONTACT_WEBSITE}</div>}
                </div>
                
                <div style={{ height: "1px", background: "#d6b055", width: "100%", marginTop: "0.05in", marginBottom: "0.05in" }} />
                
                <div style={{ color: "#94a3b8", fontSize: "5px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.BOTTOM_NOTE}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="tk-biz-card-page" style={{
          width: "3.75in", height: "2.25in", background: "#1c2c44", position: "relative",
          boxSizing: "border-box", overflow: "hidden", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}>
          {/* Inner Border */}
          <div style={{ position: "absolute", inset: "0.08in", border: "0.5px solid rgba(214, 176, 85, 0.4)" }} />

          <img src={logo} style={{ width: "1.1in", height: "1.1in", marginBottom: "0.15in", objectFit: "contain", filter: "brightness(0) invert(1)", position: "relative", zIndex: 1 }} alt="Logo Mark" />
          
          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#d6b055", textTransform: "uppercase" }}>{f.BACK_LINE_1}</div>
            <div style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.8)", marginTop: "0.05in", letterSpacing: "0.02em" }}>{f.BACK_LINE_2}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BusinessCardsPage() {
  return (
    <TemplateEditor templateKey="business-cards-redesign-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management business card templates">
        <BusinessCardPerfectMatch />
      </main>
    </TemplateEditor>
  );
}
