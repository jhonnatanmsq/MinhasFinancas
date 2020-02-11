import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs-routing.module';

import {TabsPage} from './tabs.page';
import {ModalCadastroPageModule} from '../_pages/modal-cadastro/modal-cadastro.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        ModalCadastroPageModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
