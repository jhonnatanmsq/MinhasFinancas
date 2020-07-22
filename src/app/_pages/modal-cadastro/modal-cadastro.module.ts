import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ModalCadastroPage} from './modal-cadastro.page';

const routes: Routes = [
    {
        path: '',
        component: ModalCadastroPage
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
        ModalCadastroPage
    ],
    declarations: [ModalCadastroPage],
    entryComponents: [ModalCadastroPage]
})
export class ModalCadastroPageModule {
}
