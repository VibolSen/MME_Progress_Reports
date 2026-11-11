/**
 * Author: Antigravity AI Agent
 * Date: 2026-11-11
 * Task: 5-Slide Executive Progress Report Visuals (Slide 1 & Slide 5)
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
