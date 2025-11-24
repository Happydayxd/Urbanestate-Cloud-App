import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime
} from '@ionic/angular/standalone'; // Ionic UI components used in the template
import { CommonModule } from '@angular/common'; // For ngIf, ngFor
import { FormsModule } from '@angular/forms'; // For [(ngModel)] bindings

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true, // Standalone Angular component
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    CommonModule,
    FormsModule
  ]
})
export class Tab3Page {

  // // Simple booking model bound to the form with [(ngModel)]
  booking = {
    property: '', // Selected property name
    date: '',     // Selected date
    time: '',     // Selected time
    name: '',     // Visitor name
    email: '',    // Visitor email
    notes: ''     // Extra notes / questions
  };

  bookingMessage = ''; // // Message shown after form submission

  // Example property options (can later be replaced by Posts service)
  propertyOptions: string[] = [
    'Dublin - Grand Canal Dock Apartment',
    'Cork City - Riverfront Apartment',
    'Galway - Countryside Stone Cottage',
    'Drogheda - New Build Semi-Detached Home',
    'Limerick - Riverside Apartment',
    'Waterford - Terraced Townhouse',
    'Dundalk - Modern Duplex Apartment',
    'Wicklow - Coastal Family Home',
    'Wexford - Country Bungalow',
    'Navan - Suburban Detached Home'
  ];

  constructor() {} // No extra dependencies yet (Firestore service can be added later)

  submitBooking() {
    // Basic validation: make sure required fields are filled
    if (!this.booking.property || !this.booking.date || !this.booking.time || !this.booking.name) {
      this.bookingMessage = 'Please fill in all required fields (property, date, time and name).';
      return;
    }

    // Here we would normally send the booking to Firestore using a service.
    // For now we just log it and show a confirmation message.
    console.log('Booking submitted:', this.booking); // Debug output for development

    this.bookingMessage = 'Your viewing request has been sent. An agent will contact you to confirm the time.'; // Success text

    // Optionally clear the form after submission
    // this.booking = { property: '', date: '', time: '', name: '', email: '', notes: '' };
  }
}
