import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone'; // Ionic standalone UI components
import { CommonModule } from '@angular/common'; // Needed for ngIf/ngFor
import { RouterLink } from '@angular/router'; // For routerLink in the template

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, // Marks this page as a standalone Angular component
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, CommonModule, RouterLink
  ], // Components and directives used in the HTML template
})
export class Tab1Page {
  constructor() {} // No logic needed here yet; this is a purely UI page
}
