import { Component, Input, OnInit } from '@angular/core';
import { IonAvatar, IonChip, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  imports: [ IonAvatar, IonChip, IonLabel ]
})
export class UserInfoComponent  implements OnInit {
@Input('user') userData: any;
  constructor() { }

  ngOnInit() {}

}
