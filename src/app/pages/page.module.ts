import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import {PageRoutingModule} from './page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
  ],
  declarations: [PagesComponent]
})
export class PageModule { }
