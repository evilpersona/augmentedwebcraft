import React, { useEffect, useRef, useState } from "react";
import { FullLogo, IconLogo } from "./Logo";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const END_SIZE_PX = 200; // Final logo size in px

export default function HeroLogo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [endScale, setEndScale] = useState(0.2); // Will be updated on mount/resize
  const [progress, setProgress] = useState(0); // 0 = top, 1 = fully shrunk

  // Recalculate endScale if window width changes
  useEffect(() => {
    function handleResize() {
      setEndScale(END_SIZE_PX / window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate logo on scroll and resize
  useEffect(() => {
    function onFrame() {
      const maxScroll = window.innerHeight; // 1 viewport scroll
      const scrollY = window.scrollY;
      const t = Math.min(1, Math.max(0, scrollY / maxScroll));
      setProgress(t);

      const scale = lerp(1, endScale, t);
      const finalX = (window.innerWidth / 2) - (END_SIZE_PX / 2);
      const finalY = (window.innerHeight / 2) - (END_SIZE_PX / 2);
      const translateX = lerp(0, -finalX, t);
      const translateY = lerp(0, -finalY, t);

      if (logoRef.current) {
        logoRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        // NO transition! Instantly tied to scroll for max stability
      }
    }

    // Call once per frame during scroll for smoothness
    function onScroll() {
      requestAnimationFrame(onFrame);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onFrame);

    // Set initial
    onFrame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onFrame);
    };
  }, [endScale]);

  // Crossfade logos at end of scroll (optional, smooth swap)
  const showIconLogo = progress === 1;

  return (
    <>
    <div
      ref={logoRef}
      className="sm:fixed z-50 left-0 top-0 w-[100vw] h-[100vh] pointer-events-none will-change-transform hidden"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "translate(0px, 0px) scale(1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: showIconLogo ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <FullLogo color="white" className="w-full h-full text-blue-700 hidden sm:flex" />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: showIconLogo ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <IconLogo color="white" className="w-full h-full text-blue-700 hidden sm:flex" />
      </div>
    </div>
    <div className="fixed bottom-0 sm:flex items-center justify-end w-screen z-80 hidden"
    style={{
        opacity: showIconLogo ? 0 : 1,
    }}>
        <DotLottieReact
        className="w-32"
        src="https://lottie.host/1bf5610e-cb55-4373-9725-46b259aef5b4/Lq4hJsqqaN.lottie"
      loop
      autoplay/>
    </div>
   </>
  );
}
