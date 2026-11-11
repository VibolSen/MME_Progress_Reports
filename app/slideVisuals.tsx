/**
 * Author: Antigravity AI Agent
 * Date: 2026-11-11
 * Task: TASK-003: Fancy Slide Deck Visuals & Animations
 */

"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  Calendar,
  FileCheck,
  QrCode,
  Lock,
  Workflow,
} from "lucide-react";

interface VisualProps {
  lang: "km" | "en";
  theme: "dark" | "light";
}

/**
 * Slide 1 Visual: Hero 3D Isometric Digital Transformation Hub
 */
export function HeroHubVisual({ lang }: VisualProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
      {/* Decorative Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-amber-500/10 rounded-3xl blur-2xl" />

      {/* Main Glass Stage */}
      <div className="relative z-10 w-full max-w-[660px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Top Header Card */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Image
                src="/logo/logo tab.svg"
                alt="MME Emblem"
                width={36}
                height={36}
                priority
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                  {lang === "km" ? "ប្រព័ន្ធឌីជីថលស្ថាប័នស្នូល" : "Core Enterprise Platform"}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {lang === "km" ? "ក្រសួងរ៉ែ និងថាមពល (MME)" : "Ministry of Mines & Energy"}
              </h3>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {lang === "km" ? "ដំណើរការបន្តផ្ទាល់" : "Live & Active"}
          </span>
        </div>

        {/* Central 3-Node Interactive Diagram */}
        <div className="py-6 grid grid-cols-3 gap-4">
          {/* Card 1: Operations */}
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col items-center text-center group hover:border-indigo-400 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 size={24} />
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-1">
              DEP-01
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-2">
              {lang === "km" ? "នាយកដ្ឋានទូទៅ" : "General Dept"}
            </h4>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold">
              100% Data Ready
            </span>
          </div>

          {/* Card 2: Upcoming 2 */}
          <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center text-center opacity-75">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Clock size={24} />
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 mb-1">
              DEP-02
            </span>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight mb-2">
              {lang === "km" ? "នាយកដ្ឋានទី ២" : "Department 2"}
            </h4>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold">
              In Pipeline
            </span>
          </div>

          {/* Card 3: Upcoming 3 */}
          <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center text-center opacity-75">
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
              <Clock size={24} />
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 mb-1">
              DEP-03
            </span>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight mb-2">
              {lang === "km" ? "នាយកដ្ឋានទី ៣" : "Department 3"}
            </h4>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-bold">
              In Pipeline
            </span>
          </div>
        </div>

        {/* Bottom Feature Indicator */}
        <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <ShieldCheck size={16} className="text-indigo-500" />
            <span>
              {lang === "km"
                ? "ស្ថាបត្យកម្មឌីជីថលសុវត្ថិភាពខ្ពស់"
                : "Enterprise Role-Based Security"}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">
            <span>OONE POWER TECH</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Slide 3 Visual: Interactive Multi-Department Network Radar Map
 */
export function DepartmentNetworkMap({ lang }: VisualProps) {
  return (
    <div className="relative w-full h-[520px] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full max-w-[800px] max-h-[500px]"
        fill="none"
      >
        {/* Animated Grid Circles */}
        <circle cx="400" cy="250" r="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" className="text-slate-200 dark:text-slate-800 animate-spin-slow" />
        <circle cx="400" cy="250" r="140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" className="text-indigo-200 dark:text-indigo-900/60" />
        <circle cx="400" cy="250" r="60" fill="currentColor" className="text-indigo-50 dark:text-indigo-950/40" />

        {/* Connection Lines from Center to 3 Departments */}
        {/* Line to General Dept (Left Top) */}
        <path d="M 400 250 L 160 140" stroke="url(#lineGradientActive)" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
        {/* Line to Dept 2 (Right Top) */}
        <path d="M 400 250 L 640 140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
        {/* Line to Dept 3 (Bottom Center) */}
        <path d="M 400 250 L 400 420" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />

        {/* Center Node: MME Core Platform */}
        <g transform="translate(400, 250)">
          <circle r="46" fill="#4F46E5" filter="drop-shadow(0 10px 20px rgba(79, 70, 229, 0.35))" />
          <circle r="52" stroke="#818CF8" strokeWidth="2" opacity="0.6" className="animate-ping" />
          <text y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">MME HUB</text>
          <text y="12" textAnchor="middle" fill="#E0E7FF" fontSize="10" fontWeight="600" fontFamily="sans-serif">Central System</text>
        </g>

        {/* Node 1: General Department (Active) */}
        <g transform="translate(160, 140)">
          <rect x="-110" y="-55" width="220" height="110" rx="20" fill="currentColor" className="text-white dark:text-slate-900" stroke="#10B981" strokeWidth="2.5" filter="drop-shadow(0 12px 28px rgba(16, 185, 129, 0.2))" />
          <circle cx="-80" cy="-25" r="8" fill="#10B981" />
          <text x="-65" y="-20" fill="#10B981" fontSize="11" fontWeight="800" fontFamily="sans-serif">ACTIVE · 100% READY</text>
          <text x="-80" y="8" fill="currentColor" className="text-slate-900 dark:text-white" fontSize="15" fontWeight="700" fontFamily="sans-serif">
            {lang === "km" ? "នាយកដ្ឋានទូទៅ" : "General Department"}
          </text>
          <text x="-80" y="30" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontSize="11" fontFamily="sans-serif">
            {lang === "km" ? "៥ សមាសភាគបានសិក្សា" : "5 Core Components"}
          </text>
        </g>

        {/* Node 2: Department 2 (Pipeline) */}
        <g transform="translate(640, 140)">
          <rect x="-110" y="-55" width="220" height="110" rx="20" fill="currentColor" className="text-white/90 dark:text-slate-900/90" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 4" filter="drop-shadow(0 8px 20px rgba(0,0,0,0.06))" />
          <circle cx="-80" cy="-25" r="8" fill="#F59E0B" />
          <text x="-65" y="-20" fill="#F59E0B" fontSize="11" fontWeight="800" fontFamily="sans-serif">IN PIPELINE</text>
          <text x="-80" y="8" fill="currentColor" className="text-slate-700 dark:text-slate-200" fontSize="15" fontWeight="700" fontFamily="sans-serif">
            {lang === "km" ? "នាយកដ្ឋានទី ២" : "Department 2"}
          </text>
          <text x="-80" y="30" fill="currentColor" className="text-slate-400" fontSize="11" fontFamily="sans-serif">
            {lang === "km" ? "រង់ចាំការប្រមូលទិន្នន័យ" : "Awaiting Data Intake"}
          </text>
        </g>

        {/* Node 3: Department 3 (Pipeline) */}
        <g transform="translate(400, 420)">
          <rect x="-110" y="-45" width="220" height="90" rx="20" fill="currentColor" className="text-white/90 dark:text-slate-900/90" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="6 4" filter="drop-shadow(0 8px 20px rgba(0,0,0,0.06))" />
          <circle cx="-80" cy="-18" r="8" fill="#0EA5E9" />
          <text x="-65" y="-13" fill="#0EA5E9" fontSize="11" fontWeight="800" fontFamily="sans-serif">NEXT STAGE</text>
          <text x="-80" y="12" fill="currentColor" className="text-slate-700 dark:text-slate-200" fontSize="15" fontWeight="700" fontFamily="sans-serif">
            {lang === "km" ? "នាយកដ្ឋានទី ៣" : "Department 3"}
          </text>
        </g>

        <defs>
          <linearGradient id="lineGradientActive" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Slide 4 Visual: Meeting Room & Facilities Mockup Display
 */
export function MeetingRoomVisual({ lang }: VisualProps) {
  return (
    <div className="relative w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === "km" ? "ប្រព័ន្ធកក់បន្ទប់ប្រជុំ MME (១០០% Live)" : "Meeting Room System (100% Live)"}
            </h4>
            <p className="text-xs text-slate-500">
              {lang === "km" ? "ភ្ជាប់ជាមួយប្រតិទិនរដ្ឋបាលស្វ័យប្រវត្តិ" : "Auto-synced with ministerial calendars"}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-mono text-xs font-bold border border-emerald-200">
          OFFICIALLY LAUNCHED
        </span>
      </div>

      {/* Room Cards Showcase */}
      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-white dark:from-slate-800/80 dark:to-slate-800/40 border border-indigo-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">ROOM A1</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">In Use</span>
          </div>
          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {lang === "km" ? "សាលប្រជុំធំ (VIP Hall)" : "Executive VIP Hall"}
          </h5>
          <p className="text-xs text-slate-500 mt-1">
            {lang === "km" ? "ចំណុះ៖ ៥០ នាក់ · បំពាក់ Smart TV & VDO Conference" : "Capacity: 50 · Smart TV & Video Conf"}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white dark:from-slate-800/80 dark:to-slate-800/40 border border-emerald-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">ROOM B2</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">Available</span>
          </div>
          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {lang === "km" ? "បន្ទប់ប្រជុំបច្ចេកទេស" : "Technical Meeting Room"}
          </h5>
          <p className="text-xs text-slate-500 mt-1">
            {lang === "km" ? "ចំណុះ៖ ១៥ នាក់ · ប្រព័ន្ធកក់តាមទូរស័ព្ទដៃ" : "Capacity: 15 · Mobile Instant Booking"}
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <span className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          {lang === "km" ? "បានដាក់ឱ្យមន្ត្រីគ្រប់នាយកដ្ឋានប្រើប្រាស់ជាក់ស្តែង" : "Deployed across all departmental staff"}
        </span>
        <span className="font-bold text-indigo-600 dark:text-indigo-400">100% OPERATIONAL</span>
      </div>
    </div>
  );
}

/**
 * Slide 5 Visual: Mission Request & Payroll Inter-Ministerial Flow
 */
export function MissionPayrollFlow({ lang }: VisualProps) {
  return (
    <div className="relative w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Mission Request (Ready) */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-indigo-950">
          <div className="flex items-center justify-between mb-4">
            <span className="chip pri text-xs">
              <Workflow size={14} />
              {lang === "km" ? "១.២.១ ស្នើសុំបេសកកម្ម" : "1.2.1 Mission Workflow"}
            </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">65% READY</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">1</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {lang === "km" ? "ស្នើសុំតាមអេឡិចត្រូនិក" : "Electronic Request Form"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">2</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {lang === "km" ? "ការពិនិត្យ & ចុះហត្ថលេខាឌីជីថល" : "Review & E-Signature"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">3</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {lang === "km" ? "ការទូទាត់ប្រាក់បេសកកម្មស្វ័យប្រវត្តិ" : "Auto Allowance Disbursement"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Payroll Integration (Pending Study) */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-100 dark:border-amber-950">
          <div className="flex items-center justify-between mb-4">
            <span className="chip amb text-xs">
              <Lock size={14} />
              {lang === "km" ? "១.២.២ ប្រព័ន្ធប្រាក់បៀវត្ស" : "1.2.2 Payroll Sync"}
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">PENDING MEF</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {lang === "km" ? "ទម្រង់កាតាបៀវត្ស MEF" : "MEF Payroll Slip Standard"}
              </span>
              <span className="text-amber-500 font-bold">Needs Review</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {lang === "km" ? "ការតភ្ជាប់ប្រព័ន្ធធនាគារ" : "Banking Gateway Feed"}
              </span>
              <span className="text-amber-500 font-bold">Pending Session</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {lang === "km" ? "ការទូទាត់ពន្ធ និងវិភាគទាន" : "Tax & Pension Logic"}
              </span>
              <span className="text-amber-500 font-bold">Coordinating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Slide 6 Visual: QR Code Asset Scanner & Budget Ledger Visual
 */
export function AssetBudgetVisual({ lang }: VisualProps) {
  return (
    <div className="relative w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="grid grid-cols-2 gap-6">
        {/* QR Asset Scanning Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
          <div className="relative w-28 h-28 p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-400 shadow-md flex items-center justify-center mb-3">
            <QrCode size={72} className="text-indigo-600 dark:text-indigo-400" />
            <div className="absolute inset-x-2 top-1/2 h-0.5 bg-red-500 animate-pulse" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            {lang === "km" ? "ការគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ (QR/Barcode)" : "State Asset Tagging System"}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {lang === "km"
              ? "ស្កេនពិនិត្យទីតាំង កាលបរិច្ឆេទថែទាំ និងការរំលស់ទ្រព្យសម្បត្តិរដ្ឋតាមកូដស្តង់ដារ"
              : "Track asset lifecycle, location, and depreciation via ministerial QR codes"}
          </p>
        </div>

        {/* Budget Planning Ledger Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                BUDGET & KPIs
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-700 font-bold">
                UAT Ready
              </span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
              {lang === "km" ? "ផែនការ ថវិកា និងការតាមដានត្រួតពិនិត្យ" : "Planning, Budgeting & KPIs"}
            </h4>
            <div className="space-y-2 mt-3">
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full w-[65%]" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>{lang === "km" ? "អនុវត្តថវិកា" : "Budget Execution"}</span>
                <span className="font-bold text-indigo-600">65% Completed</span>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>{lang === "km" ? "សូចនាករយុទ្ធសាស្ត្រ" : "Strategic KPIs"}</span>
            <span className="font-bold text-emerald-600">AUDIT READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Slide 7 Visual: Digital Secretariat Document Vault
 */
export function SecretariatVaultVisual({ lang }: VisualProps) {
  return (
    <div className="relative w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
            <FileCheck size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === "km" ? "ឃ្លាំងឯកសារឌីជីថលអគ្គលេខាធិការដ្ឋាន" : "Secretariat Document Vault"}
            </h4>
            <p className="text-xs text-slate-500">
              {lang === "km" ? "គ្រប់គ្រងលិខិតចូល-ចេញ និងកាលប្បវត្តិ (៦០% រួចរាល់)" : "Inbound/outbound dispatch & archiving (60% Ready)"}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-mono text-xs font-bold border border-indigo-200">
          SECURE STORAGE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 my-5">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-mono font-bold text-indigo-500">MODULE 1.5.1</span>
          <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-1">
            {lang === "km" ? "លិខិតចូល-ចេញ" : "Inbound / Outbound"}
          </h5>
          <p className="text-xs text-slate-500 leading-relaxed">
            {lang === "km" ? "បង្កើតលេខកូដស្វ័យប្រវត្តិ និងតាមដានដំណើរការលិខិត" : "Automated dispatch numbering"}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-mono font-bold text-sky-500">MODULE 1.5.2</span>
          <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-1">
            {lang === "km" ? "ផ្ទុកឯកសារផ្ទៃក្នុង" : "Encrypted Archiving"}
          </h5>
          <p className="text-xs text-slate-500 leading-relaxed">
            {lang === "km" ? "រក្សាទុកឯកសារសំខាន់ៗប្រកបដោយសុវត្ថិភាព" : "Hierarchical permission-based vault"}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-mono font-bold text-emerald-500">MODULE 1.5.3</span>
          <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-1">
            {lang === "km" ? "ផ្ទៀងផ្ទាត់ឯកសារ" : "QR Verification"}
          </h5>
          <p className="text-xs text-slate-500 leading-relaxed">
            {lang === "km" ? "បញ្ជាក់ភាពត្រឹមត្រូវតាម QR Code Certificate" : "Tamper-proof digital stamps"}
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200">
        <span className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-indigo-600" />
          {lang === "km" ? "ត្រៀមដាក់ឱ្យសាកល្បង និងបណ្តុះបណ្តាលមន្ត្រីក្នុងត្រីមាសបន្ទាប់" : "Pilot testing and staff onboarding scheduled for next phase"}
        </span>
        <span className="font-mono font-bold">Q2-Q3 2026</span>
      </div>
    </div>
  );
}

/**
 * Slide 12 Visual: Power Transmission Waves & Royal Cambodian Skyline
 */
export function RoyalTransmissionVisual() {
  return (
    <svg className="w-full h-full" viewBox="0 0 1920 420" preserveAspectRatio="none" aria-hidden="true">
      {/* Power Tower Silhouettes */}
      <g stroke="currentColor" className="text-slate-300 dark:text-slate-800" strokeWidth="2" fill="none">
        <path d="M300 420 L340 120 L380 420 M310 340 H370 M318 260 H362 M326 190 H354 M280 150 H400" />
        <path d="M960 420 L1000 100 L1040 420 M970 340 H1030 M978 260 H1022 M986 180 H1014 M940 130 H1060" />
        <path d="M1620 420 L1660 120 L1700 420 M1630 340 H1690 M1638 260 H1682 M1646 190 H1674 M1600 150 H1720" />
      </g>
      {/* Static Wave Lines */}
      <path d="M-20 170 Q 140 230 280 150 Q 620 260 940 130 Q 1290 260 1600 150 Q 1770 230 1940 170" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="2" />
      <path d="M-20 190 Q 160 250 400 150 Q 680 270 1060 130 Q 1340 270 1720 150 Q 1840 210 1940 190" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="2" />
      {/* Animated Glowing Electric Stream Waves */}
      <path d="M-20 170 Q 140 230 280 150 Q 620 260 940 130 Q 1290 260 1600 150 Q 1770 230 1940 170" fill="none" stroke="#6366F1" strokeWidth="3.5" strokeDasharray="120 1800" className="animate-pldash" />
      <path d="M-20 190 Q 160 250 400 150 Q 680 270 1060 130 Q 1340 270 1720 150 Q 1840 210 1940 190" fill="none" stroke="#0EA5E9" strokeWidth="3" strokeDasharray="100 1900" style={{ animationDelay: "-2.5s" }} className="animate-pldash" />
    </svg>
  );
}

export interface SlideFooterProps {
  lang: "km" | "en";
  slideNumber: number;
  totalSlides: number;
}

/**
 * In-Slide Executive Presentation Footer Strip
 */
export function SlideFooter({ lang, slideNumber, totalSlides }: SlideFooterProps) {
  const formattedNum = slideNumber < 10 ? `0${slideNumber}` : `${slideNumber}`;
  const formattedTotal = totalSlides < 10 ? `0${totalSlides}` : `${totalSlides}`;

  return (
    <footer className="slide-footer" aria-label="Slide footer">
      <div className="sf-left">
        <span className="sf-emblem">
          <Image
            src="/logo/logo tab.svg"
            alt="MME Emblem"
            width={24}
            height={24}
            className="object-contain"
          />
        </span>
        <span className="sf-ministry">
          {lang === "km"
            ? "ក្រសួងរ៉ែ និងថាមពល (MME) · រាជរដ្ឋាភិបាលកម្ពុជា"
            : "Ministry of Mines and Energy (MME) · Royal Government of Cambodia"}
        </span>
      </div>

      <div className="sf-center">
        <span className="sf-dot" />
        <Image
          src="/logo/Oone logo.svg"
          alt="OONE Power Logo"
          width={58}
          height={24}
          className="object-contain"
        />
        <span>
          {lang === "km"
            ? "គម្រោងបរិវត្តកម្មឌីជីថល MME · អនុវត្តដោយ OONE Power Technology"
            : "MME Digital Transformation · OONE Power Technology Co., Ltd"}
        </span>
      </div>

      <div className="sf-right">
        <span className="sf-meta">
          {lang === "km" ? "វិច្ឆិកា ២០២៦ · ឯកសារផ្លូវការ" : "Nov 2026 · Official Briefing"}
        </span>
        <span className="sf-page">
          {lang === "km"
            ? `ស្លាយ ${formattedNum} / ${formattedTotal}`
            : `Slide ${formattedNum} / ${formattedTotal}`}
        </span>
      </div>
    </footer>
  );
}

