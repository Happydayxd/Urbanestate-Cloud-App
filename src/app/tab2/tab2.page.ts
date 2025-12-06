import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faUser, faHeart, faCalendarPlus, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { PostComponent } from '../components/post/post.component';
import { CommonModule } from '@angular/common';
import { Posts } from '../service/posts/posts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ExploreContainerComponent, FontAwesomeModule, PostComponent, CommonModule],
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

  constructor(private posts: Posts) {}

  // ✅ Make ngOnInit async so we can await the Firestore call.
  async ngOnInit() {
    try {
      this.data = await this.posts.getAllPosts();  // ✅ here we wait for the Promise
    } catch (err) {
      console.error('Error loading posts', err);
      this.error = 'Could not load properties.';
    } finally {
      this.loading = false;
    }
  }
}
