import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Identity } from '../service/identity/identity';
import { Router } from '@angular/router'; // add Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  error: string = ''; // message shown in the template

  constructor(
    private identity: Identity,
    private router: Router      // <-- inject Router to navigate after login
  ) { }


  ngOnInit() {
  }
  // Called when the user clicks the LOGIN button
  login(email: string, pass: string) {
     // Reset previous errors
    this.error = '';

    // Basic front-end validation
    if (!email || !pass) {
      this.error = 'Please enter both email and password.';
      return;
    }       
    // Call the Identity service (Firebase login)
    // identity.login(...) returns a Promise<userCredential>
    this.identity.login(email, pass)
      .then((userCredential) => {
        // If we are here, Firebase login was successful
        console.log('Login OK:', userCredential.user);

        // Redirect to Tab1 (Home). Change to /tabs/tab2 if you prefer.
        this.router.navigateByUrl('/tabs/tab1');
      })
      .catch((error) => {
        // If login fails, we get an error object from Firebase
        console.error('Login error:', error);

        // Map Firebase error codes to friendly messages
        if (error.code === 'auth/user-not-found') {
          this.error = 'This account does not exist.';
        } else if (error.code === 'auth/wrong-password') {
          this.error = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
          this.error = 'Invalid email address.';
        } else {
          this.error = 'Login failed. Please try again.';
        }
      });
  }
}