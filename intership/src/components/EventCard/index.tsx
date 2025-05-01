"use client";

import React from "react";
import { deleteEvent, Event } from "@/data/events";

const EventCard: React.FC<{
  event: Event;
  onEdit: (event: Event) => void;
  onDeleteSuccess?: () => void;
}> = ({ event, onEdit, onDeleteSuccess }) => {
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      if (!event.id) {
        console.error("Event ID is undefined. Cannot delete event.");
        return;
      }
      await deleteEvent(event.id);
      onDeleteSuccess?.();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

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

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(event)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
