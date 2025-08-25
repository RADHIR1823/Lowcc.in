// firebase.js

// Import Firebase SDK (Modular v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdgoa5tORvgHd0mO8K5jNMzjb97dDCIQU",
  authDomain: "lowcc2494.firebaseapp.com",
  projectId: "lowcc2494",
  storageBucket: "lowcc2494.firebasestorage.app", // ⚡ ఇది firebaseలో సరిచూసుకో (కొన్నిసార్లు "firebasestorage.googleapis.com" ఉంటుంది)
  messagingSenderId: "291411894367",
  appId: "1:291411894367:web:2e56c5794fc3dd87763bea",
  measurementId: "G-QDMB18HE39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);        // For Login/Signup
const db = getFirestore(app);     // For storing user & card data
const storage = getStorage(app);  // For receipts/screenshots/PDF upload
const analytics = getAnalytics(app); // For analytics (optional)

// Export services to use in other files (script.js, admin.js, etc.)
export { auth, db, storage };
