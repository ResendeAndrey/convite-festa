import { createContext, useContext } from "react";

export interface EventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  gift_description: string;
}

export interface EventDetailsContextType {
  eventDetails: EventDetails;
  calendarUrl: string;
  calendarContent: string;
}


export const EventDetailsContext = createContext({} as EventDetailsContextType);



export const EventDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const eventDetails = {
    title: "90 anos de Maria Antonieta (Tuêta)",
    description: "Comemoração especial com amigos e família.",
    location: "R. Secundaria, 109 - Parque Andiara, Pedro Leopoldo - MG" + " (Spaço's Eventos)",
    startDate: "20260613T120000",
    endDate: "20260613T160000",
    gift_description: "Sua presença é o nosso maior presente! Caso deseje presentear, pedimos, por gentileza, fraldas geriátricas para doação a uma instituição de caridade."
  };

  const calendarContent = `BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:Festa Maria Antonieta (Tuêta)
  DTSTART:${eventDetails.startDate}
  DTEND:${eventDetails.endDate}
  LOCATION:${eventDetails.location}
  DESCRIPTION:Compareça ao evento especial!
  END:VEVENT
  END:VCALENDAR`;

  const blob = new Blob([calendarContent], { type: "text/calendar" });
  const calendarUrl = URL.createObjectURL(blob);



  return (
    <EventDetailsContext.Provider value={{ eventDetails, calendarUrl, calendarContent }}>
      {children}
    </EventDetailsContext.Provider>
  );
};



export const useEventDetails = () => {
  const context = useContext(EventDetailsContext);
  if (!context) {
    throw new Error("useEventDetails must be used within a EventDetailsProvider");
  }
  return context;
}