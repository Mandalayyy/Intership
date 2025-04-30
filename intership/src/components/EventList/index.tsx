// components/EventList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/data/firebase"; // Ваш Firebase конфіг

const EventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      const fetchEvents = async () => {
        try {
          const q = query(
            collection(db, "events"),
            where("userId", "==", auth.currentUser?.uid || "")
          );
          const querySnapshot = await getDocs(q);
          const eventsData = querySnapshot.docs.map((doc) => doc.data());
          setEvents(eventsData);
        } catch (error) {
          console.error("Error fetching events: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="border-b p-4">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date.seconds * 1000).toLocaleString()}</p>
            <p>Priority: {event.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
