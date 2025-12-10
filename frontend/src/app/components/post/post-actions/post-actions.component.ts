import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faBookmark, faPaperPlane, faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss'],
  imports: [FontAwesomeModule]
})
export class PostActionsComponent implements OnInit {

  like = faHeart;               // Save / Favourite
  bookmark = faBookmark;        // Save property
  message = faPaperPlane;       // Share property
  calendar = faCalendarCheck;   // Book a viewing (icon only, no logic yet)

  constructor() {}

  ngOnInit() {}
}
