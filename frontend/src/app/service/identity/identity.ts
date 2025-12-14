import { Injectable } from '@angular/core';
// Firebase core SDK to initialise the app
import { initializeApp } from 'firebase/app';
// Firebase Authentication functions (email + password login/register)
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// Firebase Firestore functions to store profile data for each user
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
//Import env config
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class Identity {

  // --- Firebase project configuration ---------------------------------------
  // This identifies your Firebase project.
  // Only apiKey and projectId are needed for basic Firebase Auth in this CA.
  private firebaseApp = {
  apiKey: environment.firebase.apiKey,     //Read from environment
  projectId: environment.firebase.projectId
  };
  // --------------------------------------------------------------------------

  // Initialise Firebase using the config above.
  // This prepares Firebase Authentication and any other Firebase services. 
  private app: any;  // Holds the Firebase app instance once initialised
  // Firestore database instance (initialised AFTER app)
  private db: any;

  constructor() {
    // Initialise Firebase using the config above.
    // This prepares Firebase Authentication and any other Firebase services.
    this.app = initializeApp(this.firebaseApp);
    // Initialise Firestore after Firebase app is ready
    this.db = getFirestore(this.app);
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

  // --------------------------------------------------------------------------
  // LOGOUT USER
  // --------------------------------------------------------------------------
  // Signs the current user out from Firebase Authentication.
  // Called from the Profile tab when the user taps "Log out".
  // --------------------------------------------------------------------------
  logout() {
    const auth = getAuth(this.app);  // Get the Firebase Auth instance

    return signOut(auth)
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.error('Logout failed:', error.code, error.message);
        throw error;  // Pass the error to the calling page
      });
  }

  // --------------------------------------------------------------------------
  // SAVE USER PROFILE DATA
  // --------------------------------------------------------------------------
  // Stores additional profile information for a given uid in Firestore.
  // This is called right after a successful registration so that the
  // Profile tab (tab4) can later display the same information.
  // --------------------------------------------------------------------------
  saveUserProfile(uid: string, profileData: any) {
    const userRef = doc(this.db, 'users', uid);  // Reference to users/{uid} document

    return setDoc(userRef, profileData, { merge: true })
      .then(() => {
        console.log('Profile data saved for user:', uid);
      })
      .catch((error) => {
        console.error('Error saving profile data:', error.code, error.message);
        throw error;  // Re-throw so the page can handle errors
      });
  }

  // --------------------------------------------------------------------------
  // LOAD CURRENT USER PROFILE
  // --------------------------------------------------------------------------
  // Returns the profile data for the currently logged-in user from Firestore.
  // The Profile tab calls this to show the user details stored in the database.
  // --------------------------------------------------------------------------
  async getCurrentUserProfile() {
    const auth = getAuth(this.app);  // Get the Firebase Auth instance
    const user = auth.currentUser;   // Currently authenticated user (or null)

    if (!user) {
      console.warn('getCurrentUserProfile: no authenticated user found.');
      return null;  // No logged-in user → no profile data
    }

    const userRef = doc(this.db, 'users', user.uid);  // users/{uid}
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      console.warn('No profile document for user:', user.uid);
      return null;  // User has no profile document yet
    }

    return snap.data();  // Return the stored profile data
  }

  // --------------------------------------------------------------------------
  // GET CURRENT USER (AUTH STATE HELPER)
  // --------------------------------------------------------------------------
  // Convenience helper used by the AuthGuard to check if a user is logged in.
  // It resolves once with the current Firebase Authentication state.
  // --------------------------------------------------------------------------
  getCurrentUserOnce(): Promise<any> {
    const auth = getAuth(this.app);

    return new Promise((resolve) => {
      const unsub = auth.onAuthStateChanged((user) => {
        unsub();       // Unsubscribe so this only fires once
        resolve(user); // Resolve with the current user (or null)
      });
    });
  }
}