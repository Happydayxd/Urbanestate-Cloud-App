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

  data: any[] = [];       // ✅ must be an array
  loading = true;         // optional, to show spinner later
  error = '';             // optional, for messages

  constructor(
    private posts: Posts,   // service that talks to Firestore
    private router: Router  // used to navigate to Add Property form
  ) {}

  // -------------------------------------------------------------------
  // ngOnInit - basic, Promise-based version (closer to lecturer style)
  // -------------------------------------------------------------------
  ngOnInit() {
    this.loading = true;
    this.error = '';

    this.posts.getAllPosts()
      .then((posts: any[]) => {           // when Firestore finishes
        this.data = posts;                // store array in data[]
        this.loading = false;             // stop loading text
      })
      .catch((err) => {
        console.error('Error loading posts', err);
        this.error = 'Could not load properties.';
        this.loading = false;
      });
  }

  // -------------------------------------------------------------------
  // goToAddProperty - open the Add Property page
  // Called from the button in the header
  // -------------------------------------------------------------------
  goToAddProperty() {
    this.router.navigateByUrl('/add-property'); // match route path below
  }
}