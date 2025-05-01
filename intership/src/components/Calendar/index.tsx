"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import { Event } from "@/data/events";

const localizer = momentLocalizer(moment);

type CalendarProps = {
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
};

const Calendar: React.FC<CalendarProps> = ({ events, onEditEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month");

  const convertedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start:
        event.date instanceof Timestamp
          ? event.date.toDate()
          : new Date(event.date),
      end:
        event.date instanceof Timestamp
          ? event.date.toDate()
          : new Date(event.date),
      title: event.title,
    }));
  }, [events]);

  const handleSelectEvent = (event: Event) => {
    onEditEvent(event);
  };

  const handleSelectSlot = (slotInfo: {
    start: Date;
    end: Date;
    slots: Date[];
    action: "select" | "click" | "doubleClick";
  }) => {
    const newEvent: Event = {
      title: "",
      description: "",
      priority: "normal",
      date: Timestamp.fromDate(slotInfo.start),
      userId: "",
    };
    onEditEvent(newEvent);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const eventStyleGetter = (event: Event) => {
    let bgColor = "#3174ad";
    if (event.priority === "important") bgColor = "#eab308";
    if (event.priority === "critical") bgColor = "#dc2626";

    return {
      style: {
        backgroundColor: bgColor,
        color: "white",
        borderRadius: "5px",
        padding: "2px 4px",
        border: "none",
      },
    };
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={convertedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        popup
        views={["month", "week", "day"]}
        view={currentView}
        onView={handleViewChange}
        date={currentDate}
        onNavigate={handleNavigate}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        className="bg-gray-100 rounded-lg"
      />
    </div>
  );
};

export default Calendar;
