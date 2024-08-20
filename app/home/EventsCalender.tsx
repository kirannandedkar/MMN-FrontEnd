"use client";

import MMNButton from "@/components/MMNButton";
import MMNTitle from "@/components/MMNTItle";
import { useEffect, useState } from "react";
import { GET } from "@/utils/fetch-factory";
import SectionLoader from "@/components/SectionLoader";
import NavigationIcon from "@/components/icons/Navigation";
import Image from "next/image";
import EventButton from "../events/EventButton";

export interface EventResponseDto {
  id: number;
  name: string;
  description: string;
  createdOn: string;
  eventDate: EventDateResponseDto;
  eventImagePath: string;
  eventAddress: string;
  isEventOpenedForRegistration: boolean;
  isEventFinished: boolean;
  eventRegistrationLink: string;
  isEventRegistrationClosed: boolean
}

export interface EventDateResponseDto {
  day: string;
  month: string;
  year: string;
  dayOfWeek: string;
}

export interface EventDateResponseDto {
  day: string;
  month: string;
  year: string;
  dayOfWeek: string;
}

function EventsCalendar() {
  const initialEvents: EventResponseDto[] = [];
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventResponseDto[]>(initialEvents);

  useEffect(() => {
    const fetchUserSubscription = async () => {
      const result = await GET("/proxy/events");
      setLoading(false);
      setEvents(result);
    };
    fetchUserSubscription();
  }, []);

  return (
    <div>
      <MMNTitle title="Events Calendar" className="pb-4" color="purple" />
      <div
        className="w-fullbg-white overflow-auto p-2"
        style={{ height: "350px" }}
      >
        <div className="flex flex-col space-y-4 mt-4">
          {loading ? (
            <SectionLoader />
          ) : (
            events.map((event, index) => (
              <div key={index} className="flex items-center pb-4">
                <div className="flex-shrink-0 text-center w-20">
                  <div className="">{event.eventDate.dayOfWeek}</div>
                  <div className="text-xl font-bold p-2">
                    {event.eventDate.day}
                  </div>
                  <div className="">
                    {event.eventDate.month} '{event.eventDate.year}
                  </div>
                </div>
                <Image
                  src={event.eventImagePath}
                  alt={event.name}
                  width={140}
                  height={140}
                  className="mx-2"
                />
                <div className="flex-1 self-start">
                  <div className="text-lg font-semibold">{event.name}</div>
                  <div>
                    <NavigationIcon />
                    <span className="ms-1">{event.eventAddress}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ms-2">
                  {
                    <EventButton
                      isEventRegistrationClosed={event.isEventRegistrationClosed}
                      eventRegistrationLink={event.eventRegistrationLink}
                      isEventFinished={event.isEventFinished}
                      isEventOpenedForRegistration={
                        event.isEventOpenedForRegistration
                      }
                    />
                  }
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsCalendar;
