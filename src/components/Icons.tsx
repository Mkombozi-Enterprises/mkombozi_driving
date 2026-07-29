import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: "sm" | "md" };

function base(className: string | undefined, size: "sm" | "md" = "md") {
  return size === "sm" ? `icon-sm ${className ?? ""}`.trim() : `icon ${className ?? ""}`.trim();
}

export function IconPhone(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconBrand(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v6.5M6 16.5L10 13M18 16.5L14 13" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconCar(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M3 13l1.5-4.5A2 2 0 016.4 7h11.2a2 2 0 011.9 1.5L21 13" />
      <rect x="2" y="13" width="20" height="6" rx="2" />
      <circle cx="7" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export function IconWallet(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M3 7h15a3 3 0 013 3v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      <path d="M16 12h3" />
    </svg>
  );
}

export function IconMoto(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <circle cx="5" cy="17" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
      <path d="M7 17h6l2-5h3M13 12l-2-4H8" />
    </svg>
  );
}

export function IconTruck(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <rect x="1" y="9" width="13" height="8" />
      <path d="M14 12h4l3 3v2h-7z" />
      <circle cx="6" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export function IconBus(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <rect x="3" y="5" width="18" height="11" rx="2" />
      <path d="M3 11h18M7 16v2M17 16v2" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden {...rest}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v6.5M6 16.5L10 13M18 16.5L14 13" />
    </svg>
  );
}

export function IconChevron(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.6 14.3c-.2.6-1.2 1.2-1.7 1.3-.5.1-1 .1-1.6-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.3-5.1-4.5-.2-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.7 1.9.8 2 .1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.4.9 1.5 2 2.4 1.3 1.2 2.4 1.6 2.8 1.7.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.5.3.1.2.1.8-.1 1.4z" />
    </svg>
  );
}

export function IconFacebook(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M13 22v-9h3l.5-4H13V6.5c0-1.2.3-2 2-2h2V1.1C16.5 1 15.2 1 13.8 1 10.9 1 9 2.7 9 6v3H6v4h3v9h4z" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  const { size = "md", className, ...rest } = props;
  return (
    <svg className={base(className, size)} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M4 4l7.5 9.5L4.5 20h2.3l6-6.8L17.8 20H21l-8-9.9L20 4h-2.3l-5.4 6-4.9-6H4z" />
    </svg>
  );
}

const courseIcons = {
  moto: IconMoto,
  car: IconCar,
  truck: IconTruck,
  bus: IconBus,
  shield: IconShield,
  clock: IconClock,
  check: IconCheck,
  target: IconTarget,
} as const;

export function CourseIcon({
  name,
  ...props
}: IconProps & { name: keyof typeof courseIcons }) {
  const Cmp = courseIcons[name];
  return <Cmp {...props} />;
}
