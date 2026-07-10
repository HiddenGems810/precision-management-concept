"use client";

import { useState, useEffect } from "react";

export function PreviewButton({ url, label = "Preview" }: { url: string; label?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-block border-b border-concrete-gray pb-1 text-[10px] font-medium uppercase tracking-widest text-slate-blue hover:text-precision-navy hover:border-precision-navy transition-colors"
      >
        {label}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-black/80 p-4 backdrop-blur-sm sm:p-8" onClick={() => setIsOpen(false)}>
          <div 
            className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-concrete-gray bg-light-gray px-5 py-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-precision-navy">Template Preview</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-concrete-gray text-slate-blue transition-colors hover:bg-precision-navy hover:text-white"
                aria-label="Close preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 bg-concrete-gray">
              <iframe 
                src={url} 
                className="h-full w-full border-0" 
                title="Preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
