import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Identity } from '../service/identity/identity';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel, IonIcon, CommonModule ],
})
export class Tab4Page implements OnInit {

  // ------------------------------------------------------------------------
  // profile
  // ------------------------------------------------------------------------
  // Local model that holds the current user's profile data. This object is
  // populated from Firestore via the Identity service.
  // ------------------------------------------------------------------------
  profile: any = {
    fullName: '',
    email: '',
    phone: '',
    age: null,
    address: '',
    city: '',
    county: '',
    eircode: ''
  };

  constructor(
    private identity: Identity,
    private router: Router
  ) {}

  ngOnInit() {
    // Load the profile when the Profile tab is initialised
    this.loadProfile();
  }

  // ------------------------------------------------------------------------
  // loadProfile
  // ------------------------------------------------------------------------
  // Reads the profile information for the currently logged-in user from
  // Firestore using the Identity service, and updates the local model.
  // ------------------------------------------------------------------------
  async loadProfile() {
    try {
      const data = await this.identity.getCurrentUserProfile();

      if (data) {
        this.profile = {
          ...this.profile,
          ...data
        };
      } else {
        console.warn('Profile tab: no profile data found for current user.');
      }
    } catch (error) {
      console.error('Error loading profile data in Profile tab:', error);
    }
  }

  // ------------------------------------------------------------------------
  // logout
  // ------------------------------------------------------------------------
  // Logs the user out using the Identity service and then redirects to the
  // login page. The AuthGuard will prevent access to /tabs/... afterwards.
  // ------------------------------------------------------------------------
  async logout() {
    try {
      await this.identity.logout();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Logout error in Profile tab:', error);
    }
  }
}
