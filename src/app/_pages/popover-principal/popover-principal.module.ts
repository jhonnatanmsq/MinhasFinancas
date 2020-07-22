import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PopoverPrincipalPage} from './popover-principal.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverPrincipalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PopoverPrincipalPage
  ],
  declarations: [PopoverPrincipalPage],
  entryComponents: [PopoverPrincipalPage]
})
export class PopoverPrincipalPageModule {
}
