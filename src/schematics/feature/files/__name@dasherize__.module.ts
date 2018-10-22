import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { <%= classify(name) %>Service } from './services/<%= dasherize(name) %>.service';
import { <%= classify(name) %>Effects } from './store/<%= dasherize(name) %>.effects';
import { <%= classify(name) %>Store } from './store/<%= dasherize(name) %>.store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([
      <%= classify(name) %>Effects
    ])
  ],
  declarations: [],
  exports: [],
  providers: [
    <%= classify(name) %>Service,
    <%= classify(name) %>Store
  ],
})
export class <%= classify(name) %>Module {}
