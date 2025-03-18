import { defineStore } from 'pinia';
import { auth, db, storage } from '@/firebase'; // Importamos la instancia de Firebase Auth
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

// Importaciones para crear colección users y poder subir la foto de usuario que vendrá del register
import { doc, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

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
        // Lanzar el error para que el componente lo capture
        throw new Error(error.message || "Error al iniciar sesión"); 
      }
    },
    // register(email, password): Usa createUserWithEmailAndPassword para registrar un nuevo usuario.
    // sube la imagen que viene como payload
    async register(email, password, profilePicture) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        let photoURL = '';
    
        if (profilePicture) {
          const imageRef = storageRef(storage, `profilePictures/${user.uid}`);
          await uploadBytes(imageRef, profilePicture);
          photoURL = await getDownloadURL(imageRef);
   
    
          await updateProfile(user, { photoURL });
        }
    
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.email.split('@')[0],
          role: 'user',
          photoURL,
        });
    
        this.user = user;
        this.isAuthenticated = true;
        console.log('Registro exitoso:', user);
    
      } catch (error) {
        console.error('Error al registrarse:', error.message);
        throw new Error(error.message || "Error al registrarse");
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

