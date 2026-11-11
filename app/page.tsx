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
  HeroHubVisual,
  DepartmentNetworkMap,
  MeetingRoomVisual,
  MissionPayrollFlow,
  AssetBudgetVisual,
  SecretariatVaultVisual,
  RoyalTransmissionVisual,
} from "./slideVisuals";
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
  Calendar,
  Phone,
  Mail,
  Building2,
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

  // LIGHT THEME IS DEFAULT
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [lang, setLang] = useState<Language>("km");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return Boolean(document.fullscreenElement);
    }
    return false;
  });
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  // Dynamic scale calculation for 1920x1080 stage
  const [scale, setScale] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      const h = window.innerHeight - 76;
      const s = Math.min(w / 1920, h / 1080);
      return s > 0 ? s : 1;
    }
    return 1;
  });

  const fit = useCallback(() => {
    if (typeof window === "undefined") return;
    const isFS = Boolean(document.fullscreenElement);
    setIsFullscreen(isFS);
    const w = window.innerWidth;
    const h = window.innerHeight - 76;
    const s = Math.min(w / 1920, h / 1080);
    setScale(s > 0 ? s : 1);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", fit);
    document.addEventListener("fullscreenchange", fit);

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
      document.removeEventListener("fullscreenchange", fit);
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
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
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

  // Click on left 25% or right 75% to navigate
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, select, .interactive, .card, .comp-box, .tlg-card"
      )
    ) {
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
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
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

            <div className="hero-grid">
              <div className="t-left">
                <div
                  className="eyebrow a"
                  style={{ "--d": 0 } as React.CSSProperties}
                >
                  {lang === "km"
                    ? "ក្រសួងរ៉ែ និងថាមពល · MME Progress Reports"
                    : "Ministry of Mines and Energy · MME"}
                </div>
                <h1
                  className="t-title a"
                  style={{ "--d": 1 } as React.CSSProperties}
                >
                  {lang === "km" ? (
                    <>
                      របាយការណ៍វឌ្ឍភាព{" "}
                      <span className="grad">គម្រោងប្រព័ន្ធបច្ចេកវិទ្យា</span> MME
                    </>
                  ) : (
                    <>
                      MME Digital <span className="grad">Transformation</span>{" "}
                      Progress
                    </>
                  )}
                </h1>
                <div
                  className="t-badge a"
                  style={{ "--d": 2 } as React.CSSProperties}
                >
                  <Image
                    src="/logo/logo tab.svg"
                    alt="Emblem"
                    width={32}
                    height={32}
                    priority
                    className="object-contain"
                  />
                  <span>
                    {lang === "km"
                      ? "របាយការណ៍បច្ចុប្បន្នភាពសម្រាប់ថ្នាក់ដឹកនាំក្រសួង"
                      : "Executive Briefing for Ministry Leadership"}
                  </span>
                </div>
                <p
                  className="t-sub a"
                  style={{ "--d": 3 } as React.CSSProperties}
                >
                  {lang === "km"
                    ? PRESENTATION_META.taglineKm
                    : PRESENTATION_META.taglineEn}
                </p>
                <button
                  className="cta a interactive"
                  style={{ "--d": 4 } as React.CSSProperties}
                  onClick={() => goToSlide(1)}
                >
                  <span>
                    {lang === "km" ? "ចាប់ផ្តើមបទបង្ហាញ" : "Start the presentation"}
                  </span>
                  <ArrowRight size={20} />
                </button>
                <div
                  className="t-meta a"
                  style={{ "--d": 5 } as React.CSSProperties}
                >
                  <Image
                    src="/logo/Oone logo.svg"
                    alt="OONE Power"
                    width={110}
                    height={48}
                    priority
                    className="object-contain"
                  />
                  <div>
                    <small>
                      {lang === "km" ? "រៀបចំ និងអនុវត្តដោយ" : "Prepared by"}
                    </small>
                    <b>{PRESENTATION_META.companyEn}</b>
                  </div>
                </div>
              </div>

              <div
                className="t-photo a-z"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <HeroHubVisual lang={lang} theme={theme} />
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
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
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
                    else if (idx === 1) goToSlide(8);
                    else if (idx === 2) goToSlide(9);
                  }}
                >
                  <span className="n">{item.num}</span>
                  <span className="ic soft">
                    {idx === 0 && <Layers size={30} />}
                    {idx === 1 && <AlertTriangle size={30} />}
                    {idx === 2 && <Clock size={30} />}
                  </span>
                  <span className="t">
                    {lang === "km" ? item.titleKm : item.titleEn}
                    <small>{lang === "km" ? item.descKm : item.descEn}</small>
                  </span>
                  <div className="ag-footer">
                    <span className="ag-tag">
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

        {/* SLIDE 3: Department Scope with Network Radar Visual */}
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
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km"
                  ? "០១ · វិសាលភាពនាយកដ្ឋាន"
                  : "01 · Department Scope"}
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

            <div className="comp-split">
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn">
                      {lang === "km"
                        ? "នាយកដ្ឋានទូទៅ · ១០០% ពេញលេញ"
                        : "General Department · 100% Active"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? DEPARTMENTS[0].nameKm
                        : DEPARTMENTS[0].nameEn}
                    </h3>
                  </div>
                  <span className="ic grn">
                    <Building2 size={24} />
                  </span>
                </div>
                <p className="comp-box-sub">
                  {lang === "km"
                    ? DEPARTMENTS[0].descriptionKm
                    : DEPARTMENTS[0].descriptionEn}
                </p>
                <div className="comp-list">
                  <div className="comp-list-item">
                    <span className="badge-num">01</span>
                    <div>
                      <h4>
                        {lang === "km"
                          ? "១.១ ប្រតិបត្តិការ & បន្ទប់ប្រជុំ"
                          : "1.1 Meeting Room Booking & Supplies"}
                      </h4>
                      <p>
                        {lang === "km"
                          ? "ដាក់ឱ្យដំណើរការជាផ្លូវការ (១០០% Live)"
                          : "Officially launched and active in production"}
                      </p>
                    </div>
                  </div>
                  <div className="comp-list-item">
                    <span className="badge-num">02</span>
                    <div>
                      <h4>
                        {lang === "km"
                          ? "១.២ បេសកកម្ម & ប្រាក់បៀវត្ស"
                          : "1.2 Mission Workflow & Payroll"}
                      </h4>
                      <p>
                        {lang === "km"
                          ? "ការរៀបចំប្រព័ន្ធ ៦៥% & រង់ចាំ MEF"
                          : "Setup 65% ready & pending MEF review"}
                      </p>
                    </div>
                  </div>
                  <div className="comp-list-item">
                    <span className="badge-num">03</span>
                    <div>
                      <h4>
                        {lang === "km"
                          ? "១.៣ & ១.៤ ទ្រព្យសម្បត្តិ & ថវិកា"
                          : "1.3 & 1.4 State Assets & Budgeting"}
                      </h4>
                      <p>
                        {lang === "km"
                          ? "បានសិក្សាតម្រូវការរួចរាល់ & ត្រៀម UAT"
                          : "Requirements studied & preparing for UAT"}
                      </p>
                    </div>
                  </div>
                  <div className="comp-list-item">
                    <span className="badge-num">04</span>
                    <div>
                      <h4>
                        {lang === "km"
                          ? "១.៥ ឯកសារអគ្គលេខាធិការដ្ឋាន"
                          : "1.5 Secretariat Document Vault"}
                      </h4>
                      <p>
                        {lang === "km"
                          ? "អភិវឌ្ឍរួចរាល់ ៦០% (លិខិតចូល-ចេញ & ផ្ទុកឯកសារ)"
                          : "60% Dev Complete (Dispatch & Archiving)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip pri">MME TOPOLOGY MAP</span>
                    <h3>
                      {lang === "km"
                        ? "បណ្តាញតភ្ជាប់នាយកដ្ឋានទាំង ៣"
                        : "3-Department Architecture Map"}
                    </h3>
                  </div>
                  <span className="ic soft">
                    <Layers size={24} />
                  </span>
                </div>
                <DepartmentNetworkMap lang={lang} theme={theme} />
                <div className="vs-bottom-strip">
                  <span className="vs-bottom-left">
                    {lang === "km"
                      ? "ស្ថាបត្យកម្មរួមត្រៀមសម្រាប់នាយកដ្ឋានទាំង ៣"
                      : "Unified modular architecture ready for all 3 departments"}
                  </span>
                  <span className="vs-mono-badge grn">MODULAR CORE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 4: Component 1 with Meeting Room UI Mockup */}
        <section
          className={`slide ${currentSlide === 3 ? "on" : ""}`}
          data-label="Facilities"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km"
                  ? "០២ · វឌ្ឍភាពនាយកដ្ឋានទូទៅ"
                  : "02 · General Department Progress"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សមាសភាគទី១៖{" "}
                    <span className="g">
                      ប្រតិបត្តិការ ការផ្គត់ផ្គង់ & សេវាបន្ទប់ប្រជុំ
                    </span>
                  </>
                ) : (
                  <>
                    Component 1:{" "}
                    <span className="g">
                      Operations, Supply & Meeting Rooms
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn">
                      {lang === "km"
                        ? "ស្ថានភាព៖ ដាក់ឱ្យប្រើប្រាស់ជាក់ស្តែង (Live)"
                        : "Status: Live in Production"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? COMPONENTS_DATA[0].titleKm
                        : COMPONENTS_DATA[0].titleEn}
                    </h3>
                  </div>
                  <span className="ic grn">
                    <Check size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[0].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">0{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <MeetingRoomVisual lang={lang} theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 5: Component 2 with Mission & Payroll Flow Visual */}
        <section
          className={`slide ${currentSlide === 4 ? "on" : ""}`}
          data-label="Missions"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km"
                  ? "០៣ · វឌ្ឍភាពនាយកដ្ឋានទូទៅ"
                  : "03 · General Department Progress"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សមាសភាគទី២៖{" "}
                    <span className="g">
                      ការគ្រប់គ្រងបេសកកម្ម & ដំណើរការប្រាក់បៀវត្ស
                    </span>
                  </>
                ) : (
                  <>
                    Component 2:{" "}
                    <span className="g">
                      Mission Workflows & Payroll Operations
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip pri">
                      {lang === "km"
                        ? "ស្ថានភាព៖ សិក្សាចប់ & ត្រៀមអនុវត្ត"
                        : "Status: Studied & Ready"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? COMPONENTS_DATA[1].titleKm
                        : COMPONENTS_DATA[1].titleEn}
                    </h3>
                  </div>
                  <span className="ic soft">
                    <Layers size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[1].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">0{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <MissionPayrollFlow lang={lang} theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 6: Component 3 & 4 with Asset Scanner Visual */}
        <section
          className={`slide ${currentSlide === 5 ? "on" : ""}`}
          data-label="Assets"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km"
                  ? "០៤ · វឌ្ឍភាពនាយកដ្ឋានទូទៅ"
                  : "04 · General Department Progress"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សមាសភាគទី៣ & ៤៖{" "}
                    <span className="g">ទ្រព្យសម្បត្តិរដ្ឋ ផែនការ & ថវិកា</span>
                  </>
                ) : (
                  <>
                    Component 3 & 4:{" "}
                    <span className="g">
                      State Assets, Planning & Budgeting
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip amb">
                      {lang === "km"
                        ? "ស្ថានភាព៖ រៀបចំកូដ & ត្រៀម UAT"
                        : "Status: Coding & UAT Prep"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? "ទ្រព្យសម្បត្តិរដ្ឋ & ថវិកាជាតិ"
                        : "State Assets & Public Budget"}
                    </h3>
                  </div>
                  <span className="ic amb">
                    <ShieldCheck size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[2].subtasks.map((item) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">1.3</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                  {COMPONENTS_DATA[3].subtasks.map((item) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">1.4</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <AssetBudgetVisual lang={lang} theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 7: Component 5 with Secretariat Document Vault Visual */}
        <section
          className={`slide ${currentSlide === 6 ? "on" : ""}`}
          data-label="Documents"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km"
                  ? "០៥ · វឌ្ឍភាពនាយកដ្ឋានទូទៅ"
                  : "05 · General Department Progress"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    សមាសភាគទី៥៖{" "}
                    <span className="g">
                      ឯកសារអគ្គលេខាធិការដ្ឋាន (៦០% រួចរាល់)
                    </span>
                  </>
                ) : (
                  <>
                    Component 5:{" "}
                    <span className="g">
                      Secretariat Document Vault (60% Ready)
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn">
                      {lang === "km"
                        ? "ស្ថានភាព៖ អភិវឌ្ឍរួចរាល់ ៦០%"
                        : "Status: 60% Developed"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? COMPONENTS_DATA[4].titleKm
                        : COMPONENTS_DATA[4].titleEn}
                    </h3>
                  </div>
                  <span className="ic soft">
                    <Layers size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {COMPONENTS_DATA[4].subtasks.map((item, i) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">0{i + 1}</span>
                      <div>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.notesKm : item.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <SecretariatVaultVisual lang={lang} theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 8: Pending Items Review (ការងារដែលនៅសេសសល់) */}
        <section
          className={`slide ${currentSlide === 7 ? "on" : ""}`}
          data-label="Pending"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km"
                  ? "០៦ · ការងារដែលនៅសេសសល់"
                  : "06 · Pending Items Review"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    បញ្ជីការងាររង់ចាំការសម្រេច{" "}
                    <span className="g">(Pending Items)</span>
                  </>
                ) : (
                  <>
                    Summary of{" "}
                    <span className="g">Pending Items & Bottlenecks</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "ចំណុចគន្លឹះដែលទាមទារការសម្របសម្រួល និងការសម្រេចគោលការណ៍ជាមួយថ្នាក់ដឹកនាំក្រសួង"
                  : "Critical decision items requiring inter-ministerial coordination and policy sign-off"}
              </p>
            </div>

            <div className="ch">
              {PENDING_ITEMS_SUMMARY.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className="card a"
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                >
                  <div className="ch-card-top">
                    <span className="num">0{idx + 1}</span>
                    <span className="ic amb">
                      <Clock size={24} />
                    </span>
                  </div>
                  <h3>{lang === "km" ? item.titleKm : item.titleEn}</h3>
                  <p className="ch-desc">
                    {lang === "km" ? item.detailKm : item.detailEn}
                  </p>
                  <div className="ch-footer">
                    <span className="ag-tag">{item.component}</span>
                    <span className="chip amb">
                      {lang === "km" ? item.statusKm : item.statusEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="shift a"
              style={{ "--d": 5 } as React.CSSProperties}
            >
              <div className="s">
                <span className="dot red" />
                <div>
                  <small>
                    {lang === "km" ? "ស្ថានភាពបច្ចុប្បន្ន" : "Current Bottleneck"}
                  </small>
                  {lang === "km"
                    ? "ការងារមួយចំនួនរង់ចាំការឯកភាពលើទម្រង់កាតាបៀវត្ស និងកូដសម្បត្តិរដ្ឋពី MEF"
                    : "Workflows waiting on formal MEF payroll format & state asset code approvals"}
                </div>
              </div>
              <div className="track" />
              <div className="s">
                <span className="dot grn" />
                <div>
                  <small>
                    {lang === "km" ? "ដំណោះស្រាយស្នើឡើង" : "Proposed Solution"}
                  </small>
                  {lang === "km"
                    ? "បើកកិច្ចប្រជុំអន្តរក្រសួងរួមគ្នា ដើម្បីឯកភាពលើទម្រង់ស្តង់ដារ និងអនុវត្តភ្លាមៗ"
                    : "Joint inter-ministerial workshop to finalize data formats and unlock deployment"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 9: Challenges & Suggestions */}
        <section
          className={`slide ${currentSlide === 8 ? "on" : ""}`}
          data-label="Challenges"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km"
                  ? "០៧ · បញ្ហាប្រឈម & សំណូមពរ"
                  : "07 · Challenges & Suggestions"}
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
                  <div className="ch-card-top">
                    <span className="num">0{idx + 1}</span>
                    <span
                      className={`ic ${
                        idx === 0 ? "red" : idx === 1 ? "amb" : "soft"
                      }`}
                    >
                      <AlertTriangle size={24} />
                    </span>
                  </div>
                  <h3>{lang === "km" ? ch.titleKm : ch.titleEn}</h3>
                  <p className="ch-desc">
                    {lang === "km" ? ch.problemKm : ch.problemEn}
                  </p>
                  <div className="ch-solution-box">
                    <span className="ch-solution-label">
                      {lang === "km" ? "សំណូមពរដោះស្រាយ៖" : "Suggested Action:"}
                    </span>
                    <p className="ch-solution-text">
                      {lang === "km" ? ch.solutionKm : ch.solutionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="shift a"
              style={{ "--d": 5 } as React.CSSProperties}
            >
              <div className="s">
                <span className="dot red" />
                <div>
                  <small>
                    {lang === "km" ? "ការអនុវត្តពីមុន" : "Legacy Workflow"}
                  </small>
                  {lang === "km"
                    ? "ការងារឯកសារដោយដៃ យឺតយ៉ាវ និងមិនមានទិន្នន័យរួមតែមួយ"
                    : "Manual, siloed paper documentation with disconnected tracking"}
                </div>
              </div>
              <div className="track" />
              <div className="s">
                <span className="dot grn" />
                <div>
                  <small>
                    {lang === "km"
                      ? "ប្រព័ន្ធឌីជីថលថ្មី"
                      : "Digital Transformation"}
                  </small>
                  {lang === "km"
                    ? "ស្វ័យប្រវត្តិកម្ម តម្លាភាព និងទិន្នន័យជាក់ស្តែងតាមពេលវេលាពិត"
                    : "Automated, transparent, and near real-time ministerial reporting"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 10: Expected Completion & Timeline */}
        <section
          className={`slide ${currentSlide === 9 ? "on" : ""}`}
          data-label="Timeline"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head head-row">
              <div>
                <div
                  className="eyebrow a"
                  style={{ "--d": 0 } as React.CSSProperties}
                >
                  {lang === "km"
                    ? "០៨ · ការរំពឹងទុកនៃការបញ្ចប់គម្រោង"
                    : "08 · Expected Completion"}
                </div>
                <h2
                  className="h a"
                  style={{ "--d": 1 } as React.CSSProperties}
                >
                  {lang === "km" ? (
                    <>
                      កាលវិភាគអនុវត្ត{" "}
                      <span className="g">ពេញលេញ ៤ ដំណាក់កាល</span>
                    </>
                  ) : (
                    <>
                      Phased Delivery{" "}
                      <span className="g">Across 4 Milestones</span>
                    </>
                  )}
                </h2>
                <p
                  className="lead a"
                  style={{ "--d": 2 } as React.CSSProperties}
                >
                  {lang === "km"
                    ? "ផែនការប្រគល់ការងារជាជំហានៗ រួមទាំងការដាក់ឱ្យប្រើប្រាស់ និងការបណ្តុះបណ្តាលមន្ត្រី"
                    : "Structured implementation roadmap with milestone verification at each stage"}
                </p>
              </div>

              <div
                className="ns-stat a-r"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <b className="grad">4</b>
                <small>
                  {lang === "km"
                    ? "ដំណាក់កាលអនុវត្ត"
                    : "Phases to Completion"}
                </small>
              </div>
            </div>

            <div className="tlg">
              {TIMELINE_MILESTONES.map((phase, idx) => (
                <div
                  key={phase.phase}
                  className={`tlg-card ${idx === 0 ? "cur" : ""} a`}
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                >
                  <div className="tlg-phase">
                    {lang === "km" ? phase.phaseKm : phase.phase}
                  </div>
                  <h3>{lang === "km" ? phase.titleKm : phase.titleEn}</h3>
                  <div className="tlg-date">
                    <Calendar size={14} />
                    <span>
                      {lang === "km" ? phase.timeframeKm : phase.timeframeEn}
                    </span>
                  </div>

                  <div className="tlg-points">
                    {phase.bulletsKm.map((item, i) => (
                      <div key={i} className="tlg-point">
                        <Check size={16} />
                        <span>
                          {lang === "km" ? item : phase.bulletsEn[i]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="tlg-footer">
                    <span className={`chip ${idx === 0 ? "grn" : "pri"}`}>
                      {idx === 0
                        ? lang === "km"
                          ? "កំពុងអនុវត្ត (Active)"
                          : "Currently Active"
                        : lang === "km"
                          ? "តាមកាលវិភាគ"
                          : "Scheduled"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 11: 30-Day Action Plan */}
        <section
          className={`slide ${currentSlide === 10 ? "on" : ""}`}
          data-label="Action Plan"
        >
          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="bgfx">
              <div className="dots" />
              <div className="blob b1" />
            </div>

            <div className="head">
              <div
                className="eyebrow a"
                style={{ "--d": 0 } as React.CSSProperties}
              >
                {lang === "km" ? "០៩ · ជំហានបន្ទាប់" : "09 · Next Steps"}
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
              <div
                className="tlg-card cur a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="tlg-phase">STEP 01</div>
                <h3>
                  {lang === "km"
                    ? "សម្របសម្រួលទម្រង់កាតាបៀវត្ស"
                    : "MEF Payroll Slip Alignment"}
                </h3>
                <p className="tlg-desc">
                  {lang === "km"
                    ? "រៀបចំកិច្ចប្រជុំបច្ចេកទេសជាមួយតំណាង MEF និងនាយកដ្ឋានទូទៅ ដើម្បីឯកភាពលើទម្រង់កាតាបៀវត្ស។"
                    : "Conduct technical coordination workshop to finalize the required salary slip layout."}
                </p>
                <div className="tlg-footer">
                  <span className="chip pri">Week 1 - 2</span>
                </div>
              </div>

              <div
                className="tlg-card a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <div className="tlg-phase">STEP 02</div>
                <h3>
                  {lang === "km"
                    ? "ធ្វើតេស្ត UAT ផែនការ & ថវិកា"
                    : "Planning & Budget UAT"}
                </h3>
                <p className="tlg-desc">
                  {lang === "km"
                    ? "ដាក់ឱ្យមន្ត្រីជំនាញធ្វើតេស្តសាកល្បងម៉ូឌុលផែនការ និងថវិកា ព្រមទាំងប្រមូលមតិកែលម្អ។"
                    : "Deploy test environment for departmental officers to validate operational budgeting flows."}
                </p>
                <div className="tlg-footer">
                  <span className="chip pri">Week 2 - 3</span>
                </div>
              </div>

              <div
                className="tlg-card a"
                style={{ "--d": 4 } as React.CSSProperties}
              >
                <div className="tlg-phase">STEP 03</div>
                <h3>
                  {lang === "km"
                    ? "ប្រមូលទិន្នន័យនាយកដ្ឋានទី ២"
                    : "Department 2 Intake"}
                </h3>
                <p className="tlg-desc">
                  {lang === "km"
                    ? "ចាប់ផ្តើមកិច្ចសម្ភាសន៍ប្រមូលតម្រូវការ និងទម្រង់ការងារសម្រាប់នាយកដ្ឋានទី ២។"
                    : "Initiate workflow mapping and template collection with Department 2 task force."}
                </p>
                <div className="tlg-footer">
                  <span className="chip amb">Week 3 - 4</span>
                </div>
              </div>

              <div
                className="tlg-card a"
                style={{ "--d": 5 } as React.CSSProperties}
              >
                <div className="tlg-phase">STEP 04</div>
                <h3>
                  {lang === "km"
                    ? "របាយការណ៍ជូនថ្នាក់ដឹកនាំ"
                    : "Executive Debrief"}
                </h3>
                <p className="tlg-desc">
                  {lang === "km"
                    ? "រៀបចំរបាយការណ៍បូកសរុបលទ្ធផល ៣០ថ្ងៃ និងស្នើសុំការសម្រេចលើជំហានបន្ត។"
                    : "Deliver progress metrics and request formal approvals for Q2 rollout phase."}
                </p>
                <div className="tlg-footer">
                  <span className="chip grn">Week 4</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 12: Executive Conclusion & Thank You */}
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

            <div className="pl">
              <RoyalTransmissionVisual />
            </div>

            <div className="ty-grid">
              <div className="ty">
                <div
                  className="eyebrow a"
                  style={{ "--d": 0 } as React.CSSProperties}
                >
                  {lang === "km" ? "សំណួរ & ចម្លើយ" : "Questions & Discussion"}
                </div>
                <h1
                  className="grad a"
                  style={{ "--d": 1 } as React.CSSProperties}
                >
                  {lang === "km" ? "សូមអរគុណ" : "Thank You"}
                </h1>
                <p className="a" style={{ "--d": 2 } as React.CSSProperties}>
                  {lang === "km"
                    ? "សូមគោរពថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះឯកឧត្តម លោកជំទាវ និងលោក-លោកស្រី ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃចូលរួមក្នុងបទបង្ហាញនេះ។"
                    : "Thank you for your valuable time and participation. We look forward to our continuous collaboration."}
                </p>

                <div
                  className="ty-contact a"
                  style={{ "--d": 3 } as React.CSSProperties}
                >
                  <Image
                    src="/logo/Oone logo.svg"
                    alt="OONE Logo"
                    width={96}
                    height={40}
                    className="object-contain"
                  />
                  <div className="chip">
                    <Phone size={16} className="vp-icon-pri" />
                    <span>+855 23 888 999</span>
                  </div>
                  <div className="chip">
                    <Mail size={16} className="vp-icon-pri" />
                    <span>contact@oonepower.com</span>
                  </div>
                </div>
              </div>

              <div
                className="qrc a-r"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <div className="qrbox">
                  <Image
                    src="/logo/logo tab.svg"
                    alt="QR Emblem"
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
                <span className="chip pri">MME DIGITAL PLATFORM</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Unified Bottom Footer Bar */}
      <div className="bar-dock" id="bar">
        <div
          className="prog"
          id="prog"
          style={{ width: `${progressPercent}%` }}
        />

        <div className="brand">
          <Image
            src="/logo/Oone logo.svg"
            alt="OONE Logo"
            width={68}
            height={30}
            className="brand-logo object-contain"
          />
          <div>
            <b>MME Digital Platform</b>
            <span id="cnt">
              {currentSlide + 1 < 10
                ? `0${currentSlide + 1}`
                : currentSlide + 1}{" "}
              / {TOTAL_SLIDES}
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
            </button>
          ))}
        </nav>

        <button
          className="nb pri interactive"
          id="next"
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
        >
          <span className="tx" id="nextTx">
            {lang === "km" ? "បន្ទាប់" : "Next"}
          </span>
          <ChevronRight size={18} />
        </button>

        <span className="sep" />

        {/* Language Switcher */}
        <div
          className={`langsw ${langDropdownOpen ? "open" : ""}`}
          id="langDD"
        >
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
              {lang === "en" && <Check size={14} />}
            </button>
            <button
              role="menuitemradio"
              aria-checked={lang === "km"}
              className={`interactive ${lang === "km" ? "on" : ""}`}
              onClick={() => toggleLanguage("km")}
            >
              <span className="lc">KH</span>ខ្មែរ
              {lang === "km" && <Check size={14} />}
            </button>
          </div>
        </div>

        {/* Theme Switcher */}
        <button
          className="nb interactive"
          id="theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <span className="tx">{theme === "light" ? "Dark" : "Light"}</span>
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
