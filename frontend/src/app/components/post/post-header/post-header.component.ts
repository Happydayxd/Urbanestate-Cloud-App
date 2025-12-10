import { Component, Input, OnInit } from '@angular/core';
import { UserInfoComponent } from '../../user-info/user-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
  imports: [UserInfoComponent, FontAwesomeModule]
})
export class PostHeaderComponent  implements OnInit {
  @Input('user') postUser: any;
  faKebab = faEllipsis;
  constructor() { }

  ngOnInit() {}

}