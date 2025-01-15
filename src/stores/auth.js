import { defineStore } from 'pinia';
import { auth } from '@/firebase'; // Importamos la instancia de Firebase Auth
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Información del usuario logueado
    isAuthenticated: false, // Estado de autenticación
  }),
  actions: {
    // login(email, password): Usa signInWithEmailAndPassword de Firebase para autenticar al usuario.
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        console.log('Inicio de sesión exitoso:', this.user);
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
      }
    },
    // register(email, password): Usa createUserWithEmailAndPassword para registrar un nuevo usuario.
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        console.log('Registro exitoso:', this.user);
      } catch (error) {
        console.error('Error al registrarse:', error.message);
      }
    },
    //logout(): Usa signOut para cerrar sesión y limpiar el estado.
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.isAuthenticated = false;
        console.log('Cierre de sesión exitoso');
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
      }
    },
  },
});

