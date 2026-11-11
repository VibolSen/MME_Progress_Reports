/**
 * Author: Antigravity AI Agent
 * Date: 2026-11-11
 * Task: Sync Presentation Slides with Updated data.md Across All 3 General Departments
 */

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Language,
  PRESENTATION_META,
  AGENDA_ITEMS,
  DEPARTMENTS,
  COMPONENTS_DATA,
  MINERAL_RESOURCES_DATA,
  PETROLEUM_DATA,
  CHALLENGES_DATA,
} from "./slidesData";
import {
  HeroHubVisual,
  DepartmentNetworkMap,
  MeetingRoomVisual,
  MissionPayrollFlow,
  AssetBudgetVisual,
  SecretariatVaultVisual,
  MiningPortalVisual,
  PetroleumApplicantVisual,
  PetroleumInternalVisual,
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
  ArrowRight,
  ShieldCheck,
  Layers,
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

  // LIGHT THEME & ENGLISH LANGUAGE ARE DEFAULT
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [lang, setLang] = useState<Language>("en");
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
                      ? "អគ្គនាយកដ្ឋានកិច្ចការទូទៅ · ធនធានរ៉ែ · ប្រេងកាត"
                      : "General Affairs · Mineral Resources · Petroleum"}
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
                    {lang === "km"
                      ? "ចាប់ផ្តើមបទបង្ហាញ"
                      : "Start the presentation"}
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
                <HeroHubVisual />
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
                    ទិដ្ឋភាពទូទៅនៃ <span className="g">អគ្គនាយកដ្ឋានទាំង ៣</span>
                  </>
                ) : (
                  <>
                    Progress Across <span className="g">3 General Departments</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "បច្ចុប្បន្នភាពវឌ្ឍភាពការងារ ចំណាំសម្គាល់ និងចំណុចប្រឈមនៃអគ្គនាយកដ្ឋានកិច្ចការទូទៅ អគ្គនាយកដ្ឋានធនធានរ៉ែ និងអគ្គនាយកដ្ឋានប្រេងកាត"
                  : "Updated implementation progress, remarks, and challenges across General Affairs, Mineral Resources, and Petroleum"}
              </p>
            </div>

            <div className="ag">
              {AGENDA_ITEMS.map((item, idx) => (
                <button
                  key={item.key}
                  className="a interactive"
                  style={{ "--d": idx + 2 } as React.CSSProperties}
                  onClick={() => {
                    if (idx === 0) goToSlide(3);
                    else if (idx === 1) goToSlide(7);
                    else if (idx === 2) goToSlide(8);
                  }}
                >
                  <span className="n">{item.num}</span>
                  <span className="ic soft">
                    {idx === 0 && <Layers size={30} />}
                    {idx === 1 && <Globe size={30} />}
                    {idx === 2 && <ShieldCheck size={30} />}
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

        {/* SLIDE 3: Executive Overview of All 3 General Departments */}
        <section
          className={`slide ${currentSlide === 2 ? "on" : ""}`}
          data-label="Overview"
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
                  ? "០១ · ទិដ្ឋភាពរួមនៃអគ្គនាយកដ្ឋានទាំង ៣"
                  : "01 · 3 General Departments Overview"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    វឌ្ឍភាពសង្ខេបនៃ{" "}
                    <span className="g">អគ្គនាយកដ្ឋានទាំង ៣</span>
                  </>
                ) : (
                  <>
                    Executive Summary of the{" "}
                    <span className="g">3 General Departments</span>
                  </>
                )}
              </h2>
              <p className="lead a" style={{ "--d": 2 } as React.CSSProperties}>
                {lang === "km"
                  ? "ទិន្នន័យវឌ្ឍភាពបច្ចុប្បន្នភាពពេញលេញសម្រាប់អគ្គនាយកដ្ឋានកិច្ចការទូទៅ អគ្គនាយកដ្ឋានធនធានរ៉ែ និងអគ្គនាយកដ្ឋានប្រេងកាត"
                  : "Complete up-to-date progress across General Affairs, Mineral Resources, and Petroleum"}
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
                        ? "បច្ចុប្បន្នភាពទិន្នន័យពេញលេញ · ៣ អគ្គនាយកដ្ឋាន"
                        : "Up-to-Date Progress · All 3 General Departments"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? "ស្ថានភាពគម្រោងតាមអគ្គនាយកដ្ឋាន"
                        : "Departmental Project Status"}
                    </h3>
                  </div>
                  <span className="ic grn">
                    <Building2 size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {DEPARTMENTS.map((dep, idx) => (
                    <div key={dep.id} className="comp-list-item">
                      <span className="badge-num">0{idx + 1}</span>
                      <div>
                        <h4>{lang === "km" ? dep.nameKm : dep.nameEn}</h4>
                        <p>
                          {lang === "km"
                            ? dep.descriptionKm
                            : dep.descriptionEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip pri">MME DIGITAL ECOSYSTEM</span>
                    <h3>
                      {lang === "km"
                        ? "បណ្តាញប្រព័ន្ធឌីជីថលអគ្គនាយកដ្ឋានទាំង ៣"
                        : "3-General-Department Digital Architecture"}
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
                      ? "អគ្គនាយកដ្ឋានកិច្ចការទូទៅ · អគ្គនាយកដ្ឋានធនធានរ៉ែ · អគ្គនាយកដ្ឋានប្រេងកាត"
                      : "General Affairs · Mineral Resources · Petroleum"}
                  </span>
                  <span className="vs-mono-badge grn">ALL 3 ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 4: General Department of General Affairs — Component 1 (1.1) */}
        <section
          className={`slide ${currentSlide === 3 ? "on" : ""}`}
          data-label="Component 1"
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
                  ? "០២ · អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (វឌ្ឍភាពគម្រោងទី១)"
                  : "02 · General Dept. of General Affairs (Project 1)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    1.1 សមាសភាគទី១៖{" "}
                    <span className="g">
                      ថែទាំ (10%) ផ្គត់ផ្គង់ (10%) & សេវាបន្ទប់ប្រជុំ (100%)
                    </span>
                  </>
                ) : (
                  <>
                    1.1 Component 1:{" "}
                    <span className="g">
                      Maintenance (10%), Supply (10%) & Meeting Room (100%)
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
                        ? "សេវាបន្ទប់ប្រជុំ 100% · ថែទាំ និងផ្គត់ផ្គង់ 10%"
                        : "Meeting Room 100% Live · Maintenance & Supply 10%"}
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
                  {COMPONENTS_DATA[0].subtasks.map((item) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{item.id}</span>
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

        {/* SLIDE 5: General Department of General Affairs — Component 2 (1.2) */}
        <section
          className={`slide ${currentSlide === 4 ? "on" : ""}`}
          data-label="Component 2"
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
                  ? "០៣ · អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (វឌ្ឍភាពគម្រោងទី១)"
                  : "03 · General Dept. of General Affairs (Project 1)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    1.2 សមាសភាគទី២៖{" "}
                    <span className="g">
                      ការស្នើសុំបេសកកម្ម (65%) & ដំណើរការប្រាក់បៀវត្ស
                    </span>
                  </>
                ) : (
                  <>
                    1.2 Component 2:{" "}
                    <span className="g">
                      Mission Request (65%) & Payroll Processing
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
                        ? "បេសកកម្មរៀបចំរួចរាល់ 65% · ប្រាក់បៀវត្សរង់ចាំសិក្សាបន្ថែម"
                        : "Mission Setup Ready (65%) · Payroll Pending Study"}
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
                  {COMPONENTS_DATA[1].subtasks.map((item) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{item.id}</span>
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

        {/* SLIDE 6: General Department of General Affairs — Components 3 & 4 (1.3 & 1.4) */}
        <section
          className={`slide ${currentSlide === 5 ? "on" : ""}`}
          data-label="Component 3 & 4"
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
                  ? "០៤ · អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (វឌ្ឍភាពគម្រោងទី១)"
                  : "04 · General Dept. of General Affairs (Project 1)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    1.3 & 1.4 សមាសភាគទី៣ & ៤៖{" "}
                    <span className="g">
                      ទ្រព្យសម្បត្តិរដ្ឋ (10%) & ផែនការ ថវិកា និង M&E (10%)
                    </span>
                  </>
                ) : (
                  <>
                    1.3 & 1.4 Components 3 & 4:{" "}
                    <span className="g">
                      State Assets (10%) & Planning, Budget, M&E (10%)
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
                        ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
                        : "User Requirements Studied (10%)"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? "សមាសភាគទី៣ (10%) និង សមាសភាគទី៤ (10%)"
                        : "Component 3 (10%) & Component 4 (10%)"}
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

        {/* SLIDE 7: General Department of General Affairs — Component 5 (1.5 · 60% General Secretariat) */}
        <section
          className={`slide ${currentSlide === 6 ? "on" : ""}`}
          data-label="Component 5"
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
                  ? "០៥ · អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (វឌ្ឍភាពគម្រោងទី១)"
                  : "05 · General Dept. of General Affairs (Project 1)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    1.5 សមាសភាគទី៥ (60%)៖{" "}
                    <span className="g">សម្រាប់អគ្គលេខាធិការដ្ឋាន</span>
                  </>
                ) : (
                  <>
                    1.5 Component 5 (60%):{" "}
                    <span className="g">For General Secretariat</span>
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
                        ? "សម្រេចបាន 60% · ការរៀបចំប្រព័ន្ធរួចរាល់"
                        : "60% Overall · System Setup Ready"}
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
                  {COMPONENTS_DATA[4].subtasks.map((item) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{item.id}</span>
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

        {/* SLIDE 8: General Department of Mineral Resources (អគ្គនាយកដ្ឋានធនធានរ៉ែ · គម្រោងទី២) */}
        <section
          className={`slide ${currentSlide === 7 ? "on" : ""}`}
          data-label="Mineral Resources"
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
                  ? "០៦ · អគ្គនាយកដ្ឋានធនធានរ៉ែ (គម្រោងទី២)"
                  : "06 · General Dept. of Mineral Resources (Project 2)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    គម្រោងទី២៖{" "}
                    <span className="g">
                      ប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ
                    </span>
                  </>
                ) : (
                  <>
                    Project 2:{" "}
                    <span className="g">
                      Digital Public Service System for Mining Sector
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
                        ? "I. Web Portal អ្នកស្នើសុំ & II. Web Portal ផ្ទៃក្នុង (៣ សេវា រួចរាល់)"
                        : "I. Applicant & II. Internal Web Portals (3 Services Ready)"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? "សេវាសាធារណៈឌីជីថលទាំង ៣ លើវិស័យរ៉ែ"
                        : "3 Digital Mining & Quarry Licensing Services"}
                    </h3>
                  </div>
                  <span className="ic grn">
                    <Check size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {MINERAL_RESOURCES_DATA.services.map((srv) => (
                    <div key={srv.num} className="comp-list-item">
                      <span className="badge-num">{srv.num}</span>
                      <div>
                        <h4>{lang === "km" ? srv.titleKm : srv.titleEn}</h4>
                        <p>{lang === "km" ? srv.statusKm : srv.statusEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <MiningPortalVisual lang={lang} theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 9: General Department of Petroleum — I. Applicant Web Portal */}
        <section
          className={`slide ${currentSlide === 8 ? "on" : ""}`}
          data-label="Petroleum Applicant"
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
                  ? "០៧ · អគ្គនាយកដ្ឋានប្រេងកាត (ផ្នែកទី១)"
                  : "07 · General Dept. of Petroleum (Part I)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    I. Web Portal{" "}
                    <span className="g">សម្រាប់អ្នកស្នើសុំ (៣ សេវា)</span>
                  </>
                ) : (
                  <>
                    I. Web Portal <span className="g">for Applicants (3 Services)</span>
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
                        ? "រៀបចំរួចរាល់ ២ សេវា · សម្រេចបាន 90% ១ សេវា"
                        : "2 Services Ready · 1 Service at 90%"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? PETROLEUM_DATA.applicantPortal.titleKm
                        : PETROLEUM_DATA.applicantPortal.titleEn}
                    </h3>
                  </div>
                  <span className="ic soft">
                    <Globe size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {PETROLEUM_DATA.applicantPortal.services.map((srv) => (
                    <div key={srv.num} className="comp-list-item">
                      <span className="badge-num">{srv.num}</span>
                      <div>
                        <h4>{lang === "km" ? srv.titleKm : srv.titleEn}</h4>
                        <p>{lang === "km" ? srv.notesKm : srv.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <PetroleumApplicantVisual lang={lang} theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 10: General Department of Petroleum — II. Internal Ministry Web Portal */}
        <section
          className={`slide ${currentSlide === 9 ? "on" : ""}`}
          data-label="Petroleum Internal"
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
                  ? "០៨ · អគ្គនាយកដ្ឋានប្រេងកាត (ផ្នែកទី២)"
                  : "08 · General Dept. of Petroleum (Part II)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    II. Web Portal{" "}
                    <span className="g">សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុងក្រសួង</span>
                  </>
                ) : (
                  <>
                    II. Web Portal{" "}
                    <span className="g">for Internal Ministry Use</span>
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
                        ? "75% · រួចរាល់ · តេស្តមន្ទីរខេត្ត (១០ វិច្ឆិកា ២០២៦) · Offline 5%"
                        : "75% · Ready · Provincial Test (Nov 10, 2026) · Offline 5%"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? PETROLEUM_DATA.internalPortal.titleKm
                        : PETROLEUM_DATA.internalPortal.titleEn}
                    </h3>
                  </div>
                  <span className="ic amb">
                    <ShieldCheck size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {PETROLEUM_DATA.internalPortal.services.map((srv) => (
                    <div key={srv.num} className="comp-list-item">
                      <span className="badge-num">{srv.num}</span>
                      <div>
                        <h4>{lang === "km" ? srv.titleKm : srv.titleEn}</h4>
                        <p>{lang === "km" ? srv.notesKm : srv.notesEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <PetroleumInternalVisual lang={lang} theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 11: Challenges, Remarks & Timeline Across All 3 General Departments */}
        <section
          className={`slide ${currentSlide === 10 ? "on" : ""}`}
          data-label="Challenges & Timeline"
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
                  ? "០៩ · ចំណុចប្រឈម ចំណាំសម្គាល់ & សំណូមពរ"
                  : "09 · Challenges, Remarks & Action Plan"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    ចំណុចប្រឈម ចំណាំសម្គាល់ និង{" "}
                    <span className="g">ទិសដៅអនុវត្តបន្ត</span>
                  </>
                ) : (
                  <>
                    Key Challenges, Remarks &{" "}
                    <span className="g">Next Milestones</span>
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
                    <span className="chip pri">
                      {lang === "km" ? ch.categoryKm : ch.categoryEn}
                    </span>
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
                      {lang === "km"
                        ? "សំណូមពរ / ការកែសម្រួល៖"
                        : "Action / Refinement:"}
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
                    {lang === "km"
                      ? "ចំណុចប្រឈមអគ្គនាយកដ្ឋានប្រេងកាត"
                      : "Petroleum Inspection Form Requirement"}
                  </small>
                  {lang === "km"
                    ? "ផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហាន មន្ទីរចុះពិនិត្យទីតាំង ស្នើសុំឱ្យបង្ហាញដូចកំណត់ហេតុ"
                    : "Provincial On-Site Inspection step data entry screen requested to match official inspection minutes"}
                </div>
              </div>
              <div className="track" />
              <div className="s">
                <span className="dot grn" />
                <div>
                  <small>
                    {lang === "km"
                      ? "ការពិនិត្យ និងជំហានបន្ទាប់"
                      : "Ministry Review & Next Steps"}
                  </small>
                  {lang === "km"
                    ? "ពិនិត្យកែសម្រួលសេវារ៉ែទី២-៣ តាមការអនុវត្តជាក់ស្ដែង និងសិក្សាប្រាក់បៀវត្សបន្ថែមជាមួយក្រសួង"
                    : "Review Mining Services 2 & 3 per actual practice and conduct joint Ministry study on Payroll"}
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
      <div
        className="bar-dock"
        id="bar"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "0 18px",
        }}
      >
        <div
          className="prog-track"
          style={{
            position: "absolute",
            left: "18px",
            right: "18px",
            top: 0,
            height: "3px",
            borderRadius: "999px",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            className="prog"
            id="prog"
            style={{
              width: `${progressPercent}%`,
              position: "static",
              height: "100%",
            }}
          />
        </div>

        <div
          className="brand"
          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <Image
            src="/logo/Oone logo.svg"
            alt="OONE Logo"
            width={68}
            height={30}
            className="brand-logo object-contain"
          />
        </div>

        <span className="sep" style={{ flexShrink: 0 }} />

        <button
          className="nb interactive"
          id="prev"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
          style={{ flexShrink: 0 }}
        >
          <ChevronLeft size={16} />
          <span className="tx">{lang === "km" ? "ថយក្រោយ" : "Back"}</span>
        </button>

        <nav
          className="dots-nav"
          id="dn"
          aria-label="Slides"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "4px",
            overflowX: "auto",
            overflowY: "hidden",
            maxWidth: "100%",
            padding: "2px",
          }}
        >
          {slideList.map((s, idx) => (
            <button
              key={s.id}
              className={`interactive ${currentSlide === idx ? "cur" : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                flexShrink: 0,
                minWidth: "30px",
                height: "32px",
                padding: "0 6px",
              }}
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
          style={{ flexShrink: 0 }}
        >
          <span className="tx" id="nextTx">
            {lang === "km" ? "បន្ទាប់" : "Next"}
          </span>
          <ChevronRight size={16} />
        </button>

        <span className="sep" style={{ flexShrink: 0 }} />

        {/* Language Switcher */}
        <div
          className={`langsw ${langDropdownOpen ? "open" : ""}`}
          id="langDD"
          style={{ flexShrink: 0 }}
        >
          <button
            className="lbtn interactive"
            id="langBtn"
            onClick={() => setLangDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={langDropdownOpen}
            aria-label="Language selector"
          >
            <Globe size={16} />
            <span id="langCur">{lang === "km" ? "KH" : "EN"}</span>
            <ChevronUp size={13} className="lchev" />
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
          style={{ flexShrink: 0 }}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          <span className="tx">{theme === "light" ? "Dark" : "Light"}</span>
        </button>

        {/* Print Button */}
        <button
          className="nb interactive"
          id="printb"
          onClick={() => window.print()}
          aria-label="Print slides"
          style={{ flexShrink: 0 }}
        >
          <Printer size={16} />
          <span className="tx">{lang === "km" ? "បោះពុម្ព" : "Print"}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          className="nb interactive"
          id="fsb"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
          style={{ flexShrink: 0 }}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          <span className="tx" id="fsTx">
            {isFullscreen ? "Exit" : "Full screen"}
          </span>
        </button>
      </div>
    </div>
  );
}
