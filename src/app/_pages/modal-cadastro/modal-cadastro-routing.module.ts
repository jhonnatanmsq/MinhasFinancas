import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCadastroPage } from './modal-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCadastroPageRoutingModule {}
