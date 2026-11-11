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
                  : "01 · General Department of General Affairs (I. Project 1 Progress)"}
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

            <div className="analytics-dashboard">
              {/* LEFT ANALYTICS COLUMN: Donut Chart + Vertical Column Bar Chart */}
              <div
                className="analytics-col a"
                style={{ "--d": 1.5 } as React.CSSProperties}
              >
                {/* Chart 1: SVG Donut Chart of 10 Sub-Modules */}
                <div className="chart-card">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ការវិភាគស្ថានភាពមុខងារទាំង ១០ (៥ សមាសភាគ)"
                        : "Status Distribution (10 Modules · 5 Components)"}
                    </h3>
                    <span className="chip grn">
                      {lang === "km" ? "គម្រោងទី១" : "Project 1"}
                    </span>
                  </div>

                  <div className="donut-layout">
                    <div className="donut-svg-wrap">
                      {/* Circumference = 2 * pi * 68 ≈ 427.25 */}
                      <svg
                        width="196"
                        height="196"
                        viewBox="0 0 180 180"
                        style={{ transform: "rotate(-90deg)" }}
                      >
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="var(--pb)"
                          strokeWidth="22"
                        />
                        {/* 10% Live (1/10) -> 42.7 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#059669"
                          strokeWidth="22"
                          strokeDasharray="42.7 427.3"
                          strokeDashoffset="0"
                        />
                        {/* 40% System Ready 60-65% (4/10) -> 170.9 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="22"
                          strokeDasharray="170.9 427.3"
                          strokeDashoffset="-42.7"
                        />
                        {/* 40% Requirements Studied 10% (4/10) -> 170.9 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#D97706"
                          strokeWidth="22"
                          strokeDasharray="170.9 427.3"
                          strokeDashoffset="-213.6"
                        />
                        {/* 10% Pending Study (1/10) -> 42.7 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#E11D48"
                          strokeWidth="22"
                          strokeDasharray="42.7 427.3"
                          strokeDashoffset="-384.5"
                        />
                      </svg>
                      <div className="donut-center">
                        <span className="big">10</span>
                        <span className="lbl">
                          {lang === "km" ? "មុខងារសរុប" : "Sub-Modules"}
                        </span>
                      </div>
                    </div>

                    <div className="donut-legend">
                      <div className="legend-item">
                        <div className="legend-left">
                          <span
                            className="legend-dot"
                            style={{ background: "#059669" }}
                          />
                          <span className="legend-name">
                            {lang === "km"
                              ? "ដាក់ដំណើរការផ្លូវការ (100%)"
                              : "Officially Launched (100%)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--grn)" }}
                        >
                          {lang === "km" ? "1 មុខងារ" : "1 Module"}
                        </span>
                      </div>

                      <div className="legend-item">
                        <div className="legend-left">
                          <span
                            className="legend-dot"
                            style={{ background: "#4F46E5" }}
                          />
                          <span className="legend-name">
                            {lang === "km"
                              ? "រៀបចំប្រព័ន្ធរួចរាល់ (60%–65%)"
                              : "System Setup Ready (60%–65%)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--pri)" }}
                        >
                          {lang === "km" ? "4 មុខងារ" : "4 Modules"}
                        </span>
                      </div>

                      <div className="legend-item">
                        <div className="legend-left">
                          <span
                            className="legend-dot"
                            style={{ background: "#D97706" }}
                          />
                          <span className="legend-name">
                            {lang === "km"
                              ? "សិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
                              : "Requirements Studied (10%)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--amb)" }}
                        >
                          {lang === "km" ? "4 មុខងារ" : "4 Modules"}
                        </span>
                      </div>

                      <div className="legend-item">
                        <div className="legend-left">
                          <span
                            className="legend-dot"
                            style={{ background: "#E11D48" }}
                          />
                          <span className="legend-name">
                            {lang === "km"
                              ? "រង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែម"
                              : "Awaiting Further Ministry Study"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--red)" }}
                        >
                          {lang === "km" ? "1 មុខងារ" : "1 Module"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Vertical Column Bar Chart by Component */}
                <div className="chart-card grow">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ក្រាហ្វប្រៀបធៀបភាគរយវឌ្ឍភាពតាមសមាសភាគ"
                        : "Completion Percentage Chart by Component"}
                    </h3>
                    <span className="sub">0% – 100%</span>
                  </div>

                  <div className="vbar-chart">
                    <div className="vbar-plot">
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--grn)" }}
                        >
                          100%
                        </span>
                        <div
                          className="vbar-bar grn"
                          style={{ height: "100%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--pri)" }}
                        >
                          65%
                        </span>
                        <div
                          className="vbar-bar pri"
                          style={{ height: "65%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--cy)" }}
                        >
                          60%
                        </span>
                        <div
                          className="vbar-bar cy"
                          style={{ height: "60%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--amb)" }}
                        >
                          10%
                        </span>
                        <div
                          className="vbar-bar amb"
                          style={{ height: "18%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--amb)" }}
                        >
                          10%
                        </span>
                        <div
                          className="vbar-bar amb"
                          style={{ height: "18%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--red)" }}
                        >
                          {lang === "km" ? "រង់ចាំ" : "Wait"}
                        </span>
                        <div
                          className="vbar-bar red"
                          style={{ height: "14%" }}
                        />
                      </div>
                    </div>

                    <div className="vbar-labels">
                      <div className="vbar-lbl">
                        {lang === "km" ? "បន្ទប់ប្រជុំ" : "Meeting"}
                        <small>1.1.3</small>
                      </div>
                      <div className="vbar-lbl">
                        {lang === "km" ? "បេសកកម្ម" : "Mission"}
                        <small>1.2.1</small>
                      </div>
                      <div className="vbar-lbl">
                        {lang === "km" ? "អគ្គលេខាធិការ" : "Secretariat"}
                        <small>1.5 (x3)</small>
                      </div>
                      <div className="vbar-lbl">
                        {lang === "km" ? "ថែទាំ/ផ្គត់ផ្គង់" : "Maint/Supply"}
                        <small>1.1.1–2</small>
                      </div>
                      <div className="vbar-lbl">
                        {lang === "km" ? "ទ្រព្យ/ថវិកា" : "Asset/Budget"}
                        <small>1.3 & 1.4</small>
                      </div>
                      <div className="vbar-lbl">
                        {lang === "km" ? "ប្រាក់បៀវត្ស" : "Payroll"}
                        <small>1.2.2</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT FULL-TEXT DATA COLUMN: Complete Components 1.1 to 1.5 (Zero Clipping) */}
              <div
                className="data-col a"
                style={{ "--d": 2.5 } as React.CSSProperties}
              >
                <div className="comp-cards-grid">
                  {/* 1.1 សមាសភាគទី1 */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "1.1. សមាសភាគទី1"
                          : "1.1. Component 1"}
                      </h3>
                      <span className="chip grn">
                        <Building2 size={16} />
                        {lang === "km" ? "៣ មុខងារ" : "3 Modules"}
                      </span>
                    </div>
                    <div className="data-items-stack">
                      {COMPONENTS_DATA[0].subtasks.map((item) => (
                        <div key={item.id} className="data-item">
                          <div className="data-item-left">
                            <span className="data-code">{item.id}</span>
                            <div className="data-text">
                              <h4>
                                {lang === "km" ? item.titleKm : item.titleEn}
                              </h4>
                              <p>
                                {lang === "km" ? item.statusKm : item.statusEn}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`data-badge ${
                              item.progress === 100 ? "grn" : "amb"
                            }`}
                          >
                            {item.progress}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 1.2 សមាសភាគទី2 & 1.3 សមាសភាគទី3 */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "1.2. សមាសភាគទី2 & 1.3. សមាសភាគទី3"
                          : "1.2. Component 2 & 1.3. Component 3"}
                      </h3>
                      <span className="chip pri">
                        <Layers size={16} />
                        {lang === "km" ? "បេសកកម្ម, បៀវត្ស & ទ្រព្យរដ្ឋ" : "3 Modules"}
                      </span>
                    </div>
                    <div className="data-items-stack">
                      {COMPONENTS_DATA[1].subtasks.map((item) => (
                        <div key={item.id} className="data-item">
                          <div className="data-item-left">
                            <span className="data-code">{item.id}</span>
                            <div className="data-text">
                              <h4>
                                {lang === "km" ? item.titleKm : item.titleEn}
                              </h4>
                              <p>
                                {lang === "km" ? item.statusKm : item.statusEn}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`data-badge ${
                              item.progress >= 60 ? "pri" : "red"
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
                      {/* 1.3 សមាសភាគទី3 */}
                      <div className="data-item">
                        <div className="data-item-left">
                          <span className="data-code">1.3</span>
                          <div className="data-text">
                            <h4>
                              {lang === "km"
                                ? "1.3. សមាសភាគទី3៖ ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ"
                                : "1.3. Component 3: State Asset Management System"}
                            </h4>
                            <p>
                              {lang === "km"
                                ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
                                : "User Requirements Studied (10%)"}
                            </p>
                          </div>
                        </div>
                        <span className="data-badge amb">10%</span>
                      </div>
                    </div>
                  </div>

                  {/* 1.4 សមាសភាគទី4 (Full Width Span) */}
                  <div className="comp-data-card span-2">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "1.4. សមាសភាគទី4"
                          : "1.4. Component 4"}
                      </h3>
                      <span className="data-badge amb">10%</span>
                    </div>
                    <div className="data-item">
                      <div className="data-item-left">
                        <span className="data-code">1.4</span>
                        <div className="data-text">
                          <h4>
                            {lang === "km"
                              ? "ប្រព័ន្ធគ្រប់គ្រងផែនការ ថវិកា និងការអនុវត្ត ព្រមទាំងតាមដាន ត្រួតពិនិត្យ និងវាយតម្លៃ"
                              : "Planning, Budget, Implementation, Monitoring & Evaluation System"}
                          </h4>
                          <p>
                            {lang === "km"
                              ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
                              : "User Requirements Studied (10%)"}
                          </p>
                        </div>
                      </div>
                      <span className="data-badge amb">
                        {lang === "km" ? "សិក្សាតម្រូវការ 10%" : "Studied 10%"}
                      </span>
                    </div>
                  </div>

                  {/* 1.5 សមាសភាគទី5 (60%) សម្រាប់អគ្គលេខាធិការដ្ឋាន (Full Width Span, 3 Columns) */}
                  <div className="comp-data-card span-2">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "1.5. សមាសភាគទី5 (60%) សម្រាប់អគ្គលេខាធិការដ្ឋាន"
                          : "1.5. Component 5 (60%) For General Secretariat"}
                      </h3>
                      <span className="data-badge grn">
                        {lang === "km"
                          ? "60% · ការរៀបចំប្រព័ន្ធរួចរាល់"
                          : "60% · System Setup Ready"}
                      </span>
                    </div>
                    <div className="data-items-grid-3">
                      {COMPONENTS_DATA[4].subtasks.map((item) => (
                        <div key={item.id} className="data-item">
                          <div className="data-item-left">
                            <span className="data-code">{item.id}</span>
                            <div className="data-text">
                              <h4>
                                {lang === "km" ? item.titleKm : item.titleEn}
                              </h4>
                              <p>
                                {lang === "km"
                                  ? "ការរៀបចំប្រព័ន្ធរួចរាល់ (60%)"
                                  : "System Setup Ready (60%)"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                    អគ្គនាយកដ្ឋានធនធានរ៉ែ ·{" "}
                    <span className="g">
                      ការងាររៀបចំប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ
                    </span>
                  </>
                ) : (
                  <>
                    General Dept. of Mineral Resources ·{" "}
                    <span className="g">
                      Digital Public Service System for the Mining Sector
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="analytics-dashboard">
              {/* LEFT ANALYTICS COLUMN: Dual Radial Gauges + Grouped Bar Chart + III. ចំណាំសម្គាល់ */}
              <div
                className="analytics-col a"
                style={{ "--d": 1.5 } as React.CSSProperties}
              >
                {/* Chart 1: Dual Radial Ring Gauges */}
                <div className="chart-card">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ការវិភាគវឌ្ឍភាព Web Portal ទាំង ២"
                        : "Dual Web Portal Readiness Analysis"}
                    </h3>
                    <span className="chip grn">100% Ready</span>
                  </div>

                  <div className="gauge-pair">
                    <div className="gauge-box">
                      <div className="gauge-ring">
                        <svg
                          width="132"
                          height="132"
                          viewBox="0 0 132 132"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          <circle
                            cx="66"
                            cy="66"
                            r="52"
                            fill="none"
                            stroke="var(--pb)"
                            strokeWidth="14"
                          />
                          <circle
                            cx="66"
                            cy="66"
                            r="52"
                            fill="none"
                            stroke="#059669"
                            strokeWidth="14"
                            strokeDasharray="326.7 326.7"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="donut-center">
                          <span
                            className="big"
                            style={{ fontSize: "28px", color: "var(--grn)" }}
                          >
                            3 / 3
                          </span>
                          <span className="lbl">
                            {lang === "km" ? "សេវា" : "Services"}
                          </span>
                        </div>
                      </div>
                      <div className="gauge-title">
                        {lang === "km"
                          ? "I. Web Portal អ្នកស្នើសុំ"
                          : "I. Applicant Web Portal"}
                      </div>
                      <div className="gauge-sub">
                        {lang === "km"
                          ? "បានរៀបចំរួចរាល់ (100%)"
                          : "Setup Completed (100%)"}
                      </div>
                    </div>

                    <div className="gauge-box">
                      <div className="gauge-ring">
                        <svg
                          width="132"
                          height="132"
                          viewBox="0 0 132 132"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          <circle
                            cx="66"
                            cy="66"
                            r="52"
                            fill="none"
                            stroke="var(--pb)"
                            strokeWidth="14"
                          />
                          <circle
                            cx="66"
                            cy="66"
                            r="52"
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth="14"
                            strokeDasharray="326.7 326.7"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="donut-center">
                          <span
                            className="big"
                            style={{ fontSize: "28px", color: "var(--pri)" }}
                          >
                            3 / 3
                          </span>
                          <span className="lbl">
                            {lang === "km" ? "សេវា" : "Services"}
                          </span>
                        </div>
                      </div>
                      <div className="gauge-title">
                        {lang === "km"
                          ? "II. Web Portal ការងារផ្ទៃក្នុង"
                          : "II. Internal Web Portal"}
                      </div>
                      <div
                        className="gauge-sub"
                        style={{ color: "var(--pri)" }}
                      >
                        {lang === "km"
                          ? "បានរៀបចំរួចរាល់ (100%)"
                          : "Setup Completed (100%)"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Grouped Bar Chart by Service */}
                <div className="chart-card grow">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ក្រាហ្វប្រៀបធៀបតាមសេវាទាំង ៣ (អ្នកស្នើសុំ vs ផ្ទៃក្នុង)"
                        : "Service Readiness Chart (Applicant vs. Internal)"}
                    </h3>
                  </div>

                  <div className="gbar-list">
                    <div className="gbar-group">
                      <div className="gbar-group-head">
                        <span className="gbar-group-title">
                          {lang === "km"
                            ? "១. អាជីវកម្មថ្មសំណង់ ម្នាងសិលា និងធនធានរ៉ែប្រហាក់ប្រហែល (≤ ១០ហិកតា)"
                            : "1. Construction Stone, Gypsum & Similar Extraction (≤ 10 Ha)"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "I & II. ទាំង ២ ប្រព័ន្ធ" : "I & II. Portals"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill grn"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--grn)" }}
                        >
                          100%
                        </span>
                      </div>
                    </div>

                    <div className="gbar-group">
                      <div className="gbar-group-head">
                        <span className="gbar-group-title">
                          {lang === "km"
                            ? "២. ការងារស្វែងរុករកថ្មសំណង់ ម្នាងសិលា និងធនធានរ៉ែប្រហាក់ប្រហែល"
                            : "2. Exploration of Construction Stone, Gypsum & Similar"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "តាមលំនាំសេវាទី១" : "Service 1 Pattern"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill pri"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--pri)" }}
                        >
                          {lang === "km" ? "រួចរាល់" : "Ready"}
                        </span>
                      </div>
                    </div>

                    <div className="gbar-group">
                      <div className="gbar-group-head">
                        <span className="gbar-group-title">
                          {lang === "km"
                            ? "៣. អាជីវកម្មអាចម៍ដី ឡាតេរីត ដីឥដ្ឋ (≤ ១០ហិកតា)"
                            : "3. Earthfill, Laterite & Clay Extraction (≤ 10 Ha)"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "តាមលំនាំសេវាទី១" : "Service 1 Pattern"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill pri"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--pri)" }}
                        >
                          {lang === "km" ? "រួចរាល់" : "Ready"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* III. ចំណាំសម្គាល់ */}
                <div className="alert-note-card">
                  <div className="alert-note-head">
                    <span>
                      {lang === "km"
                        ? "III. ចំណាំសម្គាល់៖"
                        : "III. Important Note / Remark:"}
                    </span>
                  </div>
                  <div className="alert-note-body">
                    {lang === "km"
                      ? "- សម្រាប់ការរៀបចំសេវាទី2 និងទី3 ក្រុមការងារបានរៀបចំតាមលំនាំសេវាទី1 រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួលតាមការអនុវត្តជាក់ស្ដែង។"
                      : "- For Services 2 and 3, the working team configured the system following the template of Service 1, awaiting further review from the Ministry working group to refine according to actual practice."}
                  </div>
                </div>
              </div>

              {/* RIGHT FULL-TEXT DATA COLUMN: Complete I & II Portal Services (Zero Clipping) */}
              <div
                className="data-col a"
                style={{ "--d": 2.5 } as React.CSSProperties}
              >
                {/* I. Web Portal សម្រាប់អ្នកស្នើសុំ */}
                <div className="comp-data-card" style={{ flex: 1 }}>
                  <div className="comp-data-head">
                    <h3>
                      {lang === "km"
                        ? "I. Web Portal សម្រាប់អ្នកស្នើសុំ បានរៀបចំរួចរាល់ ដែលមានចំនួន 3 សេវា ៖"
                        : "I. Web Portal for Applicants — Setup Ready (3 Services):"}
                    </h3>
                    <span className="data-badge grn">
                      <Globe size={15} style={{ display: "inline", marginRight: 6 }} />
                      {lang === "km" ? "រួចរាល់ 3 / 3" : "Ready 3 / 3"}
                    </span>
                  </div>
                  <div className="data-items-stack">
                    {MINERAL_RESOURCES_DATA.services.map((srv) => (
                      <div key={`app-full-${srv.num}`} className="data-item">
                        <div className="data-item-left">
                          <span className="data-code">{srv.num}</span>
                          <div className="data-text">
                            <h4>
                              {lang === "km" ? srv.titleKm : srv.titleEn}
                            </h4>
                          </div>
                        </div>
                        <span className="data-badge grn">
                          {lang === "km" ? "រួចរាល់" : "Ready"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* II. Web Portal សម្រាប់ការងារផ្ទៃក្នុង */}
                <div className="comp-data-card" style={{ flex: 1 }}>
                  <div className="comp-data-head">
                    <h3>
                      {lang === "km"
                        ? "II. Web Portal សម្រាប់ការងារផ្ទៃក្នុងបានរៀបចំរួចរាល់ ដែលមានចំនួន 3 សេវា៖"
                        : "II. Web Portal for Internal Operations — Setup Ready (3 Services):"}
                    </h3>
                    <span className="data-badge pri">
                      <Check size={15} style={{ display: "inline", marginRight: 6 }} />
                      {lang === "km" ? "រួចរាល់ 3 / 3" : "Ready 3 / 3"}
                    </span>
                  </div>
                  <div className="data-items-stack">
                    {MINERAL_RESOURCES_DATA.services.map((srv) => (
                      <div key={`int-full-${srv.num}`} className="data-item">
                        <div className="data-item-left">
                          <span className="data-code">{srv.num}</span>
                          <div className="data-text">
                            <h4>
                              {lang === "km" ? srv.titleKm : srv.titleEn}
                            </h4>
                          </div>
                        </div>
                        <span
                          className={`data-badge ${
                            srv.num === "01" ? "grn" : "pri"
                          }`}
                        >
                          {srv.num === "01"
                            ? lang === "km"
                              ? "រួចរាល់"
                              : "Ready"
                            : lang === "km"
                              ? "តាមលំនាំសេវាទី1"
                              : "Pattern 1"}
                        </span>
                      </div>
                    ))}
                  </div>
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
                    អគ្គនាយកដ្ឋានប្រេងកាត ·{" "}
                    <span className="g">
                      Web Portal អ្នកស្នើសុំ, ផ្ទៃក្នុងក្រសួង & ចំណុចប្រឈម
                    </span>
                  </>
                ) : (
                  <>
                    General Dept. of Petroleum ·{" "}
                    <span className="g">
                      Applicant Portal, Internal Portal & Challenges
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="analytics-dashboard">
              {/* LEFT ANALYTICS COLUMN: Grouped Comparison Chart + III. ចំណុចប្រឈម */}
              <div
                className="analytics-col a"
                style={{ "--d": 1.5 } as React.CSSProperties}
              >
                <div className="chart-card grow">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ក្រាហ្វវិភាគវឌ្ឍភាព (អ្នកស្នើសុំ vs ផ្ទៃក្នុងក្រសួង)"
                        : "Progress Comparison Chart (Applicant vs. Internal)"}
                    </h3>
                    <span className="sub">0% – 100%</span>
                  </div>

                  <div className="gbar-list">
                    {/* Service 1 */}
                    <div className="gbar-group">
                      <div className="gbar-group-head">
                        <span className="gbar-group-title">
                          {lang === "km"
                            ? "១. ពិនិត្យ ទទួល & បន្តសុពលភាពស្ថានីយប្រេង/ឧស្ម័នឥន្ធនៈ"
                            : "1. Fuel / LPG Station Certificate Application & Renewal"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "I. អ្នកស្នើសុំ" : "I. Applicant"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill grn"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--grn)" }}
                        >
                          {lang === "km" ? "រួចរាល់" : "Ready"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "II. ផ្ទៃក្នុងក្រសួង" : "II. Internal"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill pri"
                            style={{ width: "75%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--pri)" }}
                        >
                          75%
                        </span>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div className="gbar-group">
                      <div className="gbar-group-head">
                        <span className="gbar-group-title">
                          {lang === "km"
                            ? "២. សកម្មភាពវេចខ្ចប់ផលិតផលប្រេងកាត និងឬឧស្ម័នឥន្ធនៈ"
                            : "2. Petroleum / LPG Packaging Safety & Commercial License"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "I & II. ទាំង ២ ប្រព័ន្ធ" : "I & II. Portals"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill grn"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--grn)" }}
                        >
                          {lang === "km" ? "រួចរាល់" : "Ready"}
                        </span>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div className="gbar-group">
                      <div className="gbar-group-head">
                        <span className="gbar-group-title">
                          {lang === "km"
                            ? "៣. ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ"
                            : "3. Technical Safety Certificate for Stations"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "I. អ្នកស្នើសុំ" : "I. Applicant"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill pri"
                            style={{ width: "90%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--pri)" }}
                        >
                          90%
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "II. ផ្ទៃក្នុងក្រសួង" : "II. Internal"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill amb"
                            style={{ width: "85%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--amb)" }}
                        >
                          {lang === "km" ? "តេស្តខេត្ត" : "Tested"}
                        </span>
                      </div>
                    </div>

                    {/* Service 4 */}
                    <div className="gbar-group">
                      <div className="gbar-group-head">
                        <span className="gbar-group-title">
                          {lang === "km"
                            ? "៤. មុខងារ Offline (Save ទិន្នន័យ Auto ករណីដាច់ Internet)"
                            : "4. Offline Mode (Auto-Save Data When Internet Drops)"}
                        </span>
                      </div>
                      <div className="gbar-row">
                        <span className="gbar-tag">
                          {lang === "km" ? "II. ផ្ទៃក្នុងក្រសួង" : "II. Internal"}
                        </span>
                        <div className="gbar-track">
                          <div
                            className="gbar-fill amb"
                            style={{ width: "8%" }}
                          />
                        </div>
                        <span
                          className="gbar-val"
                          style={{ color: "var(--amb)" }}
                        >
                          5%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* III. ចំណុចប្រឈម (Complete Text from data.md) */}
                <div className="alert-note-card red">
                  <div className="alert-note-head">
                    <span>
                      {lang === "km"
                        ? "III. ចំណុចប្រឈម ៖"
                        : "III. Key Challenges:"}
                    </span>
                  </div>
                  <div className="alert-note-body">
                    {lang === "km" ? (
                      <>
                        <div>
                          <b>1.</b> ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ
                        </div>
                        <div>
                          <b>2.</b> ស្នើសុំពិនិត្យ ទទួល និងដំណើរការឯកសារស្នើសុំនិងការបន្តសុពលភាពវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាព សម្រាប់ស្ថានីយប្រេងឥន្ធនៈ ឬស្ថានីយឧស្ម័នឥន្ធនៈ
                        </div>
                        <div style={{ marginTop: 4, color: "var(--red)", fontWeight: 700 }}>
                          - ផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហាន មន្ទីរចុះពិនិត្យទីតាំង ស្នើសុំឱ្យបង្ហាញដូចកំណត់ហេតុ។
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <b>1.</b> Technical Safety Certificate for Stations
                        </div>
                        <div>
                          <b>2.</b> Application & Renewal of Technical Safety Certificate for Fuel or LPG Stations
                        </div>
                        <div style={{ marginTop: 4, color: "var(--red)", fontWeight: 700 }}>
                          - Data entry form at the Provincial On-Site Inspection step is requested to match the official inspection minutes.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT FULL-TEXT DATA COLUMN: Complete I & II Portal Details (Zero Clipping) */}
              <div
                className="data-col a"
                style={{ "--d": 2.5 } as React.CSSProperties}
              >
                {/* I. Web Portal សម្រាប់អ្នកស្នើសុំ */}
                <div className="comp-data-card">
                  <div className="comp-data-head">
                    <h3>
                      {lang === "km"
                        ? "I. Web Portal សម្រាប់អ្នកស្នើសុំ"
                        : "I. Web Portal for Applicants"}
                    </h3>
                    <span className="data-badge grn">
                      {lang === "km" ? "រួចរាល់ 2 · 90% 1" : "2 Ready · 1 at 90%"}
                    </span>
                  </div>
                  <div className="data-items-stack">
                    {PETROLEUM_DATA.applicantPortal.services.map((srv) => (
                      <div key={`pet-app-${srv.num}`} className="data-item">
                        <div className="data-item-left">
                          <span className="data-code">{srv.num}</span>
                          <div className="data-text">
                            <h4>
                              {lang === "km" ? srv.titleKm : srv.titleEn}
                            </h4>
                            <p>{lang === "km" ? srv.notesKm : srv.notesEn}</p>
                          </div>
                        </div>
                        <span
                          className={`data-badge ${
                            srv.num === "03" ? "pri" : "grn"
                          }`}
                        >
                          {srv.num === "03"
                            ? "90%"
                            : lang === "km"
                              ? "បានរៀបចំរួចរាល់"
                              : "Ready"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* II. Web Portal សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុងក្រសួង */}
                <div className="comp-data-card" style={{ flex: 1 }}>
                  <div className="comp-data-head">
                    <h3>
                      {lang === "km"
                        ? "II. Web Portal សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុងក្រសួង"
                        : "II. Web Portal for Internal Ministry Use"}
                    </h3>
                    <span className="data-badge pri">
                      {lang === "km" ? "៤ មុខងារ" : "4 Items"}
                    </span>
                  </div>
                  <div className="data-items-stack">
                    {PETROLEUM_DATA.internalPortal.services.map((srv) => {
                      const badgeClass =
                        srv.num === "01"
                          ? "pri"
                          : srv.num === "02"
                            ? "grn"
                            : "amb";
                      const badgeText =
                        srv.num === "01"
                          ? "75%"
                          : srv.num === "02"
                            ? lang === "km"
                              ? "បានរៀបចំរួចរាល់"
                              : "Ready"
                            : srv.num === "03"
                              ? lang === "km"
                                ? "១០ វិច្ឆិកា ២០២៦"
                                : "Nov 10 Test"
                              : "5%";
                      return (
                        <div key={`pet-int-${srv.num}`} className="data-item">
                          <div className="data-item-left">
                            <span className="data-code">{srv.num}</span>
                            <div className="data-text">
                              <h4>
                                {lang === "km" ? srv.titleKm : srv.titleEn}
                              </h4>
                              <p>{lang === "km" ? srv.notesKm : srv.notesEn}</p>
                            </div>
                          </div>
                          <span className={`data-badge ${badgeClass}`}>
                            {badgeText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
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
