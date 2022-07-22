import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2Q_9J-tKZK1FjPEui1SneX38mVZEr7Tk",
  authDomain: "chat-app-vercel.firebaseapp.com",
  projectId: "chat-app-vercel",
  storageBucket: "chat-app-vercel.appspot.com",
  messagingSenderId: "1069542585360",
  appId: "1:1069542585360:web:fb3fef6af9bfd56f68c695"
};

export const app = initializeApp(firebaseConfig, 'dasd')
export const db = getFirestore(app)

export default app
