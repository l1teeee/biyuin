"use client";

import { useRef, useState } from "react";
import { preload } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { scenes } from "@/content/scenes";

gsap.registerPlugin(useGSAP);

const TEXT_TEXTURES = ["/textures/ink.webp", "/textures/paper.webp"] as const;
const CUT_INTERVAL_MS = 1200;
const CUTS_PER_SCENE = 6;

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [cut, setCut] = useState(0);

  for (const texture of TEXT_TEXTURES) {
    preload(texture, { as: "image" });
  }

  const textureStyle = { backgroundImage: `url(${TEXT_TEXTURES[cut % TEXT_TEXTURES.length]})` };
  const scene = scenes[Math.floor(cut / CUTS_PER_SCENE) % scenes.length];

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia(root);

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-side]", { autoAlpha: 0, y: -16, duration: 0.8, clearProps: "transform" })
        .from("[data-hero-title]", { autoAlpha: 0, y: 12, stagger: 0.15, duration: 0.8, clearProps: "transform" }, "<0.2");

      const intervalId = window.setInterval(() => {
        setCut((current) => current + 1);
      }, CUT_INTERVAL_MS);

      return () => window.clearInterval(intervalId);
    });

    return () => media.revert();
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="film-flicker relative h-dvh overflow-hidden">
      <p
        data-hero-side
        style={textureStyle}
        className="texture-text vertical-text absolute bottom-8 left-6 -mb-[0.3em] text-[length:clamp(1rem,5.2svh,4rem)] leading-none tracking-[0.3em] md:bottom-12 md:left-14"
      >
        {scene.side}
      </p>
      <h1 className="absolute bottom-8 right-6 flex items-baseline gap-6 font-normal md:bottom-12 md:right-14 md:gap-12">
        <span data-hero-title style={textureStyle} className="texture-text text-[length:clamp(5rem,min(24vw,40svh),28rem)] leading-none">
          {scene.kanji}
        </span>
        <span
          data-hero-title
          style={textureStyle}
          className="texture-text text-[length:clamp(1.25rem,min(4.5vw,7svh),5rem)] leading-none tracking-[0.08em]"
        >
          {scene.reading}
        </span>
      </h1>
    </section>
  );
}
