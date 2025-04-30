// Подключення до Firebase
import { db } from './firebase'; // Імпортуємо підключення до Firestore
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Імпортуємо необхідні функції з Firebase Firestore

// Додавання нової події в Firestore
const addEvent = async () => {
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

// Отримання всіх подій з Firestore
const getEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

// Виклик функцій для перевірки
addEvent(); // Викликаємо для додавання нової події
getEvents(); // Викликаємо для отримання подій з Firestore
