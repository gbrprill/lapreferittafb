import { ArrowUpRight, CalendarDays, MapPin, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import { useReservation } from "@/lib/reservation-context";
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
  cta,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  note: string;
  tone: "paper" | "flag" | "ink" | "line";
  className?: string;
  ariaLabel?: string | undefined;
  /** Name for future analytics (`data-cta`). */
  cta?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      data-cta={cta}
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
  note = "Delivery ou retirada",
  ariaLabel,
  cta = "pedido",
}: {
  tone?: "paper" | "ink" | "line" | "flag";
  className?: string;
  label?: string;
  note?: string;
  ariaLabel?: string;
  cta?: string;
}) {
  return (
    <Tarja
      href={brand.menu}
      icon={<ShoppingBag />}
      label={label}
      note={note}
      tone={tone}
      className={className}
      ariaLabel={ariaLabel}
      cta={cta}
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
      cta="rotas"
    />
  );
}

/** Same look as the link tabs, but opens the reservation panel. */
export function ReserveTarja({
  tone = "paper",
  className = "",
  label = "Reservar uma mesa",
  note = "Pelo WhatsApp",
}: {
  tone?: "paper" | "flag" | "ink" | "line";
  className?: string;
  label?: string;
  note?: string;
}) {
  const { openReservation } = useReservation();
  return (
    <button
      type="button"
      className={`tarja tarja-${tone} text-left ${className}`}
      onClick={(event) => openReservation(event.currentTarget)}
      data-cta="reserva"
      aria-haspopup="dialog"
    >
      <span className="tarja-icon" aria-hidden="true">
        <CalendarDays />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="tarja-label">
          <Roll>{label}</Roll>
        </span>
        <span className="tarja-note">{note}</span>
      </span>
    </button>
  );
}
