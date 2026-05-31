"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import DeviceGate from "@/components/DeviceGate";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import EngagementSection from "@/components/EngagementSection";

const MUSIC_VOLUME = 0.28;

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = MUSIC_VOLUME;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleEnvelopeComplete = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "";
    setScrollEnabled(true);
  }, []);

  const handleTap = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = MUSIC_VOLUME;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted((p) => !p);
  };

  return (
    <DeviceGate>
      <audio ref={audioRef} src="/despacito.mp3" loop preload="auto" />

      <main>
        <EnvelopeOpening onTap={handleTap} onComplete={handleEnvelopeComplete} />
        <EngagementSection />
      </main>

      {scrollEnabled && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Sesi aç" : "Sesi kapat"}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 50,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "rgba(110, 79, 126, 0.85)",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          }}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}
    </DeviceGate>
  );
}
