// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase para tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyA1douKt_-mrKhRk61mIgQMlRfS1NGJQqs",
  authDomain: "backend-database-44031.firebaseapp.com",
  projectId: "backend-database-44031",
  storageBucket: "backend-database-44031.firebasestorage.app",
  messagingSenderId: "512267130055",
  appId: "1:512267130055:web:c7c92d257c5a3f81b75ae2",
  measurementId: "G-S9QVQMNB52"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Analytics (opcional, si lo usas)
const analytics = getAnalytics(app);

export default app; // Exporta la app para usarla en otras partes del proyecto
