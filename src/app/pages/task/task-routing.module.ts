import { NgModule } from '@angular/core';
import {TaskManagementComponent} from "./components/task-management/task-management.component";
import {RouterModule, Routes} from "@angular/router";



const routes: Routes = [
  {path: '', component: TaskManagementComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule { }
