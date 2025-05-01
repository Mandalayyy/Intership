"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/store/eventsSlice";
import { RootState } from "@/store/store";
import EventList from "@/components/EventList"; // Компонент списку подій
import Calendar from "@/components/Calendar"; // Компонент календаря
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
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list"); // Режим перегляду
  const [searchQuery, setSearchQuery] = useState(""); // Пошуковий запит
  const [priorityFilter, setPriorityFilter] = useState<"normal" | "important" | "critical" | "">(""); // Фільтр за важливістю

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

  // Функція для фільтрації подій
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      !priorityFilter || event.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

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
        <Modal isOpen={showAddEvent} onClose={handleCloseForm}>
          <EventForm
            eventId={editingEvent?.id}
            onClose={handleCloseForm}
            initialData={editingEvent || undefined}
          />
        </Modal>
      )}

      {/* Пошук подій */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events"
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Фільтр по важливості */}
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as "normal" | "important" | "critical" | "")}
        >
          <option value="">All Priorities</option>
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Перемикач між режимами календаря та списку */}
      <div className="mb-4">
        <button
          onClick={() => setViewMode(viewMode === "calendar" ? "list" : "calendar")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          {viewMode === "calendar" ? "Switch to List View" : "Switch to Calendar View"}
        </button>
      </div>

      {/* Відображення календаря або списку подій в залежності від вибраного режиму */}
      {viewMode === "calendar" ? (
        <Calendar
          events={filteredEvents} // Передаємо відфільтровані події в календар
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteSuccess}
        />
      ) : (
        <EventList
          events={filteredEvents} // Передаємо відфільтровані події в список
          onEdit={handleEditEvent}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
