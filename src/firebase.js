// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJNkFoB5AQS7xzztC5j2uzYJ2s_H_YrN8",
  authDomain: "kaudit-140e5.firebaseapp.com",
  projectId: "kaudit-140e5",
  storageBucket: "kaudit-140e5.appspot.com", // Corrige el storageBucket
  messagingSenderId: "75100691777",
  appId: "1:75100691777:web:1818653e9b1e75180855c0",
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa y exporta la instancia de autenticación
export const auth = getAuth(firebaseApp);

// Exporta la app por si necesitas usarla en otro lugar
export default firebaseApp;

