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

  // Конвертація подій з Firebase Timestamp у Date
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

  // Обробка кліку по події
  const handleSelectEvent = (event: Event) => {
    onEditEvent(event);
  };

  // Обробка кліку по порожній клітинці для створення події
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

  // Обробка зміни виду (місяць, тиждень, день)
  const handleViewChange = (view: View) => {
    console.log("View changed to:", view);
    setCurrentView(view);
  };

  // Обробка зміни дати при навігації
  const handleNavigate = (date: Date) => {
    console.log("Navigated to:", date);
    setCurrentDate(date);
  };

  // Стилізація подій за пріоритетом
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
    <div className="p-2">
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
      />
    </div>
  );
};

export default Calendar;
