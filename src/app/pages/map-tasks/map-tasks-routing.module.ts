import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MapTasksComponent} from "./components/map-tasks/map-tasks.component";



const routes: Routes = [
  {path: '', component: MapTasksComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapTasksRoutingModule { }
