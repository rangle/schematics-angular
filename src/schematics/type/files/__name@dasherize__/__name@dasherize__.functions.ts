import { <%= classify(name) %> } from './<%= dasherize(name) %>.interface';

export function create<%= classify(name) %>(): <%= classify(name) %> {
  return {
    <% if(addMember) { %> removeMe: null <% } %>
  };
}