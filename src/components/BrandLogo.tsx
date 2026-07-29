import Image from "next/image";

type Props = {
  /** Visual size in px (square) */
  size?: number;
  className?: string;
  /** Use on dark backgrounds (default) or light */
  priority?: boolean;
};

/** Site mark — uses public/icon.png (your brand PNG). */
export function BrandLogo({ size = 40, className = "", priority = false }: Props) {
  return (
    <Image
      src="/icon.png"
      alt="Mkombozi Driving School"
      width={size}
      height={size}
      className={`brand-logo ${className}`.trim()}
      priority={priority}
      sizes={`${size}px`}
    />
  );
}
