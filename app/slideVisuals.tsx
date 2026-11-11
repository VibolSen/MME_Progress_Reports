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
  Calendar,
  FileCheck,
  QrCode,
  Lock,
  Workflow,
  Check,
  ArrowUpRight,
} from "lucide-react";

interface VisualProps {
  lang: "km" | "en";
  theme: "dark" | "light";
}

/**
 * Slide 1 Visual: Direct MME Public Service Portal Image (No Back Card)
 */
export function HeroHubVisual() {
  return (
    <div className="hero-img-wrap">
      <Image
        src="/1.png"
        alt="Ministry of Mines and Energy Public Service Portal"
        width={960}
        height={540}
        priority
        className="hero-img-direct"
      />
    </div>
  );
}

/**
 * Slide 3 Visual: Interactive Multi-Department Network Radar Map
 */
export function DepartmentNetworkMap({ lang }: VisualProps) {
  return (
    <div className="visual-inner-fill">
      <svg
        viewBox="0 0 760 460"
        className="vp-svg"
        fill="none"
      >
        {/* Radar Rings */}
        <circle
          cx="380"
          cy="230"
          r="195"
          stroke="var(--pb-strong)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle
          cx="380"
          cy="230"
          r="125"
          stroke="var(--pri)"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle
          cx="380"
          cy="230"
          r="58"
          fill="var(--glow)"
        />

        {/* Connection Lines */}
        <path
          d="M 380 230 L 165 120"
          stroke="var(--grn)"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <path
          d="M 380 230 L 595 120"
          stroke="var(--amb)"
          strokeWidth="2.5"
          strokeDasharray="5 5"
        />
        <path
          d="M 380 230 L 380 390"
          stroke="var(--cy)"
          strokeWidth="2.5"
          strokeDasharray="5 5"
        />

        {/* Center Node: MME Core Platform */}
        <g transform="translate(380, 230)">
          <circle r="44" fill="var(--pri)" />
          <circle r="52" stroke="var(--pri)" strokeWidth="2" strokeOpacity="0.4" />
          <text
            y="-6"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="800"
          >
            MME HUB
          </text>
          <text
            y="12"
            textAnchor="middle"
            fill="#E0E7FF"
            fontSize="10"
            fontWeight="600"
          >
            Core Platform
          </text>
        </g>

        {/* Node 1: General Department (Active) */}
        <g transform="translate(165, 120)">
          <rect
            x="-125"
            y="-52"
            width="250"
            height="104"
            rx="18"
            fill="var(--panel2)"
            stroke="var(--grn)"
            strokeWidth="2.5"
          />
          <circle cx="-95" cy="-22" r="7" fill="var(--grn)" />
          <text
            x="-80"
            y="-18"
            fill="var(--grn)"
            fontSize="11"
            fontWeight="800"
          >
            ACTIVE · 100% DATA READY
          </text>
          <text
            x="-95"
            y="8"
            fill="var(--tx)"
            fontSize="15"
            fontWeight="700"
          >
            {lang === "km" ? "នាយកដ្ឋានទូទៅ" : "General Department"}
          </text>
          <text
            x="-95"
            y="30"
            fill="var(--mu)"
            fontSize="12"
          >
            {lang === "km" ? "៥ សមាសភាគបានសិក្សាពេញលេញ" : "5 Core Components Studied"}
          </text>
        </g>

        {/* Node 2: Department 2 (Pipeline) */}
        <g transform="translate(595, 120)">
          <rect
            x="-125"
            y="-52"
            width="250"
            height="104"
            rx="18"
            fill="var(--panel2)"
            stroke="var(--amb)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <circle cx="-95" cy="-22" r="7" fill="var(--amb)" />
          <text
            x="-80"
            y="-18"
            fill="var(--amb)"
            fontSize="11"
            fontWeight="800"
          >
            IN PIPELINE · PHASE 2
          </text>
          <text
            x="-95"
            y="8"
            fill="var(--tx)"
            fontSize="15"
            fontWeight="700"
          >
            {lang === "km" ? "នាយកដ្ឋានទី ២" : "Department 2"}
          </text>
          <text
            x="-95"
            y="30"
            fill="var(--mu)"
            fontSize="12"
          >
            {lang === "km" ? "កំពុងរៀបចំប្រមូលទិន្នន័យ" : "Preparing Data Intake"}
          </text>
        </g>

        {/* Node 3: Department 3 (Pipeline) */}
        <g transform="translate(380, 390)">
          <rect
            x="-135"
            y="-44"
            width="270"
            height="88"
            rx="18"
            fill="var(--panel2)"
            stroke="var(--cy)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <circle cx="-105" cy="-14" r="7" fill="var(--cy)" />
          <text
            x="-90"
            y="-10"
            fill="var(--cy)"
            fontSize="11"
            fontWeight="800"
          >
            UPCOMING · PHASE 3
          </text>
          <text
            x="-105"
            y="16"
            fill="var(--tx)"
            fontSize="15"
            fontWeight="700"
          >
            {lang === "km" ? "នាយកដ្ឋានទី ៣ (ត្រៀមបន្ត)" : "Department 3 (Upcoming)"}
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Slide 4 Visual: Meeting Room & Facilities Mockup Display
 */
export function MeetingRoomVisual({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-banner grn">
        <div className="vs-banner-left">
          <div className="ic grn">
            <Calendar size={24} />
          </div>
          <div>
            <h4>
              {lang === "km"
                ? "ប្រព័ន្ធកក់បន្ទប់ប្រជុំ MME (១០០% Live)"
                : "Meeting Room Booking System (100% Live)"}
            </h4>
            <p>
              {lang === "km"
                ? "ដាក់ឱ្យដំណើរការជាផ្លូវការ និងភ្ជាប់ប្រតិទិនរដ្ឋបាលស្វ័យប្រវត្តិ"
                : "Officially launched & synced with ministerial calendars"}
            </p>
          </div>
        </div>
        <span className="chip grn">LIVE 100%</span>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code pri">ROOM A-01 · VIP</span>
            <span className="vs-status grn">
              <Check size={12} /> Active
            </span>
          </div>
          <h5>
            {lang === "km"
              ? "សាលប្រជុំធំថ្នាក់ដឹកនាំ (VIP Hall)"
              : "Executive Leadership Hall"}
          </h5>
          <p>
            {lang === "km"
              ? "ចំណុះ ៥០ នាក់ · បំពាក់ប្រព័ន្ធ Smart Conferencing"
              : "Capacity: 50 pax · Smart Conferencing Ready"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code cy">ROOM B-02 · TECH</span>
            <span className="vs-status cy">Available</span>
          </div>
          <h5>
            {lang === "km"
              ? "បន្ទប់ប្រជុំបច្ចេកទេសអន្តរនាយកដ្ឋាន"
              : "Inter-Department Technical Room"}
          </h5>
          <p>
            {lang === "km"
              ? "ចំណុះ ២០ នាក់ · កក់ភ្លាមៗតាមទូរស័ព្ទដៃ និងកុំព្យូទ័រ"
              : "Capacity: 20 pax · Instant Web & Mobile Booking"}
          </p>
        </div>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code amb">MODULE 1.1.1</span>
            <span className="vs-status amb">Policy Setup</span>
          </div>
          <h5>
            {lang === "km"
              ? "ការស្នើសុំសម្ភារៈផ្គត់ផ្គង់រដ្ឋបាល"
              : "Office Supply Requisition"}
          </h5>
          <p>
            {lang === "km"
              ? "សិក្សាលំហូរការងាររួចរាល់ · រង់ចាំគោលការណ៍អនុម័តរួម"
              : "Workflow studied · Awaiting standard policy approval"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">DASHBOARD</span>
            <span className="vs-status grn">Real-Time</span>
          </div>
          <h5>
            {lang === "km"
              ? "របាយការណ៍តាមដានការប្រើប្រាស់បន្ទប់ប្រជុំ"
              : "Room Utilization Analytics"}
          </h5>
          <p>
            {lang === "km"
              ? "កាត់បន្ថយការជាន់ម៉ោងប្រជុំ និងបង្កើនប្រសិទ្ធភាពការងារ"
              : "Eliminates scheduling conflicts across departments"}
          </p>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <CheckCircle2 size={18} className="vp-icon-grn" />
          {lang === "km"
            ? "មន្ត្រីគ្រប់នាយកដ្ឋានអាចចូលប្រើប្រាស់ប្រព័ន្ធកក់បន្ទប់ប្រជុំបានភ្លាមៗ"
            : "All departmental staff have active access to the room booking portal"}
        </span>
        <span className="vs-mono-badge grn">PRODUCTION READY</span>
      </div>
    </div>
  );
}

/**
 * Slide 5 Visual: Mission Request & Payroll Inter-Ministerial Flow
 */
export function MissionPayrollFlow({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-grid-2-tall">
        {/* Left: Mission Request (65% Ready) */}
        <div className="vs-column-card">
          <div className="vs-col-head">
            <span className="chip pri">
              <Workflow size={14} />
              {lang === "km" ? "១.២.១ លំហូរបេសកកម្ម" : "1.2.1 Mission Flow"}
            </span>
            <span className="vs-mono-badge pri">65% READY</span>
          </div>

          <div className="vs-step-list">
            <div className="vs-step-item">
              <span className="vs-step-num pri">01</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "បង្កើតសំណើបេសកកម្មឌីជីថល"
                    : "Digital Mission Request"}
                </h6>
                <p>
                  {lang === "km"
                    ? "បញ្ចូលគោលដៅ សមាជិក និងកាលបរិច្ឆេទ"
                    : "Enter destination, members & schedule"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num pri">02</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ការពិនិត្យ និងចុះហត្ថលេខាអេឡិចត្រូនិក"
                    : "Multi-Level E-Signature"}
                </h6>
                <p>
                  {lang === "km"
                    ? "អនុម័តតាមឋានានុក្រមឌីជីថលរហ័ស"
                    : "Fast hierarchical digital approval"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num pri">03</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "គណនាប្រាក់ឧបត្ថម្ភបេសកកម្មស្វ័យប្រវត្តិ"
                    : "Allowance Calculation"}
                </h6>
                <p>
                  {lang === "km"
                    ? "ផ្ទៀងផ្ទាត់តាមអត្រាកំណត់របស់ក្រសួង"
                    : "Auto-calculated per ministerial rates"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payroll Integration (Pending MEF) */}
        <div className="vs-column-card">
          <div className="vs-col-head">
            <span className="chip amb">
              <Lock size={14} />
              {lang === "km" ? "១.២.២ ប្រាក់បៀវត្ស" : "1.2.2 Payroll Sync"}
            </span>
            <span className="vs-mono-badge amb">PENDING MEF</span>
          </div>

          <div className="vs-step-list">
            <div className="vs-step-item">
              <span className="vs-step-num amb">A</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ទម្រង់កាតាបៀវត្សក្រសួងសេដ្ឋកិច្ច (MEF)"
                    : "MEF Salary Slip Standard"}
                </h6>
                <p>
                  {lang === "km"
                    ? "រង់ចាំការឯកភាពទម្រង់ផ្លូវការពី MEF"
                    : "Awaiting official slip template sign-off"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num amb">B</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ការតភ្ជាប់ទិន្នន័យធនាគារដៃគូ"
                    : "Partner Bank Disbursement"}
                </h6>
                <p>
                  {lang === "km"
                    ? "ផ្ទេរប្រាក់បៀវត្ស និងប្រាក់ឧបត្ថម្ភដោយស្វ័យប្រវត្តិ"
                    : "Automated payroll & allowance payout"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num amb">C</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ការគណនាពន្ធលើប្រាក់បៀវត្ស"
                    : "Tax & Deduction Rules"}
                </h6>
                <p>
                  {lang === "km"
                    ? "ស្របតាមច្បាប់ហិរញ្ញវត្ថុសាធារណៈ"
                    : "Compliant with public finance regulations"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <Clock size={18} className="vp-icon-amb" />
          {lang === "km"
            ? "សំណូមពរ៖ ស្នើបើកកិច្ចប្រជុំបច្ចេកទេសជាមួយតំណាង MEF ដើម្បីឯកភាពលើទម្រង់កាតាបៀវត្ស"
            : "Action Needed: Technical coordination session with MEF to lock salary slip schema"}
        </span>
        <span className="vs-mono-badge pri">PRIORITY SYNC</span>
      </div>
    </div>
  );
}

/**
 * Slide 6 Visual: QR Code Asset Scanner & Budget Ledger Visual
 */
export function AssetBudgetVisual({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-grid-2-tall">
        {/* Left: QR Asset Scanner */}
        <div className="vs-column-card center-content">
          <div className="vs-qr-scanner">
            <QrCode size={68} className="vp-icon-pri" />
            <div className="vs-laser-line" />
          </div>
          <span className="vs-code pri">COMPONENT 1.3 · STATE ASSETS</span>
          <h4 className="vs-card-title">
            {lang === "km"
              ? "ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋតាម QR Code"
              : "QR-Based State Asset Registry"}
          </h4>
          <p className="vs-card-desc">
            {lang === "km"
              ? "តាមដានទីតាំង ស្ថានភាពថែទាំ និងការរំលស់ទ្រព្យសម្បត្តិរដ្ឋតាមស្តង់ដារក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ"
              : "Track asset custody, maintenance history, and depreciation using standardized MEF asset codes"}
          </p>
          <div className="vs-tag-row">
            <span className="vs-status pri">Barcode / QR</span>
            <span className="vs-status grn">Audit Trail</span>
          </div>
        </div>

        {/* Right: Planning & Budget Execution */}
        <div className="vs-column-card">
          <div className="vs-col-head">
            <span className="chip grn">
              {lang === "km" ? "១.៤ ផែនការ & ថវិកា" : "1.4 Planning & Budget"}
            </span>
            <span className="vs-mono-badge grn">UAT READY</span>
          </div>

          <div className="vs-progress-box">
            <div className="vs-progress-head">
              <span>
                {lang === "km" ? "វឌ្ឍភាពការអភិវឌ្ឍម៉ូឌុលថវិកា" : "Budget Module Progress"}
              </span>
              <b>65%</b>
            </div>
            <div className="vs-progress-bar">
              <div className="vs-progress-fill" style={{ width: "65%" }} />
            </div>
          </div>

          <div className="vs-step-list">
            <div className="vs-step-item">
              <span className="vs-step-num grn">01</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ផែនការថវិកាប្រចាំឆ្នាំ និងត្រីមាស"
                    : "Annual & Quarterly Budget Plans"}
                </h6>
                <p>
                  {lang === "km"
                    ? "រៀបចំគម្រោងចំណាយតាមជំពូកថវិកា"
                    : "Structured by ministerial budget chapters"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num grn">02</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ការតាមដានសូចនាករសមិទ្ធកម្ម (KPIs)"
                    : "Performance KPI Monitoring"}
                </h6>
                <p>
                  {lang === "km"
                    ? "ផ្ទៀងផ្ទាត់លទ្ធផលធៀបនឹងផែនការថវិកា"
                    : "Real-time budget vs output tracking"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <ShieldCheck size={18} className="vp-icon-pri" />
          {lang === "km"
            ? "ត្រៀមដាក់ឱ្យមន្ត្រីជំនាញធ្វើតេស្តសាកល្បង (UAT) ក្នុងដំណាក់កាលបន្ទាប់"
            : "Scheduled for departmental officer User Acceptance Testing (UAT)"}
        </span>
        <span className="vs-mono-badge amb">MEF CODE ALIGNMENT</span>
      </div>
    </div>
  );
}

/**
 * Slide 7 Visual: Digital Secretariat Document Vault
 */
export function SecretariatVaultVisual({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-banner pri">
        <div className="vs-banner-left">
          <div className="ic soft">
            <FileCheck size={24} />
          </div>
          <div>
            <h4>
              {lang === "km"
                ? "ឃ្លាំងឯកសារឌីជីថលអគ្គលេខាធិការដ្ឋាន (៦០% រួចរាល់)"
                : "Secretariat Digital Document Vault (60% Complete)"}
            </h4>
            <p>
              {lang === "km"
                ? "ប្រព័ន្ធគ្រប់គ្រងលិខិតរដ្ឋបាល ចរាចរឯកសារ និងបណ្ណសារឌីជីថល"
                : "Centralized administrative correspondence, routing & digital archiving"}
            </p>
          </div>
        </div>
        <span className="chip pri">60% READY</span>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code pri">MODULE 1.5.1</span>
            <span className="vs-status grn">60% Dev</span>
          </div>
          <h5>
            {lang === "km"
              ? "គ្រប់គ្រងលិខិតចូល និងលិខិតចេញ"
              : "Inbound & Outbound Dispatch"}
          </h5>
          <p>
            {lang === "km"
              ? "ចុះលេខកូដស្វ័យប្រវត្តិ និងតាមដានស្ថានភាពឯកសារតាមពេលវេលាពិត"
              : "Automated registration numbering and real-time routing status"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code cy">MODULE 1.5.2</span>
            <span className="vs-status grn">60% Dev</span>
          </div>
          <h5>
            {lang === "km"
              ? "ឃ្លាំងផ្ទុកឯកសារផ្ទៃក្នុងមានសុវត្ថិភាព"
              : "Encrypted Internal Document Vault"}
          </h5>
          <p>
            {lang === "km"
              ? "កំណត់សិទ្ធិចូលមើលតាមឋានានុក្រម និងរក្សាទុកប្រវត្តិកែប្រែ"
              : "Role-based access control with complete version audit history"}
          </p>
        </div>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">MODULE 1.5.3</span>
            <span className="vs-status pri">QR Stamp</span>
          </div>
          <h5>
            {lang === "km"
              ? "ការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវតាម QR Code"
              : "QR Certificate Verification"}
          </h5>
          <p>
            {lang === "km"
              ? "ការពារការក្លែងបន្លំឯកសារផ្លូវការរបស់ក្រសួង"
              : "Instant cryptographic verification of official documents"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code amb">MODULE 1.5.4 & 1.5.5</span>
            <span className="vs-status amb">In Progress</span>
          </div>
          <h5>
            {lang === "km"
              ? "កាលប្បវត្តិ និងលំហូរការងារអគ្គលេខាធិការដ្ឋាន"
              : "Chronology & Secretariat Workflows"}
          </h5>
          <p>
            {lang === "km"
              ? "កំពុងអភិវឌ្ឍមុខងារស្វែងរកឆ្លាតវៃ និងរបាយការណ៍សង្ខេប"
              : "Building smart search indexing and executive summary reports"}
          </p>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <ArrowUpRight size={18} className="vp-icon-pri" />
          {lang === "km"
            ? "គោលដៅបន្ទាប់៖ បញ្ចប់ការអភិវឌ្ឍ ៤០% ដែលនៅសល់ និងដាក់ឱ្យធ្វើតេស្តសាកល្បង"
            : "Next Milestone: Complete remaining 40% development and launch pilot UAT"}
        </span>
        <span className="vs-mono-badge pri">Q2-Q3 TARGET</span>
      </div>
    </div>
  );
}

/**
 * Slide 12 Visual: Power Transmission Waves & Royal Cambodian Skyline
 */
export function RoyalTransmissionVisual() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1920 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g
        stroke="var(--pb-strong)"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
      >
        <path d="M300 420 L340 120 L380 420 M310 340 H370 M318 260 H362 M326 190 H354 M280 150 H400" />
        <path d="M960 420 L1000 100 L1040 420 M970 340 H1030 M978 260 H1022 M986 180 H1014 M940 130 H1060" />
        <path d="M1620 420 L1660 120 L1700 420 M1630 340 H1690 M1638 260 H1682 M1646 190 H1674 M1600 150 H1720" />
      </g>
      <path
        d="M-20 170 Q 140 230 280 150 Q 620 260 940 130 Q 1290 260 1600 150 Q 1770 230 1940 170"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M-20 190 Q 160 250 400 150 Q 680 270 1060 130 Q 1340 270 1720 150 Q 1840 210 1940 190"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M-20 170 Q 140 230 280 150 Q 620 260 940 130 Q 1290 260 1600 150 Q 1770 230 1940 170"
        fill="none"
        stroke="var(--pri)"
        strokeWidth="3.5"
        strokeDasharray="120 1800"
        className="animate-pldash"
      />
      <path
        d="M-20 190 Q 160 250 400 150 Q 680 270 1060 130 Q 1340 270 1720 150 Q 1840 210 1940 190"
        fill="none"
        stroke="var(--cy)"
        strokeWidth="3"
        strokeDasharray="100 1900"
        style={{ animationDelay: "-2.5s" }}
        className="animate-pldash"
      />
    </svg>
  );
}
