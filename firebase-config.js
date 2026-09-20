/* ==========================================================
   FIREBASE CONFIG — TÍLDATE
   Este archivo solo contiene tu configuración de Firebase.
   Si algún día cambias de proyecto, solo reemplazas este archivo.
=========================================================== */
const firebaseConfig = {
  apiKey: "AIzaSyAku0PvcFJWZThTgZSMNjD_r7EBrV9dtPA",
  authDomain: "tildate-6185c.firebaseapp.com",
  databaseURL: "https://tildate-6185c-default-rtdb.firebaseio.com",
  projectId: "tildate-6185c",
  storageBucket: "tildate-6185c.firebasestorage.app",
  messagingSenderId: "417345816804",
  appId: "1:417345816804:web:2db159c7b437f3b65a44f1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
