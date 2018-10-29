import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

<% if (appStateInterfacePath) { %> import { AppState } from '<%= appStateInterfacePath %>';<% } %>

import { Retrieve } from './<%= dasherize(name) %>.actions';

@Injectable()
export class <%= classify(name) %>Store {

  constructor(private store: Store<AppState>) {}

  public retrieve() {
    this.store.dispatch(new Retrieve());
  }

}
