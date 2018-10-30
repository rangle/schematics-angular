import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

<% if (appStateInterfacePath) { %> import { AppState } from '<%= appStateInterfacePath %>';<% } %>

import { <%= classify(name) %>State } from '../types/<%= dasherize(name) %>/<%= dasherize(name) %>.interface';

import { Retrieve } from './<%= dasherize(name) %>.actions';

@Injectable()
export class <%= classify(name) %>Store {

  constructor(
    <% if (parentName) { %> private <%= camelize(parentName) %>Store: <%= classify(parentName) %>Store, <% } %>
    private store: Store<AppState>
  ) {}
  <% if (parentName) { %>

  public get<%= classify(name) %>State(): Observable<<%= classify(name) %>State> {
    return this.<%= camelize(parentName) %>Store.get<%= classify(parentName) %>State().pipe(map(state => state.<%= camelize(name) %>State));
  }
  <% } %>

  public retrieve() {
    this.store.dispatch(new Retrieve());
  }

}
