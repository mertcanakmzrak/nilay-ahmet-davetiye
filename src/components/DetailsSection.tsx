"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FLORAL_FLAT_SRC = "/Varl%C4%B1k%202.svg";
const PHOTO_UPLOAD_URL =
  "https://drive.google.com/drive/folders/1AL5aLg3dYgj8etISYmMq9UnpF7BsTyqC";

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
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
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      {[
        { v: timeLeft.days, l: "Gün" },
        { v: timeLeft.hours, l: "Saat" },
        { v: timeLeft.minutes, l: "Dakika" },
        { v: timeLeft.seconds, l: "Saniye" },
      ].map(({ v, l }) => (
        <div
          key={l}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 56,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif-custom), Georgia, serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "#2c2420",
              lineHeight: 1,
            }}
          >
            {String(v).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8b6f5e",
              marginTop: "0.35rem",
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

const Divider = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      margin: "1.75rem auto",
      width: "min(260px, 70vw)",
    }}
  >
    <div style={{ flex: 1, height: 1, background: "#e8d5a8" }} />
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#c9a96e",
        flexShrink: 0,
      }}
    />
    <div style={{ flex: 1, height: 1, background: "#e8d5a8" }} />
  </div>
);

export default function DetailsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const weddingDate = new Date("2026-06-06T19:00:00+03:00");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".detail-block").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#faf7f2",
        textAlign: "center",
        padding: "0 1.5rem",
        // decorative top border
        borderTop: "3px solid #e8d5a8",
      }}
    >
      {/* Decorative floral top */}
      <div
        className="detail-block"
        aria-hidden
        style={{
          margin: "2rem auto 0",
          maxWidth: "min(100%, 300px)",
          lineHeight: 0,
        }}
      >
        <Image
          src={FLORAL_FLAT_SRC}
          alt=""
          width={600}
          height={180}
          unoptimized
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        />
      </div>

      {/* Wedding Date */}
      <div className="detail-block" style={{ marginTop: "1.5rem" }}>
        <p
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c9a96e",
            marginBottom: "0.75rem",
          }}
        >
          Düğün Tarihi
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif-custom), Georgia, serif",
            fontSize: "1.9rem",
            fontWeight: 400,
            color: "#2c2420",
            marginBottom: "0.25rem",
          }}
        >
          6 Haziran 2026
        </h2>
        <p style={{ fontSize: "0.88rem", color: "#8b6f5e" }}>
          Cumartesi &nbsp;·&nbsp; Saat 19:00
        </p>
      </div>

      {/* Countdown */}
      <div className="detail-block" style={{ marginTop: "1.25rem" }}>
        <CountdownTimer targetDate={weddingDate} />
      </div>

      <Divider />

      {/* Kına Gecesi */}
      <div className="detail-block">
        <p
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c9a96e",
            marginBottom: "0.75rem",
          }}
        >
          Kına Gecesi
        </p>
        <h3
          style={{
            fontFamily: "var(--font-serif-custom), Georgia, serif",
            fontSize: "1.35rem",
            fontWeight: 400,
            color: "#2c2420",
            marginBottom: "0.25rem",
          }}
        >
          3 Haziran 2026
        </h3>
        <p style={{ fontSize: "0.88rem", color: "#8b6f5e", marginBottom: "0.5rem" }}>
          Çarşamba &nbsp;·&nbsp; Saat 19:00
        </p>
        <p
          style={{
            fontSize: "0.88rem",
            color: "#6b4c3b",
            fontWeight: 600,
            marginBottom: "0.35rem",
          }}
        >
          Bulut 3 VIP Düğün Salonu
        </p>
        <p style={{ fontSize: "0.82rem", color: "#8b6f5e", lineHeight: 1.6 }}>
          Merkez Mah. Emirgan Cad. No:5,
          <br />
          İmar Blokları, Alibeyköy, 34060 Eyüpsultan
        </p>
      </div>

      <Divider />

      {/* Invite message */}
      <div className="detail-block">
        <h2
          style={{
            fontFamily: "var(--font-serif-custom), Georgia, serif",
            fontSize: "2.2rem",
            fontWeight: 400,
            color: "#2c2420",
            lineHeight: 1.45,
            marginBottom: "0.6rem",
          }}
        >
          Düğünümüze
          <br />
          Bekleriz
        </h2>
        <p
          style={{
            fontSize: "0.92rem",
            color: "#8b6f5e",
            lineHeight: 1.7,
            maxWidth: 280,
            margin: "0 auto",
          }}
        >
          Bu mutlu günümüzde sizleri de aramızda görmekten mutluluk duyarız.
        </p>
      </div>

      <Divider />

      {/* Photo Upload */}
      <div className="detail-block" style={{ paddingBottom: "1rem" }}>
        <p
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c9a96e",
            marginBottom: "0.75rem",
          }}
        >
          Anılarınızı Paylaşın
        </p>
        <h3
          style={{
            fontFamily: "var(--font-serif-custom), Georgia, serif",
            fontSize: "1.35rem",
            fontWeight: 400,
            color: "#2c2420",
            marginBottom: "0.5rem",
          }}
        >
          Fotoğraflarınızı Yükleyin
        </h3>
        <p
          style={{
            fontSize: "0.88rem",
            color: "#8b6f5e",
            lineHeight: 1.6,
            marginBottom: "1.25rem",
            maxWidth: 280,
            margin: "0 auto 1.25rem",
          }}
        >
          Çektiğiniz fotoğrafları QR kodu okutarak ya da linke tıklayarak
          paylaşabilirsiniz.
        </p>

        <div
          style={{
            display: "inline-block",
            padding: "0.75rem",
            background: "#fff",
            borderRadius: "1rem",
            border: "1px solid #e8d5a8",
            boxShadow: "0 2px 12px rgba(201,169,110,0.12)",
            marginBottom: "1rem",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(PHOTO_UPLOAD_URL)}&size=180x180&color=2c2420&bgcolor=ffffff&margin=0`}
            alt="Fotoğraf yükleme QR kodu"
            width={180}
            height={180}
            style={{ display: "block", borderRadius: "0.5rem" }}
          />
        </div>

        <div>
          <a
            href={PHOTO_UPLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.88rem",
              color: "#c9a96e",
              textDecoration: "none",
              borderBottom: "1px solid #c9a96e",
              paddingBottom: "0.1rem",
            }}
          >
            Fotoğrafları yüklemek için tıklayın
          </a>
        </div>
      </div>

      <Divider />

      {/* Google Maps */}
      <div className="detail-block" style={{ paddingBottom: "1rem" }}>
        <p
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c9a96e",
            marginBottom: "1rem",
          }}
        >
          Düğün Mekanı
        </p>
        <div
          style={{
            borderRadius: "1rem",
            overflow: "hidden",
            border: "1px solid #e8d5a8",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187.96200685149267!2d28.943525874214046!3d41.08227861526148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab128cfa7507d%3A0xa7284d0d7fda52ca!2zQlVMVVQgMyBWxLBQIETDnMSew5xOIFNBTE9OVQ!5e0!3m2!1str!2str!4v1776589512059!5m2!1str!2str"
            width="100%"
            height="250"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Düğün mekanı haritası"
          />
        </div>
        <p
          style={{
            fontSize: "0.78rem",
            color: "#8b6f5e",
            marginTop: "0.75rem",
            lineHeight: 1.5,
          }}
        >
          Merkez Mah. Emirgan Cad. No:5, İmar Blokları, Alibeyköy, 34060 Eyüpsultan
        </p>
      </div>

      <div style={{ height: "5rem" }} />
    </section>
  );
}
