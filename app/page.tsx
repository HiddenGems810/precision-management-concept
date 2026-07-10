"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { copyDeck } from "../content/copy-deck";
import { PreviewButton } from "./components/PreviewButton";
import { ALL_ICONS } from "./components/PropertyIcons";

const exportRoot = "/assets/exports/";

function ConceptLabel() {
  return <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-blue/65">{copyDeck.disclaimer}</p>;
}

function LogoMark() {
  return <img className="h-[92px] w-[92px] object-contain" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="Precision Management logo" />;
}

function AssetPreview({ name }: { name: string }) {
  const usesPropertyImage = ["Owner Acquisition One-Sheet", "LinkedIn Owner Campaign", "Website Hero Concept", "Mobile UI Concept"].includes(name);
  const content = name === "Owner Acquisition One-Sheet"
    ? ["Owner one-sheet", "Comprehensive Management, From Strategy to Service.", "80+ properties · 11,000+ units · 20+ years", "WORK WITH US"]
    : name === "Resident Communication Notice"
      ? ["Resident communication", "Maintenance update", "Clear communication. Responsive support. Simple next steps.", "RESIDENT SUPPORT"]
      : name === "LinkedIn Owner Campaign"
        ? ["Owner campaign", "Lead with Passion. Serve with Precision.", "Multifamily management built for performance, compliance, and service.", "LEARN MORE"]
        : name === "Owner Email Header"
          ? ["Owner update", "The Precision way", "Hands-on management. Scalable systems. Personalized service.", "VIEW CAPABILITIES"]
          : name === "Website Hero Concept" || name === "Mobile UI Concept"
            ? ["Website concept", "Comprehensive management, from strategy to service.", "Owners: explore our capabilities. Residents: find support.", "WORK WITH US"]
            : name === "Corporate Letterhead"
              ? ["Corporate correspondence", "Precision Management", "Professional property management services", "CONTACT US"]
              : name === "Corporate Business Card"
                ? ["Print collateral", "Lead with Passion.", "Serve with Precision.", "PRECISIONMNGMT.COM"]
                : ["Brand standards", "Precision Management", "Official mark, typography, color, and communication hierarchy.", "VIEW LOGO SYSTEM"];

  return <div className="relative aspect-[16/10] overflow-hidden border border-concrete-gray bg-white text-left shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
    <div className="absolute inset-x-0 bottom-0 h-1 bg-maintenance-gold" />
    <div className="absolute inset-x-0 top-0 h-1.5 bg-precision-navy" />
    <div className="absolute inset-0 flex flex-col p-4 overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-blue/10 pb-2.5 mt-1">
        <img className="h-7 w-7 object-contain" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="Precision Management logo" />
        <div className="text-right flex-shrink-0 ml-4">
          <p className="text-[5px] font-bold uppercase tracking-[.15em] text-managed-teal truncate">{content[0]}</p>
        </div>
      </div>
      
      {/* Body Area */}
      <div className="mt-2.5 flex-1 grid grid-cols-[1fr_0.5fr] gap-3">
        <div className="flex flex-col justify-center pr-3 border-r border-slate-blue/10">
          <h4 className="text-[12px] font-bold leading-[1.1] tracking-tight text-precision-navy font-serif line-clamp-2">{content[1]}</h4>
          <p className="mt-1.5 text-[6.5px] leading-relaxed text-slate-blue font-medium line-clamp-2">{content[2]}</p>
          <span className="mt-2.5 inline-block self-start border-b border-maintenance-gold pb-0.5 text-[5px] font-bold tracking-[.15em] uppercase text-precision-navy">{content[3]}</span>
        </div>
        
        {/* Right Graphic Area */}
        <div className="relative flex flex-col justify-end bg-precision-navy overflow-hidden p-2 rounded-sm">
          {usesPropertyImage && <img className="absolute inset-0 size-full object-cover opacity-50 mix-blend-luminosity" src="/assets/exports/source-images/hero-atlanta.jpg" alt="Portfolio community" />}
          <div className="relative z-10 border-l border-maintenance-gold pl-1.5">
            <p className="text-[4.5px] font-bold uppercase tracking-[.15em] text-maintenance-gold leading-tight">Precision<br/>Standard</p>
            <p className="text-[6px] font-medium leading-tight text-white mt-1">Professionally<br/>managed.</p>
          </div>
        </div>
      </div>
      
      <p className="mt-2 text-[4px] uppercase tracking-[.15em] text-slate-blue/40 font-medium truncate">Independent concept by Ger&apos;Quia Abner</p>
    </div>
  </div>;
}


export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return <main className="min-h-screen bg-paper-white selection:bg-maintenance-gold selection:text-precision-navy">

    {/* ── Nav ──────────────────────────────────────────── */}
    <nav className="sticky top-0 z-50 border-b border-concrete-gray bg-paper-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-4"><LogoMark /><span className="text-2xl font-bold tracking-tight text-precision-navy">The Precision Standard</span></a>
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-slate-blue">
          <a className="hidden sm:block hover:text-maintenance-gold" href="#toolkit">Toolkit</a>
          <a className="hidden md:block hover:text-maintenance-gold" href="#library">Asset Library</a>
          <a className="rounded-sm bg-precision-navy px-4 py-3 text-white hover:bg-maintenance-gold hover:text-precision-navy" href="#delivery">Download Toolkit</a>
        </div>
      </div>
    </nav>

    {/* ── Hero ─────────────────────────────────────────── */}
    <section ref={containerRef} id="top" className="relative flex min-h-[760px] items-center justify-center overflow-hidden bg-precision-navy px-5 py-32 text-center text-white md:px-8">
      <motion.img style={{ y: yBg }} className="absolute inset-0 size-full object-cover object-center opacity-45" src="/assets/exports/source-images/hero-atlanta.jpg" alt="Precision Management portfolio community in Atlanta" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,44,68,.96),rgba(28,44,68,.72),rgba(28,44,68,.93))]" />
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#f3f4f6_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mb-10 inline-block border-y border-slate-blue/70 px-5 py-2 text-xs font-medium uppercase tracking-[.24em] text-maintenance-gold">Independent Concept by Ger'Quia Abner</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mx-auto max-w-5xl text-5xl font-bold leading-[.96] tracking-[-.055em] text-white drop-shadow-sm md:text-7xl lg:text-[6.5rem]">{copyDeck.hero.headline}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-10 max-w-4xl text-xl font-normal leading-relaxed text-white/90 md:text-2xl">{copyDeck.hero.subheadline}</motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="my-16 h-px w-32 bg-managed-teal" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mx-auto max-w-3xl border-y border-maintenance-gold/60 bg-precision-navy/65 px-6 py-4 text-center text-xs font-normal leading-relaxed text-white/80 shadow-xl backdrop-blur-sm md:text-sm">{copyDeck.disclaimer}</motion.div>
      </div>
    </section>

    {/* ── Executive Summary ────────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <p className="eyebrow">Executive summary</p>
      <h2 className="section-title">From research to a deployable communication system.</h2>
      <div className="mt-12 grid gap-px overflow-hidden border-y border-concrete-gray bg-concrete-gray md:grid-cols-5">
        {copyDeck.executiveSummary.map(([title, copy], index) => (
          <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} key={title} className="bg-white p-7">
            <span className="text-xs font-medium text-managed-teal">0{index + 1}</span>
            <h3 className="mt-7 font-bold text-precision-navy">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-blue">{copy}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>

    {/* ── Operating System ─────────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="bg-precision-navy px-5 py-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-maintenance-gold">Operating system / v2</p>
            <h2 className="section-title text-white">A full leasing lifecycle, covered end to end.</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">From listing a unit to retaining a renewal — every communication touchpoint has a ready template in this system.</p>
          </div>
          <ol className="border-t border-white/20">
            {copyDeck.operatingSystem.map(([number, title, description, outputs], index) => (
              <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} key={number} className="grid gap-4 border-b border-white/20 py-7 sm:grid-cols-[4rem_1fr] sm:gap-8">
                <span className="text-sm font-medium text-maintenance-gold">{number}</span>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-white/75">{description}</p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[.14em] text-managed-teal">{outputs}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
        <p className="mt-8 text-[10px] font-medium uppercase tracking-[.16em] text-white/55">{copyDeck.disclaimer}</p>
      </div>
    </motion.section>

    {/* ── Built for Property-Level Execution ───────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} id="toolkit" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <p className="eyebrow">Built for property-level execution</p>
      <h2 className="section-title">Not a moodboard. A deployable operating system.</h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-blue">A practical template system designed to help leasing teams, property managers, and resident-facing staff communicate with clarity across move-ins, renewals, notices, and property marketing.</p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {copyDeck.toolkitExecution.map((card, index) => {
          const IconComponent = ALL_ICONS.find((i) => i.name === card.icon)?.Component;
          return (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} key={card.label} className="toolkit-card">
            <div className="toolkit-card-icon">
              {IconComponent ? <IconComponent size={24} color="#1c2c44" /> : card.icon}
            </div>
            <h3 className="text-lg font-bold text-precision-navy">{card.label}</h3>
            <p className="toolkit-card-problem">{card.problem}</p>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[.12em] text-managed-teal">Templates included</p>
              <div className="toolkit-card-assets">
                {card.assets.map((a) => <span key={a} className="toolkit-chip">{a}</span>)}
              </div>
            </div>
            <p className="border-t border-concrete-gray pt-4 text-xs leading-relaxed text-slate-blue"><strong className="text-precision-navy">In practice: </strong>{card.use}</p>
          </motion.div>
        )})}
      </div>
    </motion.section>

    {/* ── Template Production System ──────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} id="library" className="bg-concrete-gray/45 px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Template production system</p>
        <h2 className="section-title">8 template systems. One operational standard.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-blue">Every template is built with a live editor. Enter property data, preview the print-ready layout, and export to PDF instantly.</p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {copyDeck.assetLibraryCategories.map((cat, index) => (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} key={cat.id} className="category-card">
              <div className="border-b-4 border-maintenance-gold bg-precision-navy px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="category-number">{cat.number}</span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">{cat.count} template{cat.count !== 1 ? "s" : ""}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-white">{cat.title}</h3>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="space-y-4 mb-6 flex-1">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-managed-teal mb-1">Primary Use</p>
                    <p className="text-xs text-slate-blue leading-relaxed">{cat.primaryUse}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-managed-teal mb-1">Editable Fields</p>
                    <p className="text-xs text-slate-blue leading-relaxed">{cat.editableFields}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-managed-teal mb-1">Export Format</p>
                    <p className="text-xs text-slate-blue leading-relaxed">{cat.exportFormat}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-managed-teal mb-1">Department / User</p>
                    <p className="text-xs text-slate-blue leading-relaxed">{cat.departmentUser}</p>
                  </div>
                </div>
                <div className="mt-auto pt-5 border-t border-concrete-gray flex flex-wrap gap-3">
                  {(cat.route || cat.downloadHref) && (
                    <PreviewButton url={cat.route || `${exportRoot}${cat.downloadHref}`} />
                  )}
                  {cat.route && (
                    <Link className="inline-block border-b-2 border-maintenance-gold pb-1 text-[10px] font-medium uppercase tracking-widest text-precision-navy hover:text-managed-teal" href={cat.route}>
                      Open editable templates
                    </Link>
                  )}
                  {cat.downloadHref && (
                    <a className="inline-block border-b border-managed-teal pb-1 text-[10px] font-medium uppercase tracking-widest text-managed-teal hover:text-precision-navy" href={`${exportRoot}${cat.downloadHref}`} download>
                      Download PDF
                    </a>
                  )}
                  {!cat.route && !cat.downloadHref && (
                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-blue/50">Coming in next phase</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <ConceptLabel />
      </div>
    </motion.section>

    {/* ── Icon System Preview ───────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Property icon system</p>
          <h2 className="section-title">15 icons. One operational language.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-blue">Monoline, geometric SVG icons designed for property operations — usable at any size, on flyers, notices, digital posts, and resident kits.</p>
          <p className="mt-4 text-sm text-slate-blue/70">Each icon ships as an exportable React component with typed props for size and color. No external library dependency. (Drag and drop SVG support can be integrated directly into templates).</p>
          <a href="/assets/exports/precision-management-icons.zip" download className="button mt-8">Download SVG icon set</a>
          <ConceptLabel />
        </div>
        <div className="bg-concrete-gray/60 p-8">
          <div className="grid grid-cols-5 gap-5">
            {ALL_ICONS.map(({ name, Component }, index) => (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} key={name} className="flex flex-col items-center gap-2 p-3 bg-white text-center">
                <Component size={28} color="#1c2c44" />
                <span className="text-[8px] font-medium uppercase tracking-wider text-slate-blue/70 leading-tight">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>

    {/* ── Brand + Print Collateral ──────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="bg-concrete-gray/45 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Brand + print collateral</p>
            <h2 className="section-title">A system that looks composed on paper.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-blue">The official Precision Management mark, proper SF Pro typography, and a measured navy/gold system make correspondence feel as disciplined as the operating model behind it.</p>
            <a href={`${exportRoot}brand-guidelines/precision-brand-guidelines-preview.pdf`} download className="button mt-8">Download brand guidelines</a>
            <ConceptLabel />
          </div>
          {/* Custom Brand Visual */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[560px] bg-white border border-concrete-gray shadow-2xl overflow-hidden p-5 flex flex-col">
            {/* Top accent bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-maintenance-gold" />
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#1c2c44_1px,transparent_1px),linear-gradient(90deg,#1c2c44_1px,transparent_1px)] [background-size:32px_32px]" />
            
            <div className="relative flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {/* Logo Focus */}
              <div className="md:col-span-2 bg-concrete-gray/30 border border-slate-blue/10 flex flex-col items-center justify-center p-10 relative overflow-hidden group">
                <img className="h-36 w-36 object-contain relative z-10 transition-transform duration-700 group-hover:scale-105" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="Precision Management logo" />
                <div className="absolute -right-16 -bottom-16 opacity-[0.03] mix-blend-multiply">
                   <img className="h-96 w-96 object-contain" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="" />
                </div>
              </div>

              {/* Typography */}
              <div className="bg-precision-navy p-6 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -top-4 -right-2 p-4 opacity-[0.04] text-white font-bold text-[150px] leading-none select-none transition-transform duration-700 group-hover:-translate-y-2 group-hover:translate-x-2">Aa</div>
                <div className="relative z-10">
                  <p className="text-[9px] font-bold uppercase tracking-[.25em] text-maintenance-gold">Typography</p>
                  <p className="text-5xl font-bold tracking-tight text-white mt-5">Aa</p>
                </div>
                <div className="relative z-10 mt-8">
                  <p className="text-lg font-medium text-white tracking-wide">SF Pro / Inter</p>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">System UI Sans</p>
                </div>
              </div>

              {/* Color System */}
              <div className="bg-concrete-gray/30 border border-slate-blue/10 p-5 flex flex-col">
                <p className="text-[9px] font-bold uppercase tracking-[.25em] text-precision-navy mb-4">Color System</p>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="relative bg-precision-navy flex flex-col justify-end p-2.5 shadow-sm border border-black/5 hover:scale-[1.02] transition-transform cursor-default"><span className="text-[7.5px] font-bold tracking-widest uppercase text-white/70">Navy</span></div>
                  <div className="relative bg-maintenance-gold flex flex-col justify-end p-2.5 shadow-sm border border-black/5 hover:scale-[1.02] transition-transform cursor-default"><span className="text-[7.5px] font-bold tracking-widest uppercase text-precision-navy/70">Gold</span></div>
                  <div className="relative bg-managed-teal flex flex-col justify-end p-2.5 shadow-sm border border-black/5 hover:scale-[1.02] transition-transform cursor-default"><span className="text-[7.5px] font-bold tracking-widest uppercase text-white/80">Teal</span></div>
                  <div className="relative bg-slate-blue flex flex-col justify-end p-2.5 shadow-sm border border-black/5 hover:scale-[1.02] transition-transform cursor-default"><span className="text-[7.5px] font-bold tracking-widest uppercase text-white/80">Slate</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    {/* ── Owner Acquisition ─────────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="bg-precision-navy px-5 py-24 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-maintenance-gold">Owner acquisition</p>
          <h2 className="section-title text-white">Trust signals with no invented outcomes.</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">The campaign uses only verified public signals: 80+ properties, 11,000+ units, 20+ years, and multifamily expertise across conventional, student, and affordable housing.</p>
          <a href={`${exportRoot}owner-acquisition/owner-acquisition-one-sheet.pdf`} download className="button mt-8 bg-maintenance-gold text-precision-navy">Download owner one-sheet</a>
        </div>
        {/* Custom Owner Acquisition Visual */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[560px] flex flex-col p-6 bg-white shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-maintenance-gold" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#1c2c44_1px,transparent_1px),linear-gradient(90deg,#1c2c44_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Header */}
          <div className="relative flex items-end justify-between border-b border-slate-blue/10 pb-5 pt-2">
            <div className="flex items-center gap-4">
              <img className="h-10 w-10 object-contain" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="Precision Management logo" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.25em] text-precision-navy">Portfolio Intelligence</p>
                <p className="text-[9px] font-bold text-slate-blue uppercase tracking-widest mt-1">Verified Public Signals</p>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-managed-teal/10 text-managed-teal text-[8px] uppercase tracking-[.2em] font-bold border border-managed-teal/20">
              Data Verified
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="relative flex-1 grid grid-cols-2 grid-rows-2 gap-4 mt-6">
            {/* Stat 1 */}
            <div className="bg-concrete-gray/30 p-8 flex flex-col justify-center border border-slate-blue/5 group hover:border-maintenance-gold/30 transition-colors cursor-default">
              <p className="text-[9px] font-bold uppercase tracking-[.2em] text-slate-blue">Total Properties</p>
              <div className="mt-3 flex items-baseline gap-1">
                <p className="text-6xl font-bold tracking-tight text-precision-navy">80</p>
                <span className="text-3xl font-bold text-maintenance-gold">+</span>
              </div>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-concrete-gray/30 p-8 flex flex-col justify-center border border-slate-blue/5 group hover:border-maintenance-gold/30 transition-colors cursor-default">
              <p className="text-[9px] font-bold uppercase tracking-[.2em] text-slate-blue">Total Units</p>
              <div className="mt-3 flex items-baseline gap-1">
                <p className="text-6xl font-bold tracking-tight text-precision-navy">11<span className="text-4xl">k</span></p>
                <span className="text-3xl font-bold text-maintenance-gold">+</span>
              </div>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-concrete-gray/30 p-8 flex flex-col justify-center border border-slate-blue/5 group hover:border-maintenance-gold/30 transition-colors cursor-default">
              <p className="text-[9px] font-bold uppercase tracking-[.2em] text-slate-blue">Years Active</p>
              <div className="mt-3 flex items-baseline gap-1">
                <p className="text-6xl font-bold tracking-tight text-precision-navy">20</p>
                <span className="text-3xl font-bold text-maintenance-gold">+</span>
              </div>
            </div>
            
            {/* Asset Classes */}
            <div className="bg-precision-navy p-8 flex flex-col justify-center border border-white/5 relative overflow-hidden group cursor-default">
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <img className="h-40 w-40 object-contain" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="" />
              </div>
              <div className="relative z-10">
                <p className="text-[9px] font-bold uppercase tracking-[.2em] text-maintenance-gold">Asset Classes</p>
                <ul className="mt-6 space-y-4 text-[10px] font-bold uppercase tracking-[.2em] text-white">
                  <li className="flex items-center gap-3">
                    <div className="h-0.5 w-3 bg-maintenance-gold" /> Conventional
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-0.5 w-3 bg-managed-teal" /> Student
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-0.5 w-3 bg-concrete-gray" /> Affordable
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="relative mt-6 border-t border-slate-blue/10 pt-5 flex justify-between items-center">
            <p className="text-[7px] uppercase tracking-[.25em] text-slate-blue/50 font-bold">Owner Acquisition Strategy Document</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-maintenance-gold' : 'bg-slate-blue/10'}`} />)}
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    {/* ── Resident Communication ────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Custom Resident Communication Visual */}
        <div className="order-2 relative h-[560px] flex bg-precision-navy shadow-2xl lg:order-1 overflow-hidden group cursor-default border-8 border-precision-navy">
          
          {/* Sidebar */}
          <div className="w-[35%] bg-white/5 border-r border-white/10 p-6 flex flex-col gap-6 hidden sm:flex">
             <div className="flex items-center gap-3">
               <img className="h-6 w-6 object-contain brightness-0 invert" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="Precision Management logo" />
               <p className="text-[9px] font-bold uppercase tracking-[.25em] text-white">Template Library</p>
             </div>
             
             <div className="space-y-2 mt-4">
               <div className="px-4 py-3 bg-maintenance-gold text-precision-navy text-[8px] font-bold uppercase tracking-[.2em] border-l-2 border-white">Maintenance Notice</div>
               <div className="px-4 py-3 text-white/50 text-[8px] font-bold uppercase tracking-[.2em] border-l-2 border-transparent hover:bg-white/5 transition-colors">Lease Renewal</div>
               <div className="px-4 py-3 text-white/50 text-[8px] font-bold uppercase tracking-[.2em] border-l-2 border-transparent hover:bg-white/5 transition-colors">Policy Update</div>
               <div className="px-4 py-3 text-white/50 text-[8px] font-bold uppercase tracking-[.2em] border-l-2 border-transparent hover:bg-white/5 transition-colors">Community Event</div>
               <div className="px-4 py-3 text-white/50 text-[8px] font-bold uppercase tracking-[.2em] border-l-2 border-transparent hover:bg-white/5 transition-colors">Violation Notice</div>
             </div>
             
             <div className="mt-auto">
                <div className="h-28 relative overflow-hidden bg-white/10 border border-white/10">
                   <img className="absolute inset-0 size-full object-cover opacity-40 mix-blend-overlay" src="/assets/exports/source-images/hero-atlanta.jpg" alt="" />
                   <div className="absolute bottom-3 left-3">
                     <p className="text-[7px] font-bold uppercase tracking-widest text-white">Precision Mgmt</p>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Document Preview Area */}
          <div className="flex-1 relative flex items-center justify-center bg-[#0d1520] p-6 sm:p-10 overflow-hidden">
             {/* Grid pattern */}
             <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
             
             {/* Document Paper */}
             <div className="w-full h-full max-w-[360px] bg-white shadow-2xl relative z-10 flex flex-col group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                {/* Top Border */}
                <div className="h-2 w-full bg-precision-navy" />
                
                {/* Header */}
                <div className="px-8 pt-8 pb-6 flex justify-between items-start border-b border-concrete-gray">
                   <img className="h-8 w-8 object-contain" src="/assets/exports/logo-system/precision-management-official-logo.svg" alt="Precision Management logo" />
                   <div className="text-right">
                     <p className="text-[11px] font-bold tracking-tight text-precision-navy">Maintenance Update</p>
                     <p className="text-[7px] font-bold uppercase tracking-widest text-slate-blue mt-1.5">Oct 12, 2024</p>
                   </div>
                </div>
                
                {/* Body */}
                <div className="px-8 py-8 flex flex-col gap-8">
                   <div className="relative pl-5 border-l-[3px] border-maintenance-gold">
                      <p className="text-[9px] font-bold uppercase tracking-[.2em] text-managed-teal mb-2">Clear Expectations</p>
                      <p className="text-[12px] font-medium text-slate-blue leading-relaxed">Our team will be performing routine system maintenance between 9:00 AM and 1:00 PM. Water service will be briefly interrupted during this window.</p>
                   </div>
                   
                   <div className="relative pl-5 border-l-[3px] border-concrete-gray">
                      <p className="text-[9px] font-bold uppercase tracking-[.2em] text-managed-teal mb-2">Responsive Support</p>
                      <p className="text-[12px] font-medium text-slate-blue leading-relaxed">If you require special accommodations during this window, please contact the office 24/7. Our team is here to help.</p>
                   </div>
                </div>
                
                {/* Footer Bar */}
                <div className="mt-auto bg-concrete-gray/30 p-6 flex items-center justify-between border-t border-concrete-gray/50">
                   <p className="text-[8px] font-bold uppercase tracking-[.2em] text-slate-blue/60">Resident Communication</p>
                   <div className="px-4 py-2 bg-precision-navy text-white text-[7.5px] font-bold uppercase tracking-[.2em] flex items-center cursor-pointer hover:bg-maintenance-gold hover:text-precision-navy transition-colors">Download PDF</div>
                </div>
             </div>
             
          </div>
          
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow">Resident communication</p>
          <h2 className="section-title">Clear next steps, professionally managed.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-blue">Every operational notice leads with resident support, a responsive maintenance process, service expectations, and clear communication — never lifestyle targeting.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/print/resident-notices" className="button">Open notice templates</Link>
            <a href={`${exportRoot}resident-communication/resident-maintenance-notice.pdf`} download className="button bg-concrete-gray text-precision-navy hover:bg-maintenance-gold">Download PDF</a>
          </div>
          <ConceptLabel />
        </div>
      </div>
    </motion.section>

    {/* ── Move-In Kit highlight ─────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="bg-concrete-gray/45 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Move-in communication</p>
            <h2 className="section-title">A smoother move-in starts with clearer communication.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-blue">Five ready-to-edit templates that set expectations on day one: welcome letter, move-in checklist, utilities setup guide, maintenance request guide, and office contact card.</p>
            <Link href="/print/move-in-kit" className="button mt-8">Open move-in kit</Link>
            <ConceptLabel />
          </div>
          <div className="border border-concrete-gray bg-white shadow-xl">
            <div className="border-b-4 border-maintenance-gold bg-precision-navy p-6 text-white">
              <p className="text-[9px] font-medium uppercase tracking-[.16em] text-maintenance-gold">Move-in kit — [property name]</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight">Welcome to your new home.</h3>
              <p className="mt-3 text-sm text-white/70">Inside: move-in checklist · utilities guide · maintenance process · office contact card</p>
            </div>
            <div className="divide-y divide-concrete-gray">
              {["☐ Confirm move-in date with leasing office", "☐ Complete lease documents", "☐ Set up renter's insurance", "☐ Arrange utilities transfer", "☐ Register on resident portal"].map((item) => (
                <div key={item} className="px-6 py-3 text-sm text-slate-blue">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    {/* ── Priority Properties Strategic ────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-maintenance-gold">Priority properties</p>
          <h2 className="section-title">Designed for Properties That Need Stronger Support.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-blue">Some properties do not need a full rebrand. They need clearer flyers, better move-in documents, cleaner renewal communication, stronger leasing assets, and a more consistent resident experience. This system gives property teams practical tools they can use quickly without rebuilding materials from scratch.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 rounded bg-concrete-gray px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-precision-navy">High-friction move-ins</span>
            <span className="inline-flex items-center gap-2 rounded bg-concrete-gray px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-precision-navy">Inconsistent communication</span>
            <span className="inline-flex items-center gap-2 rounded bg-concrete-gray px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-precision-navy">Stronger leasing support</span>
          </div>
          <ConceptLabel />
        </div>
        <div className="bg-precision-navy p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
             <LogoMark />
          </div>
          <div className="relative z-10 border-l-2 border-maintenance-gold pl-6">
            <p className="text-3xl font-bold text-white leading-tight">Empower teams to execute faster and safer.</p>
            <p className="mt-6 text-sm text-white/70 leading-relaxed uppercase tracking-widest font-bold">Standardized Brand <span className="text-maintenance-gold mx-2">/</span> Legally Compliant <span className="text-maintenance-gold mx-2">/</span> Instant Deployment</p>
          </div>
        </div>
      </div>
    </motion.section>

    {/* ── Delivery Package ─────────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} id="delivery" className="bg-precision-navy px-5 py-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-maintenance-gold">Final delivery package</p>
        <h2 className="section-title text-white">What Precision Management would receive.</h2>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {copyDeck.deliveryPackage.map((item, index) => (
            <div key={item} className="border-l-2 border-maintenance-gold bg-white/8 p-6">
              <span className="text-xs font-medium text-maintenance-gold">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-bold text-white">{item}</h3>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={`${exportRoot}brand-guidelines/precision-brand-guidelines-preview.pdf`} download className="button bg-maintenance-gold text-precision-navy">Download toolkit starting point</a>
          <Link href="/print/move-in-kit" className="button border border-white/40 bg-transparent text-white hover:bg-white hover:text-precision-navy">Preview move-in kit</Link>
        </div>
      </div>
    </motion.section>

    {/* ── CTA ──────────────────────────────────────────── */}
    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} id="contact" className="bg-paper-white px-5 py-28 text-center md:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Next conversation</p>
        <h2 className="section-title mx-auto text-center">{copyDeck.finalCTA.title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-slate-blue">{copyDeck.finalCTA.subcopy}</p>
        <div className="mt-6 border-y border-concrete-gray py-5 text-sm text-slate-blue/70">
          This is not just a designer. This is someone who understands leasing operations, resident communication, and scalable marketing systems.
        </div>
        <a className="button mt-9 bg-precision-navy text-white" href="mailto:contact@gerquiaabner.com">{copyDeck.finalCTA.buttonText}</a>
        <p className="mt-7 text-xs text-slate-blue/50">{copyDeck.disclaimer}</p>
      </div>
    </motion.section>
  </main>;
}
