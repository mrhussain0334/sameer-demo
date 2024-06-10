import {inject} from "@angular/core";
import {GrokAiService} from "../../pages/grok-ai/services/grok-ai.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadGrokAi, loadGrokAiError, loadGrokAiSuccess} from "./grokai.action";
import {catchError, from, map, of, switchMap} from "rxjs";

export class GrokaiEffect {
  private api = inject(GrokAiService);
  action$ = inject(Actions)
  loadGrokAi$ = createEffect(() => this.action$.pipe(
    ofType(loadGrokAi),
    switchMap(action => from(this.api.analyzeCode(action.data)).pipe(
      map(result => loadGrokAiSuccess({data: result})),
      catchError(error => of(loadGrokAiError({
        error: error.message
      })))
    ))
  ));
}
