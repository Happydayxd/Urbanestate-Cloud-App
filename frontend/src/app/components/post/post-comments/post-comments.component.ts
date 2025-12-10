import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
  imports:[CommonModule]
})
export class PostCommentsComponent  implements OnInit {
  @Input('comments') commentstData: any;
  constructor() { }

  ngOnInit() {}

}
