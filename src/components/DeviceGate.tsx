"use client";

import { useEffect, useState } from "react";

export default function DeviceGate({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 480);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) return null;

  if (!isMobile) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#faf7f2",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 400 }}>
          <p
            style={{
              fontFamily: "var(--font-serif-custom), Georgia, serif",
              fontSize: "1.5rem",
              color: "#6b4c3b",
              marginBottom: "1rem",
              lineHeight: 1.4,
            }}
          >
            Bu davetiye mobil telefonlara göre ayarlanmıştır
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#8b6f5e",
              lineHeight: 1.6,
            }}
          >
            Lütfen davetiyeyi cep telefonunuzdan açınız.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
