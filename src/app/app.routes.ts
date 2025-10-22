import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'foto-gps', pathMatch: 'full' },  // Redirige al inicio
  {
    path: 'foto-gps',
    loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page) // tu página standalone
  }
];
