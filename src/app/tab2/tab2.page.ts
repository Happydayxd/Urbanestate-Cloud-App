import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faUser, faHeart, faCalendarPlus, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { PostComponent } from '../components/post/post.component';
import { CommonModule } from '@angular/common';
import { Posts } from '../service/posts/posts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ExploreContainerComponent, FontAwesomeModule, PostComponent, CommonModule],
})
export class Tab2Page implements OnInit {
  faHouse = faHouse;
  faUser = faUser;
  faHeart = faHeart;
  faCalendarPlus = faCalendarPlus;
  faMessage = faPaperPlane;
  faCaretDown = faCaretDown;

  //posts = [1, 2];
  data: any = [];

  constructor(private posts: Posts) {}

  ngOnInit() {
    this.data = this.posts.getAllPosts();
  } 
}
