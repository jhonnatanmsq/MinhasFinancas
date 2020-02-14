import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModalLoginPage} from './modal-login.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLoginPageRoutingModule {}
