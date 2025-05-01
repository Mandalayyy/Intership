"use client";

import React from "react";
import { Event } from "@/data/events";

const EventCard: React.FC<{
  event: Event;
}> = ({ event }) => {
  const eventDate = typeof event.date === "string" 
    ? new Date(event.date) 
    : event.date?.toDate?.() || new Date(event.date.seconds * 1000);

  const formattedDate = eventDate?.toLocaleString() ?? "Unknown date";

  return (
    <div className="border border-gray-200 p-6 mb-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl text-gray-800">{event.title}</h3>
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${
            event.priority === "critical"
              ? "bg-red-600"
              : event.priority === "important"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
        </span>
      </div>
      <p className="text-sm text-gray-500">{formattedDate}</p>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventCard;
