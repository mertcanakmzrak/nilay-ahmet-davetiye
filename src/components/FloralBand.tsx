import Image from "next/image";

/** public/Varlık 1.svg — bohem çiçek süsü */
const FLORAL_SRC = "/Varl%C4%B1k%201.svg";

type FloralBandProps = {
  /** Alt kenar için ters çevir (180°) */
  flip?: boolean;
};

export default function FloralBand({ flip = false }: FloralBandProps) {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        lineHeight: 0,
        transform: flip ? "rotate(180deg)" : undefined,
      }}
    >
      <Image
        src={FLORAL_SRC}
        alt=""
        width={1200}
        height={180}
        unoptimized
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
          objectPosition: "center top",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
