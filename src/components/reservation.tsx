import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ReservationContext } from "@/lib/reservation-context";
import { reservationConfig, schedule, weekdayNames, type Weekday } from "@/data/site";
import {
  addDays,
  buildMessage,
  dayState,
  formatDateLong,
  formatDateShort,
  formatMonth,
  formatSlot,
  lastBookableDay,
  monthGrid,
  peopleLabel,
  sameDay,
  slotsFor,
  startOfDay,
  teamChatUrl,
  whatsappUrl,
} from "@/lib/reservation";

// ---------------------------------------------------------------- context

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);

  const openReservation = useCallback((from?: HTMLElement | null) => {
    trigger.current = from ?? (document.activeElement as HTMLElement | null);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    const target = trigger.current;
    // Give focus back to the button that opened the panel.
    window.requestAnimationFrame(() => target?.focus({ preventScroll: true }));
  }, []);

  const api = useMemo(() => ({ openReservation }), [openReservation]);

  return (
    <ReservationContext.Provider value={api}>
      {children}
      <ReservationDialog open={open} onClose={close} />
    </ReservationContext.Provider>
  );
}

// ---------------------------------------------------------------- motion

const ease = [0.22, 1, 0.36, 1] as const;
const stepVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 18 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.24, ease } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -18,
    transition: { duration: 0.18, ease: "easeIn" },
  }),
};

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function useMeasuredHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  useIsoLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setHeight(node.offsetHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, height] as const;
}

// ---------------------------------------------------------------- dialog

type Step = 0 | 1 | 2;
type Sent = "idle" | "opened" | "blocked";

function ReservationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [step, setStep] = useState<Step>(0);
  const [dir, setDir] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [people, setPeople] = useState<number | null>(null);
  const [sent, setSent] = useState<Sent>("idle");
  const [bodyRef, bodyHeight] = useMeasuredHeight();
  const advance = useRef<number | undefined>(undefined);

  // Open: fresh start every time, page behind stops scrolling.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setNow(new Date());
      setStep(0);
      setDir(1);
      setDate(null);
      setTime(null);
      setPeople(null);
      setSent("idle");
      dialog.showModal();
      document.documentElement.classList.add("rsv-lock");
      setVisible(true);
    }
  }, [open]);

  const requestClose = useCallback(() => {
    window.clearTimeout(advance.current);
    setVisible(false);
  }, []);

  const finishClose = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    document.documentElement.classList.remove("rsv-lock");
    onClose();
  };

  useEffect(() => () => document.documentElement.classList.remove("rsv-lock"), []);

  const go = (next: Step) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  // Keep the choice on screen for a beat, then move on.
  const later = (fn: () => void) => {
    window.clearTimeout(advance.current);
    advance.current = window.setTimeout(fn, 260);
  };

  const pickDate = (value: Date) => {
    setDate(value);
    if (time && !slotsFor(value, now).some((s) => s.time === time && s.available)) setTime(null);
    later(() => go(1));
  };
  const pickTime = (value: string) => {
    setTime(value);
    later(() => go(2));
  };

  const ready = Boolean(date && time && people);
  const reserve = () => {
    if (!date || !time || !people) return;
    const url = whatsappUrl(buildMessage(date, time, people));
    // Opened without "noopener" so a blocked pop-up can be detected (null); the link to this page is cut right after.
    const win = window.open(url, "_blank");
    if (!win) {
      setSent("blocked");
      return;
    }
    win.opener = null;
    setSent("opened");
  };

  const message = date && time && people ? whatsappUrl(buildMessage(date, time, people)) : "";

  return (
    <dialog
      ref={dialogRef}
      className="rsv"
      aria-labelledby="rsv-title"
      aria-describedby="rsv-desc"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onKeyDown={(event) => {
        // Keep Tab inside the panel (the native dialog would let it reach the browser UI).
        if (event.key !== "Tab") return;
        const items = [
          ...(dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ) ?? []),
        ].filter((el) => el.offsetParent !== null && el.tabIndex >= 0);
        const first = items[0];
        const last = items.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
    >
      <MotionConfig reducedMotion="user">
        <AnimatePresence onExitComplete={finishClose}>
          {visible && (
            <motion.div
              key="scrim"
              className="rsv-scrim"
              onClick={requestClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.24 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          )}
          {visible && (
            <motion.div
              key="panel"
              className="rsv-panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease } }}
              exit={{ opacity: 0, y: 24, transition: { duration: 0.2, ease: "easeIn" } }}
            >
              <div className="rsv-grip" aria-hidden="true" />
              <header className="rsv-head">
                <div>
                  <h2 id="rsv-title" className="rsv-title">
                    Reserve sua mesa
                  </h2>
                  <p id="rsv-desc" className="rsv-desc">
                    Escolha a data, o horário e o número de pessoas. A equipe confirma a
                    disponibilidade pelo WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  className="rsv-close"
                  onClick={requestClose}
                  aria-label="Fechar"
                >
                  <X aria-hidden="true" strokeWidth={1.4} />
                </button>
              </header>

              <div className="rsv-progress">
                <span className="sr-only">{`Etapa ${step + 1} de 3`}</span>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`rsv-dot ${i <= step ? "is-on" : ""}`}
                    aria-hidden="true"
                  />
                ))}
                <span className="rsv-progress-text" aria-hidden="true">
                  {step + 1} de 3
                </span>
              </div>

              {step > 0 && date && (
                <div className="rsv-summary">
                  <button type="button" className="rsv-back" onClick={() => go((step - 1) as Step)}>
                    <ArrowLeft aria-hidden="true" strokeWidth={1.2} />
                    <span className="sr-only">Voltar para a etapa anterior</span>
                  </button>
                  <p>
                    <span>{formatDateShort(date)}</span>
                    {step === 2 && time && <span> · {formatSlot(time)}</span>}
                  </p>
                  <button type="button" className="rsv-change" onClick={() => go(0)}>
                    Alterar
                  </button>
                </div>
              )}

              <motion.div
                className="rsv-body"
                animate={{ height: bodyHeight }}
                transition={{ duration: 0.24, ease }}
              >
                <div ref={bodyRef}>
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.section
                      key={step}
                      custom={dir}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      aria-labelledby={`rsv-q${step}`}
                    >
                      {step === 0 && <DateStep now={now} value={date} onPick={pickDate} />}
                      {step === 1 && date && (
                        <TimeStep
                          date={date}
                          now={now}
                          value={time}
                          onPick={pickTime}
                          onOtherDay={() => go(0)}
                        />
                      )}
                      {step === 2 && <PeopleStep value={people} onPick={setPeople} />}
                    </motion.section>
                  </AnimatePresence>
                </div>
              </motion.div>

              {step === 2 && (
                <footer className="rsv-foot">
                  <button
                    type="button"
                    className="rsv-cta"
                    disabled={!ready}
                    aria-disabled={!ready}
                    onClick={reserve}
                    data-cta="reserva-whatsapp"
                  >
                    Reservar agora
                  </button>
                  <p className="rsv-note" aria-live="polite">
                    {sent === "opened" ? (
                      <>
                        Abrimos o WhatsApp com a sua mensagem. A reserva é confirmada após a
                        resposta da equipe.
                      </>
                    ) : sent === "blocked" ? (
                      <>
                        Não conseguimos abrir o WhatsApp.{" "}
                        <a
                          href={message}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rsv-link"
                        >
                          Toque aqui para abrir
                        </a>{" "}
                        ou ligue para a equipe.
                      </>
                    ) : (
                      <>
                        Você será direcionado ao WhatsApp. A reserva será confirmada após a resposta
                        da equipe.
                      </>
                    )}
                  </p>
                </footer>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </dialog>
  );
}

// ---------------------------------------------------------------- step 1: date

const weekdayHeads = [
  ["Seg", "segunda-feira"],
  ["Ter", "terça-feira"],
  ["Qua", "quarta-feira"],
  ["Qui", "quinta-feira"],
  ["Sex", "sexta-feira"],
  ["Sáb", "sábado"],
  ["Dom", "domingo"],
] as const;

/** "Fechado às segundas. Reservas para os próximos 14 dias." — written from the configuration. */
const closedDays = (Object.keys(schedule) as unknown as Weekday[])
  .map(Number)
  .filter((d) => !schedule[d as Weekday].salon)
  .map((d) => `${weekdayNames[d as Weekday].replace("-feira", "")}s`);
const calendarLegend = [
  closedDays.length ? `Fechado às ${closedDays.join(" e ")}.` : "",
  `Reservas para os próximos ${reservationConfig.bookingWindowDays} dias.`,
]
  .filter(Boolean)
  .join(" ");

const stateLabel = {
  past: "data passada",
  closed: "fechado",
  outside: "fora do período de reservas",
};

function DateStep({
  now,
  value,
  onPick,
}: {
  now: Date;
  value: Date | null;
  onPick: (d: Date) => void;
}) {
  const today = startOfDay(now);
  const last = lastBookableDay(now);
  const [view, setView] = useState(() => {
    const base = value ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const grid = monthGrid(view.getFullYear(), view.getMonth());
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = view < new Date(last.getFullYear(), last.getMonth(), 1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Roving focus: one day is tabbable; arrow keys move between selectable days.
  const firstAvailable = grid.flat().find((d) => d && dayState(d, now) === "available") ?? null;
  const [focusDay, setFocusDay] = useState<Date | null>(null);
  const tabbable =
    (focusDay && focusDay.getMonth() === view.getMonth() && focusDay) ||
    (value && value.getMonth() === view.getMonth() && value) ||
    firstAvailable;

  const moveFocus = (from: Date, delta: number) => {
    let next = addDays(from, delta);
    for (let i = 0; i < 31; i++) {
      if (dayState(next, now) === "available") break;
      next = addDays(next, delta > 0 ? 1 : -1);
    }
    if (dayState(next, now) !== "available") return;
    if (next.getMonth() !== view.getMonth())
      setView(new Date(next.getFullYear(), next.getMonth(), 1));
    setFocusDay(next);
    window.requestAnimationFrame(() =>
      gridRef.current
        ?.querySelector<HTMLButtonElement>(`[data-day="${next.toDateString()}"]`)
        ?.focus(),
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, day: Date) => {
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    const delta = deltas[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    moveFocus(day, delta);
  };

  return (
    <div>
      <h3 id="rsv-q0" className="rsv-q">
        Que dia você quer reservar?
      </h3>
      <div className="rsv-cal">
        <div className="rsv-cal-head">
          <p className="rsv-month" aria-live="polite">
            {formatMonth(view).replace(" de ", " ")}
          </p>
          <div className="flex">
            <button
              type="button"
              className="rsv-nav"
              disabled={!canPrev}
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
              aria-label="Mês anterior"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.3} />
            </button>
            <button
              type="button"
              className="rsv-nav"
              disabled={!canNext}
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
              aria-label="Próximo mês"
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.3} />
            </button>
          </div>
        </div>
        <div ref={gridRef} role="group" aria-label={formatMonth(view)}>
          <div className="rsv-week rsv-week-head" aria-hidden="true">
            {weekdayHeads.map(([short]) => (
              <span key={short}>{short}</span>
            ))}
          </div>
          {grid.map((week, w) => (
            <div key={w} className="rsv-week">
              {week.map((day, i) => {
                if (!day) return <span key={i} aria-hidden="true" />;
                const state = dayState(day, now);
                const selected = Boolean(value && sameDay(day, value));
                const isToday = sameDay(day, today);
                const available = state === "available";
                return (
                  <button
                    key={i}
                    type="button"
                    data-day={day.toDateString()}
                    className={`rsv-day is-${state} ${selected ? "is-selected" : ""} ${isToday ? "is-today" : ""}`}
                    disabled={!available}
                    tabIndex={tabbable && sameDay(day, tabbable) ? 0 : -1}
                    aria-pressed={selected}
                    aria-current={isToday ? "date" : undefined}
                    aria-label={`${formatDateLong(day)}${isToday ? ", hoje" : ""}${available ? "" : `, ${stateLabel[state as keyof typeof stateLabel]}`}`}
                    onClick={() => onPick(day)}
                    onKeyDown={(event) => onKeyDown(event, day)}
                    onFocus={() => setFocusDay(day)}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="rsv-legend">{calendarLegend}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- step 2: time

function TimeStep({
  date,
  now,
  value,
  onPick,
  onOtherDay,
}: {
  date: Date;
  now: Date;
  value: string | null;
  onPick: (t: string) => void;
  onOtherDay: () => void;
}) {
  const slots = slotsFor(date, now);
  const none = !slots.some((slot) => slot.available);

  if (none) {
    return (
      <div className="rsv-empty">
        <h3 id="rsv-q1" className="rsv-q">
          Não encontramos horários para esta data
        </h3>
        <p className="rsv-empty-text">Escolha outro dia ou fale diretamente com nossa equipe.</p>
        <div className="rsv-empty-actions">
          <button type="button" className="rsv-ghost" onClick={onOtherDay}>
            Escolher outro dia
          </button>
          <a href={teamChatUrl()} target="_blank" rel="noopener noreferrer" className="rsv-ghost">
            Falar com a equipe
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 id="rsv-q1" className="rsv-q">
        Qual horário você prefere?
      </h3>
      <div className="rsv-slots" role="group" aria-labelledby="rsv-q1">
        {slots.map((slot) => {
          const selected = value === slot.time;
          return (
            <button
              key={slot.time}
              type="button"
              className={`rsv-slot ${selected ? "is-selected" : ""}`}
              disabled={!slot.available}
              aria-pressed={selected}
              aria-label={`${formatSlot(slot.time)}${slot.available ? "" : ", indisponível"}`}
              onClick={() => onPick(slot.time)}
            >
              {formatSlot(slot.time)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- step 3: people

function PeopleStep({ value, onPick }: { value: number | null; onPick: (n: number) => void }) {
  const { minPeople, maxPeople, largeGroupThreshold } = reservationConfig;
  const options = Array.from({ length: maxPeople - minPeople + 1 }, (_, i) => minPeople + i);

  return (
    <div>
      <h3 id="rsv-q2" className="rsv-q">
        Mesa para quantas pessoas?
      </h3>
      <div className="rsv-people" role="group" aria-labelledby="rsv-q2">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            className={`rsv-person ${value === n ? "is-selected" : ""}`}
            aria-pressed={value === n}
            aria-label={peopleLabel(n)}
            onClick={() => onPick(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="rsv-people-now" aria-live="polite">
        {value ? peopleLabel(value) : "Escolha o número de pessoas"}
      </p>
      {value !== null && value > largeGroupThreshold && (
        <p className="rsv-hint">
          Para grupos com mais de {largeGroupThreshold} pessoas, consulte nossa equipe.
        </p>
      )}
    </div>
  );
}
