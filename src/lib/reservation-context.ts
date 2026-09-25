import { createContext, useContext } from "react";

type ReservationApi = { openReservation: (trigger?: HTMLElement | null) => void };

export const ReservationContext = createContext<ReservationApi>({
  openReservation: () => undefined,
});

/** Every "Reservar" button calls this; the panel is mounted once, at the page root. */
export const useReservation = () => useContext(ReservationContext);
