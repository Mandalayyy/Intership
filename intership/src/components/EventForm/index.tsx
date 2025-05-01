"use client";

import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/data/firebase";
import { Event } from "@/data/events";

interface Props {
  initialData?: Event;
  eventId?: string;
  onClose?: () => void;
}

const EventForm: React.FC<Props> = ({ initialData, eventId, onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"normal" | "important" | "critical">("normal");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);

      const parsedDate =
        typeof initialData.date === "string"
          ? new Date(initialData.date)
          : initialData.date?.toDate?.() || new Date(initialData.date.seconds * 1000);

      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate.toISOString().slice(0, 16));
      }

      setDescription(initialData.description);
      setPriority(initialData.priority);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("You must be logged in");
      return;
    }

    const data = {
      title,
      date,
      description,
      priority,
      userId: auth.currentUser.uid,
    };

    try {
      if (eventId) {
        const eventRef = doc(db, "events", eventId);
        await updateDoc(eventRef, data);
      } else {
        await addDoc(collection(db, "events"), data);
      }
      onClose?.();
    } catch (err) {
      console.error("Error saving event", err);
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;

    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "events", eventId));
      onClose?.();
    } catch (err) {
      console.error("Error deleting event", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {eventId ? "Edit" : "Add"} Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          rows={4}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "normal" | "important" | "critical")}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md transition duration-300"
          >
            {eventId ? "Update" : "Add"} Event
          </button>
          {eventId && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow-md transition duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
