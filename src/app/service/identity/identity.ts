import { Injectable } from '@angular/core';
// Firebase core SDK to initialise the app
import { initializeApp } from 'firebase/app';
// Firebase Authentication functions (email + password login/register)
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class Identity {

  // --- Firebase project configuration ---------------------------------------
  // This identifies your Firebase project.
  // Only apiKey and projectId are needed for basic Firebase Auth in this CA.
  private firebaseApp = {
    apiKey: "AIzaSyCsk-JTvq9mxE6o-S4xokSgqs102pMLygk",
    //authDomain: "b8is138-mon-ionic-f8600.firebaseapp.com",
    projectId: "b8is138-mon-ionic-f8600",
    //storageBucket: "b8is138-mon-ionic-f8600.firebasestorage.app",
    //messagingSenderId: "926442267487",
    //appId: "1:926442267487:web:bcf8d21c3a733d10ef0cea"
  };
  // --------------------------------------------------------------------------

  // Initialise Firebase using the config above.
  // This prepares Firebase Authentication and any other Firebase services. 
  private app: any;  // Holds the Firebase app instance once initialised

  constructor() {
    // Initialise Firebase using the config above.
    // This prepares Firebase Authentication and any other Firebase services.
    this.app = initializeApp(this.firebaseApp);
  }
  // Simple test method to confirm this service is working
  test() {
    console.log('Identity service is working!');
  }

  // --------------------------------------------------------------------------
  // LOGIN USER
  // --------------------------------------------------------------------------
  // This method attempts to log in a user using email + password.
  // It returns from Firebase, so the page can call:
  //   this.identity.login(email, pass).then(...).catch(...)
  // --------------------------------------------------------------------------
  login(email: string, password: string) {
    const auth = getAuth(this.app);  // Get the Firebase Auth instance

    // Firebase function to sign in with email/password
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful → Firebase returns user info
        const user = userCredential.user;
        console.log('Login successful:', user);
        return userCredential;  // Pass the result back to the page
      })
      .catch((error) => {
        // If login fails → error contains error.code and error.message
        console.error('Login failed:', error.code, error.message);
        throw error; // Re-throw error so the page can handle it
      });
  }

  // --------------------------------------------------------------------------
  // REGISTER USER
  // --------------------------------------------------------------------------
  // Similar to login, but creates a new account.
  // Also returns the page can handle the result.
  // --------------------------------------------------------------------------
  register(email: string, password: string) {
    const auth = getAuth(this.app);

    // Firebase function to register with email/password
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
        console.log('Registration successful:', user);
        return userCredential;  // Pass back result
      })
      .catch((error) => {
        // Registration failed
        console.error('Registration failed:', error.code, error.message);
        throw error; // Pass the error to the page
      });
  }
}