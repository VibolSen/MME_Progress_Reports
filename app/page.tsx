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
import {
  DigitalGridWaveVisual,
  GeneralAffairsBgVisual,
  MineralResourcesBgVisual,
  PetroleumBgVisual,
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
  ArrowRight,
  Layers,
  Building2,
  Download,
  FileText,
  QrCode,
  LayoutGrid,
  Code2,
  ClipboardCheck,
  Rocket,
  Calendar,
} from "lucide-react";
import QRCode from "qrcode";

const TOTAL_SLIDES = 9;

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // LIGHT THEME & KHMER LANGUAGE ARE DEFAULT
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [lang, setLang] = useState<Language>("km");
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  // QR Code for Progress Report PDF on Slide 5
  const [qrDataUrl, setQrDataUrl] = useState<string>("/qr-progress-report.svg");

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

  // Dynamically resolve target URL for QR code (defaults to production Vercel URL when running locally)
  useEffect(() => {
    try {
      const isLocal =
        typeof window !== "undefined" &&
        window.location.hostname &&
        (window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("127.0.0.1") ||
          window.location.hostname.startsWith("192.168."));

      const origin =
        !isLocal && typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : "https://mme-progress-reports.vercel.app";

      const target = `${origin}/Progress-report.pdf`;

      QRCode.toDataURL(target, {
        width: 560,
        margin: 1,
        color: {
          dark: "#0F172A",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "M",
      })
        .then((url) => {
          if (url) setQrDataUrl(url);
        })
        .catch((err) => {
          console.warn("Could not generate dynamic QR code:", err);
        });
    } catch {
      // Fallback remains /qr-progress-report.svg
    }
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
    () => Array.from({ length: TOTAL_SLIDES }, (_, idx) => ({ id: idx + 1 })),
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
      {/* Full-Screen Master Ambient Background VFX */}
      <div className="bgfx" aria-hidden="true">
        <div className="dots" />
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      {/* Viewport wrapping the 1920x1080 stage */}
      <div className="viewport" id="vp" onClick={handleViewportClick}>
        {/* ============================================================
            SLIDE 1: QR Code Download (Before Cover Slide)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 0 ? "on" : ""}`}
          data-label="QR Code"
        >
          <div className="pl">
            <DigitalGridWaveVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="hero-grid">
              <div className="t-left">
                <div
                  className="eyebrow a"
                  style={{ "--d": 0 } as React.CSSProperties}
                >
                  {lang === "km"
                    ? "ឯកសាររបាយការណ៍ · PDF"
                    : "Progress Report Document · PDF"}
                </div>
                <h1
                  className="t-title a"
                  style={{ "--d": 1 } as React.CSSProperties}
                >
                  {lang === "km" ? (
                    <>
                      ស្កេន QR Code
                      <br />
                      <span className="grad">
                        ដើម្បីទាញយករបាយការណ៍វឌ្ឍនភាពគម្រោង
                      </span>
                    </>
                  ) : (
                    <>
                      Scan QR Code
                      <br />
                      <span className="grad">
                        to Download the Project Progress Report
                      </span>
                    </>
                  )}
                </h1>
                <p
                  className="t-sub a"
                  style={{ "--d": 2 } as React.CSSProperties}
                >
                  {lang === "km"
                    ? "សូមប្រើកាមេរ៉ាទូរស័ព្ទស្កេន QR Code ឬចុចប៊ូតុងទាញយក ដើម្បីបើក និងទាញយកឯកសារ PDF របាយការណ៍វឌ្ឍនភាព។"
                    : "Scan the QR code with your mobile camera or click the download button to open and save the full PDF progress report."}
                </p>
                <button
                  className="cta a interactive"
                  style={{ "--d": 3 } as React.CSSProperties}
                  onClick={() => goToSlide(1)}
                >
                  <span>
                    {lang === "km"
                      ? "បន្តទៅទំព័រដើម"
                      : "Continue to Cover"}
                  </span>
                  <ArrowRight size={20} />
                </button>
              </div>

              <div
                className="qrc a-r"
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <div className="qr-card">
                  <div className="qr-header">
                    <div className="qr-badge">
                      <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="qr-badge-text">
                        {lang === "km"
                          ? "របាយការណ៍វឌ្ឍនភាព"
                          : "Progress Report"}
                      </span>
                      <span className="qr-tag">PDF</span>
                    </div>
                  </div>

                  <div className="qr-frame">
                    <Image
                      src={qrDataUrl}
                      alt="Scan QR Code to Download MME Progress Report"
                      width={480}
                      height={480}
                      className="qr-image"
                      unoptimized
                      priority
                    />
                  </div>

                  <div className="qr-footer">
                    <p className="qr-scan-label">
                      <QrCode className="w-3.5 h-3.5 inline-block mr-1.5 opacity-70" />
                      {lang === "km"
                        ? "ស្កេនទូរស័ព្ទដើម្បីបើក/ទាញយក"
                        : "Scan with camera to view / download"}
                    </p>

                    <a
                      href="/Progress-report.pdf"
                      download="MME-Progress-Report-2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qr-download-btn"
                      title={
                        lang === "km"
                          ? "ទាញយកឯកសារ PDF"
                          : "Download PDF file"
                      }
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {lang === "km"
                          ? "ទាញយកឯកសារ PDF (657 KB)"
                          : "Download PDF (657 KB)"}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 2: Title / Cover UI (First Slide Kept Intact)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 1 ? "on" : ""}`}
          data-label="Title"
        >
          <div className="pl">
            <DigitalGridWaveVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>

            <div className="hero-grid">
              <div className="t-left">
                <div
                  className="eyebrow a"
                  style={{ "--d": 0 } as React.CSSProperties}
                >
                  MME Progress Report
                </div>
                <h1
                  className="t-title a"
                  style={{ "--d": 1 } as React.CSSProperties}
                >
                  {lang === "km" ? (
                    <>
                      គម្រោង
                      <br />
                      <span className="grad">
                        ការងាររៀបចំប្រព័ន្ធគ្រប់គ្រងប្រតិបត្តិការផ្ទៃក្នុង
                        និងប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ
                        និងវិស័យប្រេងកាត
                      </span>
                    </>
                  ) : (
                    <>
                      Project:{" "}
                      <span className="grad">
                        Internal Operations Management &amp; Digital Public
                        Service Systems for Mining and Petroleum
                      </span>
                    </>
                  )}
                </h1>
                <div
                  className="t-badge a"
                  style={{ "--d": 2 } as React.CSSProperties}
                >
                  <span>
                    {lang === "km"
                      ? "អគ្គលេខាធិការដ្ឋាន, វិស័យរ៉ែ, វិស័យប្រេងកាត"
                      : "General Secretariat, Mining Sector, Petroleum Sector"}
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
                  onClick={() => goToSlide(2)}
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
                    height={51}
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
                <div className="hero-img-wrap">
                  <Image
                    src="/images/hero-platforms.png"
                    alt={
                      lang === "km"
                        ? "ប្រព័ន្ធឌីជីថល និងវិបផតថលសេវាសាធារណៈ ក្រសួងរ៉ែ និងថាមពល"
                        : "MME Digital Transformation & Public Service Portals"
                    }
                    width={1024}
                    height={610}
                    unoptimized
                    priority
                    className="hero-img-direct"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 3: អគ្គលេខាធិការដ្ឋាន (General Secretariat)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 2 ? "on" : ""}`}
          data-label="General Secretariat"
        >
          <div className="pl">
            <GeneralAffairsBgVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>

            <div className="head">
              <h2 className="h a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    I. អគ្គលេខាធិការដ្ឋាន ·{" "}
                    <span className="g">វឌ្ឍនភាពគម្រោងទី១ (សមាសភាគទី១ ដល់ទី៥)</span>
                  </>
                ) : (
                  <>
                    I. General Secretariat ·{" "}
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
                        {/* 40% System Ready 60-70% (4/10) -> 170.9 */}
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
                              ? "ដាក់ដំណើរការផ្លូវការ (1.3 · 100%)"
                              : "Officially Launched (1.3 · 100%)"}
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
                              ? "រៀបចំប្រព័ន្ធរួចរាល់ (2.1, 5.1–5.3 · 60%–70%)"
                              : "System Setup Ready (2.1, 5.1–5.3 · 60%–70%)"}
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
                              ? "សិក្សាតម្រូវការ (1.1, 1.2, 3, 4 · 10%)"
                              : "Requirements Studied (1.1, 1.2, 3, 4 · 10%)"}
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
                              ? "រង់ចាំសិក្សាបន្ថែម (2.2)"
                              : "Awaiting Further Study (2.2)"}
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
                        ? "ក្រាហ្វប្រៀបធៀបភាគរយវឌ្ឍនភាពតាមសមាសភាគ"
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
                          70%
                        </span>
                        <div
                          className="vbar-bar pri"
                          style={{ height: "70%" }}
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
                      <div className="vbar-lbl">1.3</div>
                      <div className="vbar-lbl">2.1</div>
                      <div className="vbar-lbl">5.1–5.3</div>
                      <div className="vbar-lbl">1.1–1.2</div>
                      <div className="vbar-lbl">3 &amp; 4</div>
                      <div className="vbar-lbl">2.2</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT FULL-TEXT DATA COLUMN: Complete Components 1 to 5 (Zero Clipping) */}
              <div
                className="data-col a"
                style={{ "--d": 2.5 } as React.CSSProperties}
              >
                <div className="comp-cards-grid">
                  {/* 1. សមាសភាគទី1 */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km" ? "1. សមាសភាគទី1" : "1. Component 1"}
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

                  {/* 2. សមាសភាគទី2 & 3. សមាសភាគទី3 */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "2. សមាសភាគទី2 & 3. សមាសភាគទី3"
                          : "2. Component 2 & 3. Component 3"}
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
                      {/* 3. សមាសភាគទី3 */}
                      <div className="data-item">
                        <div className="data-item-left">
                          <span className="data-code">3</span>
                          <div className="data-text">
                            <h4>
                              {lang === "km"
                                ? "សមាសភាគទី3៖ ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ"
                                : "Component 3: State Asset Management System"}
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

                  {/* 4. សមាសភាគទី4 (Full Width Span) */}
                  <div className="comp-data-card span-2">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km" ? "4. សមាសភាគទី4" : "4. Component 4"}
                      </h3>
                      <span className="data-badge amb">10%</span>
                    </div>
                    <div className="data-item">
                      <div className="data-item-left">
                        <span className="data-code">4</span>
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

                  {/* 5. សមាសភាគទី5 (60%) សម្រាប់អគ្គលេខាធិការដ្ឋាន (Full Width Span, 3 Columns) */}
                  <div className="comp-data-card span-2">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "5. សមាសភាគទី5 (60%) សម្រាប់អគ្គលេខាធិការដ្ឋាន"
                          : "5. Component 5 (60%) For General Secretariat"}
                      </h3>
                      <span className="data-badge pri">
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
            SLIDE 4: Project 1 - GS Timeline (Nov 2026 – Feb 2027)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 3 ? "on" : ""}`}
          data-label="GS Timeline"
        >
          <div className="pl">
            <GeneralAffairsBgVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="head">
              <h2 className="h a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    I. អគ្គលេខាធិការដ្ឋាន ·{" "}
                    <span className="g">
                      កាលវិភាគគម្រោងទី១ (វិច្ឆិកា ២០២៦ – មីនា ២០២៧)
                    </span>
                  </>
                ) : (
                  <>
                    I. General Secretariat ·{" "}
                    <span className="g">
                      Project 1 Timeline (Nov 2026 – Mar 2027)
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="timeline-stack">
              <div
                className="chart-card gantt-card gs-v2-card a"
                style={{ "--d": 1.2 } as React.CSSProperties}
              >
                <div className="chart-head">
                  <h3>
                    {lang === "km"
                      ? "ផែនការកាលវិភាគអនុវត្តគម្រោងទី១"
                      : "Implementation Timeline"}
                  </h3>
                  <div className="gs-v2-legend">
                    <span className="gs-v2-leg-item">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#6366F1" }}
                      />
                      {lang === "km" ? "សិក្សា និងវិភាគ" : "Study & Analyze"}
                    </span>
                    <span className="gs-v2-leg-item">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#0891B2" }}
                      />
                      {lang === "km" ? "អភិវឌ្ឍប្រព័ន្ធ" : "Development"}
                    </span>
                    <span className="gs-v2-leg-item">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#D97706" }}
                      />
                      {lang === "km" ? "បណ្តុះបណ្តាល & UAT" : "Training & UAT"}
                    </span>
                    <span className="gs-v2-leg-item">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#059669" }}
                      />
                      {lang === "km" ? "ដាក់ឱ្យដំណើរការ" : "Go-Live"}
                    </span>
                  </div>
                </div>

                <div className="gdp-gantt-table">
                  <div className="gdp-gantt-head">
                    <div className="gdp-gantt-head-label">
                      {lang === "km"
                        ? "ប្រព័ន្ធ / ការងារ"
                        : "Module / Workstream"}
                    </div>
                    {[
                      { km: "វិច្ឆិកា ២០២៦", en: "Nov 2026" },
                      { km: "ធ្នូ ២០២៦", en: "Dec 2026" },
                      { km: "មករា ២០២៧", en: "Jan 2027" },
                      { km: "កុម្ភៈ ២០២៧", en: "Feb 2027" },
                      { km: "មីនា ២០២៧", en: "Mar 2027" },
                    ].map((month) => (
                      <div key={month.en} className="gdp-gantt-head-cell">
                        <span>{lang === "km" ? month.km : month.en}</span>
                        <div className="gs-v2-weeks">
                          <span>W1</span>
                          <span>W2</span>
                          <span>W3</span>
                          <span>W4</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 1. ប្រព័ន្ធគ្រប់គ្រងឯកសារ */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#0891B2" }}
                      />
                      {lang === "km"
                        ? "1. ប្រព័ន្ធគ្រប់គ្រងឯកសារ"
                        : "1. Document Management System"}
                    </div>
                    <div className="gs-v2-track-wrap">
                      <div className="gdp-gantt-track">
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div
                          className="gdp-gantt-pill tel"
                          style={{ left: "0%", width: "40%" }}
                          title="Estimate Finish Development: 31-Dec-2026"
                        >
                          {lang === "km"
                            ? "បញ្ចប់ប៉ាន់ស្មាន ៣១ ធ្នូ ២០២៦"
                            : "Est. Finish Dev: 31-Dec-2026"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. ការស្នើសុំបេសកកម្ម */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#0891B2" }}
                      />
                      {lang === "km"
                        ? "2. ការស្នើសុំបេសកកម្ម"
                        : "2. Mission Request"}
                    </div>
                    <div className="gs-v2-track-wrap">
                      <div className="gdp-gantt-track">
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div
                          className="gdp-gantt-pill tel"
                          style={{ left: "0%", width: "40%" }}
                          title="Estimate Finish Development: 31-Dec-2026"
                        >
                          {lang === "km"
                            ? "បញ្ចប់ប៉ាន់ស្មាន ៣១ ធ្នូ ២០២៦"
                            : "Est. Finish Dev: 31-Dec-2026"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. ផែនការថវិកា និងតាមដានត្រួតពិនិត្យ */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#6366F1" }}
                      />
                      {lang === "km"
                        ? "3. ផែនការថវិកា និងតាមដានត្រួតពិនិត្យ"
                        : "3. Planning, Budget & M&E System"}
                    </div>
                    <div className="gs-v2-track-wrap">
                      <div className="gdp-gantt-track">
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div
                          className="gdp-gantt-pill ind sm"
                          style={{ left: "20%", width: "5%" }}
                          title="Study: Week 1 Dec-2026"
                        >
                          <span className="gs-v2-pill-lbl left">
                            {lang === "km" ? "សិក្សា" : "Study"}
                          </span>
                        </div>
                        <div
                          className="gdp-gantt-pill tel"
                          style={{ left: "25%", width: "45%" }}
                          title="Development: Week 2 Dec-2026 to Week 2 Feb-2027"
                        >
                          {lang === "km" ? "អភិវឌ្ឍប្រព័ន្ធ" : "Development"}
                        </div>
                        <div
                          className="gdp-gantt-pill amb sm"
                          style={{ left: "70%", width: "5%" }}
                          title="UAT: Week 3 Feb-2027"
                        >
                          UAT
                        </div>
                        <div
                          className="gdp-gantt-pill grn sm"
                          style={{ left: "75%", width: "5%" }}
                          title="Go-Live: Week 4 Feb-2027"
                        >
                          <span className="gs-v2-pill-lbl right">
                            {lang === "km" ? "ដំណើរការ" : "Go-Live"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#6366F1" }}
                      />
                      {lang === "km"
                        ? "4. ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ"
                        : "4. State Asset Management System"}
                    </div>
                    <div className="gs-v2-track-wrap">
                      <div className="gdp-gantt-track">
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div
                          className="gdp-gantt-pill ind sm"
                          style={{ left: "25%", width: "5%" }}
                          title="Study: Week 2 Dec-2026"
                        >
                          <span className="gs-v2-pill-lbl left">
                            {lang === "km" ? "សិក្សា" : "Study"}
                          </span>
                        </div>
                        <div
                          className="gdp-gantt-pill tel"
                          style={{ left: "30%", width: "45%" }}
                          title="Development: Week 3 Dec-2026 to Week 3 Feb-2027"
                        >
                          {lang === "km" ? "អភិវឌ្ឍប្រព័ន្ធ" : "Development"}
                        </div>
                        <div
                          className="gdp-gantt-pill amb sm"
                          style={{ left: "75%", width: "5%" }}
                          title="UAT: Week 4 Feb-2027"
                        >
                          UAT
                        </div>
                        <div
                          className="gdp-gantt-pill grn sm"
                          style={{ left: "80%", width: "5%" }}
                          title="Go-Live: Week 1 Mar-2027"
                        >
                          <span className="gs-v2-pill-lbl right">
                            {lang === "km" ? "ដំណើរការ" : "Go-Live"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. ការងារផ្គត់ផ្គង់ */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#6366F1" }}
                      />
                      {lang === "km" ? "5. ការងារផ្គត់ផ្គង់" : "5. Supply Work"}
                    </div>
                    <div className="gs-v2-track-wrap">
                      <div className="gdp-gantt-track">
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div
                          className="gdp-gantt-pill ind sm"
                          style={{ left: "30%", width: "5%" }}
                          title="Study: Week 3 Dec-2026"
                        >
                          <span className="gs-v2-pill-lbl left">
                            {lang === "km" ? "សិក្សា" : "Study"}
                          </span>
                        </div>
                        <div
                          className="gdp-gantt-pill tel"
                          style={{ left: "35%", width: "45%" }}
                          title="Development: Week 4 Dec-2026 to Week 4 Feb-2027"
                        >
                          {lang === "km" ? "អភិវឌ្ឍប្រព័ន្ធ" : "Development"}
                        </div>
                        <div
                          className="gdp-gantt-pill amb sm"
                          style={{ left: "80%", width: "5%" }}
                          title="UAT: Week 1 Mar-2027"
                        >
                          UAT
                        </div>
                        <div
                          className="gdp-gantt-pill grn sm"
                          style={{ left: "85%", width: "5%" }}
                          title="Go-Live: Week 2 Mar-2027"
                        >
                          <span className="gs-v2-pill-lbl right">
                            {lang === "km" ? "ដំណើរការ" : "Go-Live"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 6. ការងារថែទាំ និងជួសជុល */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#6366F1" }}
                      />
                      {lang === "km"
                        ? "6. ការងារថែទាំ និងជួសជុល"
                        : "6. Maintenance & Repair Work"}
                    </div>
                    <div className="gs-v2-track-wrap">
                      <div className="gdp-gantt-track">
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div className="gdp-gantt-col-line" />
                        <div
                          className="gdp-gantt-pill ind sm"
                          style={{ left: "35%", width: "5%" }}
                          title="Study: Week 4 Dec-2026"
                        >
                          <span className="gs-v2-pill-lbl left">
                            {lang === "km" ? "សិក្សា" : "Study"}
                          </span>
                        </div>
                        <div
                          className="gdp-gantt-pill tel"
                          style={{ left: "40%", width: "45%" }}
                          title="Development: Week 1 Jan-2027 to Week 1 Mar-2027"
                        >
                          {lang === "km" ? "អភិវឌ្ឍប្រព័ន្ធ" : "Development"}
                        </div>
                        <div
                          className="gdp-gantt-pill amb sm"
                          style={{ left: "85%", width: "5%" }}
                          title="UAT: Week 2 Mar-2027"
                        >
                          UAT
                        </div>
                        <div
                          className="gdp-gantt-pill grn sm"
                          style={{ left: "90%", width: "5%" }}
                          title="Go-Live: Week 3 Mar-2027"
                        >
                          <span className="gs-v2-pill-lbl right">
                            {lang === "km" ? "ដំណើរការ" : "Go-Live"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 5: អគ្គនាយកដ្ឋានធនធានរ៉ែ (General Dept. of Mineral Resources)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 4 ? "on" : ""}`}
          data-label="Mineral Resources"
        >
          <div className="pl">
            <MineralResourcesBgVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>

            <div className="head">
              <h2 className="h a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    II. អគ្គនាយកដ្ឋានធនធានរ៉ែ ·{" "}
                    <span className="g">
                      ការងាររៀបចំប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ
                    </span>
                  </>
                ) : (
                  <>
                    II. General Dept. of Mineral Resources ·{" "}
                    <span className="g">
                      Digital Public Service System for the Mining Sector
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="analytics-dashboard">
              {/* LEFT ANALYTICS COLUMN: Donut Chart + Vertical Column Bar Chart (Same as Slide 2) */}
              <div
                className="analytics-col a"
                style={{ "--d": 1.5 } as React.CSSProperties}
              >
                {/* Chart 1: SVG Donut Chart of 6 Portal Services */}
                <div className="chart-card">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ការវិភាគស្ថានភាពសេវាទាំង ៣ (២ Web Portal)"
                        : "Status Distribution (3 Portal Services · 2 Portals)"}
                    </h3>
                    <span className="chip grn">
                      {lang === "km" ? "គម្រោងទី២" : "Project 2"}
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
                        {/* 50% Applicant Portal (3/6) -> 213.6 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#059669"
                          strokeWidth="22"
                          strokeDasharray="213.6 427.3"
                          strokeDashoffset="0"
                        />
                        {/* 16.7% Internal Service 1 Base (1/6) -> 71.2 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="22"
                          strokeDasharray="71.2 427.3"
                          strokeDashoffset="-213.6"
                        />
                        {/* 33.3% Internal Services 2 & 3 Pattern (2/6) -> 142.5 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#0284C7"
                          strokeWidth="22"
                          strokeDasharray="142.5 427.3"
                          strokeDashoffset="-284.8"
                        />
                      </svg>
                      <div className="donut-center">
                        <span className="big">3</span>
                        <span className="lbl">
                          {lang === "km" ? "សេវាសរុប" : "Portal Services"}
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
                              ? "1. Web Portal អ្នកស្នើសុំ (រួចរាល់)"
                              : "1. Applicant Web Portal (Ready)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--grn)" }}
                        >
                          {lang === "km" ? "3 សេវា" : "3 Services"}
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
                              ? "2. Web Portal ផ្ទៃក្នុង (លំនាំដើមទី១)"
                              : "2. Internal Portal (Service 1 Base)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--pri)" }}
                        >
                          {lang === "km" ? "1 សេវា" : "1 Service"}
                        </span>
                      </div>

                      <div className="legend-item">
                        <div className="legend-left">
                          <span
                            className="legend-dot"
                            style={{ background: "#0284C7" }}
                          />
                          <span className="legend-name">
                            {lang === "km"
                              ? "2. រៀបចំតាមលំនាំ 2.1 (2.2 & 2.3)"
                              : "2. Configured via 2.1 (2.2 & 2.3)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--cy)" }}
                        >
                          {lang === "km" ? "2 សេវា" : "2 Services"}
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
                              ? "3. រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែម"
                              : "3. Pending Ministry Group Review"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--amb)" }}
                        >
                          2.2 &amp; 2.3
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Vertical Column Bar Chart (Same as Slide 2) */}
                <div className="chart-card grow">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ក្រាហ្វប្រៀបធៀបភាគរយវឌ្ឍនភាពតាមសេវាទាំង ៦"
                        : "Completion Percentage Chart Across All 6 Services"}
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
                          100%
                        </span>
                        <div
                          className="vbar-bar pri"
                          style={{ height: "100%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--cy)" }}
                        >
                          80%
                        </span>
                        <div
                          className="vbar-bar cy"
                          style={{ height: "80%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--cy)" }}
                        >
                          80%
                        </span>
                        <div
                          className="vbar-bar cy"
                          style={{ height: "80%" }}
                        />
                      </div>
                    </div>

                    <div className="vbar-labels">
                      <div className="vbar-lbl">1.1</div>
                      <div className="vbar-lbl">1.2</div>
                      <div className="vbar-lbl">1.3</div>
                      <div className="vbar-lbl">2.1</div>
                      <div className="vbar-lbl">2.2</div>
                      <div className="vbar-lbl">2.3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT FULL-TEXT DATA COLUMN: Same 2-Column + Span-2 Grid as Slide 2 */}
              <div
                className="data-col a"
                style={{ "--d": 2.5 } as React.CSSProperties}
              >
                <div className="comp-cards-grid">
                  {/* Top-Left Card: 1. Web Portal សម្រាប់អ្នកស្នើសុំ */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "1. Web Portal សម្រាប់អ្នកស្នើសុំ (3 សេវា)"
                          : "1. Web Portal for Applicants (3 Services)"}
                      </h3>
                      <span className="chip grn">
                        <Globe size={16} />
                        {lang === "km" ? "បានរៀបចំរួចរាល់" : "Setup Ready"}
                      </span>
                    </div>
                    <div className="data-items-stack">
                      {MINERAL_RESOURCES_DATA.services.map((srv, idx) => (
                        <div key={`app-full-${srv.num}`} className="data-item">
                          <div className="data-item-left">
                            <span className="data-code">{`1.${idx + 1}`}</span>
                            <div className="data-text">
                              <h4>
                                {lang === "km" ? srv.titleKm : srv.titleEn}
                              </h4>
                              <p>
                                {lang === "km"
                                  ? "Web Portal សម្រាប់អ្នកស្នើសុំ បានរៀបចំរួចរាល់"
                                  : "Web Portal for Applicants — Setup Ready"}
                              </p>
                            </div>
                          </div>
                          <span className="data-badge grn">100%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top-Right Card: 2. Web Portal សម្រាប់ការងារផ្ទៃក្នុង */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "2. Web Portal សម្រាប់ការងារផ្ទៃក្នុង (3 សេវា)"
                          : "2. Internal Operations Web Portal (3 Services)"}
                      </h3>
                      <span className="chip pri">
                        <Check size={16} />
                        {lang === "km" ? "បានរៀបចំរួចរាល់" : "Setup Ready"}
                      </span>
                    </div>
                    <div className="data-items-stack">
                      {MINERAL_RESOURCES_DATA.services.map((srv, idx) => (
                        <div key={`int-full-${srv.num}`} className="data-item">
                          <div className="data-item-left">
                            <span className="data-code">{`2.${idx + 1}`}</span>
                            <div className="data-text">
                              <h4>
                                {lang === "km" ? srv.titleKm : srv.titleEn}
                              </h4>
                              <p>
                                {lang === "km" ? srv.statusKm : srv.statusEn}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`data-badge ${
                              srv.num === "01" ? "grn" : "pri"
                            }`}
                          >
                            {srv.num === "01" ? "100%" : "80%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Full-Width Span-2 Card: 3. ចំណាំសម្គាល់ */}
                  <div className="comp-data-card span-2">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "3. ចំណាំសម្គាល់៖"
                          : "3. Important Note / Remark:"}
                      </h3>
                      <span className="data-badge amb">
                        {lang === "km"
                          ? "រង់ចាំក្រសួងពិនិត្យបន្ថែម"
                          : "Pending Ministry Review"}
                      </span>
                    </div>
                    <div className="data-item">
                      <div className="data-item-left">
                        <span className="data-code">3</span>
                        <div className="data-text">
                          <h4>
                            {lang === "km"
                              ? "សម្រាប់ការរៀបចំសេវាទី2 និងទី3 ក្រុមការងារបានរៀបចំតាមលំនាំសេវាទី1 រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួលតាមការអនុវត្តជាក់ស្ដែង។"
                              : "For Services 2 and 3, the working team configured the system following the template of Service 1, awaiting further review from the Ministry working group to refine according to actual practice."}
                          </h4>
                          <p>
                            {lang === "km"
                              ? "Web Portal អ្នកស្នើសុំ (៣ សេវា) និង Web Portal ការងារផ្ទៃក្នុង (៣ សេវា) បានរៀបចំរួចរាល់"
                              : "Both Applicant Web Portal (3 Services) and Internal Web Portal (3 Services) are ready"}
                          </p>
                        </div>
                      </div>
                      <span className="data-badge pri">
                        {lang === "km" ? "តាមលំនាំសេវាទី1" : "Service 1 Pattern"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 6: Project 2 - GDMR Timeline (13 Nov 2026 – 31 Mar 2027)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 5 ? "on" : ""}`}
          data-label="GDMR Timeline"
        >
          <div className="pl">
            <MineralResourcesBgVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="head">
              <h2 className="h a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    II. អគ្គនាយកដ្ឋានធនធានរ៉ែ ·{" "}
                    <span className="g">
                      កាលវិភាគគម្រោងទី២ (១៣ វិច្ឆិកា ២០២៦ – ៣១ មីនា ២០២៧)
                    </span>
                  </>
                ) : (
                  <>
                    II. General Department of Mineral Resources ·{" "}
                    <span className="g">
                      Project 2 Timeline (13 Nov 2026 – 31 Mar 2027)
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="timeline-stack">
              <div
                className="chart-card gantt-card a"
                style={{ "--d": 1.2 } as React.CSSProperties}
              >
                <div className="chart-head">
                  <h3>
                    {lang === "km"
                      ? "ផែនការកាលវិភាគអនុវត្តគម្រោងទី២ (Project 2 – GDMR)"
                      : "Project 2 – GDMR Monthly Gantt Timeline"}
                  </h3>
                  <div className="gantt-head-right">
                    <span className="chip pri">
                      <Calendar size={16} />
                      {lang === "km"
                        ? "១៣ វិច្ឆិកា ២០២៦ – ៣១ មីនា ២០២៧"
                        : "13 Nov 2026 – 31 Mar 2027"}
                    </span>
                  </div>
                </div>

                <div className="gantt-grid">
                  <div className="gantt-corner">
                    {lang === "km" ? "ដំណាក់កាលការងារ" : "Project Phases"}
                  </div>
                  <div className="gantt-month">
                    {lang === "km" ? "វិច្ឆិកា ២០២៦" : "Nov 2026"}
                  </div>
                  <div className="gantt-month">
                    {lang === "km" ? "ធ្នូ ២០២៦" : "Dec 2026"}
                  </div>
                  <div className="gantt-month">
                    {lang === "km" ? "មករា ២០២៧" : "Jan 2027"}
                  </div>
                  <div className="gantt-month">
                    {lang === "km" ? "កុម្ភៈ ២០២៧" : "Feb 2027"}
                  </div>
                  <div className="gantt-month">
                    {lang === "km" ? "មីនា ២០២៧" : "Mar 2027"}
                  </div>

                  {/* Row 1: Design & Analyze */}
                  <div className="gantt-label">
                    <span
                      className="gantt-dot"
                      style={{ background: "#4b9b74" }}
                    />
                    {lang === "km"
                      ? "1. ការរចនា និងវិភាគ"
                      : "1. Design & Analyze"}
                  </div>
                  <div className="gantt-bar grn">
                    {lang === "km"
                      ? "១៣ វិច្ឆិកា – ០៤ ធ្នូ"
                      : "13 Nov – 04 Dec"}
                  </div>
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />

                  {/* Row 2: Development */}
                  <div className="gantt-label">
                    <span
                      className="gantt-dot"
                      style={{ background: "#5282d6" }}
                    />
                    {lang === "km" ? "2. ការអភិវឌ្ឍប្រព័ន្ធ" : "2. Development"}
                  </div>
                  <div className="gantt-cell" />
                  <div
                    className="gantt-bar blu"
                    style={{ gridColumn: "span 2" }}
                  >
                    {lang === "km"
                      ? "០៧ ធ្នូ ២០២៦ – ០៥ កុម្ភៈ ២០២៧"
                      : "07 Dec 2026 – 05 Feb 2027"}
                  </div>
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />

                  {/* Row 3: UAT */}
                  <div className="gantt-label">
                    <span
                      className="gantt-dot"
                      style={{ background: "#8b6fd1" }}
                    />
                    {lang === "km" ? "3. ការធ្វើតេស្ត (UAT)" : "3. UAT"}
                  </div>
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />
                  <div className="gantt-bar pur">
                    {lang === "km"
                      ? "០៨ កុម្ភៈ – ១២ មីនា"
                      : "08 Feb – 12 Mar"}
                  </div>
                  <div className="gantt-cell" />

                  {/* Row 4: Launch */}
                  <div className="gantt-label">
                    <span
                      className="gantt-dot"
                      style={{ background: "#c89c49" }}
                    />
                    {lang === "km" ? "4. ដាក់ឱ្យដំណើរការ" : "4. Launch"}
                  </div>
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />
                  <div className="gantt-cell" />
                  <div className="gantt-bar gld">
                    {lang === "km"
                      ? "១៥ មីនា – ៣១ មីនា"
                      : "15 Mar – 31 Mar"}
                  </div>
                </div>
              </div>

              <div
                className="phase-cards-grid a"
                style={{ "--d": 2.0 } as React.CSSProperties}
              >
                <div className="phase-card grn">
                  <div className="phase-top">
                    <div className="phase-head-row">
                      <span className="phase-icon">
                        <LayoutGrid size={24} />
                      </span>
                      <span className="phase-step-badge">
                        {lang === "km" ? "ដំណាក់កាល ១" : "Phase 1"}
                      </span>
                    </div>
                    <h3 className="phase-title">
                      {lang === "km"
                        ? "1. ការរចនា និងវិភាគ"
                        : "1. Designing & Analyzing"}
                    </h3>
                    <div className="phase-dates">
                      {lang === "km"
                        ? "១៣ វិច្ឆិកា – ០៤ ធ្នូ ២០២៦"
                        : "13 Nov – 04 Dec 2026"}
                    </div>
                  </div>
                  <ul className="phase-bullets">
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការវិភាគតម្រូវការប្រព័ន្ធ"
                        : "Requirements analysis"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "លំហូរការងារ និង SOP"
                        : "Workflow & SOP"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការរចនាផ្ទាំង UI/UX"
                        : "UI/UX design"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការអនុម័តលើការរចនា"
                        : "Design approval"}
                    </li>
                  </ul>
                </div>

                <div className="phase-card blu">
                  <div className="phase-top">
                    <div className="phase-head-row">
                      <span className="phase-icon">
                        <Code2 size={24} />
                      </span>
                      <span className="phase-step-badge">
                        {lang === "km" ? "ដំណាក់កាល ២" : "Phase 2"}
                      </span>
                    </div>
                    <h3 className="phase-title">
                      {lang === "km" ? "2. ការអភិវឌ្ឍប្រព័ន្ធ" : "2. Development"}
                    </h3>
                    <div className="phase-dates">
                      {lang === "km"
                        ? "០៧ ធ្នូ ២០២៦ – ០៥ កុម្ភៈ ២០២៧"
                        : "07 Dec – 05 Feb 2027"}
                    </div>
                  </div>
                  <ul className="phase-bullets">
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "បង្កើតទម្រង់ដាក់ពាក្យស្នើសុំ"
                        : "Application forms"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការអភិវឌ្ឍលំហូរការងារ"
                        : "Workflow development"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "របាយការណ៍ និងការតភ្ជាប់ប្រព័ន្ធ"
                        : "Reports & integration"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការធ្វើតេស្តសាកល្បងផ្ទៃក្នុង"
                        : "Internal testing"}
                    </li>
                  </ul>
                </div>

                <div className="phase-card pur">
                  <div className="phase-top">
                    <div className="phase-head-row">
                      <span className="phase-icon">
                        <ClipboardCheck size={24} />
                      </span>
                      <span className="phase-step-badge">
                        {lang === "km" ? "ដំណាក់កាល ៣" : "Phase 3"}
                      </span>
                    </div>
                    <h3 className="phase-title">
                      {lang === "km" ? "3. ការធ្វើតេស្ត (UAT)" : "3. UAT"}
                    </h3>
                    <div className="phase-dates">
                      {lang === "km"
                        ? "០៨ កុម្ភៈ – ១២ មីនា ២០២៧"
                        : "08 Feb – 12 Mar 2027"}
                    </div>
                  </div>
                  <ul className="phase-bullets">
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "បទបង្ហាញប្រព័ន្ធជូនក្រសួង"
                        : "System demonstration"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការដាក់ដំណើរការសាកល្បង"
                        : "Trial deployment"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការបណ្តុះបណ្តាលអ្នកប្រើប្រាស់"
                        : "User training"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការធ្វើតេស្ត UAT និងចុះហត្ថលេខា"
                        : "UAT & sign-off"}
                    </li>
                  </ul>
                </div>

                <div className="phase-card gld">
                  <div className="phase-top">
                    <div className="phase-head-row">
                      <span className="phase-icon">
                        <Rocket size={24} />
                      </span>
                      <span className="phase-step-badge">
                        {lang === "km" ? "ដំណាក់កាល ៤" : "Phase 4"}
                      </span>
                    </div>
                    <h3 className="phase-title">
                      {lang === "km"
                        ? "4. ដាក់ឱ្យដំណើរការជាផ្លូវការ"
                        : "4. Launch"}
                    </h3>
                    <div className="phase-dates">
                      {lang === "km"
                        ? "១៥ មីនា – ៣១ មីនា ២០២៧"
                        : "15 Mar – 31 Mar 2027"}
                    </div>
                  </div>
                  <ul className="phase-bullets">
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការរៀបចំប្រព័ន្ធផលិតកម្ម"
                        : "Production preparation"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការដំឡើងប្រព័ន្ធជាផ្លូវការ"
                        : "System deployment"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ការផ្ទៀងផ្ទាត់ប្រព័ន្ធជាក់ស្តែង"
                        : "Production verification"}
                    </li>
                    <li>
                      <span className="phase-bullet-dot" />
                      {lang === "km"
                        ? "ដាក់ឱ្យប្រើប្រាស់ជាផ្លូវការ"
                        : "Official Go-Live"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 7: អគ្គនាយកដ្ឋានប្រេងកាត (General Dept. of Petroleum)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 6 ? "on" : ""}`}
          data-label="Petroleum"
        >
          <div className="pl">
            <PetroleumBgVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>

            <div className="head">
              <h2 className="h a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    III. អគ្គនាយកដ្ឋានប្រេងកាត ·{" "}
                    <span className="g">
                      Web Portal អ្នកស្នើសុំ &amp; ផ្ទៃក្នុងក្រសួង
                    </span>
                  </>
                ) : (
                  <>
                    III. General Dept. of Petroleum ·{" "}
                    <span className="g">
                      Applicant Portal &amp; Internal Portal
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="analytics-dashboard">
              {/* LEFT ANALYTICS COLUMN: Donut Chart + Vertical Column Bar Chart (Same as Slide 2) */}
              <div
                className="analytics-col a"
                style={{ "--d": 1.5 } as React.CSSProperties}
              >
                {/* Chart 1: SVG Donut Chart of 7 Petroleum Portal Modules */}
                <div className="chart-card">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ការវិភាគស្ថានភាព (២ Web Portal)"
                        : "Status Distribution (2 Web Portals)"}
                    </h3>
                    <span className="chip grn">
                      {lang === "km" ? "គម្រោងទី៣" : "Project 3"}
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
                        {/* 2/6 Ready (100%) -> 142.4 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#059669"
                          strokeWidth="22"
                          strokeDasharray="142.4 427.3"
                          strokeDashoffset="0"
                        />
                        {/* 3/6 High Progress (75%–90%) -> 213.7 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="22"
                          strokeDasharray="213.7 427.3"
                          strokeDashoffset="-142.4"
                        />
                        {/* 1/6 Provincial Inspection Tested -> 71.2 */}
                        <circle
                          cx="90"
                          cy="90"
                          r="68"
                          fill="none"
                          stroke="#0284C7"
                          strokeWidth="22"
                          strokeDasharray="71.2 427.3"
                          strokeDashoffset="-356.1"
                        />
                      </svg>
                      <div className="donut-center">
                        <span className="big">3</span>
                        <span className="lbl">
                          {lang === "km" ? "សេវាសរុប" : "Portal Services"}
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
                              ? "បានរៀបចំរួចរាល់ (1.1, 1.2)"
                              : "Setup Ready (1.1, 1.2)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--grn)" }}
                        >
                          {lang === "km" ? "2 សេវា" : "2 Services"}
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
                              ? "សម្រេចបាន 75%–90% (1.3, 2.1, 2.2)"
                              : "75%–90% Complete (1.3, 2.1, 2.2)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--pri)" }}
                        >
                          {lang === "km" ? "3 សេវា" : "3 Services"}
                        </span>
                      </div>

                      <div className="legend-item">
                        <div className="legend-left">
                          <span
                            className="legend-dot"
                            style={{ background: "#0284C7" }}
                          />
                          <span className="legend-name">
                            {lang === "km"
                              ? "តេស្តដល់ជំហានមន្ទីរខេត្ត (2.3)"
                              : "Provincial Test (2.3)"}
                          </span>
                        </div>
                        <span
                          className="legend-val"
                          style={{ color: "var(--cy)" }}
                        >
                          {lang === "km" ? "1 សេវា" : "1 Service"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Vertical Column Bar Chart (Same as Slide 2) */}
                <div className="chart-card grow">
                  <div className="chart-head">
                    <h3>
                      {lang === "km"
                        ? "ក្រាហ្វប្រៀបធៀបភាគរយវឌ្ឍនភាព"
                        : "Completion Percentage Chart"}
                    </h3>
                    <span className="sub">0% – 100%</span>
                  </div>

                  <div className="vbar-chart">
                    <div className="vbar-plot cols-6">
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
                          90%
                        </span>
                        <div
                          className="vbar-bar pri"
                          style={{ height: "90%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--pri)" }}
                        >
                          75%
                        </span>
                        <div
                          className="vbar-bar pri"
                          style={{ height: "75%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--pri)" }}
                        >
                          80%
                        </span>
                        <div
                          className="vbar-bar pri"
                          style={{ height: "80%" }}
                        />
                      </div>
                      <div className="vbar-col">
                        <span
                          className="vbar-num"
                          style={{ color: "var(--pri)" }}
                        >
                          90%
                        </span>
                        <div
                          className="vbar-bar pri"
                          style={{ height: "90%" }}
                        />
                      </div>
                    </div>

                    <div className="vbar-labels cols-6">
                      <div className="vbar-lbl">1.1</div>
                      <div className="vbar-lbl">1.2</div>
                      <div className="vbar-lbl">1.3</div>
                      <div className="vbar-lbl">2.1</div>
                      <div className="vbar-lbl">2.2</div>
                      <div className="vbar-lbl">2.3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT FULL-TEXT DATA COLUMN: Same 2-Column + Span-2 Grid as Slide 2 & 3 */}
              <div
                className="data-col a"
                style={{ "--d": 2.5 } as React.CSSProperties}
              >
                <div className="comp-cards-grid">
                  {/* Top-Left Card: 1. Web Portal សម្រាប់អ្នកស្នើសុំ */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "1. Web Portal សម្រាប់អ្នកស្នើសុំ"
                          : "1. Web Portal for Applicants"}
                      </h3>
                      <span className="chip grn">
                        <Globe size={16} />
                        {lang === "km" ? "៣ សេវា" : "3 Services"}
                      </span>
                    </div>
                    <div className="data-items-stack">
                      {PETROLEUM_DATA.applicantPortal.services.map(
                        (srv, idx) => {
                          const noteText =
                            lang === "km" ? srv.notesKm : srv.notesEn;
                          return (
                            <div
                              key={`pet-app-${srv.num}`}
                              className="data-item"
                            >
                              <div className="data-item-left">
                                <span className="data-code">{`1.${idx + 1}`}</span>
                                <div className="data-text">
                                  <h4>
                                    {lang === "km" ? srv.titleKm : srv.titleEn}
                                  </h4>
                                  {noteText ? <p>{noteText}</p> : null}
                                </div>
                              </div>
                              <span
                                className={`data-badge ${
                                  srv.num === "03" ? "pri" : "grn"
                                }`}
                              >
                                {srv.num === "03" ? "90%" : "100%"}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Top-Right Card: 2. Web Portal សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុងក្រសួង */}
                  <div className="comp-data-card">
                    <div className="comp-data-head">
                      <h3>
                        {lang === "km"
                          ? "2. Web Portal សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុងក្រសួង"
                          : "2. Web Portal for Internal Ministry Use"}
                      </h3>
                    </div>
                    <div className="data-items-stack">
                      {PETROLEUM_DATA.internalPortal.services.map(
                        (srv, idx) => {
                          const badgeClass =
                            srv.num === "01" ||
                            srv.num === "02" ||
                            srv.num === "03"
                              ? "pri"
                              : "amb";
                          const badgeText =
                            srv.num === "01"
                              ? "75%"
                              : srv.num === "02"
                                ? "80%"
                                : srv.num === "03"
                                  ? "90%"
                                  : "5%";
                          const noteText =
                            lang === "km" ? srv.notesKm : srv.notesEn;
                          return (
                            <div
                              key={`pet-int-${srv.num}`}
                              className="data-item"
                            >
                              <div className="data-item-left">
                                <span className="data-code">{`2.${idx + 1}`}</span>
                                <div className="data-text">
                                  <h4>
                                    {lang === "km" ? srv.titleKm : srv.titleEn}
                                  </h4>
                                  {noteText ? <p>{noteText}</p> : null}
                                </div>
                              </div>
                              <span className={`data-badge ${badgeClass}`}>
                                {badgeText}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Bottom Full-Width Span-2 Card: 3. ចំណាំ */}
                  <div className="comp-data-card span-2">
                    <div className="comp-data-head">
                      <h3 style={{ color: "var(--red)" }}>
                        {lang === "km" ? "3. ចំណាំ" : "3. Note"}
                      </h3>
                      <span className="data-badge red">
                        {lang === "km"
                          ? "សំណើកែសម្រួលផ្ទាំងបញ្ចូលព័ត៌មាន"
                          : "Form Alignment Requested"}
                      </span>
                    </div>
                    <div className="challenge-note-box">
                      <div className="challenge-note-body">
                        <p className="challenge-note-text">
                          {lang === "km"
                            ? "ការរៀបចំផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហានមន្ទីរចុះពិនិត្យទីតាំង ពុំអាចរៀបចំដូចកំណត់ហេតុទាំងស្រុង ដោយការរៀបចំក្នុងប្រព័ន្ធ Field ខ្លះជាលក្ខណៈ Select ជ្រើសរើសទិន្នន័យ ហើយ Field ខ្លះជាតារាងជាលក្ខណៈ Popup form បញ្ចូលទិន្នន័យ។"
                            : "The data entry screen at the Provincial On-Site Inspection step cannot fully mirror the paper inspection minutes, as some system fields use Select dropdowns while table sections use Popup forms for data entry."}
                        </p>
                        <ul className="challenge-list">
                          <li className="challenge-list-item">
                            <span className="data-code">3.1</span>
                            <span>
                              {lang === "km"
                                ? "ស្នើសុំវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ"
                                : "Technical Safety Certificate Application for Stations"}
                            </span>
                          </li>
                          <li className="challenge-list-item">
                            <span className="data-code">3.2</span>
                            <span>
                              {lang === "km"
                                ? "ស្នើសុំពិនិត្យ ទទួល និងដំណើរការឯកសារស្នើសុំនិងការបន្តសុពលភាពវិញ្ញាបនបត្របញ្ជាក់បច្ចេកទេសសុវត្ថិភាព សម្រាប់ស្ថានីយប្រេងឥន្ធនៈ ឬស្ថានីយឧស្ម័នឥន្ធនៈ"
                                : "Review, Reception & Processing of Application and Renewal for Fuel or LPG Stations"}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 8: Project 3 - GDP Timeline (Nov 2026 – Mar 2027)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 7 ? "on" : ""}`}
          data-label="GDP Timeline"
        >
          <div className="pl">
            <PetroleumBgVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>
            <div className="head">
              <h2 className="h a" style={{ "--d": 0 } as React.CSSProperties}>
                {lang === "km" ? (
                  <>
                    III. អគ្គនាយកដ្ឋានប្រេងកាត ·{" "}
                    <span className="g">
                      កាលវិភាគគម្រោងទី៣ (វិច្ឆិកា ២០២៦ – មីនា ២០២៧)
                    </span>
                  </>
                ) : (
                  <>
                    III. General Department of Petroleum ·{" "}
                    <span className="g">
                      Project 3 Timeline (Nov 2026 – Mar 2027)
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="gdp-timeline-wrap">
              <div
                className="gdp-gantt-card gdp-weeks-grid a"
                style={{ "--d": 1.2 } as React.CSSProperties}
              >
                <div className="chart-head">
                  <h3>
                    {lang === "km"
                      ? "ផែនការកាលវិភាគអនុវត្តគម្រោងទី៣ (Project 3 – GDP)"
                      : "Project 3 – GDP Implementation Timeline"}
                  </h3>
                  <span className="chip pri">
                    <Calendar size={16} />
                    {lang === "km"
                      ? "វិច្ឆិកា ២០២៦ – មីនា ២០២៧"
                      : "Nov 2026 – Mar 2027"}
                  </span>
                </div>

                <div className="gdp-gantt-table">
                  {/* Column Headers */}
                  <div className="gdp-gantt-head">
                    <div className="gdp-gantt-head-label">
                      {lang === "km" ? "ដំណាក់កាលការងារ" : "Phase"}
                    </div>
                    {[
                      { km: "វិច្ឆិកា ២០២៦", en: "Nov 2026" },
                      { km: "ធ្នូ ២០២៦", en: "Dec 2026" },
                      { km: "មករា ២០២៧", en: "Jan 2027" },
                      { km: "កុម្ភៈ ២០២៧", en: "Feb 2027" },
                      { km: "មីនា ២០២៧", en: "Mar 2027" },
                    ].map((month) => (
                      <div key={month.en} className="gdp-gantt-head-cell">
                        <span>{lang === "km" ? month.km : month.en}</span>
                        <div className="gs-v2-weeks">
                          <span>W1</span>
                          <span>W2</span>
                          <span>W3</span>
                          <span>W4</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Row 1: Design & Analyze */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#6366F1" }}
                      />
                      {lang === "km"
                        ? "1. ការរចនា និងវិភាគ"
                        : "1. Design & Analyze"}
                    </div>
                    <div className="gdp-gantt-track">
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div
                        className="gdp-gantt-pill ind"
                        style={{ left: "10%", width: "30%" }}
                        title="Start: Week 3 Nov-2026 · Finish: Week 4 Dec-2026"
                      >
                        {lang === "km"
                          ? "ស.ទី៣ វិច្ឆិកា – ស.ទី៤ ធ្នូ ២០២៦"
                          : "W3 Nov – W4 Dec 2026"}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Development */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#0891B2" }}
                      />
                      {lang === "km" ? "2. ការអភិវឌ្ឍប្រព័ន្ធ" : "2. Development"}
                    </div>
                    <div className="gdp-gantt-track">
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div
                        className="gdp-gantt-pill tel"
                        style={{ left: "25%", width: "55%" }}
                        title="Start: Week 2 Dec-2026 · Finish: Week 4 Feb-2027"
                      >
                        {lang === "km"
                          ? "សប្តាហ៍ទី២ ធ្នូ ២០២៦ – សប្តាហ៍ទី៤ កុម្ភៈ ២០២៧"
                          : "W2 Dec 2026 – W4 Feb 2027"}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: UAT */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#D97706" }}
                      />
                      {lang === "km" ? "3. ការធ្វើតេស្ត (UAT)" : "3. UAT"}
                    </div>
                    <div className="gdp-gantt-track">
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div
                        className="gdp-gantt-pill amb"
                        style={{ left: "80%", width: "15%" }}
                        title="Start: Week 1 Mar-2027 · Finish: Week 3 Mar-2027"
                      >
                        {lang === "km" ? "ស.ទី១–៣ មីនា" : "W1–W3 Mar"}
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Launch */}
                  <div className="gdp-gantt-row">
                    <div className="gdp-gantt-phase">
                      <span
                        className="gdp-gantt-dot"
                        style={{ background: "#059669" }}
                      />
                      {lang === "km" ? "4. ដាក់ឱ្យដំណើរការ" : "4. Launch"}
                    </div>
                    <div className="gdp-gantt-track">
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div className="gdp-gantt-col-line" />
                      <div
                        className="gdp-gantt-pill grn sm"
                        style={{ left: "95%", width: "5%" }}
                        title="Start: Week 4 Mar-2027"
                      >
                        <span className="gs-v2-pill-lbl left">
                          {lang === "km"
                            ? "សប្តាហ៍ទី៤ មីនា ២០២៧"
                            : "W4 Mar 2027"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 4 Start/Finish Summary Cards */}
              <div
                className="gdp-summary-row a"
                style={{ "--d": 2.0 } as React.CSSProperties}
              >
                <div className="gdp-summary-card">
                  <div className="gdp-summary-title">
                    <span
                      className="gdp-gantt-dot"
                      style={{ background: "#6366F1" }}
                    />
                    {lang === "km"
                      ? "1. ការរចនា និងវិភាគ"
                      : "1. Design & Analyze"}
                  </div>
                  <div className="gdp-summary-dates">
                    {lang === "km"
                      ? "ចាប់ផ្តើម៖ សប្តាហ៍ទី៣ វិច្ឆិកា ២០២៦ · បញ្ចប់៖ សប្តាហ៍ទី៤ ធ្នូ ២០២៦"
                      : "Start: Week 3 Nov-2026 · Finish: Week 4 Dec-2026"}
                  </div>
                </div>

                <div className="gdp-summary-card">
                  <div className="gdp-summary-title">
                    <span
                      className="gdp-gantt-dot"
                      style={{ background: "#0891B2" }}
                    />
                    {lang === "km" ? "2. ការអភិវឌ្ឍប្រព័ន្ធ" : "2. Development"}
                  </div>
                  <div className="gdp-summary-dates">
                    {lang === "km"
                      ? "ចាប់ផ្តើម៖ សប្តាហ៍ទី២ ធ្នូ ២០២៦ · បញ្ចប់៖ សប្តាហ៍ទី៤ កុម្ភៈ ២០២៧"
                      : "Start: Week 2 Dec-2026 · Finish: Week 4 Feb-2027"}
                  </div>
                </div>

                <div className="gdp-summary-card">
                  <div className="gdp-summary-title">
                    <span
                      className="gdp-gantt-dot"
                      style={{ background: "#D97706" }}
                    />
                    {lang === "km" ? "3. ការធ្វើតេស្ត (UAT)" : "3. UAT"}
                  </div>
                  <div className="gdp-summary-dates">
                    {lang === "km"
                      ? "ចាប់ផ្តើម៖ សប្តាហ៍ទី១ មីនា ២០២៧ · បញ្ចប់៖ សប្តាហ៍ទី៣ មីនា ២០២៧"
                      : "Start: Week 1 Mar-2027 · Finish: Week 3 Mar-2027"}
                  </div>
                </div>

                <div className="gdp-summary-card">
                  <div className="gdp-summary-title">
                    <span
                      className="gdp-gantt-dot"
                      style={{ background: "#059669" }}
                    />
                    {lang === "km" ? "4. ដាក់ឱ្យដំណើរការ" : "4. Launch"}
                  </div>
                  <div className="gdp-summary-dates">
                    {lang === "km"
                      ? "ចាប់ផ្តើម៖ សប្តាហ៍ទី៤ មីនា ២០២៧"
                      : "Start: Week 4 Mar-2027"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SLIDE 9: Executive Conclusion & Thank You (Last Slide Kept Intact)
           ============================================================ */}
        <section
          className={`slide ${currentSlide === 8 ? "on" : ""}`}
          data-label="Thanks"
        >
          <div className="pl">
            <RoyalTransmissionVisual />
          </div>

          <div className="stage" style={{ transform: `scale(${scale})` }}>

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
                  <div className="ty-tech-partner">
                    <span className="ty-partner-label">
                      {lang === "km" ? "ដៃគូបច្ចេកវិទ្យា" : "Technology Partner"}
                    </span>
                    <Image
                      src="/logo/Oone logo.svg"
                      alt="OONE Logo"
                      width={105}
                      height={49}
                      className="object-contain"
                    />
                  </div>
                </div>
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
            height={32}
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
