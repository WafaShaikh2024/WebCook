// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCi94br7Jyb4wdOksX-du0XhPZXaSelasI",
  authDomain: "recpies-451b1.firebaseapp.com",
  projectId: "recpies-451b1",
  storageBucket: "recpies-451b1.appspot.com",
  messagingSenderId: "965912795883",
  appId: "1:965912795883:web:c2836ae9bade2337a7fcae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
