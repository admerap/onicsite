"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (document.readyState === "complete") {
      timer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timer);
    }

    const handleLoad = () => {
      timer = setTimeout(() => setVisible(false), 400);
    };

    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity">
      <Image
        src="/loading.svg"
        alt="Loading..."
        width={80}
        height={80}
        unoptimized
        priority
      />
    </div>
  );
}
