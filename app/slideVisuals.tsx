/**
 * Author: Antigravity AI Agent
 * Date: 2026-11-11
 * Task: Sync Slide Visuals with Updated data.md Across All 3 General Departments
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
  Globe,
  AlertTriangle,
  WifiOff,
  ClipboardCheck,
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
 * Slide 3 Visual: Interactive Multi-Department Network Radar Map (All 3 General Departments Active)
 */
export function DepartmentNetworkMap({ lang }: VisualProps) {
  return (
    <div className="visual-inner-fill">
      <svg viewBox="0 0 760 460" className="vp-svg" fill="none">
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
        <circle cx="380" cy="230" r="58" fill="var(--glow)" />

        {/* Connection Lines */}
        <path
          d="M 380 230 L 165 115"
          stroke="var(--grn)"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <path
          d="M 380 230 L 595 115"
          stroke="var(--pri)"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <path
          d="M 380 230 L 380 390"
          stroke="var(--cy)"
          strokeWidth="3"
          strokeDasharray="6 6"
        />

        {/* Center Node: MME Core Platform */}
        <g transform="translate(380, 230)">
          <circle r="46" fill="var(--pri)" />
          <circle
            r="54"
            stroke="var(--pri)"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          <text
            y="-6"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="800"
          >
            MME HUB
          </text>
          <text
            y="12"
            textAnchor="middle"
            fill="#E0E7FF"
            fontSize="11"
            fontWeight="600"
          >
            3 General Depts
          </text>
        </g>

        {/* Node 1: General Department of General Affairs */}
        <g transform="translate(165, 115)">
          <rect
            x="-145"
            y="-52"
            width="290"
            height="104"
            rx="18"
            fill="var(--panel2)"
            stroke="var(--grn)"
            strokeWidth="2.5"
          />
          <circle cx="-118" cy="-22" r="7" fill="var(--grn)" />
          <text
            x="-103"
            y="-18"
            fill="var(--grn)"
            fontSize="12"
            fontWeight="800"
          >
            PROJECT 1 · 5 COMPONENTS
          </text>
          <text
            x="-118"
            y="8"
            fill="var(--tx)"
            fontSize="15"
            fontWeight="700"
          >
            {lang === "km"
              ? "អគ្គនាយកដ្ឋានកិច្ចការទូទៅ"
              : "General Dept. of General Affairs"}
          </text>
          <text x="-118" y="30" fill="var(--mu)" fontSize="12.5">
            {lang === "km"
              ? "បន្ទប់ប្រជុំ 100% · បេសកកម្ម 65% · ឯកសារ 60%"
              : "Room 100% · Mission 65% · Docs 60%"}
          </text>
        </g>

        {/* Node 2: General Department of Mineral Resources */}
        <g transform="translate(595, 115)">
          <rect
            x="-145"
            y="-52"
            width="290"
            height="104"
            rx="18"
            fill="var(--panel2)"
            stroke="var(--pri)"
            strokeWidth="2.5"
          />
          <circle cx="-118" cy="-22" r="7" fill="var(--pri)" />
          <text
            x="-103"
            y="-18"
            fill="var(--pri)"
            fontSize="12"
            fontWeight="800"
          >
            PROJECT 2 · 3 SERVICES READY
          </text>
          <text
            x="-118"
            y="8"
            fill="var(--tx)"
            fontSize="15"
            fontWeight="700"
          >
            {lang === "km"
              ? "អគ្គនាយកដ្ឋានធនធានរ៉ែ"
              : "General Dept. of Mineral Resources"}
          </text>
          <text x="-118" y="30" fill="var(--mu)" fontSize="12.5">
            {lang === "km"
              ? "Web Portal អ្នកស្នើសុំ & ផ្ទៃក្នុង (៣ សេវា)"
              : "Applicant & Internal Portals (3 Services)"}
          </text>
        </g>

        {/* Node 3: General Department of Petroleum */}
        <g transform="translate(380, 390)">
          <rect
            x="-170"
            y="-48"
            width="340"
            height="96"
            rx="18"
            fill="var(--panel2)"
            stroke="var(--cy)"
            strokeWidth="2.5"
          />
          <circle cx="-142" cy="-18" r="7" fill="var(--cy)" />
          <text
            x="-127"
            y="-14"
            fill="var(--cy)"
            fontSize="12"
            fontWeight="800"
          >
            APPLICANT & INTERNAL PORTALS · UP TO 90%
          </text>
          <text
            x="-142"
            y="12"
            fill="var(--tx)"
            fontSize="15"
            fontWeight="700"
          >
            {lang === "km"
              ? "អគ្គនាយកដ្ឋានប្រេងកាត"
              : "General Dept. of Petroleum"}
          </text>
          <text x="-142" y="33" fill="var(--mu)" fontSize="12.5">
            {lang === "km"
              ? "៣ សេវាសុវត្ថិភាពស្ថានីយ & មុខងារ Offline (5%)"
              : "3 Safety Services (90%/75%/Ready) & Offline (5%)"}
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Slide 4 Visual: Component 1 (1.1.1 Maintenance 10%, 1.1.2 Supply 10%, 1.1.3 Meeting Room 100%)
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
                ? "1.1.3 សេវាបន្ទប់ប្រជុំ (បានដាក់ដំណើរការជាផ្លូវការ 100%)"
                : "1.1.3 Meeting Room Service (Officially Launched 100%)"}
            </h4>
            <p>
              {lang === "km"
                ? "ដំណើរការពេញលេញ 100% នៅក្នុងអគ្គនាយកដ្ឋានកិច្ចការទូទៅ"
                : "100% officially launched and active in production"}
            </p>
          </div>
        </div>
        <span className="chip grn">100% LIVE</span>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code amb">1.1.1 MAINTENANCE</span>
            <span className="vs-status amb">10% Studied</span>
          </div>
          <h5>
            {lang === "km"
              ? "ការងារថែទាំ និងជួសជុល (10%)"
              : "Maintenance & Repair Work (10%)"}
          </h5>
          <p>
            {lang === "km"
              ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
              : "User requirements studied (10%)"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code amb">1.1.2 SUPPLY</span>
            <span className="vs-status amb">10% Studied</span>
          </div>
          <h5>
            {lang === "km"
              ? "ការងារផ្គត់ផ្គង់ (10%)"
              : "Supply & Procurement Work (10%)"}
          </h5>
          <p>
            {lang === "km"
              ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
              : "User requirements studied (10%)"}
          </p>
        </div>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">1.1.3 MEETING ROOM</span>
            <span className="vs-status grn">
              <Check size={12} /> 100% Live
            </span>
          </div>
          <h5>
            {lang === "km"
              ? "សេវាបន្ទប់ប្រជុំផ្លូវការ"
              : "Official Meeting Room Service"}
          </h5>
          <p>
            {lang === "km"
              ? "បានដាក់ដំណើរការជាផ្លូវការ (100%)"
              : "Officially launched and active (100%)"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code pri">COMPONENT 1</span>
            <span className="vs-status pri">3 Sub-systems</span>
          </div>
          <h5>
            {lang === "km"
              ? "សង្ខេបសមាសភាគទី១"
              : "Component 1 Summary"}
          </h5>
          <p>
            {lang === "km"
              ? "ដាក់ដំណើរការផ្លូវការ ១ សេវា (100%) និងសិក្សាតម្រូវការ ២ មុខងារ (10%)"
              : "1 service officially live (100%) & 2 modules studied (10%)"}
          </p>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <CheckCircle2 size={18} className="vp-icon-grn" />
          {lang === "km"
            ? "អគ្គនាយកដ្ឋានកិច្ចការទូទៅ · វឌ្ឍភាពគម្រោងទី១ (សមាសភាគទី១)"
            : "General Department of General Affairs · Project 1 (Component 1)"}
        </span>
        <span className="vs-mono-badge grn">100% / 10% / 10%</span>
      </div>
    </div>
  );
}

/**
 * Slide 5 Visual: Component 2 (1.2.1 Mission Request 65% & 1.2.2 Payroll Pending Study)
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
              {lang === "km" ? "1.2.1 ការស្នើសុំបេសកកម្ម" : "1.2.1 Mission Request"}
            </span>
            <span className="vs-mono-badge pri">65% READY</span>
          </div>

          <div className="vs-progress-box">
            <div className="vs-progress-head">
              <span>
                {lang === "km"
                  ? "ការរៀបចំប្រព័ន្ធរួចរាល់"
                  : "System Setup Completed"}
              </span>
              <b>65%</b>
            </div>
            <div className="vs-progress-bar">
              <div className="vs-progress-fill" style={{ width: "65%" }} />
            </div>
          </div>

          <div className="vs-step-list">
            <div className="vs-step-item">
              <span className="vs-step-num pri">01</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ការស្នើសុំបេសកកម្មឌីជីថល"
                    : "Digital Mission Request"}
                </h6>
                <p>
                  {lang === "km"
                    ? "ការរៀបចំប្រព័ន្ធរួចរាល់ (65%)"
                    : "System setup completed at 65%"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num pri">02</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "លំហូរការអនុម័ត និងត្រួតពិនិត្យ"
                    : "Approval & Review Workflow"}
                </h6>
                <p>
                  {lang === "km"
                    ? "ត្រៀមបន្តទៅការធ្វើតេស្ត និងដាក់ឱ្យប្រើប្រាស់"
                    : "Ready for final validation and rollout"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payroll Integration (Pending Further Study with Ministry) */}
        <div className="vs-column-card">
          <div className="vs-col-head">
            <span className="chip amb">
              <Lock size={14} />
              {lang === "km"
                ? "1.2.2 ដំណើរការប្រាក់បៀវត្ស"
                : "1.2.2 Payroll Processing"}
            </span>
            <span className="vs-mono-badge amb">PENDING STUDY</span>
          </div>

          <div className="vs-step-list">
            <div className="vs-step-item">
              <span className="vs-step-num amb">A</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "រង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែម"
                    : "Awaiting Further Study with Ministry"}
                </h6>
                <p>
                  {lang === "km"
                    ? "ទាមទារការសិក្សាលម្អិតបន្ថែមជាមួយក្រសួងលើដំណើរការប្រាក់បៀវត្ស"
                    : "Requires further joint study with the Ministry on payroll workflows"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num amb">B</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ការកំណត់ទម្រង់ និងលក្ខខណ្ឌបច្ចេកទេស"
                    : "Technical Rules & Schema Definition"}
                </h6>
                <p>
                  {lang === "km"
                    ? "នឹងចាប់ផ្តើមអភិវឌ្ឍបន្ទាប់ពីបញ្ចប់ការសិក្សាជាមួយក្រសួង"
                    : "Development will proceed once Ministry study concludes"}
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
            ? "សមាសភាគទី២៖ បេសកកម្មរៀបចំប្រព័ន្ធរួចរាល់ (65%) · ប្រាក់បៀវត្សរង់ចាំការសិក្សាជាមួយក្រសួងបន្ថែម"
            : "Component 2: Mission Request setup ready (65%) · Payroll awaiting further study with Ministry"}
        </span>
        <span className="vs-mono-badge pri">65% & PENDING</span>
      </div>
    </div>
  );
}

/**
 * Slide 6 Visual: Components 3 & 4 (Both at 10% User Requirements Studied)
 */
export function AssetBudgetVisual({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-grid-2-tall">
        {/* Left: Component 3 State Asset Management (10%) */}
        <div className="vs-column-card center-content">
          <div className="vs-qr-scanner">
            <QrCode size={68} className="vp-icon-pri" />
            <div className="vs-laser-line" />
          </div>
          <span className="vs-code pri">COMPONENT 1.3 · 10% STUDIED</span>
          <h4 className="vs-card-title">
            {lang === "km"
              ? "ប្រព័ន្ធគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ (10%)"
              : "State Asset Management System (10%)"}
          </h4>
          <p className="vs-card-desc">
            {lang === "km"
              ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%) សម្រាប់ការគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ"
              : "User requirements studied (10%) for the State Asset Management System"}
          </p>
          <div className="vs-tag-row">
            <span className="vs-status amb">10% Studied</span>
            <span className="vs-status pri">User Requirements</span>
          </div>
        </div>

        {/* Right: Component 4 Planning, Budget, Implementation, M&E (10%) */}
        <div className="vs-column-card">
          <div className="vs-col-head">
            <span className="chip amb">
              {lang === "km"
                ? "1.4 ផែនការ ថវិកា និង M&E"
                : "1.4 Planning, Budget & M&E"}
            </span>
            <span className="vs-mono-badge amb">10% STUDIED</span>
          </div>

          <div className="vs-progress-box">
            <div className="vs-progress-head">
              <span>
                {lang === "km"
                  ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់"
                  : "User Requirements Studied"}
              </span>
              <b>10%</b>
            </div>
            <div className="vs-progress-bar">
              <div className="vs-progress-fill" style={{ width: "10%" }} />
            </div>
          </div>

          <div className="vs-step-list">
            <div className="vs-step-item">
              <span className="vs-step-num pri">01</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ផែនការ ថវិកា និងការអនុវត្ត"
                    : "Planning, Budget & Implementation"}
                </h6>
                <p>
                  {lang === "km"
                    ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
                    : "User requirements studied (10%)"}
                </p>
              </div>
            </div>

            <div className="vs-step-item">
              <span className="vs-step-num pri">02</span>
              <div>
                <h6>
                  {lang === "km"
                    ? "ការតាមដាន ត្រួតពិនិត្យ និងវាយតម្លៃ"
                    : "Monitoring, Inspection & Evaluation"}
                </h6>
                <p>
                  {lang === "km"
                    ? "បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
                    : "User requirements studied (10%)"}
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
            ? "សមាសភាគទី៣ និងទី៤៖ បានសិក្សាតម្រូវការអ្នកប្រើប្រាស់ (10%)"
            : "Components 3 & 4: User requirements studied (10%)"}
        </span>
        <span className="vs-mono-badge amb">10% REQUIREMENT STUDY</span>
      </div>
    </div>
  );
}

/**
 * Slide 7 Visual: Component 5 (60%) for General Secretariat
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
                ? "1.5 សមាសភាគទី៥ (60%) សម្រាប់អគ្គលេខាធិការដ្ឋាន"
                : "1.5 Component 5 (60%) for General Secretariat"}
            </h4>
            <p>
              {lang === "km"
                ? "មុខងារទាំង ៣ ត្រូវបានរៀបចំប្រព័ន្ធរួចរាល់ (60%)"
                : "All 3 document modules have system setup ready (60%)"}
            </p>
          </div>
        </div>
        <span className="chip pri">60% READY</span>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code pri">1.5.1 DISPATCH & CHRONOLOGY</span>
            <span className="vs-status grn">Setup Ready</span>
          </div>
          <h5>
            {lang === "km"
              ? "ការគ្រប់គ្រងឯកសារចូល/ចេញ និងឯកសារកាលប្បវត្តិ"
              : "Inbound/Outbound & Chronological Documents"}
          </h5>
          <p>
            {lang === "km"
              ? "ការរៀបចំប្រព័ន្ធរួចរាល់"
              : "System setup ready"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code cy">1.5.2 UPLOAD & MANAGE</span>
            <span className="vs-status grn">Setup Ready</span>
          </div>
          <h5>
            {lang === "km"
              ? "ការផ្ទុក និងគ្រប់គ្រងឯកសារផ្ទៃក្នុង (Upload & Manage)"
              : "Upload and Manage Internal Documents"}
          </h5>
          <p>
            {lang === "km"
              ? "ការរៀបចំប្រព័ន្ធរួចរាល់"
              : "System setup ready"}
          </p>
        </div>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">1.5.3 VERIFICATION</span>
            <span className="vs-status grn">Setup Ready</span>
          </div>
          <h5>
            {lang === "km"
              ? "ការផ្ទៀងផ្ទាត់ឯកសារ"
              : "Document Verification"}
          </h5>
          <p>
            {lang === "km"
              ? "ការរៀបចំប្រព័ន្ធរួចរាល់"
              : "System setup ready"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code pri">OVERALL PROGRESS</span>
            <span className="vs-status pri">60% Complete</span>
          </div>
          <h5>
            {lang === "km"
              ? "អគ្គលេខាធិការដ្ឋាន (60%)"
              : "General Secretariat (60%)"}
          </h5>
          <p>
            {lang === "km"
              ? "ប្រព័ន្ធទាំង ៣ មុខងារបានរៀបចំរួចរាល់"
              : "All 3 core secretariat modules configured and ready"}
          </p>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <ArrowUpRight size={18} className="vp-icon-pri" />
          {lang === "km"
            ? "សមាសភាគទី៥ (60%) សម្រាប់អគ្គលេខាធិការដ្ឋាន៖ ការរៀបចំប្រព័ន្ធរួចរាល់"
            : "Component 5 (60%) for General Secretariat: System setup ready"}
        </span>
        <span className="vs-mono-badge grn">60% SETUP READY</span>
      </div>
    </div>
  );
}

/**
 * Slide 8 Visual: General Department of Mineral Resources (Project 2) Portals & Note
 */
export function MiningPortalVisual({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">I. APPLICANT PORTAL</span>
            <span className="vs-status grn">
              <Check size={12} /> 3 Services Ready
            </span>
          </div>
          <h5>
            {lang === "km"
              ? "Web Portal សម្រាប់អ្នកស្នើសុំ (រៀបចំរួចរាល់)"
              : "Web Portal for Applicants (Setup Ready)"}
          </h5>
          <p>
            {lang === "km"
              ? "មានចំនួន ៣ សេវា សម្រាប់ស្នើសុំអាជ្ញាបណ្ណអណ្តូងរ៉ែបើក និងការដ្ឋានវាយថ្ម"
              : "Covers all 3 Open-Pit Mine & Quarry license application services"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code pri">II. INTERNAL PORTAL</span>
            <span className="vs-status grn">
              <Check size={12} /> 3 Services Ready
            </span>
          </div>
          <h5>
            {lang === "km"
              ? "Web Portal សម្រាប់ការងារផ្ទៃក្នុង (រៀបចំរួចរាល់)"
              : "Web Portal for Internal Operations (Setup Ready)"}
          </h5>
          <p>
            {lang === "km"
              ? "មានចំនួន ៣ សេវា សម្រាប់មន្ត្រីពិនិត្យ និងដំណើរការសំណើអាជ្ញាបណ្ណ"
              : "Covers all 3 internal processing & review workflows"}
          </p>
        </div>
      </div>

      <div className="vs-column-card">
        <div className="vs-col-head">
          <span className="chip amb">
            <AlertTriangle size={14} />
            {lang === "km" ? "III. ចំណាំសម្គាល់" : "III. Important Note / Remark"}
          </span>
          <span className="vs-mono-badge amb">MINISTRY REVIEW</span>
        </div>
        <p className="vs-card-desc">
          {lang === "km"
            ? "សម្រាប់ការរៀបចំសេវាទី2 និងទី3 ក្រុមការងារបានរៀបចំតាមលំនាំសេវាទី1 រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួលតាមការអនុវត្តជាក់ស្ដែង។"
            : "For Services 2 and 3, the technical team configured the workflows following Service 1's template, awaiting further review by the Ministry working group to refine according to actual practice."}
        </p>
        <div className="vs-tag-row">
          <span className="vs-status grn">
            {lang === "km" ? "សេវាទី១៖ តាមទម្រង់ស្តង់ដារ" : "Service 1: Primary Template"}
          </span>
          <span className="vs-status amb">
            {lang === "km"
              ? "សេវាទី២ & ទី៣៖ រង់ចាំក្រសួងពិនិត្យបន្ថែម"
              : "Services 2 & 3: Awaiting Ministry Review"}
          </span>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <Globe size={18} className="vp-icon-pri" />
          {lang === "km"
            ? "អគ្គនាយកដ្ឋានធនធានរ៉ែ · គម្រោងទី២៖ ប្រព័ន្ធផ្ដល់សេវាសាធារណៈឌីជីថលលើវិស័យរ៉ែ"
            : "General Department of Mineral Resources · Project 2: Mining Digital Public Services"}
        </span>
        <span className="vs-mono-badge grn">3 + 3 SERVICES READY</span>
      </div>
    </div>
  );
}

/**
 * Slide 9 Visual: General Department of Petroleum — I. Applicant Web Portal
 */
export function PetroleumApplicantVisual({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-banner pri">
        <div className="vs-banner-left">
          <div className="ic soft">
            <Globe size={24} />
          </div>
          <div>
            <h4>
              {lang === "km"
                ? "I. Web Portal សម្រាប់អ្នកស្នើសុំ (អគ្គនាយកដ្ឋានប្រេងកាត)"
                : "I. Applicant Web Portal (General Dept. of Petroleum)"}
            </h4>
            <p>
              {lang === "km"
                ? "សេវាទី១ និងទី២ រៀបចំរួចរាល់ · សេវាទី៣ សម្រេចបាន 90%"
                : "Services 1 & 2 setup ready · Service 3 at 90% completion"}
            </p>
          </div>
        </div>
        <span className="chip pri">3 SERVICES</span>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">SERVICE 01 · RENEWAL</span>
            <span className="vs-status grn">Ready</span>
          </div>
          <h5>
            {lang === "km"
              ? "ស្នើសុំ និងបន្តសុពលភាពវិញ្ញាបនបត្រស្ថានីយប្រេង/ឧស្ម័នឥន្ធនៈ"
              : "Application & Renewal for Fuel or LPG Stations"}
          </h5>
          <p>
            {lang === "km"
              ? "បានរៀបចំរួចរាល់ (រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួល)"
              : "Setup ready (awaiting Ministry working group review for refinement)"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">SERVICE 02 · PACKAGING</span>
            <span className="vs-status grn">Ready</span>
          </div>
          <h5>
            {lang === "km"
              ? "វិញ្ញាបនបត្រ និងអាជ្ញាបណ្ណពាណិជ្ជកម្មវេចខ្ចប់ប្រេងកាត/ឧស្ម័ន"
              : "Safety Certificate & Commercial License for Packaging"}
          </h5>
          <p>
            {lang === "km"
              ? "បានរៀបចំរួចរាល់ (រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែមដើម្បីកែសម្រួល)"
              : "Setup ready (awaiting Ministry working group review for refinement)"}
          </p>
        </div>
      </div>

      <div className="vs-column-card">
        <div className="vs-col-head">
          <span className="chip amb">
            {lang === "km"
              ? "សេវាទី៣៖ វិញ្ញាបនបត្របច្ចេកទេសសុវត្ថិភាពសម្រាប់ស្ថានីយ"
              : "Service 03: Technical Safety Certificate for Stations"}
          </span>
          <span className="vs-mono-badge pri">90% COMPLETE</span>
        </div>
        <div className="vs-progress-box">
          <div className="vs-progress-head">
            <span>
              {lang === "km"
                ? "វឌ្ឍភាព Web Portal អ្នកស្នើសុំ (សេវាទី៣)"
                : "Applicant Web Portal Progress (Service 3)"}
            </span>
            <b>90%</b>
          </div>
          <div className="vs-progress-bar">
            <div className="vs-progress-fill" style={{ width: "90%" }} />
          </div>
        </div>
        <p className="vs-card-desc">
          {lang === "km"
            ? "មានការស្នើសុំកែសម្រួលបន្ថែមក្នុងអង្គប្រជុំកាលពីថ្ងៃទី១០ ខែវិច្ឆិកា ឆ្នាំ២០២៦ ម៉ោង 2:30 PM។"
            : "Additional refinements requested during the meeting on November 10, 2026 at 2:30 PM."}
        </p>
      </div>
    </div>
  );
}

/**
 * Slide 10 Visual: General Department of Petroleum — II. Internal Portal & Offline Mode
 */
export function PetroleumInternalVisual({ lang }: VisualProps) {
  return (
    <div className="visual-stack">
      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code pri">INTERNAL SERVICE 01</span>
            <span className="vs-status pri">75% Complete</span>
          </div>
          <h5>
            {lang === "km"
              ? "ពិនិត្យ ទទួល និងដំណើរការបន្តសុពលភាពស្ថានីយប្រេង/ឧស្ម័ន (75%)"
              : "Internal Processing & Renewal for Fuel/LPG Stations (75%)"}
          </h5>
          <div className="vs-progress-bar" style={{ marginTop: "8px" }}>
            <div className="vs-progress-fill" style={{ width: "75%" }} />
          </div>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code grn">INTERNAL SERVICE 02</span>
            <span className="vs-status grn">Ready</span>
          </div>
          <h5>
            {lang === "km"
              ? "សកម្មភាពវេចខ្ចប់ផលិតផលប្រេងកាត និងឬឧស្ម័នឥន្ធនៈ"
              : "Petroleum & LPG Packaging Operations"}
          </h5>
          <p>
            {lang === "km"
              ? "បានរៀបចំរួចរាល់ (រង់ចាំក្រុមការងារក្រសួងពិនិត្យបន្ថែម)"
              : "Setup ready (awaiting Ministry working group review)"}
          </p>
        </div>
      </div>

      <div className="vs-grid-2">
        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code amb">INTERNAL SERVICE 03</span>
            <span className="vs-status amb">
              <ClipboardCheck size={12} /> Nov 10 · 2:30 PM
            </span>
          </div>
          <h5>
            {lang === "km"
              ? "តេស្តដល់ជំហានមន្ទីរចុះពិនិត្យទីតាំង"
              : "Tested to Provincial On-Site Inspection Step"}
          </h5>
          <p>
            {lang === "km"
              ? "តេស្តជាមួយនាយកដ្ឋាន និងមន្ទីរខេត្ត ហើយស្នើកែសម្រួលផ្ទាំងបញ្ចូលព័ត៌មានឱ្យបង្ហាញដូចកំណត់ហេតុ"
              : "Tested with Dept & Provincial Dept; requested form layout to match official inspection minutes"}
          </p>
        </div>

        <div className="vs-subcard">
          <div className="vs-subcard-top">
            <span className="vs-code cy">ITEM 04 · OFFLINE MODE</span>
            <span className="vs-status cy">
              <WifiOff size={12} /> 5%
            </span>
          </div>
          <h5>
            {lang === "km"
              ? "មុខងារ Offline Save Auto (5%)"
              : "Offline Auto-Save Function (5%)"}
          </h5>
          <p>
            {lang === "km"
              ? "ឧ. អោយ Save ទិន្នន័យ Auto ករណីដាច់ Internet (5%)"
              : "Auto-saves inspection data when internet disconnects (5%)"}
          </p>
        </div>
      </div>

      <div className="vs-bottom-strip">
        <span className="vs-bottom-left">
          <AlertTriangle size={18} className="vp-icon-amb" />
          {lang === "km"
            ? "ចំណុចប្រឈម៖ ផ្ទាំងបញ្ចូលព័ត៌មាននៅជំហានមន្ទីរចុះពិនិត្យទីតាំង ស្នើសុំឱ្យបង្ហាញដូចកំណត់ហេតុ"
            : "Challenge: Provincial On-Site Inspection form requested to match official inspection minutes"}
        </span>
        <span className="vs-mono-badge amb">PROVINCIAL FORM SYNC</span>
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
