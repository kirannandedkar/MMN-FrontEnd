import CalendarIcon from "@/components/icons/CalendarIcon";
import NavigationIcon from "@/components/icons/Navigation";
import Image from "next/image";
import React from "react";
import { ICompact } from "../types/Interfaces";
import EventButton from "./EventButton";


const EventPane: React.FC<{ event: ICompact }> = ({ event }) => (
  <div className="flex flex-col md:flex-row bg-gray-100 rounded p-4 mb-4">
    <Image
         src={event.eventImagePath}
         alt={event.name}
         className="rounded-lg md:mb-0 md:mr-4"
         style={{height: '170px', width: '350px'}}
         width={300}
         height={100}
    />
   
    <div className="w-full md:w-2/3">
      <h3 className="text-lg font-bold mb-2">{event.name}</h3>
      <p>
      <NavigationIcon/> {event.eventAddress}
      </p>
      <p className="mb-4">
        <CalendarIcon/> {event.eventDate}
      </p>
      {<EventButton isEventFinished={event.isEventFinished} isEventOpenedForRegistration={event.isEventOpenedForRegistration}/>}
    </div>
  </div>
);

export default EventPane;
