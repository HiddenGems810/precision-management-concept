"use client";
import "../../print/[asset]/print.css";
import "./toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";
import { PdfViewer } from "../../components/PdfViewer";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  // Property
  { key: "PROPERTY_NAME",    label: "Property Name",      placeholder: "Stonegate Apartments",               group: "Property" },
  { key: "HERO_IMAGE",       label: "Property Photo",     placeholder: "Upload photo...",               group: "Property", type: "image" },
  { key: "GALLERY_IMAGE_1",  label: "Gallery Image 1",    placeholder: "Upload photo...",               group: "Property Gallery", type: "image" },
  { key: "GALLERY_IMAGE_2",  label: "Gallery Image 2",    placeholder: "Upload photo...",               group: "Property Gallery", type: "image" },
  { key: "GALLERY_IMAGE_3",  label: "Gallery Image 3",    placeholder: "Upload photo...",               group: "Property Gallery", type: "image" },
  { key: "PROPERTY_ADDRESS", label: "Property Address",   placeholder: "4500 Stone Gate Dr, Memphis, TN 38128", group: "Property" },
  { key: "SQUARE_FEET_1BR",  label: "Sq Ft — 1BR",        placeholder: "625 sq ft",                     group: "Property" },
  { key: "SQUARE_FEET_2BR",  label: "Sq Ft — 2BR",        placeholder: "875 sq ft",                     group: "Property" },
  { key: "SQUARE_FEET_3BR",  label: "Sq Ft — 3BR",        placeholder: "1,100 sq ft",                   group: "Property" },
  // Pricing
  { key: "RENT_1BR",         label: "Rent — 1BR",         placeholder: "Starting at $950/mo",           group: "Pricing" },
  { key: "RENT_2BR",         label: "Rent — 2BR",         placeholder: "Starting at $1,150/mo",         group: "Pricing" },
  { key: "RENT_3BR",         label: "Rent — 3BR",         placeholder: "Starting at $1,375/mo",         group: "Pricing" },
  { key: "AVAILABILITY_DATE",label: "Availability Date",  placeholder: "August 1, 2025",                group: "Pricing" },
  { key: "SPECIAL_OFFER",    label: "Move-In Special",    placeholder: "First month free on select units", group: "Pricing" },
  // Event
  { key: "EVENT_DATE",       label: "Open House Date",    placeholder: "Saturday, August 10, 2025",     group: "Open House Event" },
  { key: "EVENT_TIME",       label: "Open House Time",    placeholder: "10:00 AM – 2:00 PM",            group: "Open House Event" },
  // Contact
  { key: "LEASING_PHONE",    label: "Leasing Phone",      placeholder: "(404) 555-0192",                group: "Contact" },
  { key: "LEASING_EMAIL",    label: "Leasing Email",      placeholder: "leasing@stonegateapartments.com",    group: "Contact" },
  { key: "APPLICATION_URL",  label: "Apply URL",          placeholder: "apply.precisionmngmt.com/stonegate", group: "Contact" },
  { key: "OFFICE_HOURS",     label: "Office Hours",       placeholder: "Mon–Fri 9am–5pm, Sat 10am–2pm", group: "Contact" },
  { key: "QR_CODE_IMAGE",    label: "QR Code (Optional)", placeholder: "Upload QR...",                  group: "Contact", type: "image" },
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

function FlyerPage({
  variant, unitType, beds, baths, sqftKey, rentKey, features,
}: {
  variant: string; unitType: string; beds: number; baths: number;
  sqftKey: string; rentKey: string; features: string[];
}) {
  const f = useTemplateFields();
  return (
    <section className="pdf-page tk-flyer">
      <Header label={`${variant} / property flyer`} />

      <div className="tk-flyer-hero" style={f.HERO_IMAGE?.startsWith("data:") && !f.HERO_IMAGE.startsWith("data:application/pdf") ? { backgroundImage: `url(${f.HERO_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { overflow: "hidden", position: "relative" }}>
        {f.HERO_IMAGE?.startsWith("data:application/pdf") && (
          <PdfViewer dataUrl={f.HERO_IMAGE} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
        )}
        {f.HERO_IMAGE?.startsWith("data:") && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28, 44, 68, 0.95), rgba(28, 44, 68, 0.4))", zIndex: 0 }} />}
        <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", gap: ".35in", alignItems: "flex-end" }}>
          <div className="tk-flyer-badge">{beds}BR / {baths}BA</div>
        <div className="tk-flyer-headline">
          <p className="kicker">{f.PROPERTY_NAME} — {f.PROPERTY_ADDRESS}</p>
          <h1>{unitType}</h1>
          <div className="tk-flyer-stats">
            <div><strong>{f[rentKey]}</strong><span>Per month</span></div>
            <div><strong>{f[sqftKey]}</strong><span>Square feet</span></div>
            <div><strong>{f.AVAILABILITY_DATE}</strong><span>Available</span></div>
          </div>
        </div>
        </div>
      </div>

      {[f.GALLERY_IMAGE_1, f.GALLERY_IMAGE_2, f.GALLERY_IMAGE_3].filter(img => img && img !== "Upload photo...").length > 0 && (
        <div style={{ display: 'flex', gap: '.15in', marginTop: '.25in' }}>
          {[f.GALLERY_IMAGE_1, f.GALLERY_IMAGE_2, f.GALLERY_IMAGE_3].filter(img => img && img !== "Upload photo...").map((img, i) => (
            <div key={i} style={{ flex: 1, height: '1.3in', position: 'relative', overflow: 'hidden' }}>
              {img?.startsWith("data:application/pdf") ? (
                <PdfViewer dataUrl={img} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
              ) : (
                <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="tk-flyer-body">
        <div className="tk-flyer-features">
          <p className="kicker">Key features</p>
          <ul>{features.map((ft) => <li key={ft}>{ft}</li>)}</ul>
        </div>

        <div className="tk-flyer-contact">
          <p className="kicker">Leasing information</p>
          <div className="tk-contact-row"><span>Phone</span><b>{f.LEASING_PHONE}</b></div>
          <div className="tk-contact-row"><span>Email</span><b>{f.LEASING_EMAIL}</b></div>
          <div className="tk-contact-row"><span>Apply</span><b>{f.APPLICATION_URL}</b></div>
          <div className="tk-contact-row"><span>Hours</span><b>{f.OFFICE_HOURS}</b></div>
          {f.QR_CODE_IMAGE?.startsWith("data:") && (
            <div className="tk-qr-block">
              <div style={{ width: ".85in", height: ".85in", position: "relative" }}>
                {f.QR_CODE_IMAGE.startsWith("data:application/pdf") ? (
                  <PdfViewer dataUrl={f.QR_CODE_IMAGE} style={{ width: "100%", height: "100%" }} />
                ) : (
                  <img src={f.QR_CODE_IMAGE} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                )}
              </div>
              <p>Scan to apply online</p>
            </div>
          )}
          <div className="tk-flyer-compliance">
            <p>Equal Housing Opportunity</p>
            <p>This community does not discriminate on the basis of race, color, national origin, religion, sex, familial status, or disability.</p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function MoveInSpecialFlyer() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page tk-flyer tk-flyer-special">
      <Header label="Move-in special / property flyer" />
      <div className="tk-special-banner">
        <p className="kicker">Limited availability</p>
        <h1>Move-In Special</h1>
        <p>{f.SPECIAL_OFFER}</p>
      </div>

      {[f.GALLERY_IMAGE_1, f.GALLERY_IMAGE_2, f.GALLERY_IMAGE_3].filter(img => img && img !== "Upload photo...").length > 0 && (
        <div style={{ display: 'flex', gap: '.15in', marginTop: '.25in' }}>
          {[f.GALLERY_IMAGE_1, f.GALLERY_IMAGE_2, f.GALLERY_IMAGE_3].filter(img => img && img !== "Upload photo...").map((img, i) => (
            <div key={i} style={{ flex: 1, height: '1.3in', position: 'relative', overflow: 'hidden' }}>
              {img?.startsWith("data:application/pdf") ? (
                <PdfViewer dataUrl={img} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
              ) : (
                <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="tk-flyer-body">
        <div className="tk-flyer-features">
          <p className="kicker">{f.PROPERTY_NAME} — Available units</p>
          <div className="tk-unit-row"><span>1-Bedroom</span><span>{f.RENT_1BR}</span><span>Available {f.AVAILABILITY_DATE}</span></div>
          <div className="tk-unit-row"><span>2-Bedroom</span><span>{f.RENT_2BR}</span><span>Available {f.AVAILABILITY_DATE}</span></div>
          <div className="tk-unit-row"><span>3-Bedroom</span><span>{f.RENT_3BR}</span><span>Available {f.AVAILABILITY_DATE}</span></div>
          <p className="tk-small-note">Prices subject to change. Contact leasing for current availability and terms.</p>
        </div>
        <div className="tk-flyer-contact">
          <p className="kicker">Act now — limited units</p>
          <div className="tk-contact-row"><span>Phone</span><b>{f.LEASING_PHONE}</b></div>
          <div className="tk-contact-row"><span>Apply</span><b>{f.APPLICATION_URL}</b></div>
          {f.QR_CODE_IMAGE?.startsWith("data:") && (
            <div className="tk-qr-block">
              <div style={{ width: ".85in", height: ".85in" }}>
                <img src={f.QR_CODE_IMAGE} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <p>Apply online</p>
            </div>
          )}
          <div className="tk-flyer-compliance"><p>Equal Housing Opportunity</p></div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function OpenHouseFlyer() {
  const f = useTemplateFields();
  return (
    <section className="pdf-page tk-flyer">
      <Header label="Open house / leasing event flyer" />
      <div className="tk-event-header">
        <p className="kicker">You&apos;re invited</p>
        <h1>Leasing Event<br /><span>{f.PROPERTY_NAME}</span></h1>
        <div className="tk-event-meta">
          <div><strong>{f.EVENT_DATE}</strong><span>Date</span></div>
          <div><strong>{f.EVENT_TIME}</strong><span>Time</span></div>
          <div><strong>{f.PROPERTY_ADDRESS}</strong><span>Location</span></div>
        </div>
      </div>

      {[f.GALLERY_IMAGE_1, f.GALLERY_IMAGE_2, f.GALLERY_IMAGE_3].filter(img => img && img !== "Upload photo...").length > 0 && (
        <div style={{ display: 'flex', gap: '.15in', marginTop: '.25in' }}>
          {[f.GALLERY_IMAGE_1, f.GALLERY_IMAGE_2, f.GALLERY_IMAGE_3].filter(img => img && img !== "Upload photo...").map((img, i) => (
            <div key={i} style={{ flex: 1, height: '1.3in', position: 'relative', overflow: 'hidden' }}>
              {img?.startsWith("data:application/pdf") ? (
                <PdfViewer dataUrl={img} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
              ) : (
                <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="tk-event-body">
        <div>
          <p className="kicker">What to expect</p>
          <ul className="tk-event-list">
            <li>Tour available units — 1, 2, and 3-bedroom homes</li>
            <li>Meet the leasing team and ask questions</li>
            <li>On-site application support</li>
            <li>Learn about current availability and pricing</li>
          </ul>
        </div>
        <div className="tk-flyer-contact">
          <p className="kicker">RSVP or learn more</p>
          <div className="tk-contact-row"><span>Phone</span><b>{f.LEASING_PHONE}</b></div>
          <div className="tk-contact-row"><span>Email</span><b>{f.LEASING_EMAIL}</b></div>
          {f.QR_CODE_IMAGE?.startsWith("data:") && (
            <div className="tk-qr-block">
              <div style={{ width: ".85in", height: ".85in" }}>
                <img src={f.QR_CODE_IMAGE} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <p>View available units</p>
            </div>
          )}
          <div className="tk-flyer-compliance"><p>Equal Housing Opportunity</p></div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default function PropertyFlyerPage() {
  return (
    <TemplateEditor templateKey="property-flyer-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management property flyer templates">
        <FlyerPage variant="1-Bedroom" unitType="1-Bedroom / 1-Bath" beds={1} baths={1} sqftKey="SQUARE_FEET_1BR" rentKey="RENT_1BR"
          features={["Fully equipped kitchen", "In-unit washer/dryer hookups", "Private patio or balcony", "Central heating and air"]} />
        <FlyerPage variant="2-Bedroom" unitType="2-Bedroom / 1-Bath" beds={2} baths={1} sqftKey="SQUARE_FEET_2BR" rentKey="RENT_2BR"
          features={["Open floor plan", "In-unit laundry", "Walk-in closet", "Central heating and air", "Off-street parking"]} />
        <FlyerPage variant="3-Bedroom" unitType="3-Bedroom / 2-Bath" beds={3} baths={2} sqftKey="SQUARE_FEET_3BR" rentKey="RENT_3BR"
          features={["Spacious living areas", "Two full bathrooms", "In-unit laundry", "Central heating and air", "Additional storage"]} />
        <MoveInSpecialFlyer />
        <OpenHouseFlyer />
      </main>
    </TemplateEditor>
  );
}
