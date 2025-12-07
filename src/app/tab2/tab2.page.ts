import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faUser, faHeart, faCalendarPlus, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { PostComponent } from '../components/post/post.component';
import { CommonModule } from '@angular/common';
import { Posts } from '../service/posts/posts';
import { Router } from '@angular/router'; // <-- simple Angular Router

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, ExploreContainerComponent, FontAwesomeModule, PostComponent, CommonModule],
})
export class Tab2Page implements OnInit {

  faHouse = faHouse;
  faUser = faUser;
  faHeart = faHeart;
  faCalendarPlus = faCalendarPlus;
  faMessage = faPaperPlane;
  faCaretDown = faCaretDown;

  data: any[] = [];       //must be an array
  loading = true;         //optional, to show spinner later
  error = '';             //optional, for messages

  constructor(
    private posts: Posts,   //service that talks to Firestore
    private router: Router  //used to navigate to Add Property form
  ) { }

  // -------------------------------------------------------------------
  // ngOnInit()
  // Called the first time this tab component is created.
  // We call loadPosts() here to load the properties for the first time.
  // -------------------------------------------------------------------
  ngOnInit() {
    this.loadPosts(); // // Initial Firestore load when the tab is created
  }

  // -------------------------------------------------------------------
  // ionViewWillEnter()
  // Ionic lifecycle hook.
  // Called EVERY TIME we navigate back to this tab.
  // This is what makes the list refresh after adding a new property.
  // -------------------------------------------------------------------
  ionViewWillEnter() {
    this.loadPosts(); // // Reload properties whenever the tab becomes active
  }

  // -------------------------------------------------------------------
  // loadPosts()
  // Shared method that actually calls the Posts service.
  // -------------------------------------------------------------------
  loadPosts() {
    this.loading = true;       //Show "Loading properties..." message
    this.error = '';           // Clear any previous error

    this.posts.getAllPosts()
      .then((posts: any[]) => {           //When Firestore finishes successfully
        this.data = posts;                //Save posts into the array used by *ngFor
        this.loading = false;             //Hide loading message
      })
      .catch((err) => {                   //If something goes wrong
        console.error('Error loading posts', err);
        this.error = 'Could not load properties.';   //Message shown in the template
        this.loading = false;
      });
  }

  // -------------------------------------------------------------------
  // goToAddProperty - open the Add Property page
  // Called from the button in the header
  // -------------------------------------------------------------------
  goToAddProperty() {
    this.router.navigateByUrl('/add-property'); // Must match the route path in app.routes.ts
  }
}