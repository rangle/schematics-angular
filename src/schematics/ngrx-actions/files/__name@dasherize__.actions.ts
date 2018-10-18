import { Action } from '@ngrx/store';

export const <%= classify(name) %>Actions = {
  RETRIEVE: '<%= uppercase(underscore(name)) %>--RETRIEVE'
};

export class RetrieveAction implements Action {
  public readonly type = <%= classify(name) %>Actions.RETRIEVE_ACTION;

  constructor() {}
}
