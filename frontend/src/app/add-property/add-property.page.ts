import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/angular/standalone'; //Ionic UI components
import { CommonModule } from '@angular/common';       //For *ngIf etc.
import { FormsModule } from '@angular/forms';         //For [(ngModel)]
import { Router } from '@angular/router';             //For navigation after save
import { Posts } from '../service/posts/posts';       //Firestore posts service

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, CommonModule, FormsModule ]
})
export class AddPropertyPage {

  //Form model bound to template via [(ngModel)]
  form = {
    agentName: '',      //userInfo.name
    profileImage: '',   //userInfo.profileImage
    agentLocation: '',  //userInfo.location
    imageUrl: '',       //media[0].src
    listingInfo: '',    //comments[0].text (Listing Info)
    locationInfo: '',   //comments[1].text (Location)
    buyerInfo: ''       //comments[2].text (Buyer)
  };

  saving = false;         //True when we are sending data to Firestore
  message = '';           //Feedback message after save or error

  constructor(
    private posts: Posts, //Inject Posts service
    private router: Router
  ) {}

  async submit() {
    this.message = '';

    //Basic validation: required fields
    if (!this.form.agentName || !this.form.agentLocation || !this.form.imageUrl || !this.form.listingInfo) {
      this.message = 'Please fill in at least agent name, location, property image URL and listing info.';
      return;
    }

    //Build object in the exact Firestore structure used in the app
    const newPost = {
      userInfo: {
        name: this.form.agentName,
        profileImage: this.form.profileImage || 'assets/img/man.jpg', //Fallback avatar
        location: this.form.agentLocation
      },
      media: [
        {
          type: 'image',
          src: this.form.imageUrl
        }
      ],
      comments: [
        { user: 'Listing Info', text: this.form.listingInfo },
        { user: 'Location', text: this.form.locationInfo },
        { user: 'Buyer', text: this.form.buyerInfo }
      ]
    };

    try {
      this.saving = true; //Indicate loading state
      await this.posts.addPost(newPost); //Save to Firestore via service

      this.message = 'Property has been added successfully.'; //Success message

      //Optional: navigate back to properties tab after small delay
      setTimeout(() => {
        this.router.navigateByUrl('/tabs/tab2'); //Go back to Properties list
      }, 1000);

    } catch (error) {
      console.error('Error saving property:', error);
      this.message = 'There was a problem saving this property. Please try again.';
    } finally {
      this.saving = false;
    }
  }
}
