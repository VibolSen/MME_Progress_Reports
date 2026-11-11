/**
 * Author: Antigravity AI Agent
 * Date: 2026-11-11
 * Task: Consolidate MME Progress Reports into 5 Executive Slides Matching data.md
 */

"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import {
  Language,
  PRESENTATION_META,
  COMPONENTS_DATA,
  MINERAL_RESOURCES_DATA,
  PETROLEUM_DATA,
} from "./slidesData";
import { HeroHubVisual, RoyalTransmissionVisual } from "./slideVisuals";
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
  ArrowRight,
  ShieldCheck,
  Layers,
  Phone,
  Mail,
  Building2,
} from "lucide-react";

const TOTAL_SLIDES = 5;

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // LIGHT THEME & ENGLISH LANGUAGE ARE DEFAULT
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [lang, setLang] = useState<Language>("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  // Hydration-safe fullscreen state via useSyncExternalStore
  const isFullscreen = useSyncExternalStore(
    useCallback((onStoreChange: () => void) => {
      document.addEventListener("fullscreenchange", onStoreChange);
      return () =>
        document.removeEventListener("fullscreenchange", onStoreChange);
    }, []),
    () => Boolean(document.fullscreenElement),
    () => false
  );

  // Hydration-safe dynamic scale calculation for 1920x1080 stage
  const scale = useSyncExternalStore(
    useCallback((onStoreChange: () => void) => {
      window.addEventListener("resize", onStoreChange);
      document.addEventListener("fullscreenchange", onStoreChange);
      return () => {
        window.removeEventListener("resize", onStoreChange);
        document.removeEventListener("fullscreenchange", onStoreChange);
      };
    }, []),
    () => {
      const w = window.innerWidth;
      const h = window.innerHeight - 76;
      const s = Math.min(w / 1920, h / 1080);
      return s > 0 ? s : 1;
    },
    () => 1
  );

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      const slideNum = parseInt(hash, 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= TOTAL_SLIDES) {
        setCurrentSlide(slideNum - 1);
      }
    };
    const timer = window.setTimeout(syncFromHash, 0);
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

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
    () => [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
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
        {/* ============================================================
            SLIDE 1: Title / Cover UI (First Slide Kept Intact)
           ============================================================ */}
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

        {/* ============================================================
            SLIDE 2: អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (General Dept. of General Affairs)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 1 ? "on" : ""}`}
          data-label="General Affairs"
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
                  ? "០១ · អគ្គនាយកដ្ឋានកិច្ចការទូទៅ (I. វឌ្ឍភាពគម្រោងទី1)"
                  : "01 · General Department of General Affairs (Project 1 Progress)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    អគ្គនាយកដ្ឋានកិច្ចការទូទៅ ·{" "}
                    <span className="g">វឌ្ឍភាពគម្រោងទី១ (សមាសភាគទី១ ដល់ទី៥)</span>
                  </>
                ) : (
                  <>
                    General Dept. of General Affairs ·{" "}
                    <span className="g">Project 1 (Components 1 to 5)</span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              {/* Left Column: Component 1 (1.1) & Component 2 (1.2) */}
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn">
                      {lang === "km"
                        ? "1.1 សមាសភាគទី1 & 1.2 សមាសភាគទី2"
                        : "1.1 Component 1 & 1.2 Component 2"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? "ប្រតិបត្តិការ បន្ទប់ប្រជុំ បេសកកម្ម & ប្រាក់បៀវត្ស"
                        : "Operations, Meeting Room, Mission & Payroll"}
                    </h3>
                  </div>
                  <span className="ic grn">
                    <Building2 size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {[
                    ...COMPONENTS_DATA[0].subtasks,
                    ...COMPONENTS_DATA[1].subtasks,
                  ].map((item) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{item.id}</span>
                      <div style={{ flex: 1 }}>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>{lang === "km" ? item.statusKm : item.statusEn}</p>
                      </div>
                      <span
                        className={`chip ${
                          item.progress === 100
                            ? "grn"
                            : item.progress >= 60
                              ? "pri"
                              : "amb"
                        }`}
                      >
                        {item.progress > 0
                          ? `${item.progress}%`
                          : lang === "km"
                            ? "រង់ចាំសិក្សា"
                            : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Component 3 (1.3), Component 4 (1.4), & Component 5 (1.5 · 60%) */}
              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip pri">
                      {lang === "km"
                        ? "1.3 សមាសភាគទី3 · 1.4 សមាសភាគទី4 · 1.5 សមាសភាគទី5 (60%)"
                        : "1.3 Component 3 · 1.4 Component 4 · 1.5 Secretariat (60%)"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? "ទ្រព្យសម្បត្តិរដ្ឋ ផែនការថវិកា & អគ្គលេខាធិការដ្ឋាន (60%)"
                        : "State Assets, Budget/M&E & General Secretariat (60%)"}
                    </h3>
                  </div>
                  <span className="ic soft">
                    <Layers size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  <div className="comp-list-item">
                    <span className="badge-num">1.3</span>
                    <div style={{ flex: 1 }}>
                      <h4>
                        {lang === "km"
                          ? COMPONENTS_DATA[2].subtasks[0].titleKm
                          : COMPONENTS_DATA[2].subtasks[0].titleEn}
                      </h4>
                      <p>
                        {lang === "km"
                          ? COMPONENTS_DATA[2].subtasks[0].statusKm
                          : COMPONENTS_DATA[2].subtasks[0].statusEn}
                      </p>
                    </div>
                    <span className="chip amb">10%</span>
                  </div>

                  <div className="comp-list-item">
                    <span className="badge-num">1.4</span>
                    <div style={{ flex: 1 }}>
                      <h4>
                        {lang === "km"
                          ? COMPONENTS_DATA[3].subtasks[0].titleKm
                          : COMPONENTS_DATA[3].subtasks[0].titleEn}
                      </h4>
                      <p>
                        {lang === "km"
                          ? COMPONENTS_DATA[3].subtasks[0].statusKm
                          : COMPONENTS_DATA[3].subtasks[0].statusEn}
                      </p>
                    </div>
                    <span className="chip amb">10%</span>
                  </div>

                  {COMPONENTS_DATA[4].subtasks.map((item) => (
                    <div key={item.id} className="comp-list-item">
                      <span className="badge-num">{item.id}</span>
                      <div style={{ flex: 1 }}>
                        <h4>{lang === "km" ? item.titleKm : item.titleEn}</h4>
                        <p>
                          {lang === "km"
                            ? "សម្រាប់អគ្គលេខាធិការដ្ឋាន · ការរៀបចំប្រព័ន្ធរួចរាល់"
                            : "For General Secretariat · System Setup Ready"}
                        </p>
                      </div>
                      <span className="chip grn">60% Ready</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 3: អគ្គនាយកដ្ឋានធនធានរ៉ែ (General Dept. of Mineral Resources)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 2 ? "on" : ""}`}
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
                  ? "០២ · អគ្គនាយកដ្ឋានធនធានរ៉ែ (គម្រោងទី២)"
                  : "02 · General Department of Mineral Resources (Project 2)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    គម្រោងទី២៖{" "}
                    <span className="g">
                      ការងាររៀបចំប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ
                    </span>
                  </>
                ) : (
                  <>
                    Project 2:{" "}
                    <span className="g">
                      Digital Public Service System for the Mining Sector
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              {/* Left Column: I. Web Portal សម្រាប់អ្នកស្នើសុំ */}
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn">
                      {lang === "km"
                        ? "បានរៀបចំរួចរាល់ · ៣ សេវា"
                        : "Setup Ready · 3 Services"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? MINERAL_RESOURCES_DATA.applicantPortalTitleKm
                        : MINERAL_RESOURCES_DATA.applicantPortalTitleEn}
                    </h3>
                  </div>
                  <span className="ic grn">
                    <Globe size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {MINERAL_RESOURCES_DATA.services.map((srv) => (
                    <div key={`app-${srv.num}`} className="comp-list-item">
                      <span className="badge-num">{srv.num}</span>
                      <div style={{ flex: 1 }}>
                        <h4>{lang === "km" ? srv.titleKm : srv.titleEn}</h4>
                        <p>
                          {lang === "km"
                            ? "Web Portal សម្រាប់អ្នកស្នើសុំ៖ បានរៀបចំរួចរាល់"
                            : "Applicant Web Portal: Setup Ready"}
                        </p>
                      </div>
                      <span className="chip grn">Ready</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: II. Web Portal សម្រាប់ការងារផ្ទៃក្នុង */}
              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip pri">
                      {lang === "km"
                        ? "បានរៀបចំរួចរាល់ · ៣ សេវា"
                        : "Setup Ready · 3 Services"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? MINERAL_RESOURCES_DATA.internalPortalTitleKm
                        : MINERAL_RESOURCES_DATA.internalPortalTitleEn}
                    </h3>
                  </div>
                  <span className="ic soft">
                    <Check size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {MINERAL_RESOURCES_DATA.services.map((srv) => (
                    <div key={`int-${srv.num}`} className="comp-list-item">
                      <span className="badge-num">{srv.num}</span>
                      <div style={{ flex: 1 }}>
                        <h4>{lang === "km" ? srv.titleKm : srv.titleEn}</h4>
                        <p>{lang === "km" ? srv.statusKm : srv.statusEn}</p>
                      </div>
                      <span className="chip pri">Ready</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Banner: III. ចំណាំសម្គាល់ */}
            <div
              className="shift a"
              style={{ "--d": 4 } as React.CSSProperties}
            >
              <div className="s">
                <span className="dot grn" />
                <div>
                  <small>
                    {lang === "km"
                      ? "I & II. ស្ថានភាព Web Portal ទាំង ២"
                      : "I & II. Dual Web Portal Status"}
                  </small>
                  {lang === "km"
                    ? "Web Portal សម្រាប់អ្នកស្នើសុំ និងការងារផ្ទៃក្នុង បានរៀបចំរួចរាល់ទាំង ៣ សេវា"
                    : "Both Applicant and Internal Web Portals are completed for all 3 Mining Services"}
                </div>
              </div>
              <div className="track" />
              <div className="s">
                <span className="dot red" />
                <div>
                  <small>
                    {lang === "km"
                      ? MINERAL_RESOURCES_DATA.noteTitleKm
                      : MINERAL_RESOURCES_DATA.noteTitleEn}
                  </small>
                  {lang === "km"
                    ? MINERAL_RESOURCES_DATA.noteTextKm
                    : MINERAL_RESOURCES_DATA.noteTextEn}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 4: អគ្គនាយកដ្ឋានប្រេងកាត (General Dept. of Petroleum)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 3 ? "on" : ""}`}
          data-label="Petroleum"
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
                  ? "០៣ · អគ្គនាយកដ្ឋានប្រេងកាត (វឌ្ឍភាព & ចំណុចប្រឈម)"
                  : "03 · General Department of Petroleum (Progress & Challenges)"}
              </div>
              <h2 className="h a" style={{ "--d": 1 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    អគ្គនាយកដ្ឋានប្រេងកាត៖{" "}
                    <span className="g">
                      Web Portal អ្នកស្នើសុំ, ផ្ទៃក្នុងក្រសួង & ចំណុចប្រឈម
                    </span>
                  </>
                ) : (
                  <>
                    General Dept. of Petroleum:{" "}
                    <span className="g">
                      Applicant Portal, Internal Portal & Challenges
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="comp-split">
              {/* Left Column: I. Web Portal សម្រាប់អ្នកស្នើសុំ */}
              <div
                className="comp-box a"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip grn">
                      {lang === "km"
                        ? "រួចរាល់ ២ សេវា · សម្រេចបាន 90% ១ សេវា"
                        : "2 Services Ready · 1 Service at 90%"}
                    </span>
                    <h3>
                      {lang === "km"
                        ? PETROLEUM_DATA.applicantPortal.titleKm
                        : PETROLEUM_DATA.applicantPortal.titleEn}
                    </h3>
                  </div>
                  <span className="ic grn">
                    <Globe size={24} />
                  </span>
                </div>
                <div className="comp-list">
                  {PETROLEUM_DATA.applicantPortal.services.map((srv) => (
                    <div key={`pet-app-${srv.num}`} className="comp-list-item">
                      <span className="badge-num">{srv.num}</span>
                      <div style={{ flex: 1 }}>
                        <h4>{lang === "km" ? srv.titleKm : srv.titleEn}</h4>
                        <p>{lang === "km" ? srv.notesKm : srv.notesEn}</p>
                      </div>
                      <span
                        className={`chip ${srv.num === "03" ? "pri" : "grn"}`}
                      >
                        {lang === "km" ? srv.badgeKm : srv.badgeEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: II. Web Portal សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុងក្រសួង */}
              <div
                className="comp-box a"
                style={{ "--d": 3 } as React.CSSProperties}
              >
                <div className="comp-box-header">
                  <div>
                    <span className="chip amb">
                      {lang === "km"
                        ? "75% · រួចរាល់ · តេស្តមន្ទីរខេត្ត (១០ វិច្ឆិកា) · Offline 5%"
                        : "75% · Ready · Provincial Test (Nov 10) · Offline 5%"}
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
                    <div key={`pet-int-${srv.num}`} className="comp-list-item">
                      <span className="badge-num">{srv.num}</span>
                      <div style={{ flex: 1 }}>
                        <h4>{lang === "km" ? srv.titleKm : srv.titleEn}</h4>
                        <p>{lang === "km" ? srv.notesKm : srv.notesEn}</p>
                      </div>
                      <span
                        className={`chip ${
                          srv.num === "01"
                            ? "pri"
                            : srv.num === "02"
                              ? "grn"
                              : "amb"
                        }`}
                      >
                        {lang === "km" ? srv.badgeKm : srv.badgeEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Banner: III. ចំណុចប្រឈម (Challenges) */}
            <div
              className="shift a"
              style={{ "--d": 4 } as React.CSSProperties}
            >
              <div className="s">
                <span className="dot red" />
                <div>
                  <small>
                    {lang === "km"
                      ? "III. ចំណុចប្រឈម (សេវាទី១ និងទី៣)"
                      : "III. Challenges (Services 1 & 3)"}
                  </small>
                  {lang === "km"
                    ? "១. ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ & ២. ស្នើសុំពិនិត្យ ទទួល និងដំណើរការបន្តសុពលភាពសម្រាប់ស្ថានីយប្រេង/ឧស្ម័នឥន្ធនៈ"
                    : "1. Station Technical Safety Certificate & 2. Application/Renewal of Technical Safety Certificate for Fuel or LPG Stations"}
                </div>
              </div>
              <div className="track" />
              <div className="s">
                <span className="dot grn" />
                <div>
                  <small>
                    {lang === "km"
                      ? "សំណើកែសម្រួលក្នុងជំហានមន្ទីរចុះពិនិត្យទីតាំង"
                      : "Requested Refinement at Provincial Inspection Step"}
                  </small>
                  {lang === "km"
                    ? "ផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហាន មន្ទីរចុះពិនិត្យទីតាំង ស្នើសុំឱ្យបង្ហាញដូចកំណត់ហេតុ។"
                    : "At the Provincial Department On-Site Inspection step, the data entry screen is requested to match the official inspection minutes."}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 5: Executive Conclusion & Thank You (Last Slide Kept Intact)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 4 ? "on" : ""}`}
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
