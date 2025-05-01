import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

export interface Event {
  id?: string;
  title: string;
  date: Timestamp;
  description: string;
  priority: "normal" | "important" | "critical";
  userId?: string;
}
const eventsCollection = collection(db, "events");

// ======= 🟢 CREATE (для продакшену) =======
export const createEvent = async (event: Event) => {
  return await addDoc(eventsCollection, event);
};

// ======= 🔵 READ (з можливістю фільтрувати по userId) =======
export const fetchEvents = async (userId?: string): Promise<Event[]> => {
  const q = userId
    ? query(eventsCollection, where("userId", "==", userId))
    : eventsCollection;

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[];
};

// ======= 🟡 UPDATE =======
export const updateEvent = async (id: string, event: Partial<Event>) => {
  const eventRef = doc(db, "events", id);
  return await updateDoc(eventRef, event);
};

// ======= 🔴 DELETE =======
export const deleteEvent = async (id: string) => {
  const eventRef = doc(db, "events", id);
  return await deleteDoc(eventRef);
};

// ======= 🔍 GET BY ID =======
export const getEvent = async (id: string): Promise<Event | null> => {
  const eventRef = doc(db, "events", id);
  const snapshot = await getDoc(eventRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Event;
};

// ======= 🧪 TEST-ФУНКЦІЇ для перевірки (залишено для дебагу) =======
export const addTestEvent = async () => {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      title: "Test Event",
      description: "This is a test event",
      date: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllEventsConsole = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
