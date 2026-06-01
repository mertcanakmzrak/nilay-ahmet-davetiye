"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

interface Props {
  onComplete: () => void;
}

export default function EnvelopeOpening({ onComplete }: Props) {
  const [phase, setPhase] = useState<"idle" | "animating" | "done">("idle");
  const closedRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperRef.current) {
      // GSAP handles centering + initial offset — avoids CSS transform conflict
      gsap.set(paperRef.current, { xPercent: -50, yPercent: -50, y: 110, opacity: 0 });
    }
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("animating");


    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("done");
        onComplete();
      },
    });

    tl.to([hintRef.current, namesRef.current], { opacity: 0, duration: 0.25 }, 0)

      // Envelope opens
      .to(closedRef.current, { opacity: 0, duration: 0.7, ease: "power1.inOut" }, 0.1)
      .to(openRef.current,  { opacity: 1, duration: 0.7, ease: "power1.inOut" }, 0.1)

      // Paper eases out naturally — starts from inside envelope, decelerates as it clears the top
      .to(
        paperRef.current,
        {
          y: -95,
          opacity: 1,
          duration: 2.0,
          ease: "power2.out",
        },
        0.6
      );
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        cursor: phase === "idle" ? "pointer" : "default",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onClick={handleOpen}
    >
      {/* Background */}
      <Image
        src="/envelope-bg.jpg"
        alt=""
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />

      {/* Warm overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(250,235,205,0.28) 0%, rgba(250,220,170,0.18) 100%)",
          zIndex: 1,
        }}
      />

      {/* Envelope + paper container */}
      <div
        style={{
          position: "absolute",

          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Paper — slides up from envelope opening */}
        <div
          ref={paperRef}
          style={{
            position: "absolute",
            width: "min(88vw, 360px)",
            zIndex: 10,
            // positioned so it appears to come out of envelope center
            top: "50%",
            left: "50%",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/invitation-paper.png"
            alt="Davetiye"
            width={600}
            height={850}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Open envelope — behind paper */}
        <div
          ref={openRef}
          style={{
            position: "absolute",
            width: "min(200vw, 780px)",
            aspectRatio: "7 / 5",
            opacity: 0,
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/envelope-open.png"
            alt="Açık zarf"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Closed envelope — on top initially */}
        <div
          ref={closedRef}
          style={{
            position: "absolute",
            width: "min(200vw, 780px)",
            aspectRatio: "7 / 5",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/envelope-closed.png"
            alt="Zarf"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Çift isim — zarfın üstünde */}
      <div
        ref={namesRef}
        style={{
          position: "absolute",
          top: "14%",
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif-custom), Georgia, serif",
            fontSize: "clamp(2rem, 9vw, 2.8rem)",
            fontWeight: 400,
            color: "#fff",
            letterSpacing: "0.04em",
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            lineHeight: 1.3,
          }}
        >
          Nilay &amp; Ahmet
        </p>
      </div>

      {/* Tap hint */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          bottom: "13%",
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif-custom), Georgia, serif",
            fontSize: "0.82rem",
            color: "#fff",
            letterSpacing: "0.14em",
            textShadow: "0 1px 6px rgba(0,0,0,0.3)",
            animation: "envelopePulse 2s ease-in-out infinite",
          }}
        >
          Açmak için tıklayın
        </p>
      </div>

      <style jsx>{`
        @keyframes envelopePulse {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
