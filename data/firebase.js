import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj6UA4rrTbjkDbx7H6AiL4tCPn2aHuDio",
  authDomain: "nextjs-chat-app-afbfd.firebaseapp.com",
  projectId: "nextjs-chat-app-afbfd",
  storageBucket: "nextjs-chat-app-afbfd.appspot.com",
  messagingSenderId: "332081449835",
  appId: "1:332081449835:web:e60bf59e73bfcd09679a2e"
};

export const app = initializeApp(firebaseConfig, 'dasd')
export const db = getFirestore(app)

export default app
