import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
//import { addIcons } from 'ionicons';
//import { triangle, ellipse, square } from 'ionicons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { } from @fortawesome/free-brands-svg-icons';
import { faHouse, faSquarePlus, faUser, faCamera, faHeart, faCalendarPlus } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({ 
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, FontAwesomeModule ],
})
export class TabsPage {
  faHouse = faHouse;
  faMagnifyingGlass = faMagnifyingGlass
  faCamera = faCamera;
  faSquarePlus = faSquarePlus
  faUser = faUser;
  faFilm = faFilm;
  faHeart = faHeart;
  faCalendarPlus = faCalendarPlus;

  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    //addIcons({ triangle, ellipse, square });
  }
}
