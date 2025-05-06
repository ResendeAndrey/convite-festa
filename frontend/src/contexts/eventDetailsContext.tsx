import { createContext, useContext } from "react";

export interface EventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface EventDetailsContextType {
  eventDetails: EventDetails;
  calendarUrl: string;
}


export const EventDetailsContext = createContext({} as EventDetailsContextType);



export const EventDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const eventDetails = {
    title: "60 anos de casamento de Maria José e Tunico",
    description: "Comemoração especial com amigos e família.",
    location: "R. Nossa Sra. do Rosário, 1599 - Espraiado, Pedro Leopoldo - MG",
    startDate: "20250531T120000",
    endDate: "20250531T160000",
  };

  const calendarContent = `BEGIN:VCALENDAR
  VERSION:2.0
  BEGIN:VEVENT
  SUMMARY:${eventDetails.title}
  DESCRIPTION:${eventDetails.description}
  LOCATION:${eventDetails.location}
  DTSTART:${eventDetails.startDate}
  DTEND:${eventDetails.endDate}
  END:VEVENT
  END:VCALENDAR`;

  const calendarBlob = new Blob([calendarContent], { type: "text/calendar" });
  const calendarUrl = URL.createObjectURL(calendarBlob);


  return (
    <EventDetailsContext.Provider value={{ eventDetails, calendarUrl }}>
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