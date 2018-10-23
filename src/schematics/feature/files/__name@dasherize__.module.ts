import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  exports: [],
  providers: [],
})
export class <%= classify(name) %>Module {}
