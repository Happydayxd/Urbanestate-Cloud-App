import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AgmCoreModule } from 'ng-agm-core-lib';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBO1qHRd6TXqE_ppTDvWjUPTM9Vgw91Kw',
    }),
  ],
  exports: [AgmCoreModule],
})
export class MapModule {}
