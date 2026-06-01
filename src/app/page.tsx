"use client";

import { useCallback, useEffect } from "react";
import DeviceGate from "@/components/DeviceGate";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import EngagementSection from "@/components/EngagementSection";

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleEnvelopeComplete = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "";
  }, []);

  return (
    <DeviceGate>
      <main>
        <EnvelopeOpening onComplete={handleEnvelopeComplete} />
        <EngagementSection />
      </main>
    </DeviceGate>
  );
}
