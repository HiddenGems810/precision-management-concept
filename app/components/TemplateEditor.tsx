"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

/* ── Types ──────────────────────────────────────────────────────── */
export type FieldType = "text" | "textarea" | "select" | "date" | "image";

export interface TemplateField {
  key: string;
  label: string;
  placeholder: string;
  type?: FieldType;
  options?: string[]; // for select
  group?: string;
}

interface TemplateValues {
  [key: string]: string;
}

/* ── Context ─────────────────────────────────────────────────────── */
const FieldsContext = createContext<TemplateValues>({});

export function useTemplateFields(): TemplateValues {
  return useContext(FieldsContext);
}

/* ── TemplateEditor ──────────────────────────────────────────────── */
interface TemplateEditorProps {
  templateKey: string; // used as localStorage namespace
  fields: TemplateField[];
  children: React.ReactNode;
}

export function TemplateEditor({ templateKey, fields, children }: TemplateEditorProps) {
  const storageKey = `pm_template_${templateKey}`;

  const defaultValues = Object.fromEntries(fields.map((f) => [f.key, f.placeholder]));

  const [values, setValues] = useState<TemplateValues>(defaultValues);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setValues({ ...defaultValues, ...JSON.parse(stored) });
      }
    } catch {
      // ignore
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const updateField = useCallback((key: string, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [storageKey]);

  const handleReset = () => {
    setValues(defaultValues);
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
  };

  const handleSave = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(values)); } catch { /* ignore */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePrint = () => window.print();

  // Group fields
  const groups = fields.reduce<Record<string, TemplateField[]>>((acc, f) => {
    const g = f.group ?? "General";
    if (!acc[g]) acc[g] = [];
    acc[g].push(f);
    return acc;
  }, {});

  return (
    <FieldsContext.Provider value={values}>
      <div className="editor-shell">
        {/* ── Sidebar (screen only) ────────────────────────── */}
        <aside className={`editor-sidebar ${sidebarOpen ? "editor-sidebar--open" : "editor-sidebar--collapsed"}`} data-noprint>
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="editor-collapse-tab"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
          <div className="editor-sidebar-header">
            <div>
              <p className="editor-brand">Precision Management</p>
              <p className="editor-template-name">Template Editor</p>
            </div>
          </div>

          {sidebarOpen && (
            <>
              <div className="editor-fields-scroll">
                {Object.entries(groups).map(([groupName, groupFields]) => (
                  <div key={groupName} className="editor-field-group">
                    <p className="editor-group-label">{groupName}</p>
                    {groupFields.map((field) => (
                      <div key={field.key} className="editor-field">
                        <label htmlFor={`ef-${field.key}`} className="editor-field-label">
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={`ef-${field.key}`}
                            className="editor-input editor-textarea"
                            value={values[field.key] ?? ""}
                            placeholder={field.placeholder}
                            onChange={(e) => updateField(field.key, e.target.value)}
                            rows={3}
                          />
                        ) : field.type === "select" && field.options ? (
                          <select
                            id={`ef-${field.key}`}
                            className="editor-input editor-select"
                            value={values[field.key] ?? ""}
                            onChange={(e) => updateField(field.key, e.target.value)}
                          >
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : field.type === "image" ? (
                          <div className="flex flex-col gap-2">
                            <div
                              className="editor-input relative flex items-center justify-center p-4 border-2 border-dashed border-white/20 hover:border-maintenance-gold cursor-pointer transition-colors text-center bg-white/5"
                              style={{ minHeight: '80px' }}
                              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              onDrop={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                const file = e.dataTransfer.files?.[0];
                                if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    if (typeof ev.target?.result === "string") {
                                      updateField(field.key, ev.target.result);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              onClick={() => document.getElementById(`ef-${field.key}`)?.click()}
                            >
                              <div className="flex flex-col items-center gap-2 pointer-events-none text-white/60">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                  <circle cx="9" cy="9" r="2"/>
                                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                </svg>
                                <span className="text-xs">
                                  {values[field.key]?.startsWith("data:") ? "File loaded. Click or drop to replace." : "Click or drag & drop an image or PDF here"}
                                </span>
                              </div>
                              <input
                                id={`ef-${field.key}`}
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      if (typeof ev.target?.result === "string") {
                                        updateField(field.key, ev.target.result);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </div>
                            {values[field.key]?.startsWith("data:") && (
                              <button
                                type="button"
                                onClick={() => updateField(field.key, field.placeholder)}
                                className="text-[10px] uppercase tracking-wider font-bold text-red-500 hover:text-red-700 text-left mt-1 self-start"
                              >
                                Remove Image
                              </button>
                            )}
                          </div>
                        ) : (
                          <input
                            id={`ef-${field.key}`}
                            type={field.type === "date" ? "date" : "text"}
                            className="editor-input"
                            value={values[field.key] ?? ""}
                            placeholder={field.placeholder}
                            onChange={(e) => updateField(field.key, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="editor-actions">
                <button onClick={handlePrint} className="editor-btn-print">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                  Print / Export PDF
                </button>
                <div className="editor-btn-row">
                  <button onClick={handleSave} className="editor-btn-save">
                    {saved ? "✓ Saved" : "Save Fields"}
                  </button>
                  <button onClick={handleReset} className="editor-btn-reset">
                    Reset
                  </button>
                </div>
                <p className="editor-hint">Use <strong>Ctrl+P</strong> / <strong>⌘+P</strong> → Save as PDF for a clean export. The sidebar is hidden from print.</p>
              </div>
            </>
          )}
        </aside>

        {/* ── Template (visible + printable) ───────────────── */}
        <div className={`editor-canvas ${sidebarOpen ? "editor-canvas--shifted" : ""}`}>
          {children}
        </div>
      </div>
    </FieldsContext.Provider>
  );
}
