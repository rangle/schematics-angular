import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { <%= classify( name ) %>Actions } from './<%= dasherize( name ) %>.actions';

@Injectable()
export class <%= classify( name ) %>Effects {

  constructor(
    private actions$: Actions
  ) {}

  @Effect()
  private retrieve<%= classify(name) %>$ = this.actions$.pipe(
    ofType(<%= classify(name) %>Actions.RETRIEVE)
  );

}
