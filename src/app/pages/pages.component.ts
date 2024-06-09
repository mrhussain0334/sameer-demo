import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../states/app.state";
import {Observable} from "rxjs";
import {TaskDto} from "../states/task/task.reducer";
import {selectTasks} from "../states/task/task.selector";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  tasks$: Observable<TaskDto[]>;
  constructor(private store: Store<AppState>, private router: Router) {
    this.tasks$ = this.store.select(selectTasks);
  }

  ngOnInit(): void {
  }

  goToTask() {
    this.router.navigateByUrl('tasks');
  }

  goToMaps() {
    this.router.navigateByUrl('maps');
  }
}
