import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'tasks',
      loadChildren: () => import('./task/task-routing.module').then(p => p.TaskRoutingModule),
      pathMatch: 'full'
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps-routing.module').then(p => p.MapsRoutingModule),
      pathMatch: 'full'
    },
    {
      path: 'grok-ai',
      loadChildren: () => import('./grok-ai/grok-ai-routing.module').then(p => p.GrokAiRoutingModule),
      pathMatch: 'full'
    },
    {
      path: 'map-tasks',
      loadChildren: () => import('./map-tasks/map-tasks-routing.module').then(p => p.MapTasksRoutingModule),
      pathMatch: 'full'
    },
    {
      path: '',
      redirectTo: 'tasks',
      pathMatch: 'full'
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {
}
