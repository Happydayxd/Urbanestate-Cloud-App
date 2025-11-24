import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

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

  ngOnInit() {}

  register(email: string, pass: string) {

    this.error = ''; // Clear previous error

    if (!email || !pass) { // Basic validation
      this.error = 'Please enter both email and password.';
      return;
    }

    // Call the service (Firebase register)
    this.identity.register(email, pass)
      .then((userCredential) => {
        console.log('Registration OK:', userCredential.user);

        // Redirect user to the home tab after successful registration
        this.router.navigateByUrl('/tabs/tab1'); // Change to tab2 if preferred
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
