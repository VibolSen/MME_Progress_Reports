"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Language,
  PRESENTATION_META,
  AGENDA_ITEMS,
  DEPARTMENTS,
  COMPONENTS_DATA,
  PENDING_ITEMS_SUMMARY,
  CHALLENGES_DATA,
  TIMELINE_MILESTONES,
} from "./slidesData";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Maximize,
  Minimize,
  Sun,
  Moon,
  Globe,
  Printer,
  Check,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

const TOTAL_SLIDES = 12;

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const slideNum = parseInt(hash, 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= TOTAL_SLIDES) {
        return slideNum - 1;
      }
    }
    return 0;
  });

  const [lang, setLang] = useState<Language>("km"); // Default to Khmer as requested for Cambodian ministry
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  // Dynamic scale calculation for 1920x1080 stage
  const [scale, setScale] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      const h = window.innerHeight - 72; // Reserve 72px for bottom bar
      const s = Math.min(w / 1920, h / 1080);
      return s > 0 ? s : 1;
    }
    return 1;
  });

  const fit = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight - 72;
    const s = Math.min(w / 1920, h / 1080);
    setScale(s > 0 ? s : 1);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", fit);
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const slideNum = parseInt(hash, 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= TOTAL_SLIDES) {
        setCurrentSlide(slideNum - 1);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [fit]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < TOTAL_SLIDES) {
      setCurrentSlide(index);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${index + 1}`);
      }
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const toggleLanguage = (newLang?: Language) => {
    setLang((prev) => (newLang ? newLang : prev === "km" ? "en" : "km"));
    setLangDropdownOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(TOTAL_SLIDES - 1);
          break;
        case "l":
        case "L":
          toggleLanguage();
          break;
        case "t":
        case "T":
          toggleTheme();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "p":
        case "P":
          if (!e.ctrlKey && !e.metaKey) {
            window.print();
          }
          break;
        case "Escape":
          setLangDropdownOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  // Canva-style click on viewport sides (left 25% = prev, right 75% = next)
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a, input, select, .interactive, .card, .scope-card, .tlg-card")) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width * 0.25) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // Slide navigation list
  const slideList = useMemo(
    () => [
      { id: 1, labelEn: "Title", labelKm: "ចំណងជើង" },
      { id: 2, labelEn: "Agenda", labelKm: "របៀបវារៈ" },
      { id: 3, labelEn: "Scope", labelKm: "វិសាលភាព" },
      { id: 4, labelEn: "Part 1", labelKm: "សមាសភាគ ១ & ២" },
      { id: 5, labelEn: "Part 2", labelKm: "សមាសភាគ ៣ & ៤" },
      { id: 6, labelEn: "Part 3", labelKm: "សមាសភាគ ៥" },
      { id: 7, labelEn: "Pending", labelKm: "ការងារសេសសល់" },
      { id: 8, labelEn: "Challenges", labelKm: "បញ្ហាប្រឈម" },
      { id: 9, labelEn: "Timeline", labelKm: "កាលវិភាគ" },
      { id: 10, labelEn: "Action Plan", labelKm: "ផែនការ ៣០ថ្ងៃ" },
      { id: 11, labelEn: "Conclusion", labelKm: "សេចក្តីសន្និដ្ឋាន" },
      { id: 12, labelEn: "Thanks", labelKm: "សូមអរគុណ" },
    ],
    []
  );

  const progressPercent = ((currentSlide + 1) / TOTAL_SLIDES) * 100;

  return (
    <div
      className={`deck ${isFullscreen ? "fs" : ""}`}
      id="deck"
      data-theme={theme}
      data-lang={lang}
    >
      {/* Viewport wrapping the 1920x1080 stage */}
      <div className="viewport" id="vp" onClick={handleViewportClick}>
        
        {/* SLIDE 1: Title (ចំណងជើង) */}
        <section
          className={`slide ${currentSlide === 0 ? "on" : ""}`}
          data-label="Title"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
              <div className="blob b2" />
            </div>

            <div className="t-left">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km"
                  ? "ក្រសួងរ៉ែ និងថាមពល · MME Progress Reports"
                  : "Ministry of Mines and Energy · MME"}
              </div>
              <h1 className="t-title a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    របាយការណ៍វឌ្ឍភាព <span className="grad">គម្រោងប្រព័ន្ធបច្ចេកវិទ្យា</span> MME
                  </>
                ) : (
                  <>
                    MME Digital <span className="grad">Transformation</span> Progress
                  </>
                )}
              </h1>
              <div className="t-badge a" style={{ "--d": 2 } as React.CSSProperties}>
                <span className="ic soft">
                  <Image
                    src="/logo/logo tab.svg"
                    alt="Emblem"
                    width={26}
                    height={26}
                    priority
                  />
                </span>
                <span>
                  {lang === "km"
                    ? "របាយការណ៍បច្ចុប្បន្នភាពសម្រាប់ថ្នាក់ដឹកនាំក្រសួង"
                    : "Executive Briefing for Ministry Leadership"}
                </span>
              </div>
              <p className="t-sub a" style={{ "--d": 3 } as React.CSSProperties}>
                {lang === "km"
                  ? PRESENTATION_META.taglineKm
                  : PRESENTATION_META.taglineEn}
              </p>
              <button
                className="cta a interactive"
                style={{ "--d": 4 } as React.CSSProperties}
                onClick={() => goToSlide(1)}
              >
                <span>{lang === "km" ? "ចាប់ផ្តើមបទបង្ហាញ" : "Start the presentation"}</span>
                <ArrowRight size={20} />
              </button>
              <div className="t-meta a" style={{ "--d": 5 } as React.CSSProperties}>
                <Image
                  src="/logo/Oone logo.svg"
                  alt="OONE Power"
                  width={140}
                  height={40}
                  priority
                  className="object-contain"
                />
                <div>
                  <small>{lang === "km" ? "រៀបចំ និងអនុវត្តដោយ" : "Prepared by"}</small>
                  <b>{PRESENTATION_META.companyEn}</b>
                </div>
              </div>
            </div>

            <div className="t-photo a-z" style={{ "--d": 2 } as React.CSSProperties}>
              <div className="wire-grid" />
              
              <div className="float-card a" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="flex items-center justify-between mb-3">
                  <span className="chip grn text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {lang === "km" ? "នាយកដ្ឋានទូទៅ (១ ក្នុងចំណោម ៣)" : "General Department (1 of 3)"}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--grn)]">
                    {lang === "km" ? "ទិន្នន័យរួចរាល់" : "Data Ready"}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[var(--tx)] mb-1">
                  {lang === "km"
                    ? "ប្រព័ន្ធរដ្ឋបាល ការផ្គត់ផ្គង់ និងការគ្រប់គ្រង"
                    : "Operations, Supply & Administration"}
                </h4>
                <p className="text-sm text-[var(--mu)] leading-relaxed">
                  {lang === "km"
                    ? "ប្រព័ន្ធកក់បន្ទប់ប្រជុំ និងផ្គត់ផ្គង់សម្ភារ បានដាក់ឱ្យប្រើប្រាស់ជាក់ស្តែងរួចហើយ។"
                    : "Meeting room booking and office supplies systems are currently live in production."}
                </p>
              </div>

              <div className="float-card a" style={{ "--d": 4 } as React.CSSProperties}>
                <div className="flex items-center justify-between mb-3">
                  <span className="chip amb text-xs">
                    <Clock size={14} className="text-amber-400" />
                    {lang === "km" ? "ការងារនៅសេសសល់ (Pending)" : "Pending Review"}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--amb)]">
                    {lang === "km" ? "៥ ចំណុចសំខាន់" : "5 Key Items"}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[var(--tx)] mb-1">
                  {lang === "km"
                    ? "ការសម្រេចគោលការណ៍ & ការផ្ទៀងផ្ទាត់"
                    : "Policy Decisions & Formats"}
                </h4>
                <p className="text-sm text-[var(--mu)] leading-relaxed">
                  {lang === "km"
                    ? "ទាមទារការសម្របសម្រួលជាមួយក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ លើទម្រង់កាតាបៀវត្ស និងទ្រព្យសម្បត្តិរដ្ឋ។"
                    : "Inter-ministerial alignment needed with MEF regarding payroll slips and asset codes."}
                </p>
              </div>

              <div className="float-card a" style={{ "--d": 5 } as React.CSSProperties}>
                <div className="flex items-center justify-between mb-3">
                  <span className="chip pri text-xs">
                    <Calendar size={14} className="text-indigo-400" />
                    {lang === "km" ? "កាលវិភាគបញ្ចប់" : "Target Completion"}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--pri)]">
                    Q4 2026
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[var(--tx)] mb-1">
                  {lang === "km" ? "ការប្រគល់ជូនដំណាក់កាលពេញលេញ" : "Full Phased Delivery"}
                </h4>
                <p className="text-sm text-[var(--mu)] leading-relaxed">
                  {lang === "km"
                    ? "ការដាក់ដំណើរការជាជំហានៗ រួមទាំងការតភ្ជាប់ទិន្នន័យនាយកដ្ឋានទាំង ៣។"
                    : "Structured rollout across all 4 quarters with full stakeholder training."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 2: Agenda (របៀបវារៈ) */}
        <section
          className={`slide ${currentSlide === 1 ? "on" : ""}`}
          data-label="Agenda"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "របៀបវារៈបទបង្ហាញ" : "Agenda"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    ទិដ្ឋភាពទូទៅនៃ <span className="g">ខ្លឹមសារបទបង្ហាញ</span>
                  </>
                ) : (
                  <>
                    Presentation <span className="g">Overview</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "បទបង្ហាញនេះផ្តោតលើ ៣ ចំណុចស្នូល ស្របតាមការណែនាំរបស់ថ្នាក់ដឹកនាំក្រសួងរ៉ែ និងថាមពល"
                  : "Covering the 3 primary pillars required by MME leadership for departmental digitalization"}
              </p>
            </div>

            <div className="ag">
              {AGENDA_ITEMS.map((item, idx) => (
                <button
                  key={item.key}
                  className="a interactive"
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                  onClick={() => {
                    if (idx === 0) goToSlide(2);
                    else if (idx === 1) goToSlide(7);
                    else if (idx === 2) goToSlide(8);
                  }}
                >
                  <span className="n">{item.num}</span>
                  <span className="ic soft">
                    {idx === 0 && <Layers size={28} />}
                    {idx === 1 && <AlertTriangle size={28} className="text-amber-400" />}
                    {idx === 2 && <Clock size={28} className="text-emerald-400" />}
                  </span>
                  <span className="t">
                    {lang === "km" ? item.titleKm : item.titleEn}
                    <small>
                      {lang === "km" ? item.descKm : item.descEn}
                    </small>
                  </span>
                  <div className="mt-auto pt-6 flex items-center justify-between w-full border-t border-[var(--pb)]">
                    <span className="text-xs font-mono text-[var(--pri)]">
                      {lang === "km" ? item.tagKm : item.tagEn}
                    </span>
                    <span className="go">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 3: Department Scope (វិសាលភាពនាយកដ្ឋាន) */}
        <section
          className={`slide ${currentSlide === 2 ? "on" : ""}`}
          data-label="Scope"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០១ · វិសាលភាពនាយកដ្ឋាន" : "01 · Department Scope"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    ស្ថានភាពទិន្នន័យ <span className="g">នៃនាយកដ្ឋានទាំង ៣</span>
                  </>
                ) : (
                  <>
                    Data Status of the <span className="g">3 Key Departments</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "បច្ចុប្បន្នភាព៖ នាយកដ្ឋានទូទៅមានទិន្នន័យរួចរាល់ពេញលេញ ចំណែកនាយកដ្ឋានចំនួន ២ ទៀតកំពុងស្ថិតក្នុងការរៀបចំទិន្នន័យ"
                  : "Current coverage: General Department has full data ready; 2 additional departments are in the active requirement pipeline."}
              </p>
            </div>

            <div className="scope-grid">
              {DEPARTMENTS.map((dept, idx) => (
                <div
                  key={dept.id}
                  className={`scope-card ${dept.status === "active" ? "active" : "pending"} a`}
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span className={`chip ${dept.status === "active" ? "grn" : "amb"}`}>
                      {dept.status === "active" ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          {lang === "km" ? dept.statusKm : dept.statusEn}
                        </>
                      ) : (
                        <>
                          <Clock size={14} />
                          {lang === "km" ? dept.statusKm : dept.statusEn}
                        </>
                      )}
                    </span>
                    <span className="font-mono text-xs text-[var(--mu)]">
                      {idx === 0 ? "DEP-01" : idx === 1 ? "DEP-02" : "DEP-03"}
                    </span>
                  </div>

                  <h3>{lang === "km" ? dept.nameKm : dept.nameEn}</h3>
                  <p className="text-sm text-[var(--mu)] leading-relaxed">
                    {lang === "km" ? dept.descriptionKm : dept.descriptionEn}
                  </p>

                  <div className="scope-items">
                    {idx === 0 ? (
                      <>
                        <div className="scope-item">
                          <Check size={18} className="text-emerald-400" />
                          <span>{lang === "km" ? "១.១ ប្រតិបត្តិការ & បន្ទប់ប្រជុំ (ផ្សាយបន្តផ្ទាល់)" : "1.1 Meeting Room & Supply (Live)"}</span>
                        </div>
                        <div className="scope-item">
                          <Check size={18} className="text-emerald-400" />
                          <span>{lang === "km" ? "១.២ បេសកកម្ម & ប្រាក់បៀវត្ស (សិក្សារួចរាល់)" : "1.2 Mission & Payroll (Studied)"}</span>
                        </div>
                        <div className="scope-item">
                          <Check size={18} className="text-emerald-400" />
                          <span>{lang === "km" ? "១.៣ ការគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ (រៀបចំកូដ)" : "1.3 State Assets Management (In Progress)"}</span>
                        </div>
                        <div className="scope-item">
                          <Check size={18} className="text-emerald-400" />
                          <span>{lang === "km" ? "១.៤ ផែនការ & ថវិកា (ត្រៀមដាក់ឱ្យប្រើ)" : "1.4 Planning & Budgeting (UAT Stage)"}</span>
                        </div>
                        <div className="scope-item">
                          <Check size={18} className="text-emerald-400" />
                          <span>{lang === "km" ? "១.៥ ឯកសារអគ្គលេខាធិការដ្ឋាន (អភិវឌ្ឍរួចរាល់)" : "1.5 Secretariat Documents (Dev Complete)"}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="scope-item opacity-60">
                          <Clock size={18} className="text-amber-400" />
                          <span>{lang === "km" ? "ការកំណត់វិសាលភាពការងាររួម" : "Requirement scope definition"}</span>
                        </div>
                        <div className="scope-item opacity-60">
                          <Clock size={18} className="text-amber-400" />
                          <span>{lang === "km" ? "ការប្រមូលទម្រង់ឯកសាររដ្ឋបាល" : "Form & document collection"}</span>
                        </div>
                        <div className="scope-item opacity-60">
                          <Clock size={18} className="text-amber-400" />
                          <span>{lang === "km" ? "ការកំណត់សិទ្ធិ និងតួនាទីអ្នកប្រើប្រាស់" : "User roles & approval matrix"}</span>
                        </div>
                        <div className="scope-item opacity-60">
                          <Clock size={18} className="text-amber-400" />
                          <span>{lang === "km" ? "រង់ចាំការសម្របសម្រួលទិន្នន័យ" : "Pending stakeholder data intake"}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-[var(--pb)] flex items-center justify-between text-xs">
                    <span className="text-[var(--mu)] font-mono">
                      {idx === 0
                        ? (lang === "km" ? "សមាសភាគ៖ ៥ / ៥ រួចរាល់" : "Components: 5 / 5 Studied")
                        : (lang === "km" ? "ដំណាក់កាលបន្ទាប់" : "Next Phase Pipeline")}
                    </span>
                    <span className={`font-bold ${idx === 0 ? "text-[var(--grn)]" : "text-[var(--amb)]"}`}>
                      {idx === 0 ? "100% INCLUDED" : "PIPELINE"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 4: Part 1 - Component 1 & 2 */}
        <section
          className={`slide ${currentSlide === 3 ? "on" : ""}`}
          data-label="Components 1 & 2"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០២ · វឌ្ឍភាពនាយកដ្ឋានទូទៅ" : "02 · General Department Progress"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សមាសភាគទី១ & ទី២៖ <span className="g">ប្រតិបត្តិការ បេសកកម្ម & បៀវត្ស</span>
                  </>
                ) : (
                  <>
                    Component 1 & 2: <span className="g">Operations, Mission & Payroll</span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              {/* Component 1.1 */}
              <div className="comp-box a" style={{ "--d": 2 } as React.CSSProperties}>
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn text-xs mb-2">
                      {lang === "km" ? "ស្ថានភាព៖ ដាក់ឱ្យប្រើប្រាស់ជាក់ស្តែង (Live)" : "Status: Live in Production"}
                    </span>
                    <h3>{lang === "km" ? COMPONENTS_DATA[0].titleKm : COMPONENTS_DATA[0].titleEn}</h3>
                  </div>
                  <span className="ic grn">
                    <Check size={26} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[0].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 1.2 */}
              <div className="comp-box a" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="comp-box-header">
                  <div>
                    <span className="chip pri text-xs mb-2">
                      {lang === "km" ? "ស្ថានភាព៖ សិក្សាចប់ & ត្រៀមអនុវត្ត" : "Status: Studied & Ready"}
                    </span>
                    <h3>{lang === "km" ? COMPONENTS_DATA[1].titleKm : COMPONENTS_DATA[1].titleEn}</h3>
                  </div>
                  <span className="ic soft">
                    <Layers size={26} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[1].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 5: Part 2 - Component 3 & 4 */}
        <section
          className={`slide ${currentSlide === 4 ? "on" : ""}`}
          data-label="Components 3 & 4"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០៣ · វឌ្ឍភាពនាយកដ្ឋានទូទៅ" : "03 · General Department Progress"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សមាសភាគទី៣ & ទី៤៖ <span className="g">ទ្រព្យសម្បត្តិរដ្ឋ ផែនការ & ថវិកា</span>
                  </>
                ) : (
                  <>
                    Component 3 & 4: <span className="g">State Assets, Planning & Budgeting</span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              {/* Component 1.3 */}
              <div className="comp-box a" style={{ "--d": 2 } as React.CSSProperties}>
                <div className="comp-box-header">
                  <div>
                    <span className="chip amb text-xs mb-2">
                      {lang === "km" ? "ស្ថានភាព៖ កំពុងរៀបចំកូដ & ទម្រង់" : "Status: Coding Standard In Progress"}
                    </span>
                    <h3>{lang === "km" ? COMPONENTS_DATA[2].titleKm : COMPONENTS_DATA[2].titleEn}</h3>
                  </div>
                  <span className="ic amb">
                    <ShieldCheck size={26} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[2].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 1.4 */}
              <div className="comp-box a" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn text-xs mb-2">
                      {lang === "km" ? "ស្ថានភាព៖ អភិវឌ្ឍរួច & ត្រៀម UAT" : "Status: Dev Complete & Ready for UAT"}
                    </span>
                    <h3>{lang === "km" ? COMPONENTS_DATA[3].titleKm : COMPONENTS_DATA[3].titleEn}</h3>
                  </div>
                  <span className="ic soft">
                    <Sparkles size={26} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[3].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 6: Part 3 - Component 5 */}
        <section
          className={`slide ${currentSlide === 5 ? "on" : ""}`}
          data-label="Component 5"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០៤ · វឌ្ឍភាពនាយកដ្ឋានទូទៅ" : "04 · General Department Progress"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សមាសភាគទី៥៖ <span className="g">ឯកសារអគ្គលេខាធិការដ្ឋាន</span>
                  </>
                ) : (
                  <>
                    Component 5: <span className="g">Secretariat Document Management</span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              <div className="comp-box a" style={{ "--d": 2 } as React.CSSProperties}>
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn text-xs mb-2">
                      {lang === "km" ? "ស្ថានភាព៖ អភិវឌ្ឍរួចរាល់ ៦០%" : "Status: 60% Developed"}
                    </span>
                    <h3>{lang === "km" ? COMPONENTS_DATA[4].titleKm : COMPONENTS_DATA[4].titleEn}</h3>
                  </div>
                  <span className="ic soft">
                    <Layers size={26} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[4].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Architecture Overview */}
              <div className="comp-box a" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="comp-box-header">
                  <div>
                    <span className="chip pri text-xs mb-2">
                      {lang === "km" ? "ប្រព័ន្ធរួមបញ្ចូលគ្នា" : "Integrated Architecture"}
                    </span>
                    <h3>{lang === "km" ? "ស្ថាបត្យកម្មឌីជីថលទូទៅ" : "Digital Workflow Integration"}</h3>
                  </div>
                  <span className="ic cy">
                    <ShieldCheck size={26} />
                  </span>
                </div>
                <p className="lead-desc">
                  {lang === "km"
                    ? "ការតភ្ជាប់រវាងលិខិតចូល-ចេញ បេសកកម្ម និងការទូទាត់ថវិកា ធានាឱ្យមានតម្លាភាព និងភាពឆាប់រហ័ស។"
                    : "End-to-end integration across incoming/outgoing correspondence, official missions, and budget disbursements."}
                </p>
                <div className="comp-list">
                  <div className="comp-list-item">
                    <span className="badge-num">A</span>
                    <div>
                      <h4>{lang === "km" ? "សុវត្ថិភាពទិន្នន័យ & ការផ្ទៀងផ្ទាត់" : "Role-Based Security & Permissions"}</h4>
                      <p>{lang === "km" ? "គ្រប់គ្រងសិទ្ធិមើល យល់ព្រម និងចុះហត្ថលេខាឌីជីថលតាមឋានានុក្រម។" : "Multi-tiered permission hierarchy from department chiefs to leadership."}</p>
                    </div>
                  </div>
                  <div className="comp-list-item">
                    <span className="badge-num">B</span>
                    <div>
                      <h4>{lang === "km" ? "ការស្វែងរកឯកសាររហ័ស" : "Smart Search & Archiving"}</h4>
                      <p>{lang === "km" ? "ស្វែងរកតាមលេខកូដ កាលបរិច្ឆេទ ប្រភពឯកសារ និងពាក្យគន្លឹះ។" : "Instant multi-indexed search across historical ministerial records."}</p>
                    </div>
                  </div>
                  <div className="comp-list-item">
                    <span className="badge-num">C</span>
                    <div>
                      <h4>{lang === "km" ? "ការជូនដំណឹងស្វ័យប្រវត្តិ" : "Automated Notifications & Reminders"}</h4>
                      <p>{lang === "km" ? "ជូនដំណឹងភ្លាមៗនៅពេលមានលិខិតបន្ទាន់ ឬការងាររង់ចាំការអនុម័ត។" : "Real-time task reminders and escalation for urgent directives."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 7: Pending Items Review (ការងារដែលនៅសេសសល់) */}
        <section
          className={`slide ${currentSlide === 6 ? "on" : ""}`}
          data-label="Pending"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០៥ · ការងារដែលនៅសេសសល់" : "05 · Pending Items Review"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    បញ្ជីការងាររង់ចាំការសម្រេច <span className="g">(Pending Items)</span>
                  </>
                ) : (
                  <>
                    Summary of <span className="g">Pending Items & Bottlenecks</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "ចំណុចគន្លឹះចំនួន ៥ ដែលទាមទារការសម្របសម្រួល និងការសម្រេចគោលការណ៍ជាមួយថ្នាក់ដឹកនាំក្រសួង"
                  : "5 critical decision items requiring inter-ministerial coordination and policy sign-off"}
              </p>
            </div>

            <div className="ch">
              {PENDING_ITEMS_SUMMARY.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className="card a"
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                >
                  <span className="num">0{idx + 1}</span>
                  <span className="ic amb pulse bob">
                    <Clock size={24} className="text-amber-400" />
                  </span>
                  <h3>{lang === "km" ? item.titleKm : item.titleEn}</h3>
                  <p>{lang === "km" ? item.detailKm : item.detailEn}</p>
                  <div className="mt-auto pt-4 border-t border-[var(--pb)] flex items-center justify-between text-xs">
                    <span className="font-mono text-[var(--pri)]">
                      {item.component}
                    </span>
                    <span className="chip amb text-xs py-1 px-2.5">
                      {lang === "km" ? item.statusKm : item.statusEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="shift a" style={{ "--d": 5 } as React.CSSProperties}>
              <div className="s">
                <span className="dot red" />
                <div>
                  <small>{lang === "km" ? "ស្ថានភាពបច្ចុប្បន្ន" : "Current Bottleneck"}</small>
                  {lang === "km"
                    ? "ការងារមួយចំនួនរង់ចាំការឯកភាពលើទម្រង់កាតាបៀវត្ស និងកូដសម្បត្តិរដ្ឋពី MEF"
                    : "Workflows waiting on formal MEF payroll format & state asset code approvals"}
                </div>
              </div>
              <div className="track" />
              <div className="s">
                <span className="dot grn" />
                <div>
                  <small>{lang === "km" ? "ដំណោះស្រាយស្នើឡើង" : "Proposed Solution"}</small>
                  {lang === "km"
                    ? "បើកកិច្ចប្រជុំអន្តរក្រសួងរួមគ្នា ដើម្បីឯកភាពលើទម្រង់ស្តង់ដារ និងអនុវត្តភ្លាមៗ"
                    : "Joint inter-ministerial workshop to finalize data formats and unlock deployment"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 8: Challenges & Suggestions (Exact Slide 3 Template) */}
        <section
          className={`slide ${currentSlide === 7 ? "on" : ""}`}
          data-label="Challenges"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០៦ · បញ្ហាប្រឈម & សំណូមពរ" : "06 · Challenges & Suggestions"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    បញ្ហាប្រឈមចម្បង និង <span className="g">វិធានការដោះស្រាយ</span>
                  </>
                ) : (
                  <>
                    Core Challenges & <span className="g">Strategic Solutions</span>
                  </>
                )}
              </h2>
            </div>

            <div className="ch">
              {CHALLENGES_DATA.map((ch, idx) => (
                <div
                  key={ch.id}
                  className="card a"
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                >
                  <span className="num">0{idx + 1}</span>
                  <span className={`ic ${idx === 0 ? "red" : idx === 1 ? "amb" : "soft"} pulse bob`}>
                    <AlertTriangle size={24} className={idx === 0 ? "text-rose-400" : idx === 1 ? "text-amber-400" : "text-indigo-400"} />
                  </span>
                  <h3>{lang === "km" ? ch.titleKm : ch.titleEn}</h3>
                  <p>{lang === "km" ? ch.problemKm : ch.problemEn}</p>
                  <div className="mt-auto pt-4 border-t border-[var(--pb)]">
                    <span className="text-xs font-semibold text-[var(--tx)] block mb-1">
                      {lang === "km" ? "សំណូមពរដោះស្រាយ៖" : "Suggested Action:"}
                    </span>
                    <p className="text-xs text-[var(--grn)] leading-relaxed">
                      {lang === "km" ? ch.solutionKm : ch.solutionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="shift a" style={{ "--d": 5 } as React.CSSProperties}>
              <div className="s">
                <span className="dot red" />
                <div>
                  <small>{lang === "km" ? "ការអនុវត្តពីមុន" : "Legacy Workflow"}</small>
                  {lang === "km" ? "ការងារឯកសារដោយដៃ យឺតយ៉ាវ និងមិនមានទិន្នន័យរួមតែមួយ" : "Manual, siloed paper documentation with disconnected tracking"}
                </div>
              </div>
              <div className="track" />
              <div className="s">
                <span className="dot grn" />
                <div>
                  <small>{lang === "km" ? "ប្រព័ន្ធឌីជីថលថ្មី" : "Digital Transformation"}</small>
                  {lang === "km" ? "ស្វ័យប្រវត្តិកម្ម តម្លាភាព និងទិន្នន័យជាក់ស្តែងតាមពេលវេលាពិត" : "Automated, transparent, and near real-time ministerial reporting"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 9: Expected Completion & Timeline (Exact Slide 16 Template) */}
        <section
          className={`slide ${currentSlide === 8 ? "on" : ""}`}
          data-label="Timeline"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០៧ · ការរំពឹងទុកនៃការបញ្ចប់គម្រោង" : "07 · Expected Completion"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    កាលវិភាគអនុវត្ត <span className="g">ពេញលេញ ៤ ដំណាក់កាល</span>
                  </>
                ) : (
                  <>
                    Phased Delivery <span className="g">Across 4 Milestones</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "ផែនការប្រគល់ការងារជាជំហានៗ រួមទាំងការដាក់ឱ្យប្រើប្រាស់ និងការបណ្តុះបណ្តាលមន្ត្រី"
                  : "Structured implementation roadmap with milestone verification at each milestone stage"}
              </p>
            </div>

            <div className="ns-stat a-r" style={{ "--d": 2 } as React.CSSProperties}>
              <b className="grad">4</b>
              <small>{lang === "km" ? "ដំណាក់កាលអនុវត្ត" : "Phases to Completion"}</small>
            </div>

            <div className="tlg">
              {TIMELINE_MILESTONES.map((phase, idx) => (
                <div
                  key={phase.phase}
                  className={`tlg-card ${idx === 0 ? "cur" : ""} a`}
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                >
                  <div className="tlg-phase">{lang === "km" ? phase.phaseKm : phase.phase}</div>
                  <h3>{lang === "km" ? phase.titleKm : phase.titleEn}</h3>
                  <div className="tlg-date">
                    <Calendar size={14} />
                    <span>{lang === "km" ? phase.timeframeKm : phase.timeframeEn}</span>
                  </div>

                  <div className="tlg-points">
                    {phase.bulletsKm.map((item, i) => (
                      <div key={i} className="tlg-point">
                        <Check size={16} />
                        <span>{lang === "km" ? item : phase.bulletsEn[i]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-[var(--pb)]">
                    <span className={`chip text-xs w-full justify-center ${idx === 0 ? "grn" : "pri"}`}>
                      {idx === 0
                        ? (lang === "km" ? "កំពុងអនុវត្ត (Active)" : "Currently Active")
                        : (lang === "km" ? "តាមកាលវិភាគ" : "Scheduled")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 10: 30-Day Action Plan */}
        <section
          className={`slide ${currentSlide === 9 ? "on" : ""}`}
          data-label="Action Plan"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០៨ · ជំហានបន្ទាប់" : "08 · Next Steps"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    ផែនការសកម្មភាព <span className="g">៣០ថ្ងៃបន្ទាប់</span>
                  </>
                ) : (
                  <>
                    Next 30-Day <span className="g">Immediate Action Plan</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "សកម្មភាពជាក់ស្តែងដើម្បីពន្លឿនការងារនៅសេសសល់ និងត្រៀមទទួលយកទិន្នន័យនាយកដ្ឋានទាំង ២ បន្ថែម"
                  : "Immediate tactical milestones to resolve pending items and onboard remaining departments"}
              </p>
            </div>

            <div className="tlg">
              <div className="tlg-card a" style={{ "--d": 2 } as React.CSSProperties}>
                <div className="tlg-phase">STEP 01</div>
                <h3>{lang === "km" ? "សម្របសម្រួលទម្រង់កាតាបៀវត្ស" : "MEF Payroll Slip Alignment"}</h3>
                <p className="text-sm text-[var(--mu)] mb-4 leading-relaxed">
                  {lang === "km"
                    ? "រៀបចំកិច្ចប្រជុំបច្ចេកទេសជាមួយតំណាង MEF និងនាយកដ្ឋានទូទៅ ដើម្បីឯកភាពលើទម្រង់កាតាបៀវត្ស។"
                    : "Conduct technical coordination workshop to finalize the required salary slip layout."}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--pb)]">
                  <span className="chip pri text-xs w-full justify-center">Week 1 - 2</span>
                </div>
              </div>

              <div className="tlg-card a" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="tlg-phase">STEP 02</div>
                <h3>{lang === "km" ? "ធ្វើតេស្ត UAT ផែនការ & ថវិកា" : "Planning & Budget UAT"}</h3>
                <p className="text-sm text-[var(--mu)] mb-4 leading-relaxed">
                  {lang === "km"
                    ? "ដាក់ឱ្យមន្ត្រីជំនាញធ្វើតេស្តសាកល្បងម៉ូឌុលផែនការ និងថវិកា ព្រមទាំងប្រមូលមតិកែលម្អ។"
                    : "Deploy test environment for departmental officers to validate operational budgeting flows."}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--pb)]">
                  <span className="chip pri text-xs w-full justify-center">Week 2 - 3</span>
                </div>
              </div>

              <div className="tlg-card a" style={{ "--d": 4 } as React.CSSProperties}>
                <div className="tlg-phase">STEP 03</div>
                <h3>{lang === "km" ? "ប្រមូលទិន្នន័យនាយកដ្ឋានទី ២" : "Department 2 Intake"}</h3>
                <p className="text-sm text-[var(--mu)] mb-4 leading-relaxed">
                  {lang === "km"
                    ? "ចាប់ផ្តើមកិច្ចសម្ភាសន៍ប្រមូលតម្រូវការ និងទម្រង់ការងារសម្រាប់នាយកដ្ឋានទី ២។"
                    : "Initiate workflow mapping and template collection with Department 2 task force."}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--pb)]">
                  <span className="chip amb text-xs w-full justify-center">Week 3 - 4</span>
                </div>
              </div>

              <div className="tlg-card a" style={{ "--d": 5 } as React.CSSProperties}>
                <div className="tlg-phase">STEP 04</div>
                <h3>{lang === "km" ? "របាយការណ៍ជូនថ្នាក់ដឹកនាំ" : "Executive Debrief"}</h3>
                <p className="text-sm text-[var(--mu)] mb-4 leading-relaxed">
                  {lang === "km"
                    ? "រៀបចំរបាយការណ៍បូកសរុបលទ្ធផល ៣០ថ្ងៃ និងស្នើសុំការសម្រេចលើជំហានបន្ត។"
                    : "Deliver progress metrics and request formal approvals for Q2 rollout phase."}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--pb)]">
                  <span className="chip grn text-xs w-full justify-center">Week 4</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 11: Strategic Conclusion (Exact Slide 17 Template) */}
        <section
          className={`slide ${currentSlide === 10 ? "on" : ""}`}
          data-label="Conclusion"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "០៩ · សេចក្តីសន្និដ្ឋាន" : "09 · Conclusion"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សេចក្តីសន្និដ្ឋាន & <span className="g">តម្លៃយុទ្ធសាស្ត្រ</span>
                  </>
                ) : (
                  <>
                    Executive Summary & <span className="g">Strategic Value</span>
                  </>
                )}
              </h2>
            </div>

            <div className="cc2">
              <div className="a" style={{ "--d": 2 } as React.CSSProperties}>
                <div className="ccq">
                  {lang === "km"
                    ? "ការផ្លាស់ប្តូរឆ្ពោះទៅកាន់ប្រព័ន្ធរដ្ឋបាលឌីជីថលពេញលេញ សម្រាប់ក្រសួងរ៉ែ និងថាមពល"
                    : "Accelerating Ministerial Efficiency Through Seamless Digital Governance"}
                </div>
                <div className="chk-list">
                  <div className="chk">
                    <Check size={22} className="text-emerald-400" />
                    <div>
                      <b>{lang === "km" ? "តម្លាភាព និងប្រសិទ្ធភាពការងារ៖" : "Operational Transparency:"}</b>{" "}
                      {lang === "km"
                        ? "កាត់បន្ថយពេលវេលាដំណើរការឯកសារ និងការទូទាត់ថវិកាបានជាង ៦០%។"
                        : "Reduces administrative cycle times and payment processing delays by over 60%."}
                    </div>
                  </div>
                  <div className="chk">
                    <Check size={22} className="text-emerald-400" />
                    <div>
                      <b>{lang === "km" ? "ទិន្នន័យជាក់ស្តែង និងត្រឹមត្រូវ៖" : "Real-Time Accuracy:"}</b>{" "}
                      {lang === "km"
                        ? "លុបបំបាត់ការបាត់បង់ទិន្នន័យ ឬការកត់ត្រាស្ទួនរវាងនាយកដ្ឋាន។"
                        : "Eliminates duplicate record-keeping and ensures audit-ready data consistency."}
                    </div>
                  </div>
                  <div className="chk">
                    <Check size={22} className="text-emerald-400" />
                    <div>
                      <b>{lang === "km" ? "ការត្រៀមលក្ខណៈពង្រីកវិសាលភាព៖" : "Scalable Architecture:"}</b>{" "}
                      {lang === "km"
                        ? "ស្ថាបត្យកម្មប្រព័ន្ធអាចតភ្ជាប់ទិន្នន័យនាយកដ្ឋានផ្សេងទៀតបានយ៉ាងងាយស្រួល។"
                        : "Modular design enables rapid onboarding of remaining ministerial departments."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="cc-photo a-r" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/logo/logo tab.svg"
                    alt="Emblem"
                    width={48}
                    height={48}
                    priority
                  />
                  <div>
                    <h4 className="text-lg font-bold text-[var(--tx)]">
                      {lang === "km" ? "ក្រសួងរ៉ែ និងថាមពល" : "Ministry of Mines & Energy"}
                    </h4>
                    <p className="text-xs text-[var(--mu)]">
                      {lang === "km" ? "រាជរដ្ឋាភិបាលកម្ពុជា" : "Royal Government of Cambodia"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--mu)] leading-relaxed">
                  {lang === "km"
                    ? "ក្រុមហ៊ុន អូន ផៅវ័រ ថេកណឡជី ប្តេជ្ញាចិត្តសហការយ៉ាងជិតស្និទ្ធជាមួយថ្នាក់ដឹកនាំ និងមន្ត្រីជំនាញ ដើម្បីធានាបាននូវភាពជោគជ័យពេញលេញនៃគម្រោង។"
                    : "OONE Power Technology is dedicated to close partnership with MME leadership and teams to ensure complete project success."}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--pb)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--pri)]">OONE POWER TECHNOLOGY</span>
                  <span className="chip grn text-xs py-1">COMMITTED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 12: Thank You (Exact Slide 19 Template) */}
        <section
          className={`slide ${currentSlide === 11 ? "on" : ""}`}
          data-label="Thanks"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
              <div className="blob b2" />
            </div>

            {/* Power transmission SVG waves from template */}
            <svg className="pl" viewBox="0 0 1920 420" preserveAspectRatio="none" aria-hidden="true">
              <g className="tower">
                <path d="M300 420 L340 120 L380 420 M310 340 H370 M318 260 H362 M326 190 H354 M280 150 H400" />
                <path d="M960 420 L1000 100 L1040 420 M970 340 H1030 M978 260 H1022 M986 180 H1014 M940 130 H1060" />
                <path d="M1620 420 L1660 120 L1700 420 M1630 340 H1690 M1638 260 H1682 M1646 190 H1674 M1600 150 H1720" />
              </g>
              <path className="w" d="M-20 170 Q 140 230 280 150 Q 620 260 940 130 Q 1290 260 1600 150 Q 1770 230 1940 170" />
              <path className="w" d="M-20 190 Q 160 250 400 150 Q 680 270 1060 130 Q 1340 270 1720 150 Q 1840 210 1940 190" />
              <path className="e" d="M-20 170 Q 140 230 280 150 Q 620 260 940 130 Q 1290 260 1600 150 Q 1770 230 1940 170" />
              <path className="e" style={{ animationDelay: "-2s" }} d="M-20 190 Q 160 250 400 150 Q 680 270 1060 130 Q 1340 270 1720 150 Q 1840 210 1940 190" />
            </svg>

            <div className="ty">
              <div className="eyebrow a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? "សំណួរ & ចម្លើយ" : "Questions & Discussion"}
              </div>
              <h1 className="grad a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? "សូមអរគុណ" : "Thank You"}
              </h1>
              <p className="a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "សូមគោរពថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះឯកឧត្តម លោកជំទាវ និងលោក-លោកស្រី ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃចូលរួមក្នុងបទបង្ហាញនេះ។"
                  : "Thank you for your valuable time and participation. We look forward to our continuous collaboration."}
              </p>

              <div className="ty-contact a" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="chip pri">
                  <Image
                    src="/logo/Oone logo.svg"
                    alt="OONE Logo"
                    width={100}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div className="chip">
                  <Phone size={16} className="text-[var(--pri)]" />
                  <span>+855 23 888 999</span>
                </div>
                <div className="chip">
                  <Mail size={16} className="text-[var(--cy)]" />
                  <span>contact@oonepower.com</span>
                </div>
              </div>
            </div>

            <div className="qrc a-r" style={{ "--d": 3 } as React.CSSProperties}>
              <div className="qrbox">
                <Image
                  src="/logo/logo tab.svg"
                  alt="QR Emblem"
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
              <span className="chip pri text-xs">
                {lang === "km" ? "MME Digital Platform" : "MME Digital Platform"}
              </span>
            </div>
          </div>
        </section>

      </div>

      {/* Nav Bar (#bar) matching reference template */}
      <div className="bar" id="bar">
        <div className="prog" id="prog" style={{ width: `${progressPercent}%` }} />
        
        <div className="brand">
          <Image
            src="/logo/Oone logo.svg"
            alt="OONE Logo"
            width={72}
            height={28}
            className="brand-logo object-contain"
          />
          <div>
            <b>{lang === "km" ? "របាយការណ៍វឌ្ឍភាព MME" : "MME Progress Reports"}</b>
            <span id="cnt">
              {lang === "km"
                ? `ទំព័រទី ${currentSlide + 1} នៃ ${TOTAL_SLIDES}`
                : `Slide ${currentSlide + 1} of ${TOTAL_SLIDES}`}
            </span>
          </div>
        </div>

        <span className="sep" />

        <button
          className="nb interactive"
          id="prev"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
          <span className="tx">{lang === "km" ? "ថយក្រោយ" : "Back"}</span>
        </button>

        <nav className="dots-nav" id="dn" aria-label="Slides">
          {slideList.map((s, idx) => (
            <button
              key={s.id}
              className={`interactive ${currentSlide === idx ? "cur" : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              <span>{lang === "km" ? s.labelKm : s.labelEn}</span>
            </button>
          ))}
        </nav>

        <button
          className="nb pri interactive"
          id="next"
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
        >
          <span className="tx" id="nextTx">{lang === "km" ? "បន្ទាប់" : "Next"}</span>
          <ChevronRight size={18} />
        </button>

        <span className="sep" />

        {/* Language Switcher */}
        <div className={`langsw ${langDropdownOpen ? "open" : ""}`} id="langDD">
          <button
            className="lbtn interactive"
            id="langBtn"
            onClick={() => setLangDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={langDropdownOpen}
            aria-label="Language selector"
          >
            <Globe size={18} />
            <span id="langCur">{lang === "km" ? "KH" : "EN"}</span>
            <ChevronUp size={14} className="lchev" />
          </button>
          <div className="lmenu" role="menu">
            <button
              role="menuitemradio"
              aria-checked={lang === "en"}
              className={`interactive ${lang === "en" ? "on" : ""}`}
              onClick={() => toggleLanguage("en")}
            >
              <span className="lc">EN</span>English
              {lang === "en" && <Check size={14} className="ml-auto" />}
            </button>
            <button
              role="menuitemradio"
              aria-checked={lang === "km"}
              className={`interactive ${lang === "km" ? "on" : ""}`}
              onClick={() => toggleLanguage("km")}
            >
              <span className="lc">KH</span>ខ្មែរ
              {lang === "km" && <Check size={14} className="ml-auto" />}
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          className="nb interactive"
          id="theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span className="tx">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>

        {/* Print Button */}
        <button
          className="nb interactive"
          id="printb"
          onClick={() => window.print()}
          aria-label="Print slides"
        >
          <Printer size={18} />
          <span className="tx">{lang === "km" ? "បោះពុម្ព" : "Print"}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          className="nb interactive"
          id="fsb"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          <span className="tx">{isFullscreen ? "Exit" : "Full screen"}</span>
        </button>
      </div>
    </div>
  );
}
