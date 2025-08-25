// payment.js
import { auth, db, storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const paymentForm = document.getElementById("paymentForm");
let currentUser = null;

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    alert("You must be logged in to make a payment!");
    window.location.href = "index.html";
  }
});

// Handle payment receipt upload
paymentForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.getElementById("receipt").files[0];

  if (!file) {
    alert("Please upload your receipt!");
    return;
  }

  try {
    // Upload receipt to Firebase Storage
    const storageRef = ref(storage, `receipts/${currentUser.uid}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    // Save record in Firestore
    await addDoc(collection(db, "payments"), {
      userId: currentUser.uid,
      email: currentUser.email,
      receiptUrl: downloadURL,
      status: "pending",
      timestamp: serverTimestamp()
    });

    alert("Payment receipt uploaded successfully! Admin will verify soon.");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error uploading receipt:", error);
    alert("Error uploading receipt. Try again!");
  }
});
