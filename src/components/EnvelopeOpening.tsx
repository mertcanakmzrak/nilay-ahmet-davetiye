"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface EnvelopeOpeningProps {
  onComplete: () => void;
  onTap?: () => void;
}

export default function EnvelopeOpening({ onComplete, onTap }: EnvelopeOpeningProps) {
  const topFlapRef = useRef<HTMLDivElement>(null);
  const bottomFlapRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onTap?.();

    const tl = gsap.timeline({ delay: 0.22, onComplete });

    tl.addLabel("open", 0)
      .to(
        topFlapRef.current,
        {
          rotateX: -50,
          y: -500,
          opacity: 1,
          duration: 3,
          ease: "power3.inOut",
        },
        "open"
      )
      .to(
        bottomFlapRef.current,
        {
          y: 500,
          duration: 3,
          ease: "power3.inOut",
        },
        "open"
      );
  };

  return (
    <div
      onClick={handleOpen}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        cursor: "pointer",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          perspective: "1200px",
          perspectiveOrigin: "50% 45%",
        }}
      >
        {/* Alt kapak — alttaki site (main) şeffaf alanlardan görünür; ekstra arka plan yok */}
        <div
          ref={bottomFlapRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            transformOrigin: "center top",
          }}
        >
          <Image
            src="/envelope-bottom.png"
            alt="Zarf alt kapak"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority
          />
        </div>

        {/* Üst kapak — en üstte */}
        <div
          ref={topFlapRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            transformOrigin: "center bottom",
            filter: "drop-shadow(-10px 5px 24px rgba(0, 0, 0, 0.34))",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/envelope-top.png"
            alt="Zarf üst kapak (mühürlü)"
            fill
            style={{ objectFit: "cover", objectPosition: "bottom" }}
            priority
          />
        </div>

        {!opened && (
          <div
            style={{
              position: "absolute",
              bottom: "12%",
              left: 0,
              right: 0,
              zIndex: 3,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif-custom), Georgia, serif",
                fontSize: "0.85rem",
                color: "#c9a96e",
                letterSpacing: "0.1em",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              Açmak için dokunun
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
