import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { <%= classify(name) %>Component } from './components';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name) %>Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class <%= classify(name) %>RoutingModule {}
