"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/data/firebase";
import { fetchEvents, Event, deleteEvent } from "@/data/events";
import EventCard from "@/components/EventCard";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    if (!auth.currentUser) return;

    setLoading(true);
    try {
      const data = await fetchEvents(auth.currentUser.uid);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      loadEvents();
    }
  }, [auth.currentUser]);

  const handleDeleteSuccess = () => {
    loadEvents(); // Перезавантажити список після видалення
  };

  const handleEdit = (event: Event) => {
    // Твоя логіка редагування
    console.log("Edit event", event);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={handleEdit}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))
      )}
    </div>
  );
};

export default EventList;
