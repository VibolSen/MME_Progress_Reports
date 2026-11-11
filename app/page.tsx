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
  Maximize,
  Minimize,
  Sun,
  Moon,
  Globe,
  LayoutGrid,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Calendar,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";

const TOTAL_SLIDES = 13;

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
  const [scale, setScale] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      return s > 0 ? s : 1;
    }
    return 1;
  });
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Auto-scale slide viewport to fit current window maintaining 16:9 ratio
  const handleResize = useCallback(() => {
    const targetWidth = 1920;
    const targetHeight = 1080;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Leave a small margin for controls
    const scaleX = windowWidth / targetWidth;
    const scaleY = windowHeight / targetHeight;
    const newScale = Math.min(scaleX, scaleY);
    setScale(newScale > 0 ? newScale : 1);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const slideNum = parseInt(hash, 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= TOTAL_SLIDES) {
        setCurrentSlide(slideNum - 1);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [handleResize]);

  // Sync slide change to URL hash
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

  const toggleLanguage = () => {
    setLang((prev) => (prev === "km" ? "en" : "km"));
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside input
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
        case "g":
        case "G":
          setShowGrid((prev) => !prev);
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
          setShowGrid(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  // Click side navigation (Canva style: left 25% prev, right 75% next)
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicked on button or interactive element, ignore
    if ((e.target as HTMLElement).closest("button, a, input, select, .interactive")) {
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

  // Slide Titles list for Grid & Overview
  const slideTitles = useMemo(() => [
    { en: "Title Slide", km: "ទំព័រដើម / ចំណងជើង" },
    { en: "01. Presentation Overview", km: "០១. របៀបវារៈបទបង្ហាញ" },
    { en: "02. Departments Scope", km: "០២. វិសាលភាពនាយកដ្ឋាន" },
    { en: "03. General Department Summary", km: "០៣. សង្ខេបវឌ្ឍភាពនាយកដ្ឋានទូទៅ" },
    { en: "04. Component 1: Operational Support", km: "០៤. សមាសភាគទី១៖ ប្រតិបត្តិការ & បន្ទប់ប្រជុំ" },
    { en: "05. Component 2: Mission & Payroll", km: "០៥. សមាសភាគទី២៖ បេសកកម្ម & ប្រាក់បៀវត្ស" },
    { en: "06. Component 3 & 4: Assets & Budget", km: "០៦. សមាសភាគទី៣ & ៤៖ ទ្រព្យសម្បត្តិ & ថវិកា" },
    { en: "07. Component 5: Document Management", km: "០៧. សមាសភាគទី៥៖ ឯកសារអគ្គលេខាធិការដ្ឋាន" },
    { en: "08. Pending Items Review", km: "០៨. ការងារដែលនៅសេសសល់ (Pending)" },
    { en: "09. Challenges & Suggestions", km: "០៩. បញ្ហាប្រឈម & សំណូមពរ" },
    { en: "10. Expected Completion & Timeline", km: "១០. កាលវិភាគបញ្ចប់គម្រោង" },
    { en: "11. Next 30-Day Action Plan", km: "១១. សេចក្តីសន្និដ្ឋាន & ជំហានបន្ទាប់" },
    { en: "12. Questions & Discussion", km: "១២. សំណួរ & សូមអរគុណ" },
  ], []);

  return (
    <div
      className="deck-container font-sans"
      data-theme={theme}
      data-lang={lang}
    >
      {/* 16:9 Aspect Viewport */}
      <div
        className="slide-viewport relative flex flex-col justify-between p-16 select-none cursor-default"
        style={{
          transform: `scale(${scale})`,
          width: "1920px",
          height: "1080px",
        }}
        onClick={handleViewportClick}
      >
        {/* Background Ambient Glows and Grid */}
        <div className="bg-ambient">
          <div className="bg-dots" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
        </div>

        {/* Global Slide Header (Shown on slides > 0) */}
        {currentSlide > 0 && (
          <header className="relative z-10 flex items-center justify-between pb-6 border-b border-[var(--pb)]">
            <div className="flex items-center gap-5">
              <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--panel2)] border border-[var(--pb)] overflow-hidden shadow-inner">
                <Image
                  src="/logo/logo tab.svg"
                  alt="OONE Tab Logo"
                  width={34}
                  height={34}
                  priority
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase text-[var(--pri)]">
                  {lang === "km"
                    ? "ក្រសួងរ៉ែ និងថាមពល · MME"
                    : "Ministry of Mines and Energy · MME"}
                </div>
                <div className="text-lg font-bold text-[var(--tx)]">
                  {lang === "km"
                    ? PRESENTATION_META.projectTitleKm
                    : PRESENTATION_META.projectTitleEn}
                </div>
              </div>
            </div>

            {/* Department Badge Tracker */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--panel2)] border border-[var(--pb)] text-xs text-[var(--mu)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-[var(--tx)]">
                  {lang === "km" ? "នាយកដ្ឋានទូទៅ" : "General Department"}
                </span>
                <span className="text-[var(--mu)]">
                  ({lang === "km" ? "ទិន្នន័យមានស្រាប់" : "Active"})
                </span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-medium text-amber-400">
                {lang === "km"
                  ? "២ នាយកដ្ឋានទៀត · រង់ចាំទិន្នន័យ"
                  : "2 Other Depts · In Pipeline"}
              </div>
            </div>
          </header>
        )}

        {/* Main Slide Body */}
        <main className="relative z-10 flex-1 flex flex-col justify-center my-auto overflow-hidden">
          {/* SLIDE 1: TITLE SLIDE */}
          {currentSlide === 0 && (
            <div className="slide-content grid grid-cols-12 gap-12 items-center h-full">
              <div className="col-span-7 flex flex-col justify-center gap-6 pr-6">
                <div className="inline-flex items-center gap-3 w-fit px-4 py-2 rounded-full bg-[var(--panel)] border border-[var(--pb)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--pri)] animate-ping" />
                  <span className="text-sm font-semibold tracking-wide uppercase text-[var(--pri)]">
                    {lang === "km"
                      ? "ក្រុមហ៊ុន អូន ផៅវ័រ ថេកណឡជី · បទបង្ហាញវឌ្ឍភាព"
                      : "OONE Power Technology · Progress Presentation"}
                  </span>
                </div>

                <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-[var(--tx)]">
                  {lang === "km" ? (
                    <>
                      របាយការណ៍{" "}
                      <span className="text-gradient-purple">វឌ្ឍភាពការងារ</span>{" "}
                      គម្រោង
                    </>
                  ) : (
                    <>
                      Digital System{" "}
                      <span className="text-gradient-purple">Progress Report</span>
                    </>
                  )}
                </h1>

                <div className="inline-flex items-center gap-3 text-2xl font-semibold text-[var(--cy)]">
                  <Building2 className="w-7 h-7 text-[var(--cy)]" />
                  <span>
                    {lang === "km"
                      ? "ក្រសួងរ៉ែ និងថាមពល (MME)"
                      : "Ministry of Mines and Energy (MME)"}
                  </span>
                </div>

                <p className="text-xl text-[var(--mu)] leading-relaxed max-w-2xl">
                  {lang === "km"
                    ? "ទិដ្ឋភាពរួមនៃវឌ្ឍភាពការងារ បញ្ជីការងារដែលនៅសេសសល់ (Pending) បញ្ហាប្រឈម និងផែនការរំពឹងទុកនៃការបញ្ចប់គម្រោងសម្រាប់នាយកដ្ឋានទូទៅ។"
                    : "A comprehensive executive overview covering Progress & Pending items, Operational Challenges, and Expected Completion Timeline."}
                </p>

                <div className="flex items-center gap-5 pt-4">
                  <button
                    onClick={() => goToSlide(1)}
                    className="interactive flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--pri2)] to-[var(--pri)] hover:from-[var(--pri)] hover:to-[#A78BFA] text-white font-semibold text-lg shadow-lg shadow-[var(--pri)]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>
                      {lang === "km"
                        ? "ចាប់ផ្តើមបទបង្ហាញ"
                        : "Start Presentation"}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3 pl-4 border-l border-[var(--pb)]">
                    <span className="text-xs text-[var(--mu)] uppercase tracking-wider block">
                      {lang === "km" ? "រៀបចំដោយ" : "Prepared by"}
                    </span>
                    <div className="text-sm font-bold text-[var(--tx)]">
                      {lang === "km"
                        ? PRESENTATION_META.companyKm
                        : PRESENTATION_META.companyEn}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Hero Visual Cards */}
              <div className="col-span-5 flex flex-col gap-5 justify-center">
                <div className="glass-panel p-6 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--pri)]/15 border border-[var(--pri)]/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-[var(--pri)]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--pri)]">
                      {lang === "km" ? "ចំណុចទី ១" : "Key Agenda 01"}
                    </div>
                    <div className="text-xl font-bold text-[var(--tx)]">
                      {lang === "km"
                        ? "វឌ្ឍភាព & ការងារនៅសេសសល់"
                        : "Progress & Pending Items"}
                    </div>
                    <div className="text-sm text-[var(--mu)] mt-1">
                      {lang === "km"
                        ? "សមាសភាគទាំង ៥ នៃនាយកដ្ឋានទូទៅ"
                        : "5 Components of General Department"}
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--amb)]/15 border border-[var(--amb)]/30 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-8 h-8 text-[var(--amb)]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--amb)]">
                      {lang === "km" ? "ចំណុចទី ២" : "Key Agenda 02"}
                    </div>
                    <div className="text-xl font-bold text-[var(--tx)]">
                      {lang === "km"
                        ? "បញ្ហាប្រឈម & សំណូមពរ"
                        : "Challenges & Solutions"}
                    </div>
                    <div className="text-sm text-[var(--mu)] mt-1">
                      {lang === "km"
                        ? "ការសម្របសម្រួលប្រាក់បៀវត្ស & ការសិក្សាតម្រូវការ"
                        : "Payroll inter-ministry alignment & study sign-offs"}
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--cy)]/15 border border-[var(--cy)]/30 flex items-center justify-center shrink-0">
                    <Calendar className="w-8 h-8 text-[var(--cy)]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--cy)]">
                      {lang === "km" ? "ចំណុចទី ៣" : "Key Agenda 03"}
                    </div>
                    <div className="text-xl font-bold text-[var(--tx)]">
                      {lang === "km"
                        ? "ការរំពឹងទុកនៃការបញ្ចប់"
                        : "Expected Completion"}
                    </div>
                    <div className="text-sm text-[var(--mu)] mt-1">
                      {lang === "km"
                        ? "កាលវិភាគប្រគល់គម្រោង & នាយកដ្ឋានបន្ទាប់"
                        : "Phased timeline & upcoming 2 departments"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: AGENDA / PRESENTATION OVERVIEW */}
          {currentSlide === 1 && (
            <div className="slide-content flex flex-col gap-8 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)] mb-2">
                  {lang === "km" ? "ទិដ្ឋភាពទូទៅនៃបទបង្ហាញ" : "Presentation Structure"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km" ? "របៀបវារៈបទបង្ហាញ (Agenda)" : "Presentation Agenda"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ការបង្ហាញត្រូវបានបែងចែកជា ៣ ចំណុចស្នូល ស្របតាមការស្នើសុំជាក់ស្តែង"
                    : "Structured around 3 pivotal pillars covering immediate status to strategic delivery."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {AGENDA_ITEMS.map((item, idx) => (
                  <div
                    key={item.key}
                    onClick={() => goToSlide(idx === 0 ? 3 : idx === 1 ? 9 : 10)}
                    className="interactive glass-panel p-8 flex flex-col justify-between group hover:border-[var(--pri)] transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--pri)]/5 rounded-full blur-2xl group-hover:bg-[var(--pri)]/15 transition-all" />
                    <div>
                      <div className="text-4xl font-black text-[var(--pri)] opacity-60 mb-4">
                        {item.num}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--cy)] mb-2">
                        {lang === "km" ? item.tagKm : item.tagEn}
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--tx)] mb-4 group-hover:text-[var(--pri)] transition-colors">
                        {lang === "km" ? item.titleKm : item.titleEn}
                      </h3>
                      <p className="text-sm text-[var(--mu)] leading-relaxed">
                        {lang === "km" ? item.descKm : item.descEn}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-8 text-xs font-semibold text-[var(--pri)] group-hover:translate-x-1 transition-transform">
                      <span>{lang === "km" ? "មើលព័ត៌មានលម្អិត" : "Jump to section"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Department Notice Banner */}
              <div className="glass-panel-subtle p-5 flex items-center justify-between border-l-4 border-amber-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                    !
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--tx)]">
                      {lang === "km"
                        ? "ចំណាំអំពីវិសាលភាពនាយកដ្ឋាន"
                        : "Departmental Scope Context"}
                    </div>
                    <div className="text-xs text-[var(--mu)] mt-0.5">
                      {lang === "km"
                        ? "បច្ចុប្បន្នទិន្នន័យត្រូវបានរៀបចំសម្រាប់ នាយកដ្ឋានទូទៅ (១ ក្នុងចំណោម ៣)។ ទិន្នន័យសម្រាប់នាយកដ្ឋាន ២ ទៀត នឹងត្រូវបញ្ចូលជាបន្តបន្ទាប់។"
                        : "Currently presenting complete data for Department 1 (General Department). The 2 remaining departments are in pipeline and will be appended upon receipt."}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => goToSlide(2)}
                  className="interactive px-4 py-2 rounded-lg bg-[var(--panel)] border border-[var(--pb)] hover:border-[var(--pri)] text-xs font-semibold text-[var(--tx)]"
                >
                  {lang === "km" ? "មើលផែនការនាយកដ្ឋាន" : "View Department Matrix"}
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 3: MULTI-DEPARTMENT SCOPE */}
          {currentSlide === 2 && (
            <div className="slide-content flex flex-col gap-8 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--cy)] mb-2">
                  {lang === "km" ? "វិសាលភាពស្ថាបត្យកម្ម" : "Architectural Scope"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "វិសាលភាពនៃនាយកដ្ឋានទាំង ៣ ក្នុងគម្រោង MME"
                    : "Three-Department Transformation Matrix"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ប្រព័ន្ធត្រូវបានរៀបចំឡើងជាលក្ខណៈម៉ូឌុលដែលអាចពង្រីក (Scalable) ដើម្បីទទួលទិន្នន័យពីនាយកដ្ឋានទាំងអស់"
                    : "Designed with a modular architecture ready to ingest and synchronize departmental data streams."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {DEPARTMENTS.map((dept, i) => (
                  <div
                    key={dept.id}
                    className={`glass-panel p-8 flex flex-col justify-between border-2 ${
                      dept.status === "active"
                        ? "border-[var(--pri)] bg-[var(--pri)]/5 shadow-lg shadow-[var(--pri)]/10"
                        : "border-[var(--pb)] opacity-85"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--mu)]">
                          {`Dept 0${i + 1}`}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            dept.status === "active"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {lang === "km" ? dept.statusKm : dept.statusEn}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[var(--tx)] mb-2">
                        {lang === "km" ? dept.nameKm : dept.nameEn}
                      </h3>
                      <div className="text-xs font-semibold text-[var(--cy)] mb-4">
                        {lang === "km" ? dept.badgeKm : dept.badgeEn}
                      </div>

                      <p className="text-sm text-[var(--mu)] leading-relaxed mb-6">
                        {lang === "km" ? dept.descriptionKm : dept.descriptionEn}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[var(--pb)]">
                      {dept.status === "active" ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--mu)]">
                              {lang === "km" ? "សមាសភាគគម្រោង:" : "Project Components:"}
                            </span>
                            <span className="font-bold text-[var(--tx)]">5 Modules</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--mu)]">
                              {lang === "km" ? "សេវាដំណើរការផ្លូវការ:" : "Live Services:"}
                            </span>
                            <span className="font-bold text-emerald-400">1 (Meeting Room)</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--mu)]">
                              {lang === "km" ? "ការងាររៀបចំប្រព័ន្ធ:" : "In System Setup:"}
                            </span>
                            <span className="font-bold text-[var(--pri)]">4 Modules</span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-4 text-center">
                          <Clock className="w-8 h-8 text-amber-400/60 mx-auto mb-2 animate-bounce" />
                          <div className="text-xs font-semibold text-[var(--tx)]">
                            {lang === "km"
                              ? "រង់ចាំការបញ្ជូនទិន្នន័យដំណាក់កាលទី ២"
                              : "Phase 2 Data Gathering in Progress"}
                          </div>
                          <div className="text-[11px] text-[var(--mu)] mt-1">
                            {lang === "km"
                              ? "ម៉ូឌុលប្រព័ន្ធបានត្រៀមរួចរាល់សម្រាប់ភ្ជាប់"
                              : "System slots pre-configured for instant intake"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => goToSlide(3)}
                  className="interactive flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--panel)] border border-[var(--pb)] hover:border-[var(--pri)] text-sm font-semibold text-[var(--tx)]"
                >
                  <span>
                    {lang === "km"
                      ? "បន្តទៅសង្ខេបវឌ្ឍភាពនាយកដ្ឋានទូទៅ"
                      : "Proceed to General Department Status"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 4: GENERAL DEPARTMENT - EXECUTIVE SUMMARY */}
          {currentSlide === 3 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)] mb-2">
                  {lang === "km" ? "ចំណុចទី ១ · សេចក្តីសង្ខេបប្រតិបត្តិ" : "Agenda 01 · Executive Summary"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "ស្ថានភាពវឌ្ឍភាពទូទៅនៃនាយកដ្ឋានទូទៅ (Progress Snapshot)"
                    : "General Department: Progress & Status Snapshot"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ការបែងចែកសមាសភាគទាំង ៥ ទៅតាមស្ថានភាពជាក់ស្តែងនៃការអនុវត្ត"
                    : "System readiness across operations, personnel, finance, assets, and document management."}
                </p>
              </div>

              {/* 4 KPI Metric Cards */}
              <div className="grid grid-cols-4 gap-6">
                <div className="glass-panel p-6 border-l-4 border-emerald-400">
                  <div className="flex items-center justify-between text-xs text-[var(--mu)] mb-2">
                    <span>{lang === "km" ? "សេវាដំណើរការផ្លូវការ" : "Officially Live"}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-400 mb-1">
                    100%
                  </div>
                  <div className="text-sm font-bold text-[var(--tx)]">
                    {lang === "km" ? "សេវាបន្ទប់ប្រជុំ" : "Meeting Room Service"}
                  </div>
                  <div className="text-xs text-[var(--mu)] mt-1">
                    {lang === "km" ? "ដាក់ឱ្យមន្ត្រីប្រើប្រាស់ពេញលេញ" : "Fully deployed across MME"}
                  </div>
                </div>

                <div className="glass-panel p-6 border-l-4 border-[var(--pri)]">
                  <div className="flex items-center justify-between text-xs text-[var(--mu)] mb-2">
                    <span>{lang === "km" ? "រៀបចំប្រព័ន្ធរួចរាល់" : "System Setup Ready"}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--pri)]" />
                  </div>
                  <div className="text-4xl font-extrabold text-[var(--pri)] mb-1">
                    60% - 65%
                  </div>
                  <div className="text-sm font-bold text-[var(--tx)]">
                    {lang === "km" ? "ឯកសារ & ស្នើសុំបេសកកម្ម" : "Secretariat Docs & Mission"}
                  </div>
                  <div className="text-xs text-[var(--mu)] mt-1">
                    {lang === "km" ? "កំពុងត្រៀមធ្វើតេស្តសាកល្បង UAT" : "Prepared for user acceptance"}
                  </div>
                </div>

                <div className="glass-panel p-6 border-l-4 border-amber-400">
                  <div className="flex items-center justify-between text-xs text-[var(--mu)] mb-2">
                    <span>{lang === "km" ? "បានសិក្សាតម្រូវការ" : "User Studied"}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  </div>
                  <div className="text-4xl font-extrabold text-amber-400 mb-1">
                    10%
                  </div>
                  <div className="text-sm font-bold text-[var(--tx)]">
                    {lang === "km" ? "ថែទាំ ផ្គត់ផ្គង់ ទ្រព្យ & ផែនការ" : "Ops, Supply, Assets, Budget"}
                  </div>
                  <div className="text-xs text-[var(--mu)] mt-1">
                    {lang === "km" ? "បានប្រមូលតម្រូវការពីមន្ត្រីរួចរាល់" : "Ready for specification sign-off"}
                  </div>
                </div>

                <div className="glass-panel p-6 border-l-4 border-rose-400">
                  <div className="flex items-center justify-between text-xs text-[var(--mu)] mb-2">
                    <span>{lang === "km" ? "រង់ចាំការសម្រេចពីក្រសួង" : "Pending Inter-Ministry"}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  </div>
                  <div className="text-4xl font-extrabold text-rose-400 mb-1">
                    Pending
                  </div>
                  <div className="text-sm font-bold text-[var(--tx)]">
                    {lang === "km" ? "ដំណើរការប្រាក់បៀវត្ស" : "Payroll Processing"}
                  </div>
                  <div className="text-xs text-[var(--mu)] mt-1">
                    {lang === "km" ? "ត្រូវការការសិក្សាជាមួយក្រសួងបន្ថែម" : "Awaiting joint MEF study"}
                  </div>
                </div>
              </div>

              {/* Component Overview Quick Navigation Bar */}
              <div className="glass-panel p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--tx)] mb-4">
                  {lang === "km" ? "បញ្ជីសមាសភាគទាំង ៥ (ចុចដើម្បីពិនិត្យលម្អិត):" : "Component Drilldown Navigator:"}
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {COMPONENTS_DATA.map((comp, idx) => (
                    <div
                      key={comp.id}
                      onClick={() => goToSlide(4 + idx)}
                      className="interactive glass-panel-subtle p-4 hover:border-[var(--pri)] hover:bg-[var(--pri)]/10 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[var(--cy)]">{comp.num}</span>
                          <span className="text-xs font-extrabold text-[var(--tx)]">{comp.overallProgress}%</span>
                        </div>
                        <div className="text-xs font-bold text-[var(--tx)] line-clamp-2">
                          {lang === "km" ? comp.titleKm : comp.titleEn}
                        </div>
                      </div>
                      <div className="w-full bg-[var(--pb)] h-1.5 rounded-full overflow-hidden mt-3">
                        <div
                          className={`h-full ${
                            comp.overallProgress >= 60
                              ? "bg-emerald-400"
                              : comp.overallProgress >= 30
                              ? "bg-[var(--pri)]"
                              : "bg-amber-400"
                          }`}
                          style={{ width: `${comp.overallProgress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: COMPONENT 1 - OPERATIONAL SUPPORT, SUPPLY & MEETING ROOMS */}
          {currentSlide === 4 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)] mb-2">
                  {lang === "km" ? "សមាសភាគទី ១ · នាយកដ្ឋានទូទៅ" : "Component 01 · General Department"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "១.១. ការងារថែទាំ ផ្គត់ផ្គង់ និងសេវាបន្ទប់ប្រជុំ"
                    : "1.1. Facilities, Supply Procurement, & Meeting Rooms"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ការដាក់ដំណើរការសេវាបន្ទប់ប្រជុំ (Quick Win) និងការសិក្សាតម្រូវការសម្ភារ"
                    : "Highlighting our first fully deployed operational service alongside supply chain requirements."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {COMPONENTS_DATA[0].subtasks.map((task) => (
                  <div
                    key={task.id}
                    className={`glass-panel p-6 flex flex-col justify-between border-2 ${
                      task.status === "live"
                        ? "border-emerald-400/70 bg-emerald-500/5 shadow-lg shadow-emerald-500/10"
                        : "border-[var(--pb)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[var(--panel2)] text-[var(--cy)]">
                          {task.id}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-bold ${
                            task.status === "live"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {lang === "km" ? task.statusKm : task.statusEn}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--tx)] mb-3">
                        {lang === "km" ? task.titleKm : task.titleEn}
                      </h3>

                      <p className="text-sm text-[var(--mu)] leading-relaxed mb-6">
                        {lang === "km" ? task.notesKm : task.notesEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--pb)]">
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-[var(--mu)]">
                          {lang === "km" ? "វឌ្ឍភាពជាក់ស្តែង:" : "Progress Rate:"}
                        </span>
                        <span
                          className={
                            task.progress === 100
                              ? "text-emerald-400 text-base"
                              : "text-amber-400 text-base"
                          }
                        >
                          {task.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-[var(--pb)] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ${
                            task.progress === 100 ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success Callout for Meeting Room */}
              <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-emerald-400 bg-emerald-500/5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div className="text-sm text-[var(--tx)]">
                    <b className="text-emerald-400">
                      {lang === "km" ? "សមិទ្ធផលជោគជ័យ (Live):" : "Deployed Live:"}
                    </b>{" "}
                    {lang === "km"
                      ? "សេវាបន្ទប់ប្រជុំបានដាក់ឱ្យដំណើរការជាផ្លូវការ (១០០%) រួចហើយ កាត់បន្ថយការជាន់កាលវិភាគ និងបង្កើនប្រសិទ្ធភាពកិច្ចប្រជុំទូទាំងក្រសួង។"
                      : "The Meeting Room Booking Service is 100% operational, resolving reservation conflicts and providing an instant shared schedule across MME."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 6: COMPONENT 2 - MISSION REQUESTS & PAYROLL */}
          {currentSlide === 5 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)] mb-2">
                  {lang === "km" ? "សមាសភាគទី ២ · នាយកដ្ឋានទូទៅ" : "Component 02 · General Department"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "១.២. ការស្នើសុំបេសកកម្ម និងដំណើរការប្រាក់បៀវត្ស"
                    : "1.2. Mission Requests & Payroll Processing"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "វឌ្ឍភាពរៀបចំប្រព័ន្ធបេសកកម្ម (៦៥%) និងស្ថានភាពរង់ចាំការសម្របសម្រួលប្រាក់បៀវត្ស"
                    : "Comparing ready administrative workflows against external inter-ministerial requirements."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* 1.2.1 Mission Request */}
                <div className="glass-panel p-8 border-2 border-[var(--pri)]/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded bg-[var(--panel2)] text-[var(--cy)]">
                        1.2.1
                      </span>
                      <span className="text-xs px-3.5 py-1.5 rounded-full font-bold bg-[var(--pri)]/20 text-[var(--pri)] border border-[var(--pri)]/40">
                        {lang === "km" ? "ការរៀបចំប្រព័ន្ធរួចរាល់ (៦៥%)" : "System Setup Ready (65%)"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--tx)] mb-3">
                      {lang === "km" ? "ការស្នើសុំបេសកកម្ម" : "Mission Request Workflow"}
                    </h3>

                    <p className="text-sm text-[var(--mu)] leading-relaxed mb-6">
                      {lang === "km"
                        ? "ទម្រង់បែបបទស្នើសុំឌីជីថល លំហូរការងារពិនិត្យ និងអនុម័តតាមឋានានុក្រម ព្រមទាំងការគណនាប្រាក់ឧបត្ថម្ភបេសកកម្ម បានរៀបចំក្នុងប្រព័ន្ធរួចរាល់។"
                        : "Digital application forms, hierarchical review approvals, and allowance calculation workflows are structured and ready for final pilot verification."}
                    </p>

                    <div className="space-y-2 mb-6 text-xs text-[var(--tx)]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{lang === "km" ? "ទម្រង់ស្នើសុំបេសកកម្មឌីជីថល" : "Digital Mission Requisition Forms"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{lang === "km" ? "ខ្សែសង្វាក់អនុម័តតាមឋានានុក្រម" : "Multi-tiered Approval Routing"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--mu)]">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>{lang === "km" ? "ត្រៀមធ្វើតេស្តសាកល្បង UAT (៣៥% នៅសល់)" : "Remaining: Staff UAT & Final Rollout"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--pb)]">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-[var(--mu)]">{lang === "km" ? "វឌ្ឍភាព:" : "Progress:"}</span>
                      <span className="text-[var(--pri)] text-lg">65%</span>
                    </div>
                    <div className="w-full bg-[var(--pb)] h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--pri2)] to-[var(--pri)]" style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>

                {/* 1.2.2 Payroll Process */}
                <div className="glass-panel p-8 border-2 border-rose-500/50 flex flex-col justify-between bg-rose-500/5">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded bg-[var(--panel2)] text-rose-400">
                        1.2.2
                      </span>
                      <span className="text-xs px-3.5 py-1.5 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                        {lang === "km" ? "រង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែម (Pending)" : "Pending Joint Study with Ministry"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--tx)] mb-3">
                      {lang === "km" ? "ដំណើរការប្រាក់បៀវត្ស" : "Payroll Processing System"}
                    </h3>

                    <p className="text-sm text-[var(--mu)] leading-relaxed mb-6">
                      {lang === "km"
                        ? "ការងារនេះទាមទារការសម្របសម្រួល និងសិក្សាបន្ថែមជាមួយក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ (MEF) ដើម្បីធានាបាននូវភាពត្រឹមត្រូវនៃរូបមន្ត និងប្រព័ន្ធទូទាត់។"
                        : "Requires formal inter-ministerial coordination with the Ministry of Economy and Finance regarding standardized salary grids, tax rules, and banking integration."}
                    </p>

                    <div className="glass-panel-subtle p-4 rounded-xl border border-rose-500/30 text-xs space-y-2 mb-4">
                      <div className="font-bold text-rose-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{lang === "km" ? "មូលហេតុនៃការពន្យារពេល:" : "Pending Reason:"}</span>
                      </div>
                      <p className="text-[var(--mu)] leading-relaxed">
                        {lang === "km"
                          ? "ទាមទារទម្រង់ទិន្នន័យរួម និងគោលការណ៍ណែនាំបច្ចេកទេសផ្លូវការពីក្រសួងពាក់ព័ន្ធ មុនពេលអាចបញ្ចប់ការកំណត់ប្រព័ន្ធស្វ័យប្រវត្តិកម្ម។"
                          : "Awaiting unified external schema and guidelines from governing ministries prior to locking system automation logic."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--pb)]">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-[var(--mu)]">{lang === "km" ? "ស្ថានភាព:" : "Status:"}</span>
                      <span className="text-rose-400 text-sm">{lang === "km" ? "រង់ចាំកិច្ចប្រជុំអន្តរក្រសួង" : "Awaiting Inter-Ministry Meeting"}</span>
                    </div>
                    <div className="w-full bg-[var(--pb)] h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: "10%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 7: COMPONENTS 3 & 4 - STATE ASSETS & PLANNING/BUDGETING */}
          {currentSlide === 6 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)] mb-2">
                  {lang === "km" ? "សមាសភាគទី ៣ & ៤ · នាយកដ្ឋានទូទៅ" : "Components 03 & 04 · General Department"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "១.៣. ទ្រព្យសម្បត្តិរដ្ឋ & ១.៤. ផែនការ ថវិកា និងការតាមដានត្រួតពិនិត្យ"
                    : "1.3. State Assets & 1.4. Planning, Budgeting, & Evaluation"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ស្ថានភាពបច្ចុប្បន្នបានបញ្ចប់ការសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (១០%) និងត្រៀមបន្តទៅដំណាក់កាលអភិវឌ្ឍ"
                    : "Requirements surveyed; ready for technical specification approval and database architecture."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Component 1.3 */}
                <div className="glass-panel p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded bg-[var(--panel2)] text-[var(--cy)]">
                        1.3
                      </span>
                      <span className="text-xs px-3.5 py-1.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {lang === "km" ? "បានសិក្សាតម្រូវការ (១០%)" : "User Studied (10%)"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--tx)] mb-3">
                      {lang === "km"
                        ? "ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ"
                        : "State Asset Management System"}
                    </h3>

                    <p className="text-sm text-[var(--mu)] leading-relaxed mb-6">
                      {lang === "km"
                        ? "បានសិក្សាលម្អិតអំពីចំណាត់ថ្នាក់ទ្រព្យសម្បត្តិរដ្ឋ ការគ្រប់គ្រងវដ្តជីវិតទ្រព្យ ការចុះបញ្ជីសម្ភារ និងការតាមដានទីតាំងទ្រព្យសម្បត្តិ។"
                        : "Comprehensive field survey completed on state asset classification, lifecycle auditing, barcode/QR tracking, and inventory deprecation rules."}
                    </p>

                    <div className="space-y-3 mb-6 text-xs text-[var(--tx)]">
                      <div className="p-3 rounded-lg bg-[var(--panel2)] border border-[var(--pb)] flex items-center justify-between">
                        <span>{lang === "km" ? "ការកំណត់រចនាសម្ព័ន្ធបាកូដ / QR កូដ" : "Barcode & QR Tagging Model"}</span>
                        <span className="text-emerald-400 font-bold">{lang === "km" ? "បានសិក្សា" : "Mapped"}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--panel2)] border border-[var(--pb)] flex items-center justify-between">
                        <span>{lang === "km" ? "ការចុះហត្ថលេខាឯកភាពលើឯកសារតម្រូវការ" : "User Requirement Sign-off"}</span>
                        <span className="text-amber-400 font-bold">{lang === "km" ? "ជំហានបន្ទាប់" : "Next Step"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--pb)]">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-[var(--mu)]">{lang === "km" ? "វឌ្ឍភាព:" : "Progress:"}</span>
                      <span className="text-amber-400 text-lg">10%</span>
                    </div>
                    <div className="w-full bg-[var(--pb)] h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: "10%" }} />
                    </div>
                  </div>
                </div>

                {/* Component 1.4 */}
                <div className="glass-panel p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded bg-[var(--panel2)] text-[var(--cy)]">
                        1.4
                      </span>
                      <span className="text-xs px-3.5 py-1.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {lang === "km" ? "បានសិក្សាតម្រូវការ (១០%)" : "User Studied (10%)"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--tx)] mb-3">
                      {lang === "km"
                        ? "ប្រព័ន្ធគ្រប់គ្រងផែនការ ថវិកា និងការវាយតម្លៃ"
                        : "Planning, Budgeting, & Evaluation System"}
                    </h3>

                    <p className="text-sm text-[var(--mu)] leading-relaxed mb-6">
                      {lang === "km"
                        ? "បានប្រមូល និងចងក្រងតម្រូវការលើការរៀបចំផែនការសកម្មភាពប្រចាំឆ្នាំ ការបែងចែកថវិកា និងការតាមដានវាយតម្លៃលទ្ធផលការងារ (M&E)។"
                        : "Requirements mapped for annual work plans, budget disbursement tracking, project progress indicators, and quarterly performance evaluation."}
                    </p>

                    <div className="space-y-3 mb-6 text-xs text-[var(--tx)]">
                      <div className="p-3 rounded-lg bg-[var(--panel2)] border border-[var(--pb)] flex items-center justify-between">
                        <span>{lang === "km" ? "ក្របខ័ណ្ឌសូចនាករគន្លឹះ (KPI Framework)" : "Strategic KPI Matrix Definition"}</span>
                        <span className="text-emerald-400 font-bold">{lang === "km" ? "បានសិក្សា" : "Defined"}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--panel2)] border border-[var(--pb)] flex items-center justify-between">
                        <span>{lang === "km" ? "ការតភ្ជាប់ទៅនឹងតារាងគណនេយ្យថវិកា" : "Budget Ledger Interface Design"}</span>
                        <span className="text-amber-400 font-bold">{lang === "km" ? "ជំហានបន្ទាប់" : "Next Step"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--pb)]">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-[var(--mu)]">{lang === "km" ? "វឌ្ឍភាព:" : "Progress:"}</span>
                      <span className="text-amber-400 text-lg">10%</span>
                    </div>
                    <div className="w-full bg-[var(--pb)] h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: "10%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 8: COMPONENT 5 - DOCUMENT MANAGEMENT FOR GENERAL SECRETARIAT */}
          {currentSlide === 7 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)] mb-2">
                  {lang === "km" ? "សមាសភាគទី ៥ · អគ្គលេខាធិការដ្ឋាន" : "Component 05 · General Secretariat"}
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                    {lang === "km"
                      ? "១.៥. ប្រព័ន្ធគ្រប់គ្រងឯកសារសម្រាប់អគ្គលេខាធិការដ្ឋាន (៦០%)"
                      : "1.5. Document Management System (60% Setup Ready)"}
                  </h2>
                  <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-sm">
                    {lang === "km" ? "ការរៀបចំប្រព័ន្ធរួចរាល់" : "System Setup Ready"}
                  </div>
                </div>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ម៉ូឌុលទាំង ៣ នៃប្រព័ន្ធឯកសារត្រូវបានរៀបចំរួចរាល់ កំពុងត្រៀមធ្វើតេស្តសាកល្បងផ្ទៃក្នុង"
                    : "Three core modules for document entry, encrypted storage, and QR verification are configured."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {COMPONENTS_DATA[4].subtasks.map((task) => (
                  <div
                    key={task.id}
                    className="glass-panel p-6 flex flex-col justify-between border-2 border-[var(--pri)]/50 hover:border-[var(--pri)] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[var(--panel2)] text-[var(--cy)]">
                          {task.id}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {lang === "km" ? task.statusKm : task.statusEn}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--tx)] mb-3">
                        {lang === "km" ? task.titleKm : task.titleEn}
                      </h3>

                      <p className="text-sm text-[var(--mu)] leading-relaxed mb-6">
                        {lang === "km" ? task.notesKm : task.notesEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--pb)]">
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-[var(--mu)]">
                          {lang === "km" ? "ស្ថានភាពរៀបចំ:" : "Config Status:"}
                        </span>
                        <span className="text-emerald-400 text-sm">
                          {lang === "km" ? "រួចរាល់ (Ready)" : "Configured"}
                        </span>
                      </div>
                      <div className="w-full bg-[var(--pb)] h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: "60%" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security & Verification Callout */}
              <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-[var(--pri)] bg-[var(--pri)]/5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[var(--pri)] shrink-0" />
                  <div className="text-sm text-[var(--tx)]">
                    <b className="text-[var(--pri)]">
                      {lang === "km" ? "លក្ខណៈពិសេសសុវត្ថិភាព:" : "Security & Integrity:"}
                    </b>{" "}
                    {lang === "km"
                      ? "ប្រព័ន្ធផ្ទៀងផ្ទាត់ឯកសារតាម QR Code និងការរក្សាទុកទិន្នន័យមានការអ៊ិនគ្រីប (Encrypted) ជួយការពារការក្លែងបន្លំឯកសាររដ្ឋបាលផ្លូវការ។"
                      : "Includes encrypted document repositories, audit logging, and QR-based digital verification to ensure full authenticity of all official administrative decrees."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 9: PENDING ITEMS REVIEW (FOCUSED SLIDE) */}
          {currentSlide === 8 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--amb)] mb-2">
                  {lang === "km" ? "ចំណុចទី ១ · បញ្ជីការងារនៅសេសសល់" : "Agenda 01 · Pending Items Review"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "បញ្ជីការងារដែលនៅសេសសល់ និងតម្រូវការដោះស្រាយ (Pending Items)"
                    : "Comprehensive Review of Pending Milestones"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ការវិភាគលើចំណុចដែលទាមទារការសម្របសម្រួល និងការសម្រេចចិត្តដើម្បីរុញច្រានគម្រោងទៅមុខ"
                    : "Prioritizing items that require ministerial coordination, user sign-offs, or testing."}
                </p>
              </div>

              <div className="space-y-3.5 overflow-y-auto max-h-[560px] pr-2">
                {PENDING_ITEMS_SUMMARY.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel p-5 flex items-start justify-between gap-6 border-l-4 border-amber-400 hover:border-[var(--pri)] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="px-3 py-1.5 rounded-lg bg-[var(--panel2)] border border-[var(--pb)] text-xs font-mono font-bold text-[var(--cy)] shrink-0">
                        {item.component}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-bold text-[var(--tx)]">
                            {lang === "km" ? item.titleKm : item.titleEn}
                          </h4>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                            {lang === "km" ? item.impactKm : item.impactEn}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--mu)] leading-relaxed">
                          {lang === "km" ? item.detailKm : item.detailEn}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-xs font-bold text-amber-400 block mb-1">
                        {lang === "km" ? item.statusKm : item.statusEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 10: AGENDA POINT 2 - CHALLENGES & SUGGESTIONS */}
          {currentSlide === 9 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--amb)] mb-2">
                  {lang === "km" ? "របៀបវារៈទី ២ · បញ្ហាប្រឈម & សំណូមពរ" : "Agenda 02 · Challenges & Solutions"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "បញ្ហាប្រឈមចម្បង និងសំណូមពរដំណោះស្រាយ"
                    : "Key Operational Challenges & Proposed Mitigations"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ការកំណត់បញ្ហាច្បាស់លាស់ អមដោយវិធានការដោះស្រាយជាក់ស្តែងដើម្បីធានាការអនុវត្តទាន់ពេល"
                    : "Direct assessment of roadblocks paired with pragmatic, high-impact recommendations."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {CHALLENGES_DATA.map((ch) => (
                  <div
                    key={ch.id}
                    className="glass-panel p-6 flex flex-col justify-between border-t-4 border-[var(--amb)]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-[var(--amb)] opacity-70">
                          {ch.num}
                        </span>
                        <span className="text-[11px] px-2.5 py-1 rounded bg-[var(--panel2)] text-[var(--cy)] font-semibold">
                          {lang === "km" ? ch.categoryKm : ch.categoryEn}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[var(--tx)] mb-4">
                        {lang === "km" ? ch.titleKm : ch.titleEn}
                      </h3>

                      <div className="mb-4">
                        <div className="text-xs font-bold uppercase text-rose-400 mb-1 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{lang === "km" ? "បញ្ហាប្រឈម:" : "Challenge:"}</span>
                        </div>
                        <p className="text-xs text-[var(--mu)] leading-relaxed">
                          {lang === "km" ? ch.problemKm : ch.problemEn}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--pb)] bg-[var(--panel2)]/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                      <div className="text-xs font-bold uppercase text-emerald-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{lang === "km" ? "សំណូមពរដំណោះស្រាយ:" : "Proposed Mitigation:"}</span>
                      </div>
                      <p className="text-xs text-[var(--tx)] font-medium leading-relaxed">
                        {lang === "km" ? ch.solutionKm : ch.solutionEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 11: AGENDA POINT 3 - EXPECTED COMPLETION & TIMELINE */}
          {currentSlide === 10 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--cy)] mb-2">
                  {lang === "km" ? "របៀបវារៈទី ៣ · កាលវិភាគគម្រោង" : "Agenda 03 · Delivery Timeline"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "ការរំពឹងទុកនៃការបញ្ចប់គម្រោង និងកាលវិភាគតាមដំណាក់កាល"
                    : "Expected Completion & Phased Delivery Roadmap"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ផែនការមេពីត្រីមាសទី ៤ ឆ្នាំ២០២៦ រហូតដល់ការប្រគល់ប្រព័ន្ធពេញលេញនៅឆ្នាំ២០២៧"
                    : "From immediate wins to full multi-departmental rollout and formal handover."}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {TIMELINE_MILESTONES.map((phase, idx) => (
                  <div
                    key={phase.phase}
                    className={`glass-panel p-6 flex flex-col justify-between border-t-4 relative ${
                      phase.status === "done"
                        ? "border-emerald-400"
                        : phase.status === "current"
                        ? "border-[var(--pri)] bg-[var(--pri)]/5 shadow-lg shadow-[var(--pri)]/10"
                        : "border-[var(--pb)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[var(--cy)] uppercase tracking-wider">
                          {lang === "km" ? phase.phaseKm : phase.phase}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            phase.status === "done"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : phase.status === "current"
                              ? "bg-[var(--pri)]/20 text-[var(--pri)] animate-pulse"
                              : "bg-[var(--panel2)] text-[var(--mu)]"
                          }`}
                        >
                          {phase.status === "done"
                            ? lang === "km"
                              ? "សម្រេចបាន"
                              : "Completed"
                            : phase.status === "current"
                            ? lang === "km"
                              ? "កំពុងអនុវត្ត"
                              : "In Progress"
                            : lang === "km"
                            ? "ដំណាក់កាលបន្ទាប់"
                            : "Upcoming"}
                        </span>
                      </div>

                      <div className="text-[11px] text-[var(--mu)] font-mono mb-2">
                        {lang === "km" ? phase.timeframeKm : phase.timeframeEn}
                      </div>

                      <h3 className="text-lg font-bold text-[var(--tx)] mb-4">
                        {lang === "km" ? phase.titleKm : phase.titleEn}
                      </h3>

                      <ul className="space-y-2.5">
                        {(lang === "km" ? phase.bulletsKm : phase.bulletsEn).map(
                          (bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-xs text-[var(--mu)] flex items-start gap-2 leading-relaxed"
                            >
                              <span className="text-[var(--pri)] font-bold">›</span>
                              <span>{bullet}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[var(--pb)] mt-6 text-xs text-[var(--mu)] flex items-center justify-between">
                      <span>Milestone {idx + 1} of 4</span>
                      {phase.status === "done" && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 12: NEXT 30-DAY ACTION PLAN */}
          {currentSlide === 11 && (
            <div className="slide-content flex flex-col gap-6 h-full justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)] mb-2">
                  {lang === "km" ? "សេចក្តីសន្និដ្ឋាន & ជំហានបន្ទាប់" : "Conclusion & Next Steps"}
                </div>
                <h2 className="text-4xl font-extrabold text-[var(--tx)]">
                  {lang === "km"
                    ? "ផែនការសកម្មភាព ៣០ ថ្ងៃបន្ទាប់ (Next 30-Day Plan)"
                    : "Immediate 30-Day Action Plan"}
                </h2>
                <p className="text-base text-[var(--mu)] mt-1">
                  {lang === "km"
                    ? "ការងារអាទិភាពដើម្បីពន្លឿនការអនុវត្តគម្រោង និងការត្រៀមទទួលទិន្នន័យនាយកដ្ឋានផ្សេងទៀត"
                    : "Critical path activities to unblock pending items and ingest remaining departments."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="glass-panel p-6 border-l-4 border-[var(--pri)] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[var(--pri)] uppercase tracking-wider mb-2">
                      Priority 01 · Immediate
                    </div>
                    <h3 className="text-xl font-bold text-[var(--tx)] mb-3">
                      {lang === "km"
                        ? "១. បើកកិច្ចប្រជុំសម្របសម្រួលប្រាក់បៀវត្ស"
                        : "1. Convene Inter-Ministerial Payroll Working Group"}
                    </h3>
                    <p className="text-xs text-[var(--mu)] leading-relaxed mb-4">
                      {lang === "km"
                        ? "សហការជាមួយថ្នាក់ដឹកនាំ MME ដើម្បីរៀបចំកិច្ចប្រជុំបច្ចេកទេសជាមួយក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ ក្នុងការឯកភាពលើរូបមន្តប្រាក់បៀវត្ស។"
                        : "Coordinate with MME leadership to host a technical workshop with MEF focal points to finalize the automated payroll calculation schema."}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[var(--cy)]">
                    Target: Week 1 - 2
                  </div>
                </div>

                <div className="glass-panel p-6 border-l-4 border-emerald-400 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      Priority 02 · Rollout
                    </div>
                    <h3 className="text-xl font-bold text-[var(--tx)] mb-3">
                      {lang === "km"
                        ? "២. ធ្វើតេស្ត UAT បេសកកម្ម & ដាក់ប្រើ ១០០%"
                        : "2. Complete Mission Request UAT & Launch"}
                    </h3>
                    <p className="text-xs text-[var(--mu)] leading-relaxed mb-4">
                      {lang === "km"
                        ? "រៀបចំការធ្វើតេស្តជាក់ស្តែងលើប្រព័ន្ធស្នើសុំបេសកកម្ម (ដែលសម្រេចបាន ៦៥%) ជាមួយមន្ត្រីនាយកដ្ឋានទូទៅ និងដាក់ឱ្យប្រើប្រាស់ផ្លូវការ។"
                        : "Conduct user acceptance testing for the 65% completed mission request module and roll out to all department users."}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[var(--cy)]">
                    Target: Week 2 - 3
                  </div>
                </div>

                <div className="glass-panel p-6 border-l-4 border-amber-400 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                      Priority 03 · Expansion
                    </div>
                    <h3 className="text-xl font-bold text-[var(--tx)] mb-3">
                      {lang === "km"
                        ? "៣. ចាប់ផ្តើមប្រមូលទិន្នន័យនាយកដ្ឋានទី ២ & ៣"
                        : "3. Scope Intake for Departments 2 & 3"}
                    </h3>
                    <p className="text-xs text-[var(--mu)] leading-relaxed mb-4">
                      {lang === "km"
                        ? "ជួបប្រជុំជាមួយតំណាងនាយកដ្ឋានទាំង ២ ទៀត ដើម្បីកំណត់វិសាលភាព មុខងារស្នូល និងបញ្ចូលទិន្នន័យទៅក្នុងប្រព័ន្ធតាមដានវឌ្ឍភាពរួម។"
                        : "Hold intake sessions with focal persons from the remaining 2 departments to define requirements and plug data into the dashboard."}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[var(--cy)]">
                    Target: Week 3 - 4
                  </div>
                </div>
              </div>

              {/* Ready Commitment */}
              <div className="glass-panel p-5 flex items-center justify-between border border-[var(--pri)]/40 bg-[var(--pri)]/5">
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--panel)] border border-[var(--pb)] overflow-hidden shrink-0">
                    <Image
                      src="/logo/logo tab.svg"
                      alt="Logo"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--tx)]">
                      {lang === "km"
                        ? "ការប្តេជ្ញាចិត្តរបស់ក្រុមហ៊ុន អូន ផៅវ័រ ថេកណឡជី"
                        : "OONE Power Technology Delivery Commitment"}
                    </div>
                    <div className="text-xs text-[var(--mu)] mt-0.5">
                      {lang === "km"
                        ? "ក្រុមការងារបច្ចេកទេសត្រៀមខ្លួនជានិច្ចក្នុងការគាំទ្រ និងជំរុញឱ្យគ្រប់សមាសភាគទាំងអស់សម្រេចបានតាមផែនការកំណត់។"
                        : "Our dedicated technical squad is on standby to support MME stakeholders across all phases of digital implementation."}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => goToSlide(12)}
                  className="interactive px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--pri2)] to-[var(--pri)] text-white font-semibold text-xs shadow-md shadow-[var(--pri)]/20"
                >
                  {lang === "km" ? "បន្តទៅសំណួរ-ចម្លើយ" : "Go to Q&A"}
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 13: QUESTIONS & DISCUSSION */}
          {currentSlide === 12 && (
            <div className="slide-content flex flex-col items-center justify-center text-center gap-8 h-full">
              <div className="relative w-24 h-24 flex items-center justify-center rounded-3xl bg-[var(--panel)] border border-[var(--pb)] shadow-2xl overflow-hidden p-4">
                <Image
                  src="/logo/logo tab.svg"
                  alt="OONE Logo"
                  width={72}
                  height={72}
                  priority
                  className="object-contain"
                />
              </div>

              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--pri)]">
                  {lang === "km" ? "កិច្ចពិភាក្សា និងសំណួរ-ចម្លើយ" : "Open Discussion & Q&A"}
                </div>
                <h2 className="text-5xl font-black text-[var(--tx)]">
                  {lang === "km" ? "សូមអរគុណ" : "Thank You"}
                </h2>
                <div className="text-xl font-bold text-[var(--cy)]">
                  {lang === "km"
                    ? "ក្រសួងរ៉ែ និងថាមពល (MME)"
                    : "Ministry of Mines and Energy (MME)"}
                </div>
                <p className="text-sm text-[var(--mu)] leading-relaxed">
                  {lang === "km"
                    ? "រីករាយក្នុងការទទួលយកនូវមតិយោបល់ ការណែនាំបន្ថែម និងការឆ្លើយសំណួររបស់គណៈកម្មការបច្ចេកទេស និងថ្នាក់ដឹកនាំ។"
                    : "We welcome all guidance, inquiries, and collaboration points from MME leadership and technical committee."}
                </p>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <button
                  onClick={() => goToSlide(0)}
                  className="interactive px-6 py-3 rounded-xl bg-[var(--panel)] border border-[var(--pb)] hover:border-[var(--pri)] text-sm font-semibold text-[var(--tx)] transition-all"
                >
                  {lang === "km" ? "ត្រឡប់ទៅទំព័រដើម" : "Back to First Slide"}
                </button>
                <button
                  onClick={() => goToSlide(1)}
                  className="interactive px-6 py-3 rounded-xl bg-[var(--panel)] border border-[var(--pb)] hover:border-[var(--pri)] text-sm font-semibold text-[var(--tx)] transition-all"
                >
                  {lang === "km" ? "ពិនិត្យរបៀបវារៈឡើងវិញ" : "Review Agenda"}
                </button>
              </div>

              <div className="pt-8 border-t border-[var(--pb)] w-full max-w-xl flex items-center justify-between text-xs text-[var(--mu)]">
                <div>
                  <span className="block text-[var(--tx)] font-semibold">
                    {lang === "km" ? PRESENTATION_META.companyKm : PRESENTATION_META.companyEn}
                  </span>
                  <span>Phnom Penh, Kingdom of Cambodia</span>
                </div>
                <div className="text-right">
                  <span className="block text-[var(--tx)] font-semibold">
                    {lang === "km" ? PRESENTATION_META.dateKm : PRESENTATION_META.dateEn}
                  </span>
                  <span>Progress Report Deck v1.0</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Global Slide Footer (Slide Index & Bottom Progress Line) */}
        <footer className="relative z-10 pt-4 flex items-center justify-between border-t border-[var(--pb)] text-xs text-[var(--mu)]">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-[var(--tx)]">
              {String(currentSlide + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
            </span>
            <span>·</span>
            <span className="font-medium">
              {lang === "km"
                ? slideTitles[currentSlide].km
                : slideTitles[currentSlide].en}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[11px] text-[var(--mu)]">
              {lang === "km"
                ? "ប្រើសញ្ញាព្រួញ ← → ឬចុចលើស្លាយដើម្បីប្តូរ"
                : "Use ← → arrows or click sides to navigate"}
            </span>
            <div className="w-32 bg-[var(--pb)] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--pri2)] to-[var(--pri)] transition-all duration-300"
                style={{
                  width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%`,
                }}
              />
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Presenter Control Bar (Hover & Fixed) */}
      <div className="fixed bottom-6 z-50 flex items-center gap-2 p-2 rounded-2xl glass-panel shadow-2xl border border-[var(--pb)] bg-[var(--panel)]/90 backdrop-blur-md">
        {/* Previous Slide */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          title={lang === "km" ? "ស្លាយមុន (←)" : "Previous Slide (←)"}
          className="interactive p-2.5 rounded-xl hover:bg-[var(--panel2)] text-[var(--tx)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Counter / Direct Input */}
        <div className="px-3 py-1 font-mono text-xs font-bold text-[var(--tx)] flex items-center gap-1">
          <span>{currentSlide + 1}</span>
          <span className="text-[var(--mu)]">/</span>
          <span className="text-[var(--mu)]">{TOTAL_SLIDES}</span>
        </div>

        {/* Next Slide */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          title={lang === "km" ? "ស្លាយបន្ទាប់ (→ / Space)" : "Next Slide (→ / Space)"}
          className="interactive p-2.5 rounded-xl hover:bg-[var(--panel2)] text-[var(--tx)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-[var(--pb)] mx-1" />

        {/* Language Switcher (EN / ខ្មែរ) */}
        <button
          onClick={toggleLanguage}
          title={
            lang === "km"
              ? "ប្តូរទៅភាសាអង់គ្លេស (Switch to English) [ចុច L]"
              : "ប្តូរទៅភាសាខ្មែរ (Switch to Khmer) [Press L]"
          }
          className="interactive flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--panel2)] hover:border-[var(--pri)] border border-[var(--pb)] text-xs font-bold transition-all text-[var(--tx)]"
        >
          <Globe className="w-4 h-4 text-[var(--pri)]" />
          <span>{lang === "km" ? "ខ្មែរ (KM)" : "English (EN)"}</span>
        </button>

        {/* Theme Toggle (Dark / Light) */}
        <button
          onClick={toggleTheme}
          title={
            theme === "dark"
              ? "ប្តូរទៅពណ៌ភ្លឺ (Light Mode) [ចុច T]"
              : "ប្តូរទៅពណ៌ងងឹត (Dark Mode) [Press T]"
          }
          className="interactive p-2.5 rounded-xl hover:bg-[var(--panel2)] text-[var(--tx)] transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[var(--pri)]" />
          )}
        </button>

        {/* Slide Overview Grid Modal */}
        <button
          onClick={() => setShowGrid((prev) => !prev)}
          title={lang === "km" ? "មើលបញ្ជីស្លាយទាំងអស់ [ចុច G]" : "Slide Overview Grid [Press G]"}
          className={`interactive p-2.5 rounded-xl text-[var(--tx)] transition-colors ${
            showGrid ? "bg-[var(--pri)] text-white" : "hover:bg-[var(--panel2)]"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title={lang === "km" ? "ពេញអេក្រង់ [ចុច F]" : "Toggle Fullscreen [Press F]"}
          className="interactive p-2.5 rounded-xl hover:bg-[var(--panel2)] text-[var(--tx)] transition-colors"
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4" />
          ) : (
            <Maximize className="w-4 h-4" />
          )}
        </button>

        {/* Print / PDF Button */}
        <button
          onClick={() => window.print()}
          title={lang === "km" ? "បោះពុម្ព ឬទាញយក PDF [ចុច P]" : "Print / PDF Export [Press P]"}
          className="interactive p-2.5 rounded-xl hover:bg-[var(--panel2)] text-[var(--tx)] transition-colors"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Overview Grid Modal */}
      {showGrid && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-12 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setShowGrid(false)}
        >
          <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto w-full">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {lang === "km" ? "បញ្ជីស្លាយទាំងអស់ (Slide Grid)" : "Slide Deck Overview"}
              </h3>
              <p className="text-sm text-zinc-400">
                {lang === "km"
                  ? "ចុចលើស្លាយណាមួយដើម្បីលោតទៅកាន់ស្លាយនោះភ្លាមៗ (ចុច Esc ដើម្បីបិទ)"
                  : "Click any thumbnail to jump to that slide (Press Esc to close)"}
              </p>
            </div>
            <button
              onClick={() => setShowGrid(false)}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700"
            >
              {lang === "km" ? "បិទ (Close)" : "Close"}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
            {slideTitles.map((title, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                  setShowGrid(false);
                }}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-44 ${
                  currentSlide === idx
                    ? "border-[var(--pri)] bg-[var(--pri)]/20 shadow-lg shadow-[var(--pri)]/25"
                    : "border-zinc-800 bg-zinc-900/90 hover:border-zinc-600 hover:scale-[1.02]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[var(--pri)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {currentSlide === idx && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--pri)] text-white font-bold">
                      Current
                    </span>
                  )}
                </div>

                <div className="text-base font-bold text-white leading-snug">
                  {lang === "km" ? title.km : title.en}
                </div>

                <div className="text-xs text-zinc-400">
                  Slide {idx + 1} of {TOTAL_SLIDES}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
