import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { <%= classify(name) %>Component } from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    <%= classify(name) %>Component
  ],
  exports: [],
  providers: [],
})
export class <%= classify(name) %>Module {}
