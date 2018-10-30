import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../types/app-state/app-state.interface';

@Injectable()
export class AppStore {
  constructor(private store: Store<AppState>) {}

  public getAppState(): Observable<AppState> {
    return this.store.pipe(select(state => state));
  }
}