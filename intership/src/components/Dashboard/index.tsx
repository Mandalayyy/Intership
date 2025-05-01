"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/store/eventsSlice";
import { RootState } from "@/store/store";
import EventList from "@/components/EventList";
import Calendar from "@/components/Calendar"; 
import Modal from "@/components/Modal";
import EventForm from "@/components/EventForm";
import { Event } from "@/data/events";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/data/firebase";
import { useAppDispatch } from "@/hooks/useAppDispatch";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list"); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [priorityFilter, setPriorityFilter] = useState<"normal" | "important" | "critical" | "">(""); 

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

 
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      !priorityFilter || event.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            setEditingEvent(null);
            setShowAddEvent(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md transition duration-300"
        >
          Add Event
        </button>
        <button
          onClick={() => setViewMode(viewMode === "calendar" ? "list" : "calendar")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow-md transition duration-300"
        >
          {viewMode === "calendar" ? "Switch to List View" : "Switch to Calendar View"}
        </button>
      </div>

      {showAddEvent && (
        <Modal isOpen={showAddEvent} onClose={handleCloseForm}>
          <EventForm
            eventId={editingEvent?.id}
            onClose={handleCloseForm}
            initialData={editingEvent || undefined}
          />
        </Modal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 overflow-visible">
        <input
          type="text"
          placeholder="Search events"
          className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as "normal" | "important" | "critical" | "")}
        >
          <option value="">All Priorities</option>
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {viewMode === "calendar" ? (
        <Calendar
          events={filteredEvents} 
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteSuccess}
        />
      ) : (
        <EventList
          events={filteredEvents}
          onEdit={handleEditEvent}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
