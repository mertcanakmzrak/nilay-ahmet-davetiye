"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/** public/Varlık 2.svg */
const FLORAL_FLAT_SRC = "/Varl%C4%B1k%202.svg";

/**
 * Google Drive klasör paylaşım linki buraya gelecek.
 * Drive'da klasörü oluştur → Paylaş → "Bağlantıya sahip herkes" → Düzenleyici → linki kopyala.
 */
const PHOTO_UPLOAD_URL = "https://drive.google.com/drive/folders/1AL5aLg3dYgj8etISYmMq9UnpF7BsTyqC";

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "Gün" },
    { value: timeLeft.hours, label: "Saat" },
    { value: timeLeft.minutes, label: "Dakika" },
    { value: timeLeft.seconds, label: "Saniye" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.75rem",
      }}
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 60,
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
            {String(unit.value).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8b6f5e",
              marginTop: "0.35rem",
            }}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DetailsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const weddingDate = new Date("2026-06-06T19:00:00+03:00");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".detail-block").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const dividerStyle: React.CSSProperties = {
    width: 40,
    height: 1,
    background: "#c9a96e",
    margin: "2rem auto",
  };

  return (
    <section
      ref={sectionRef}
      style={{

        background: "#faf7f2",
        textAlign: "center",
      }}
    >


      {/* Düğün Bilgileri */}
      <div className="detail-block" style={{ marginBottom: "1.5rem", paddingTop: "2rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
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
            fontSize: "1.8rem",
            fontWeight: 400,
            color: "#2c2420",
            marginBottom: "0.25rem",
          }}
        >
          6 Haziran 2026
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#8b6f5e",
          }}
        >
          Cumartesi, Saat 19:00
        </p>
      </div>

      {/* Geri Sayım */}
      <div className="detail-block">
        <CountdownTimer targetDate={weddingDate} />
      </div>

      <div style={dividerStyle} />


      {/* Kına Bilgileri */}
      <div className="detail-block">
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
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
            fontSize: "1.3rem",
            fontWeight: 400,
            color: "#2c2420",
            marginBottom: "0.25rem",
          }}
        >
          3 Haziran 2026
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#8b6f5e",
          }}
        >
          Çarşamba, Saat 19:00
        </p>
          <p
          style={{
            fontSize: "0.85rem",
            color: "#8b6f5e",
            marginTop: "0.5rem",
            fontWeight: 600
          }}
        >
          Bulut 3 VIP Düğün Salonu
        </p>
        <p
          style={{
            
            fontSize: "0.85rem",
            color: "#8b6f5e",
            marginTop: "0.5rem",
          }}
        >
          Merkez Mah. Emirgan Cad. No:5,<br /> İmar Blokları, Alibeyköy, 34060 Eyüpsultan
        </p>
      </div>

      <div style={dividerStyle} />
      <div style={{ paddingBottom: "5rem" }}>
      </div>

      {/* Davet Yazısı */}
      <div className="detail-block">
        <h2
          style={{
            fontFamily: "var(--font-serif-custom), Georgia, serif",
            fontSize: "2.5rem",
            fontWeight: 400,
            color: "#2c2420",
            lineHeight: 1.4,
            marginBottom: "0.5rem",
          }}
        >
          Düğünümüze<br />Bekleriz
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "#8b6f5e",
            lineHeight: 1.6,
          }}
        >
          Bu mutlu günümüzde sizleri de aramızda görmekten mutluluk duyarız.
        </p>
        <div
          aria-hidden
          style={{
            margin: "1rem auto 1.25rem",
            maxWidth: "min(100%, 320px)",
            lineHeight: 0,
          }}
        >
          <Image
            src={FLORAL_FLAT_SRC}
            alt=""
            width={640}
            height={200}
            unoptimized
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <div style={dividerStyle} />

      {/* Fotoğraf Yükleme */}
      <div className="detail-block" style={{ padding: "0 1.5rem 0" }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
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
            fontSize: "1.4rem",
            fontWeight: 400,
            color: "#2c2420",
            marginBottom: "0.5rem",
          }}
        >
          Fotoğraflarınızı Yükleyin
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#8b6f5e",
            lineHeight: 1.6,
            marginBottom: "1.25rem",
          }}
        >
          Çektiğiniz fotoğrafları aşağıdaki QR kodu okutarak ya da linke tıklayarak paylaşabilirsiniz.
        </p>

        {/* QR Kod */}
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

        {/* Tıklanabilir Link */}
        <div>
          <a
            href={PHOTO_UPLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.9rem",
              color: "#c9a96e",
              textDecoration: "none",
              borderBottom: "1px solid #c9a96e",
              paddingBottom: "0.1rem",
              fontWeight: 500,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Fotoğrafları yüklemek için tıklayın
          </a>
        </div>
      </div>

      <div style={dividerStyle} />
    
   

      {/* Google Maps */}
      <div className="detail-block" style={{ padding: "1rem 1.5rem 1rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
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
            fontSize: "0.8rem",
            color: "#8b6f5e",
            marginTop: "0.75rem",
          }}
        >
          Merkez Mah. Emirgan Cad. No:5, İmar Blokları, Alibeyköy, 34060 Eyüpsultan
        </p>
      </div>



      {/* Alt boşluk */}
      <div style={{ height: "5rem" }} />
      <div style={{ paddingBottom: "5rem" }} />
    </section>
  );
}
