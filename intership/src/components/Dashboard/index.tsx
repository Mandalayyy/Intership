"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/data/firebase";
import EventCard from "@/components/EventCard";
import EventForm from "@/components/EventForm"; // Ваш компонент для додавання івентів

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]); // Стан для подій
  const [editingEvent, setEditingEvent] = useState<any | null>(null); // Стан для редагування
  const [showAddEvent, setShowAddEvent] = useState(false); // Стан для показу форми додавання

  useEffect(() => {
    const fetchEvents = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "events"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };

    fetchEvents();
  }, [auth.currentUser]);

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setShowAddEvent(true); // Відкрити форму редагування
  };

  const handleDeleteSuccess = () => {
    if (!editingEvent) return; // Перевірка на наявність editingEvent
    setEvents(events.filter((event) => event.id !== editingEvent.id)); // Оновити список після видалення
    setEditingEvent(null);
  };

  const handleCloseForm = () => {
    setEditingEvent(null);
    setShowAddEvent(false); // Закрити форму додавання/редагування
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="my-4">
        <button
          onClick={() => setShowAddEvent(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      {showAddEvent && (
        <EventForm
          eventId={editingEvent}
          onClose={handleCloseForm}
          initialData={editingEvent}
        />
      )}

      <div>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEditEvent}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
