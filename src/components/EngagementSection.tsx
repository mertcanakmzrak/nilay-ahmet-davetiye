"use client";

import { useEffect, useState } from "react";

const ENGAGEMENT_DATE = new Date("2026-07-01T00:00:00+03:00");

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem" }}>
      {[
        { v: t.days, l: "Gün" },
        { v: t.hours, l: "Saat" },
        { v: t.minutes, l: "Dakika" },
        { v: t.seconds, l: "Saniye" },
      ].map(({ v, l }) => (
        <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 52 }}>
          <span
            style={{
              fontFamily: "var(--font-serif-custom), Georgia, serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#8B0000",
              lineHeight: 1,
            }}
          >
            {String(v).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#b22222",
              marginTop: "0.4rem",
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function EngagementSection() {
  return (
    <section
      style={{
        width: "100%",
        height: "100dvh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem 1.5rem",
        gap: 0,
      }}
    >
      {/* Thin decorative line top */}
      <div style={{ width: 60, height: 2, background: "#8B0000", marginBottom: "2rem", borderRadius: 2 }} />

      {/* Invitation text */}
      <p
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#b22222",
          marginBottom: "1.75rem",
        }}
      >
        Nişanımıza Davetlisiniz
      </p>

      {/* Names */}
      <h1
        style={{
          fontFamily: "var(--font-serif-custom), Georgia, serif",
          fontSize: "clamp(2.4rem, 10vw, 3.6rem)",
          fontWeight: 400,
          color: "#8B0000",
          lineHeight: 1.2,
          marginBottom: "0.25rem",
        }}
      >
        Nilay
      </h1>

      {/* Ampersand */}
      <p
        style={{
          fontFamily: "var(--font-serif-custom), Georgia, serif",
          fontSize: "clamp(1.6rem, 7vw, 2.4rem)",
          color: "#c0392b",
          margin: "0.1rem 0",
          fontStyle: "italic",
        }}
      >
        &amp;
      </p>

      <h1
        style={{
          fontFamily: "var(--font-serif-custom), Georgia, serif",
          fontSize: "clamp(2.4rem, 10vw, 3.6rem)",
          fontWeight: 400,
          color: "#8B0000",
          lineHeight: 1.2,
          marginBottom: "2.5rem",
        }}
      >
        Ahmet
      </h1>

      {/* Thin divider */}
      <div style={{ width: 40, height: 1, background: "#e8b4b8", marginBottom: "2rem" }} />

      {/* Date */}
      <p
        style={{
          fontSize: "0.78rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#b22222",
          marginBottom: "1.5rem",
        }}
      >
        1 Temmuz 2026
      </p>

      {/* Countdown */}
      <CountdownTimer targetDate={ENGAGEMENT_DATE} />

      {/* Bottom line */}
      <div style={{ width: 60, height: 2, background: "#8B0000", marginTop: "2rem", borderRadius: 2 }} />
    </section>
  );
}
