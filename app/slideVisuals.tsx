/**
 * Author: Antigravity AI Agent
 * Date: 2026-11-11
 * Task: Content-Matched Animated Background Illustrations for All 5 Slides
 */

"use client";

import React from "react";
import Image from "next/image";

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
 * Slide 1 Background Illustration: Digital Transformation Network & Smart Grid Waves
 */
export function DigitalGridWaveVisual() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1920 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Digital Hub Pillars & Network Nodes */}
      <g
        stroke="var(--pb-strong)"
        strokeWidth="2"
        fill="none"
        opacity="0.48"
      >
        <path d="M220 420 V240 L260 200 H340 L380 240 V420 M250 280 H350 M250 340 H350" />
        <path d="M880 420 V190 L960 130 L1040 190 V420 M910 250 H1010 M910 320 H1010" />
        <path d="M1540 420 V230 L1600 180 H1680 L1740 230 V420 M1580 280 H1700 M1580 340 H1700" />
        <circle cx="300" cy="180" r="10" />
        <circle cx="960" cy="110" r="12" />
        <circle cx="1640" cy="160" r="10" />
      </g>
      {/* Base Wave Paths */}
      <path
        d="M-20 260 C 260 160, 560 320, 960 200 C 1360 80, 1640 290, 1940 190"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.45"
      />
      <path
        d="M-20 310 C 320 210, 640 360, 960 240 C 1280 120, 1600 330, 1940 240"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.45"
      />
      {/* Animated Glowing Data Streams */}
      <path
        d="M-20 260 C 260 160, 560 320, 960 200 C 1360 80, 1640 290, 1940 190"
        fill="none"
        stroke="var(--pri)"
        strokeWidth="3.5"
        strokeDasharray="140 1800"
        className="animate-pldash"
      />
      <path
        d="M-20 310 C 320 210, 640 360, 960 240 C 1280 120, 1600 330, 1940 240"
        fill="none"
        stroke="var(--cy)"
        strokeWidth="3"
        strokeDasharray="110 1900"
        style={{ animationDelay: "-3.2s" }}
        className="animate-pldash"
      />
    </svg>
  );
}

/**
 * Slide 2 Background Illustration: General Affairs (Ministry Administration, Document Workflows, Assets & Budget)
 */
export function GeneralAffairsBgVisual() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1920 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Ministry Administrative Architecture, Document Nodes & Budget Columns */}
      <g
        stroke="var(--pb-strong)"
        strokeWidth="2"
        fill="none"
        opacity="0.52"
      >
        {/* Left: Ministry Administrative & Meeting Room Complex */}
        <path d="M140 420 V220 L230 160 L320 220 V420 M175 260 H285 M175 310 H285 M175 360 H285" />
        <rect x="360" y="250" width="90" height="170" rx="6" />
        <path d="M380 290 H430 M380 330 H430 M380 370 H430" />

        {/* Center: Digital Secretariat Document Portal & Verification Hub */}
        <rect x="860" y="160" width="110" height="150" rx="10" />
        <path d="M885 200 H945 M885 230 H945 M885 260 H925" />
        <rect x="990" y="190" width="110" height="150" rx="10" />
        <path d="M1015 230 H1075 M1015 260 H1075 M1015 290 H1055" />

        {/* Right: State Assets & Budget Analytics Bars */}
        <rect x="1500" y="290" width="38" height="130" rx="4" />
        <rect x="1555" y="240" width="38" height="180" rx="4" />
        <rect x="1610" y="185" width="38" height="235" rx="4" />
        <rect x="1665" y="140" width="38" height="280" rx="4" />
      </g>

      {/* Connecting Workflow Trajectories */}
      <path
        d="M-20 230 Q 230 120 480 220 T 980 180 T 1520 210 Q 1740 140 1940 200"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M-20 275 Q 280 180 560 260 T 1040 220 T 1580 250 Q 1780 190 1940 245"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* Animated Glowing Workflow Pulses */}
      <path
        d="M-20 230 Q 230 120 480 220 T 980 180 T 1520 210 Q 1740 140 1940 200"
        fill="none"
        stroke="#059669"
        strokeWidth="3.5"
        strokeDasharray="130 1800"
        className="animate-pldash"
      />
      <path
        d="M-20 275 Q 280 180 560 260 T 1040 220 T 1580 250 Q 1780 190 1940 245"
        fill="none"
        stroke="var(--pri)"
        strokeWidth="3"
        strokeDasharray="110 1900"
        style={{ animationDelay: "-2.8s" }}
        className="animate-pldash"
      />
    </svg>
  );
}

/**
 * Slide 3 Background Illustration: Mineral Resources (Open-Pit Mines, Quarries, Geological Strata & Digital Survey)
 */
export function MineralResourcesBgVisual() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1920 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Open-Pit Mine Terraces, Quarry Ridges & Crystal Mineral Structures */}
      <g
        stroke="var(--pb-strong)"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
      >
        {/* Left: Mountain Quarry & Terraced Open-Pit Steps */}
        <path d="M60 420 L210 150 L330 270 L460 120 L640 420" />
        <path d="M130 300 H290 M100 355 H360 M360 240 H540 M330 310 H580" />

        {/* Center: Crystalline Mineral Prisms & Geological Survey Grid */}
        <polygon points="920,420 945,190 985,135 1025,190 1050,420" />
        <polygon points="860,420 880,250 915,210 940,260 950,420" />
        <polygon points="1020,420 1040,240 1075,200 1105,250 1120,420" />
        <path d="M985 135 V420 M945 190 L1025 190" />

        {/* Right: Open-Pit Excavation Bench Contours (≤ 10 Ha) */}
        <path d="M1360 420 L1460 230 H1680 L1780 420" />
        <path d="M1400 350 H1740 M1430 290 H1710 M1510 230 L1570 145 L1630 230" />
      </g>

      {/* Geological Strata Waves */}
      <path
        d="M-20 210 L 210 150 L 460 120 L 760 240 L 985 135 L 1240 250 L 1570 145 L 1940 210"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M-20 270 Q 320 180 640 270 T 1280 250 T 1940 260"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* Animated Glowing Survey & Licensing Pulse Lines */}
      <path
        d="M-20 210 L 210 150 L 460 120 L 760 240 L 985 135 L 1240 250 L 1570 145 L 1940 210"
        fill="none"
        stroke="#059669"
        strokeWidth="3.5"
        strokeDasharray="130 1800"
        className="animate-pldash"
      />
      <path
        d="M-20 270 Q 320 180 640 270 T 1280 250 T 1940 260"
        fill="none"
        stroke="var(--cy)"
        strokeWidth="3"
        strokeDasharray="110 1900"
        style={{ animationDelay: "-2.4s" }}
        className="animate-pldash"
      />
    </svg>
  );
}

/**
 * Slide 4 Background Illustration: Petroleum (Fuel/LPG Stations, Storage Tanks & Pipeline Safety Network)
 */
export function PetroleumBgVisual() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1920 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Petroleum & LPG Storage Silos, Fuel Station Canopy & Pipeline Network */}
      <g
        stroke="var(--pb-strong)"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
      >
        {/* Left: LPG & Petroleum Cylindrical Storage Tanks */}
        <path d="M160 420 V220 C160 185, 280 185, 280 220 V420" />
        <ellipse cx="220" cy="220" rx="60" ry="18" />
        <path d="M160 285 C160 300, 280 300, 280 285 M160 350 C160 365, 280 365, 280 350" />

        <path d="M310 420 V250 C310 220, 410 220, 410 250 V420" />
        <ellipse cx="360" cy="250" rx="50" ry="15" />

        {/* Center: Fuel / LPG Station Canopy & Safety Dispensers */}
        <path d="M830 210 H1110 L1085 170 H855 Z" />
        <path d="M880 210 V420 M1060 210 V420" />
        <rect x="920" y="290" width="40" height="130" rx="5" />
        <rect x="980" y="290" width="40" height="130" rx="5" />

        {/* Right: Refinery / Packaging Towers & Pipeline Manifold */}
        <rect x="1520" y="160" width="55" height="260" rx="8" />
        <rect x="1600" y="200" width="55" height="220" rx="8" />
        <path d="M1547 160 V120 H1627 V200 M1520 230 H1575 M1520 300 H1575 M1600 260 H1655 M1600 330 H1655" />
      </g>

      {/* Pipeline & Telemetry Flow Paths */}
      <path
        d="M-20 235 Q 240 150 520 235 T 970 190 T 1480 225 Q 1720 150 1940 215"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M-20 280 Q 280 205 580 280 T 1030 235 T 1540 270 Q 1760 205 1940 260"
        fill="none"
        stroke="var(--pb-strong)"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* Animated Glowing Pipeline & Inspection Sync Streams */}
      <path
        d="M-20 235 Q 240 150 520 235 T 970 190 T 1480 225 Q 1720 150 1940 215"
        fill="none"
        stroke="var(--pri)"
        strokeWidth="3.5"
        strokeDasharray="130 1800"
        className="animate-pldash"
      />
      <path
        d="M-20 280 Q 280 205 580 280 T 1030 235 T 1540 270 Q 1760 205 1940 260"
        fill="none"
        stroke="#D97706"
        strokeWidth="3"
        strokeDasharray="110 1900"
        style={{ animationDelay: "-2.6s" }}
        className="animate-pldash"
      />
    </svg>
  );
}

/**
 * Slide 5 Visual: Power Transmission Waves & Royal Cambodian Skyline
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
