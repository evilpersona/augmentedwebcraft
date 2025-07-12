import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FullLogo, IconLogo } from "../components/Logo"; // Adjust path as needed

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const END_SIZE_PX = 200; // Final logo size in px
const ANIMATION_DURATION = 1600; // ms

export default function SplashPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [endScale, setEndScale] = useState(0.2);
  const [progress, setProgress] = useState(0); // 0 = start, 1 = end
  const [logoSwapped, setLogoSwapped] = useState(false);

  const navigate = useNavigate();

  // Splash animation: runs once, not tied to scroll
  useEffect(() => {
    function handleResize() {
      setEndScale(END_SIZE_PX / window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate progress from 0 to 1 over duration
  useEffect(() => {
    let start: number | null = null;
    let raf: number;

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(1, elapsed / ANIMATION_DURATION);
      setProgress(t);
      setLogoSwapped(t > 0.85);
      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        // After animation completes, route to "/home" (change as needed)
        setTimeout(() => navigate("/home"), 400); // add a brief pause if you want
      }
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [endScale, navigate]);

  // Update transform directly
  useEffect(() => {
    if (!logoRef.current) return;
    const scale = lerp(1, endScale, progress);
    const finalX = (window.innerWidth / 2) - (END_SIZE_PX / 2);
    const finalY = (window.innerHeight / 2) - (END_SIZE_PX / 2);
    const translateX = lerp(0, -finalX, progress);
    const translateY = lerp(0, -finalY, progress);

    logoRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    logoRef.current.style.transition = "transform 0.01s";
  }, [progress, endScale]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050917] flex items-center justify-center w-screen h-screen">
      <div
        ref={logoRef}
        className="w-[100vw] h-[100vh] pointer-events-none will-change-transform"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: logoSwapped ? 0 : 1,
            transition: "opacity 0.3s",
          }}
        >
          <FullLogo color="white" className="w-full h-full" />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: logoSwapped ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <IconLogo color="white" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
