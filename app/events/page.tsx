"use client";
import React, { useEffect, useState } from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import EventPane from "../events/EventPane";
import MMNTitle from "@/components/MMNTItle";
import { ICompact } from "../types/Interfaces";
import { GET } from "@/utils/fetch-factory";
import { groupBy } from "@/utils/funcs";
import Loader from "@/components/Loader";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Events", link: "#" },
];

const EventsPage: React.FC = () => {

    const initialEvents: {month: string, events: ICompact[]}[] = [];
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<{month: string, events: ICompact[]}[]>(initialEvents);
  
    useEffect(() => {
      const fetchUserSubscription = async () => {
        const result = await GET("/proxy/events/current-year");

        const events = groupBy(result, 'eventMonth');
        let formattedEvents: {month: string, events: ICompact[]}[] = [];
        for (const eventMonth in events) {
            if (events.hasOwnProperty(eventMonth)) {
                formattedEvents.push({
                    month: eventMonth,
                    events: events[eventMonth] as ICompact[]
                })
            }
        }
        setEvents(formattedEvents)
        setLoading(false);
      };
      fetchUserSubscription();
    }, []);

    if(loading)
        return <Loader/>;
    
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      
      <div className="w-full xl:px-[90px] sm:px-[40px] px-[20px] gap-[40px] pb-[40px] lg:flex-row flex-row">
        <MMNTitle title="Events Calendar 2024" className="pb-4 mb-4" color="purple" />
        
        {events.map((monthData, monthIndex) => (
          <div key={monthIndex}>
            <div>
              <span className="bg-[#FF5733] text-white rounded text-xl font-bold py-2 px-4">{monthData.month}</span>
            </div>
            <div className="bg-white py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {monthData.events.map((event, eventIndex) => (
                <EventPane event={event} key={eventIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
