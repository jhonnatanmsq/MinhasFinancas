import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PopoverPrincipalPage} from './popover-principal.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverPrincipalPageRoutingModule {}
