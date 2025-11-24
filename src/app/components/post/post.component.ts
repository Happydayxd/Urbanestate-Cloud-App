import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; //Gives us *ngIf, *ngFor, etc.

import { PostHeaderComponent } from './post-header/post-header.component';
import { PostContentComponent } from './post-content/post-content.component';
import { PostActionsComponent } from './post-actions/post-actions.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';

@Component({
  selector: 'app-post', //Used as <app-post> in tab2.page.html
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true, //Tell Angular this is a standalone component
  imports: [
    CommonModule, //Needed so *ngIf works inside this component
    PostActionsComponent,
    PostContentComponent,
    PostHeaderComponent,
    PostCommentsComponent
  ]
})
export class PostComponent implements OnInit {

  @Input('post') postData: any; //Receives [post]="post" from Tab2

  constructor() { }

  ngOnInit() {
    // console.log('Post data:', this.postData); //For debugging if needed
  }
}
