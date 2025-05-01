"use client";

import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
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

      // Якщо дата є рядком, конвертуємо її в ISO формат для input type="datetime-local"
      if (typeof initialData.date === "string") {
        const parsedDate = new Date(initialData.date);
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate.toISOString().slice(0, 16)); // Форматуємо для datetime-local
        }
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
      if (onClose) onClose();
    } catch (err) {
      console.error("Error saving event", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{eventId ? "Edit" : "Add"} Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Title"
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Description"
          rows={4}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "normal" | "important" | "critical")}
          className="w-full p-2 border rounded"
        >
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {eventId ? "Update" : "Add"} Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
