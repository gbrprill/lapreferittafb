import { reservationConfig, schedule, type Weekday } from "@/data/site";

// Pure rules for the reservation panel: which dates and times can be asked for,
// and the WhatsApp message. The panel itself only renders what these return.

const toMinutes = (hhmm: string) => {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();
export const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export type DayState = "available" | "past" | "closed" | "outside";

/** Why a calendar day can or cannot be chosen. */
export function dayState(date: Date, now: Date): DayState {
  const today = startOfDay(now);
  const day = startOfDay(date);
  if (day < today) return "past";
  if (day > addDays(today, reservationConfig.bookingWindowDays - 1)) return "outside";
  if (!schedule[day.getDay() as Weekday].salon) return "closed";
  return "available";
}

export type Slot = { time: string; available: boolean };

/** Hourly times for a date, from opening to one hour before closing. Past times on the same day are unavailable. */
export function slotsFor(date: Date, now: Date): Slot[] {
  const hours = schedule[date.getDay() as Weekday].salon;
  if (!hours) return [];
  const first = toMinutes(hours.opens);
  const last = toMinutes(hours.closes) - reservationConfig.lastSlotBeforeCloseMinutes;
  const earliest = sameDay(date, now)
    ? now.getHours() * 60 + now.getMinutes() + reservationConfig.minAdvanceMinutes
    : -Infinity;
  const slots: Slot[] = [];
  for (let t = first; t <= last; t += reservationConfig.slotStepMinutes) {
    slots.push({ time: toHHMM(t), available: t >= earliest });
  }
  return slots;
}

/** Last month the calendar may show. */
export const lastBookableDay = (now: Date) =>
  addDays(startOfDay(now), reservationConfig.bookingWindowDays - 1);

/** Weeks (Monday first) covering a month, with null for padding cells. */
export function monthGrid(year: number, month: number): (Date | null)[][] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday = 0
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

// ---------------------------------------------------------------- formatting (pt-BR)

const longDate = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const shortDate = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const monthYear = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });

/** "quinta-feira, 24 de setembro de 2026" */
export const formatDateLong = (date: Date) => longDate.format(date);
/** "Quinta, 24 de setembro" */
export const formatDateShort = (date: Date) => {
  const text = shortDate.format(date).replace(/-feira/, "");
  return text.charAt(0).toUpperCase() + text.slice(1);
};
/** "setembro de 2026" */
export const formatMonth = (date: Date) => monthYear.format(date);
/** "19:00" -> "19h00" (buttons and summary) */
export const formatSlot = (time: string) => time.replace(":", "h");
/** "19:00" -> "19h", "19:30" -> "19h30" (message) */
export const formatSlotShort = (time: string) => {
  const [h, m] = time.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
};
export const peopleLabel = (n: number) => (n === 1 ? "1 pessoa" : `${n} pessoas`);

export function buildMessage(date: Date, time: string, people: number) {
  return `Olá! Gostaria de verificar a disponibilidade para reservar uma mesa na La Preferitta.

📅 Data: ${formatDateLong(date)}
🕐 Horário: ${formatSlotShort(time)}
👥 Pessoas: ${peopleLabel(people)}

Poderiam confirmar a disponibilidade, por favor?`;
}

export const whatsappUrl = (message: string) =>
  `https://wa.me/${reservationConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** Plain chat with the team, for when a date has no times left. */
export const teamChatUrl = () =>
  whatsappUrl("Olá! Gostaria de falar com a equipe da La Preferitta sobre uma reserva.");
