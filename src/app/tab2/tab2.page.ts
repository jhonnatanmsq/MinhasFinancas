import {Component} from '@angular/core';
import {ModalCadastroPage} from '../_pages/modal-cadastro/modal-cadastro.page';
import {Router} from '@angular/router';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {ProventosDto} from '../_models/proventos.dto';
import {DividendosService} from '../_service/dividendos.service';
import {Loading} from '../_utils/loading';
import {Alert} from '../_utils/alert';
import {TipoProvento} from '../_enums/TipoProvento';
import {PopoverPrincipalPage} from '../_pages/popover-principal/popover-principal.page';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    proventos: ProventosDto[];

    provento: ProventosDto;

    proventosTotal: number;

    constructor(private service: DividendosService,
                private router: Router,
                private alertController: AlertController,
                public modalController: ModalController,
                public loading: Loading,
                public alert: Alert,
                public popoverController: PopoverController) {
    }

    ionViewDidEnter() {
        this.carregarItens();
    }

    async carregarItens() {
        await this.loading.createLoading('Carregando...');
        await this.service.findAll().subscribe(res => {
            this.proventos = res.map(e => {
                this.provento = e.payload.doc.data();
                return {
                    id: e.payload.doc.id,
                    papel: this.provento.papel,
                    tipo: TipoProvento[this.provento.tipo],
                    valorDividendo: this.provento.valorDividendo,
                    dataDividendo: this.provento.dataDividendo,
                };
            });
            this.proventosTotal = 0;
            this.proventos.map(f => {
                this.proventosTotal += +f.valorDividendo;
            });
            this.loading.dismissLoading();
        }, error => {
            this.loading.dismissLoading();
            this.alert.infoErrorAlert(() => {
                this.carregarItens();
            });
        });
    }

    async presentDeletar(id, papel) {
        const alert = await this.alertController.create({
            header: 'Remover o provento',
            message: `Deseja realmente remover o provento <strong>${papel}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Remover',
                    handler: () => {
                        this.service.deletar(id);
                    }
                }
            ]
        });

        await alert.present();
    }


    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalCadastroPage,
            componentProps: {
                tipo: 'provento'
            },
            cssClass: 'modal'
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data != null) {
            this.carregarItens();
        }
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverPrincipalPage,
            event: ev,
            cssClass: 'popover_class',
            componentProps: { proventos: this.proventos, popover: this.popoverController },
        });

        return await popover.present();
    }

}
