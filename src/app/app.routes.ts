import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/page.module').then(p => p.PageModule)},
  {path: '**', redirectTo: ''},
];
