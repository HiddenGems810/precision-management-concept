"use client";
import { useState } from "react";
import "../../print/[asset]/print.css";
import "../../print/property-flyer/toolkit.css";
import "../../components/editor.css";
import { TemplateEditor, useTemplateFields, type TemplateField } from "../../components/TemplateEditor";

const logo = "/assets/exports/logo-system/precision-management-official-logo.svg";

const FIELDS: TemplateField[] = [
  { key: "STAFF_NAME",    label: "Staff Name",        placeholder: "Jordan Williams",              group: "Staff Information" },
  { key: "STAFF_TITLE",   label: "Staff Title",       placeholder: "Property Manager",             group: "Staff Information" },
  { key: "PROPERTY_NAME", label: "Property",          placeholder: "Stonegate Apartments",              group: "Staff Information" },
  { key: "MANAGER_NAME",  label: "Supervisor Name",   placeholder: "Regional Manager Name",        group: "Staff Information" },
  
  { key: "PAY_PERIOD",    label: "Pay Period",        placeholder: "July 14 – July 27, 2025",      group: "Timesheet" },
  { key: "PERIOD_START",  label: "Period Start Date", placeholder: "July 14, 2025",                group: "Timesheet" },
  { key: "PERIOD_END",    label: "Period End Date",   placeholder: "July 27, 2025",                group: "Timesheet" },

  { key: "BONUS_MONTH",   label: "Bonus Month",       placeholder: "June 2025",                    group: "Bonus Sheet" },
];

const DAYS = [
  "Mon 7/14", "Tue 7/15", "Wed 7/16", "Thu 7/17", "Fri 7/18",
  "Mon 7/21", "Tue 7/22", "Wed 7/23", "Thu 7/24", "Fri 7/25",
  "Sat 7/26", "Sun 7/27",
  "", "",
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

/* ── Timesheet ────────────────────────────────────────── */
type HoursRow = { day: string; start: string; end: string; break_: string; total: string; notes: string };

function TimesheetContent() {
  const f = useTemplateFields();
  const [rows, setRows] = useState<HoursRow[]>(
    DAYS.map((day) => ({ day, start: "", end: "", break_: "", total: "", notes: "" }))
  );

  const updateRow = (i: number, field: keyof HoursRow, value: string) => {
    setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  };

  const grandTotal = rows.reduce((sum, r) => {
    const n = parseFloat(r.total);
    return isNaN(n) ? sum : sum + n;
  }, 0);

  return (
    <section className="pdf-page" style={{ fontFamily: "inherit" }}>
      <Header label="Timesheet / staff hours record" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".25in", marginTop: ".35in", padding: ".25in", background: "#1c2c44", color: "#fff" }}>
        <div>
          <p style={{ fontSize: "7px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#d6b055" }}>Employee</p>
          <p style={{ fontSize: "18px", fontWeight: 700, marginTop: ".05in" }}>{f.STAFF_NAME}</p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,.7)", marginTop: ".04in" }}>{f.STAFF_TITLE}</p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,.55)", marginTop: ".04in" }}>{f.PROPERTY_NAME}</p>
        </div>
        <div>
          <p style={{ fontSize: "7px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#d6b055" }}>Pay Period</p>
          <p style={{ fontSize: "16px", fontWeight: 700, marginTop: ".05in" }}>{f.PAY_PERIOD}</p>
          <p style={{ fontSize: "9px", color: "rgba(255,255,255,.6)", marginTop: ".06in" }}>{f.PERIOD_START} → {f.PERIOD_END}</p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: ".2in", fontSize: "8px" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Time In</th>
            <th style={thStyle}>Time Out</th>
            <th style={thStyle}>Break (min)</th>
            <th style={thStyle}>Total Hours</th>
            <th style={{ ...thStyle, width: "2in" }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={tdStyle}><input className="ts-cell-input" value={row.day} onChange={(e) => updateRow(i, "day", e.target.value)} placeholder="Day / Date" /></td>
              <td style={tdStyle}><input className="ts-cell-input" type="time" value={row.start} onChange={(e) => updateRow(i, "start", e.target.value)} /></td>
              <td style={tdStyle}><input className="ts-cell-input" type="time" value={row.end} onChange={(e) => updateRow(i, "end", e.target.value)} /></td>
              <td style={tdStyle}><input className="ts-cell-input" value={row.break_} onChange={(e) => updateRow(i, "break_", e.target.value)} placeholder="30" /></td>
              <td style={tdStyle}><input className="ts-cell-input" value={row.total} onChange={(e) => updateRow(i, "total", e.target.value)} placeholder="8.0" /></td>
              <td style={tdStyle}><input className="ts-cell-input" value={row.notes} onChange={(e) => updateRow(i, "notes", e.target.value)} placeholder="Notes" style={{ width: "100%" }} /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: "#1c2c44" }}>
            <td colSpan={4} style={{ ...tdStyle, color: "#fff", fontWeight: 700, textAlign: "right", padding: ".08in .1in" }}>Total hours this period:</td>
            <td style={{ ...tdStyle, color: "#d6b055", fontWeight: 700, fontSize: "11px" }}>{grandTotal > 0 ? grandTotal.toFixed(1) : "—"}</td>
            <td style={tdStyle} />
          </tr>
        </tfoot>
      </table>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".4in", marginTop: ".4in" }}>
        <div style={sigStyle}>
          <p style={sigLabel}>Employee Signature</p>
          <div style={sigLine} />
          <p style={sigSub}>{f.STAFF_NAME} · {f.STAFF_TITLE}</p>
        </div>
        <div style={sigStyle}>
          <p style={sigLabel}>Supervisor Approval</p>
          <div style={sigLine} />
          <p style={sigSub}>{f.MANAGER_NAME}</p>
        </div>
      </div>

      <p style={{ marginTop: ".2in", fontSize: "7px", color: "#94a3b8", lineHeight: 1.5 }}>
        This timesheet must be submitted to your supervisor by the end of the last day of the pay period. Hours are subject to manager review. Falsification of time records is grounds for termination.
      </p>

      <Footer />
    </section>
  );
}

/* ── Bonus Sheet ────────────────────────────────────────── */
type SectionARow = { unit: string; type: string; marketRent: string; leaseRent: string };
type SectionBRow = { unit: string; marketRent: string; leaseRent: string };
type EmployeeRow = { name: string; totalBonus: string };

function BonusSheetContent() {
  const f = useTemplateFields();
  
  const [rowsA, setRowsA] = useState<SectionARow[]>(Array(7).fill({ unit: "", type: "", marketRent: "", leaseRent: "" }));
  const [rowsB, setRowsB] = useState<SectionBRow[]>(Array(6).fill({ unit: "", marketRent: "", leaseRent: "" }));
  const [employees, setEmployees] = useState<EmployeeRow[]>(Array(4).fill({ name: "", totalBonus: "" }));

  const updateRowA = (i: number, field: keyof SectionARow, value: string) => setRowsA(p => p.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  const updateRowB = (i: number, field: keyof SectionBRow, value: string) => setRowsB(p => p.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  const updateEmployee = (i: number, field: keyof EmployeeRow, value: string) => setEmployees(p => p.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const grandTotal = employees.reduce((sum, e) => {
    const num = parseFloat(e.totalBonus.replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? sum : sum + num;
  }, 0);

  return (
    <section className="pdf-page" style={{ fontFamily: "inherit" }}>
      <Header label="Monthly Bonus Sheet" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".25in", marginTop: ".35in", padding: ".25in", background: "#1c2c44", color: "#fff" }}>
        <div>
          <p style={{ fontSize: "7px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#d6b055" }}>Property Info</p>
          <p style={{ fontSize: "18px", fontWeight: 700, marginTop: ".05in" }}>{f.PROPERTY_NAME}</p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,.55)", marginTop: ".04in" }}>Bonus Month: {f.BONUS_MONTH}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "8px", color: "#d6b055", fontStyle: "italic", textAlign: "right" }}>
            *Bonuses will be paid out on the following month&apos;s second payroll
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5in", gap: ".35in", marginTop: ".25in" }}>
        {/* Left: Input grids */}
        <div>
          {/* Section A */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #1c2c44", paddingBottom: ".06in", marginBottom: ".08in" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#1c2c44" }}>A. New Leases & Renewals</span>
            <span style={{ fontSize: "7px", color: "#64748b" }}>$80 per lease / $50 maintenance</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={thStyle}>Unit #</th>
                <th style={thStyle}>Move in / Renewal?</th>
                <th style={thStyle}>Market Rent</th>
                <th style={thStyle}>Lease Rent</th>
              </tr>
            </thead>
            <tbody>
              {rowsA.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={tdStyle}><input className="ts-cell-input" value={row.unit} onChange={e => updateRowA(i, "unit", e.target.value)} placeholder="Unit" /></td>
                  <td style={tdStyle}><input className="ts-cell-input" value={row.type} onChange={e => updateRowA(i, "type", e.target.value)} placeholder="Type" /></td>
                  <td style={tdStyle}><input className="ts-cell-input" value={row.marketRent} onChange={e => updateRowA(i, "marketRent", e.target.value)} placeholder="$" /></td>
                  <td style={tdStyle}><input className="ts-cell-input" value={row.leaseRent} onChange={e => updateRowA(i, "leaseRent", e.target.value)} placeholder="$" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Section B */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #1c2c44", paddingBottom: ".06in", marginBottom: ".08in", marginTop: ".25in" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#1c2c44" }}>B. Renewals (Increase $50+)</span>
            <span style={{ fontSize: "7px", color: "#64748b" }}>$100 per renewal / $50 maintenance</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={thStyle}>Unit #</th>
                <th style={thStyle}>Market Rent</th>
                <th style={thStyle}>Lease Rent</th>
              </tr>
            </thead>
            <tbody>
              {rowsB.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={tdStyle}><input className="ts-cell-input" value={row.unit} onChange={e => updateRowB(i, "unit", e.target.value)} placeholder="Unit" /></td>
                  <td style={tdStyle}><input className="ts-cell-input" value={row.marketRent} onChange={e => updateRowB(i, "marketRent", e.target.value)} placeholder="$" /></td>
                  <td style={tdStyle}><input className="ts-cell-input" value={row.leaseRent} onChange={e => updateRowB(i, "leaseRent", e.target.value)} placeholder="$" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Employee Totals */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#1c2c44", color: "#fff", padding: ".15in", borderRadius: "2px" }}>
            <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#d6b055", marginBottom: ".1in" }}>
              Employee Bonus Payouts
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "9px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,.2)" }}>
                  <th style={{ padding: ".05in 0", textAlign: "left", color: "rgba(255,255,255,.6)", fontWeight: 500 }}>Name</th>
                  <th style={{ padding: ".05in 0", textAlign: "right", color: "rgba(255,255,255,.6)", fontWeight: 500 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                    <td style={{ padding: ".06in 0" }}>
                      <input className="ts-cell-input" style={{ color: "#fff" }} value={emp.name} onChange={e => updateEmployee(i, "name", e.target.value)} placeholder="Employee Name" />
                    </td>
                    <td style={{ padding: ".06in 0", width: ".8in" }}>
                      <input className="ts-cell-input" style={{ color: "#fff", textAlign: "right" }} value={emp.totalBonus} onChange={e => updateEmployee(i, "totalBonus", e.target.value)} placeholder="$0.00" />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ paddingTop: ".15in", fontWeight: 700, color: "#d6b055" }}>PROPERTY TOTAL</td>
                  <td style={{ paddingTop: ".15in", fontWeight: 700, color: "#d6b055", textAlign: "right", fontSize: "11px" }}>
                    {grandTotal > 0 ? `$${grandTotal.toFixed(2)}` : "—"}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style={{ marginTop: "auto", borderTop: "2px solid #e5e7eb", paddingTop: ".15in" }}>
            <p style={{ fontSize: "8px", fontWeight: 700, color: "#1c2c44", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".08in" }}>
              Pre-Submission Checklist
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "7px", color: "#64748b", lineHeight: 1.6 }}>
              <li>☐ Lease dates match Yardi exactly</li>
              <li>☐ Monthly charges match Yardi</li>
              <li>☐ Additional charges included</li>
              <li>☐ Security deposit reflected on ledger</li>
              <li>☐ Signed lease uploaded</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: ".3in", padding: ".15in", background: "#f8fafc", fontSize: "7px", color: "#64748b", lineHeight: 1.5 }}>
        <p><strong style={{ color: "#1c2c44" }}>Restrictions:</strong> 12-month leases only (unless pre-approved by regional). Minimum of 6 months since bonus was last paid on unit. Renewal lease cannot be &gt;30 days out.</p>
        <p style={{ marginTop: ".05in" }}><strong style={{ color: "#1c2c44" }}>Notes:</strong> Resigning employees with proper notice are subject to prorated bonus payout based on resignation date. New employees receive prorated bonus based on start date.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".4in", marginTop: ".2in" }}>
        <div style={sigStyle}>
          <p style={sigLabel}>Manager Approval</p>
          <div style={sigLine} />
          <p style={sigSub}>{f.MANAGER_NAME}</p>
        </div>
        <div style={sigStyle}>
          <p style={sigLabel}>Regional Approval</p>
          <div style={sigLine} />
          <p style={sigSub}>Signature</p>
        </div>
      </div>

      <Footer />
    </section>
  );
}

const thStyle: React.CSSProperties = { padding: ".07in .08in", textAlign: "left", fontWeight: 700, fontSize: "7px", letterSpacing: ".1em", textTransform: "uppercase", color: "#1c2c44", borderBottom: "2px solid #d6b055" };
const tdStyle: React.CSSProperties = { padding: ".04in .08in", verticalAlign: "middle" };
const sigStyle: React.CSSProperties = { borderTop: "1px solid #1c2c44", paddingTop: ".15in" };
const sigLine: React.CSSProperties = { height: ".35in", borderBottom: "1px solid #94a3b8", marginTop: ".05in" };
const sigLabel: React.CSSProperties = { fontSize: "7px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#1c2c44" };
const sigSub: React.CSSProperties = { fontSize: "7px", color: "#64748b", marginTop: ".05in" };

export default function StaffOperationsPage() {
  return (
    <TemplateEditor templateKey="staff-operations-v2" fields={FIELDS}>
      <main className="print-document" contentEditable suppressContentEditableWarning aria-label="Editable Precision Management staff templates">
        <TimesheetContent />
        <BonusSheetContent />
      </main>
    </TemplateEditor>
  );
}
