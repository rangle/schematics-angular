import { <%= classify(name) %>State } from './<%= dasherize(name) %>.interface';

export function create<%= classify(name) %>(): <%= classify(name) %> {
  return {
    removeMe: null
  };
}