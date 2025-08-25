// script.js
import { auth, db, storage } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { 
  collection, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* ---------- UI References ---------- */
const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");
const dashboard = document.getElementById("dashboard");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

const goLogin = document.getElementById("goLogin");
const goSignup = document.getElementById("goSignup");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const googleLoginBtn = document.getElementById("googleLoginBtn");

const cardsContainer = document.getElementById("cardsContainer");

/* ---------- Navigation ---------- */
goLogin?.addEventListener("click", () => {
  signupSection.style.display = "none";
  loginSection.style.display = "block";
});

goSignup?.addEventListener("click", () => {
  loginSection.style.display = "none";
  signupSection.style.display = "block";
});

/* ---------- Signup ---------- */
signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful! Please login.");
    signupSection.style.display = "none";
    loginSection.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
});

/* ---------- Login ---------- */
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.message);
  }
});

/* ---------- Google Login ---------- */
googleLoginBtn?.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert(error.message);
  }
});

/* ---------- Logout ---------- */
logoutBtn?.addEventListener("click", async () => {
  await signOut(auth);
});

/* ---------- Auth State ---------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.style.display = "none";
    signupSection.style.display = "none";
    dashboard.style.display = "block";
    loadCards();
  } else {
    loginSection.style.display = "block";
    signupSection.style.display = "none";
    dashboard.style.display = "none";
  }
});

/* ---------- Load Cards from Firestore ---------- */
async function loadCards() {
  cardsContainer.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "cards"));
    querySnapshot.forEach((doc) => {
      const card = doc.data();
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <p>Price: ₹${card.price}</p>
        <p>Balance Value: ₹${card.balance}</p>
        <button onclick="buyCard('${doc.id}')">Buy</button>
      `;
      cardsContainer.appendChild(cardElement);
    });
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

/* ---------- Purchase Flow ---------- */
window.buyCard = function (cardId) {
  alert("To purchase this card, please scan the QR code & upload receipt in Payment Section.");
  // 🔥 Next step: Payment section implementation (QR + upload receipt + admin approval)
};
