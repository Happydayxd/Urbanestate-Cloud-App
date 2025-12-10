import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Identity } from '../service/identity/identity';
import { Router } from '@angular/router'; // Needed for redirect after register

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonButton, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  error: string = ''; // Used to show error message under the inputs

  constructor(
    private identity: Identity,
    private router: Router // Allows navigation after successful register
  ) { }

  ngOnInit() { }

  register(
    email: string,
    pass: string,
    fullName: string,
    phone: string,
    age: string,
    address: string,
    city: string,
    county: string,
    eircode: string
  ) {
    this.error = '';  // Clear previous error message

    // ----------------------------------------------------------------------
    // Basic validation for required fields
    // ----------------------------------------------------------------------
    if (!email || !pass || !fullName || !phone) {
      this.error = 'Please fill in full name, email, password and phone.';
      return;
    }

    // Optional: parse age to a number (if provided)
    const parsedAge = age ? parseInt(age, 10) : null;

    // ----------------------------------------------------------------------
    // Profile data object that will be saved in Firestore under users/{uid}
    // ----------------------------------------------------------------------
    const profileData = {
      fullName,
      phone,
      age: parsedAge,
      address,
      city,
      county,
      eircode,
      email,
      createdAt: new Date().toISOString()
    };

    // ----------------------------------------------------------------------
    // Call the Identity service to create Firebase Auth user (email + pass)
    // ----------------------------------------------------------------------
    this.identity.register(email, pass)
      .then(async (userCredential) => {
        console.log('Registration OK:', userCredential.user);

        const user = userCredential.user;
        const uid = user?.uid;

        // ------------------------------------------------------------------
        // After Auth account is created, save the profile data in Firestore
        // using the same uid so that the Profile tab can read it later.
        // ------------------------------------------------------------------
        if (uid) {
          try {
            await this.identity.saveUserProfile(uid, profileData);
          } catch (err) {
            console.error('Error saving profile data after registration:', err);
            // We do not block navigation on this error, but we log it.
          }
        } else {
          console.warn('Registration succeeded but no uid was returned.');
        }

        // ------------------------------------------------------------------
        // Redirect user to the main tab (tab1) after successful registration
        // ------------------------------------------------------------------
        this.router.navigateByUrl('/tabs/tab1');
      })
      .catch((error) => {
        console.error('Register error:', error);

        // Show user-friendly messages based on Firebase error codes
        if (error.code === 'auth/email-already-in-use') {
          this.error = 'This email is already registered.';
        } else if (error.code === 'auth/invalid-email') {
          this.error = 'Invalid email format.';
        } else if (error.code === 'auth/weak-password') {
          this.error = 'Password must be at least 6 characters.';
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      });
  }
}