"use client";

import React from "react";
import { Event } from "@/data/events";

const EventCard: React.FC<{
  event: Event;
}> = ({ event }) => {
  // Перевірка і обробка дати
  const eventDate = typeof event.date === "string" 
    ? new Date(event.date) 
    : event.date?.toDate?.() || new Date(event.date.seconds * 1000);

  const formattedDate = eventDate?.toLocaleString() ?? "Unknown date";

  return (
    <div className="border p-4 mb-4 rounded-lg shadow-md relative">
      <h3 className="font-bold text-xl">{event.title}</h3>
      <p className="text-gray-500">{formattedDate}</p>
      <p className="mt-2">{event.description}</p>
      <span
        className={`mt-2 inline-block rounded px-2 py-1 text-white ${
          event.priority === "critical"
            ? "bg-red-600"
            : event.priority === "important"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      >
        {event.priority}
      </span>
    </div>
  );
};

export default EventCard;
