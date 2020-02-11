import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DividendoPage } from './dividendo.page';

const routes: Routes = [
  {
    path: '',
    component: DividendoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DividendoPageRoutingModule {}
