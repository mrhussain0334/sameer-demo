import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GrokAiManagementComponent} from "./components/grok-ai-management/grok-ai-management.component";



const routes: Routes = [
  {path: '', component: GrokAiManagementComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrokAiRoutingModule { }
