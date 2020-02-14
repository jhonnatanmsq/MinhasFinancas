import {Component} from '@angular/core';
import {ModalCadastroPage} from '../_pages/modal-cadastro/modal-cadastro.page';
import {Router} from '@angular/router';
import {AlertController, ModalController} from '@ionic/angular';
import {DividendosDTO} from '../_models/dividendos.dto';
import {DividendosService} from '../_service/dividendos.service';
import {Loading} from '../_utils/loading';
import {Alert} from '../_utils/alert';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    dividendos: DividendosDTO[];

    dividendo: DividendosDTO;

    dividendosTotal: number;

    constructor(private service: DividendosService,
                private router: Router,
                private alertController: AlertController,
                public modalController: ModalController,
                public loading: Loading,
                public alert: Alert) {
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.carregarItens();
    }

    async carregarItens() {
        this.loading.createLoading('Carregando...');
        await this.service.findAll().subscribe(res => {
            this.dividendos = res.map(e => {
                this.dividendo = e.payload.doc.data();
                return {
                    id: e.payload.doc.id,
                    papel: this.dividendo.papel,
                    quantidade: this.dividendo.quantidade,
                    valorDividendo: this.dividendo.valorDividendo,
                    dataDividendo: this.dividendo.dataDividendo,
                };
            });
            this.dividendosTotal = 0;
            this.dividendos.map(f => {
                this.dividendosTotal += +f.valorDividendo;
            });
            this.loading.dismissLoading();
        }, error => {
            this.loading.dismissLoading();
            this.alert.infoErrorAlert(() => {
                this.carregarItens();
            });
        });
    }

    dividendoPage(id: number) {
        //this.router.navigate(['/tabs/dividendo', id]);
    }

    async presentDeletar(id, papel) {
        const alert = await this.alertController.create({
            header: 'Remover o dividendo',
            message: `Deseja realmente remover o dividendo <strong>${papel}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancelar',
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
                tipo: 'dividendo'
            },
            cssClass: 'my-custom-modal-css'
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data != null) {
            this.carregarItens();
        }
    }


}
