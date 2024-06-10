import { Component } from '@angular/core';
import {GrokAiService} from "../../services/grok-ai.service";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {GrokAiState} from "../../../../states/grokai/grokai.reducer";
import {loadGrokAi} from "../../../../states/grokai/grokai.action";
import {Observable} from "rxjs";
import {
  selectGrokAisError,
  selectGrokAisIsLoading,
  selectGrokAisResult
} from "../../../../states/grokai/grokai.selector";
import {AppState} from "../../../../states/app.state";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-grok-ai-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './grok-ai-management.component.html',
  styleUrl: './grok-ai-management.component.css'
})
export class GrokAiManagementComponent {
  textControl: FormControl = new FormControl('',[Validators.required]);
  result$: Observable<string>;
  error$: Observable<any>;
  loading$: Observable<any>;
  constructor(private store: Store<AppState>) {
    this.result$ = this.store.select(selectGrokAisResult);
    this.error$ = this.store.select(selectGrokAisError);
    this.loading$ = this.store.select(selectGrokAisIsLoading);
  }

  submit() {
    if (this.textControl.valid) {
      this.store.dispatch(loadGrokAi({
        data: this.textControl.value,
      }));
    }
  }
}
