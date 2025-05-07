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
    title: "60 anos de casamento de Maria José e Tunico",
    description: "Comemoração especial com amigos e família.",
    location: "R. Nossa Sra. do Rosário, 1599 - Espraiado, Pedro Leopoldo - MG" + " (Vera Cruz de Minas)",
    startDate: "20250531T120000",
    endDate: "20250531T160000",
    gift_description: "Sua presença é o nosso maior presente! Caso deseje presentear, pedimos, por gentileza, 2 kg de alimentos não perecíveis, que serão destinados a uma causa solidária"
  };

  const calendarContent = `BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:Festa Maria Jose e Tunico
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