"use client";

import React, { useEffect } from "react";
import { Event } from "@/data/events";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/data/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/store/eventsSlice";
import EventCard from "@/components/EventCard";
import EventForm from "@/components/EventForm";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";
const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { events, loading, error } = useSelector((state: RootState) => state.events);

  const [editingEvent, setEditingEvent] = React.useState<Event | null>(null);
  const [showAddEvent, setShowAddEvent] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchEvents(user.uid));
      }
    });

    return () => unsubscribe();  
  }, [dispatch]);

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowAddEvent(true);
  };

  const handleDeleteSuccess = () => {
    const user = auth.currentUser;
    if (user) {
      dispatch(fetchEvents(user.uid));
    }
  };

  const handleCloseForm = () => {
    setEditingEvent(null);
    setShowAddEvent(false);
    const user = auth.currentUser;
    if (user) {
      dispatch(fetchEvents(user.uid));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="my-4">
        <button
          onClick={() => {
            setEditingEvent(null);
            setShowAddEvent(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      {showAddEvent && (
        <EventForm
          eventId={editingEvent?.id}
          onClose={handleCloseForm}
          initialData={editingEvent || undefined}
        />
      )}

      <div>
        {loading ? (
          <p>Loading...</p> 
        ) : error ? (
          <p>Error: {error}</p> 
        ) : events.length === 0 ? (
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
