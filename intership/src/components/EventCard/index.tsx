"use client";

import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/data/firebase";

interface Event {
  id: string;
  title: string;
  date: any; // або Timestamp
  description: string;
  priority: "normal" | "important" | "critical";
}

const EventCard: React.FC<{
  event: Event;
  onEdit: (event: Event) => void;
  onDeleteSuccess?: () => void;
}> = ({ event, onEdit, onDeleteSuccess }) => {
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "events", event.id));
      onDeleteSuccess?.();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div className="border p-4 mb-4 rounded-lg shadow-md relative">
      <h3 className="font-bold text-xl">{event.title}</h3>
      <p className="text-gray-500">
        {event.date?.toDate?.().toLocaleString() ??
          new Date(event.date.seconds * 1000).toLocaleString()}
      </p>
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
