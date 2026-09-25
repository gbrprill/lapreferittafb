import { ArrowUpRight, MapPin, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import { brand } from "@/data/brand";

/** Label that rolls to a second copy of itself on hover. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

/** Primary action tab: one action, a short second line saying where it leads. */
export function Tarja({
  href,
  icon,
  label,
  note,
  tone,
  className = "",
  ariaLabel,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  note: string;
  tone: "paper" | "flag" | "ink" | "line";
  className?: string;
  ariaLabel?: string | undefined;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={`tarja tarja-${tone} ${className}`}
    >
      <span className="tarja-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="tarja-label">
          <Roll>{label}</Roll>
        </span>
        <span className="tarja-note">{note}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="tarja-arrow" />
    </a>
  );
}

export function OrderTarja({
  tone = "paper",
  className = "",
  label = "Pedir agora",
  ariaLabel,
}: {
  tone?: "paper" | "ink" | "line";
  className?: string;
  label?: string;
  ariaLabel?: string;
}) {
  return (
    <Tarja
      href={brand.menu}
      icon={<ShoppingBag />}
      label={label}
      note="Delivery ou retirada"
      tone={tone}
      className={className}
      ariaLabel={ariaLabel}
    />
  );
}

export function VisitTarja({
  tone = "flag",
  className = "",
}: {
  tone?: "flag" | "paper" | "line";
  className?: string;
}) {
  return (
    <Tarja
      href={brand.google}
      icon={<MapPin />}
      label="Como chegar"
      note="Salão no Bairro Industrial"
      tone={tone}
      className={className}
    />
  );
}
