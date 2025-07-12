import React, { useEffect, useState } from "react";
import { FullLogo,IconLogo } from "./Logo"; // or IconLogo

export default function ScalableLogo() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // You can tweak 0 to 200 as the scroll range
      const scrollTop = window.scrollY;
      const minScroll = 0;
      const maxScroll = 200;
      let percent = (scrollTop - minScroll) / (maxScroll - minScroll);
      percent = Math.max(0, Math.min(1, percent));
      // Scale goes from 1 to 0.5
      setScale(1 - 0.5 * percent);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 flex justify-center py-4">
      <div
        style={{ transform: `scale(${scale})`, transition: "transform 0.2s" }}
        className="origin-top"
      >
        <FullLogo color="white" className="w-32 h-32 text-blue-600" />
      </div>
    </div>
  );
}
