import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  imports: [CommonModule]
})
export class PostContentComponent  implements OnInit {
  @Input('content') postContent: any;
  constructor() { }

  ngOnInit() {}

}
