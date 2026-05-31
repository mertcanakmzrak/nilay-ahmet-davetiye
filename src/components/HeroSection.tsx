"use client";

import Image from "next/image";

const HERO_SRC = "/yeni.jpg";

export default function HeroSection() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "100dvh",
        position: "relative",
        lineHeight: 0,
        background: "#faf7f2",
      }}
    >
      <Image
        src={HERO_SRC}
        alt="Gulden ve Fatih Dugun Davetiyesi"
        fill
        sizes="100vw"
        style={{
          objectFit: "contain",
          objectPosition: "center top",
        }}
        priority
      />
    </section>
  );
}
