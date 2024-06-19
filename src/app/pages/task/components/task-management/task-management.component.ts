import {Component, OnDestroy} from '@angular/core';
import {lastValueFrom, Observable, tap} from "rxjs";
import {TaskDto} from "../../../../states/task/task.reducer";
import {AppState} from "../../../../states/app.state";
import {Store} from "@ngrx/store";
import {selectName, selectTasks} from "../../../../states/task/task.selector";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {addTask, removeTask, updateName, updateTask} from "../../../../states/task/task.action";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent {
  nameControl: FormControl = new FormControl('', Validators.required);
  descriptionControl: FormControl = new FormControl('', Validators.required);
  formGroup: FormGroup = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
  })
  tasks$: Observable<TaskDto[]>;
  name$: Observable<string>;
  selectedId = 0;

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select(selectTasks);
    this.name$ = this.store.select(selectName);
    this.nameControl.valueChanges.subscribe(p => {
      this.store.dispatch(updateName({
        name: p
      }));
    })
  }
  addTasks() {
    if (this.formGroup.valid) {
      this.store.dispatch(addTask({
        task: {
          id: Date.now(),
          name: this.nameControl.value,
          description: this.descriptionControl.value,
        }
      }));
      this.nameControl.reset();
      this.descriptionControl.reset();
    }
  }

  removeTasks(id: number) {
    this.store.dispatch(removeTask({
      id: id,
    }));
    if(this.selectedId === id){
      this.selectedId = 0;
      this.nameControl.reset();
      this.descriptionControl.reset();
    }
  }

  editTask(task: TaskDto) {
    this.nameControl.setValue(task.name);
    this.descriptionControl.setValue(task.description);
    this.selectedId = task.id;
  }

  updateTasks() {
    this.store.dispatch(updateTask({
      task: {
        id: this.selectedId,
        name: this.nameControl.value,
        description: this.descriptionControl.value,
      }
    }));
    this.selectedId = 0;
    this.nameControl.reset();
    this.descriptionControl.reset();
  }

  reset() {
    this.selectedId = 0;
    this.nameControl.reset();
    this.descriptionControl.reset();
  }
}
