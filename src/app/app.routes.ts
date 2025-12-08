import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab2',
    loadComponent: () => import('./tab2/tab2.page').then( m => m.Tab2Page)
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m=> m.RegisterPage)
  },
  {
    path: 'add-property',
    loadComponent: () => import('./add-property/add-property.page').then( m => m.AddPropertyPage)
  },
  {
    path: 'maps',
    loadComponent: () => import('./maps/maps.page').then( m => m.MapsPage)
  },
  // Dynamic route that expects an id
  { 
    path: 'details/:id', 
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  }

];
