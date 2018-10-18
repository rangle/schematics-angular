import { Component } from '@angular/core';

@Component({
  selector: '<%= prefix %>-<%= name %>',
  templateUrl: './<%= name %>.component.html',
  styleUrls: './<%= name %>.component.scss'
})
export class <%= classify(name) %>Component {

}