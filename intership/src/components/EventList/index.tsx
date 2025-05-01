"use client";

import React from "react";
import { Event } from "@/data/events";
import EventCard from "@/components/EventCard";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDeleteSuccess: () => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onEdit,
  onDeleteSuccess,
}) => {
  return (
    <div>
      {/* Список подій */}
      <div>
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              onClick={() => onEdit(event)} // Відкриваємо модалку через Dashboard
              className="cursor-pointer"
            >
              <EventCard
                event={event}
               
              />
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
