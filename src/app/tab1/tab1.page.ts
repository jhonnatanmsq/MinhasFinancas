import {Component} from '@angular/core';
import {AtivoDto} from '../_models/ativo.dto';
import {InvestimentosService} from '../_service/investimentos.service';
import {Router} from '@angular/router';
import {ModalController, PopoverController} from '@ionic/angular';
import {ModalCadastroPage} from '../_pages/modal-cadastro/modal-cadastro.page';
import {Loading} from '../_utils/loading';
import {Alert} from '../_utils/alert';
import {AngularFireAuth} from '@angular/fire/auth';
import {B3Service} from '../_service/b3.service';
import {PopoverPrincipalPage} from '../_pages/popover-principal/popover-principal.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    investimentos: AtivoDto[];

    investimento: AtivoDto;

    investimentoTotal: number;

    constructor(private service: InvestimentosService,
                private router: Router,
                public modalController: ModalController,
                public loading: Loading,
                private b3: B3Service,
                private firebase: AngularFireAuth,
                public alert: Alert,
                public popoverController: PopoverController) {
    }

    ionViewDidEnter() {
        this.firebase.authState.subscribe(user => {
            if (user) {
                this.carregarItens();
            }
        });
    }

    async carregarItens() {
        this.loading.createLoading('Carregando...');
        await this.service.findAll().subscribe(res => {
            this.investimentos = res.map(e => {
                this.investimento = e.payload.doc.data();
                return {
                    id: e.payload.doc.id,
                    papel: this.investimento.papel,
                    quantidade: this.investimento.quantidade,
                    valorCompra: this.investimento.valorCompra,
                    dataCompra: this.investimento.dataCompra,
                };
            });
            this.investimentoTotal = 0;
            this.investimentos.map(f => {
                this.investimentoTotal += f.quantidade * f.valorCompra;
            });
            this.loading.dismissLoading();
        }, error => {
            this.loading.dismissLoading();
            this.alert.infoErrorAlert(() => {
                this.carregarItens();
            });
        });
    }

    variante(id: number) {
        this.router.navigate(['/tabs/variacao', id]);
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalCadastroPage,
            cssClass: 'modal',
            componentProps: {
                tipo: 'portifolio'
            }
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
            componentProps: { investimentos: this.investimentos, popover: this.popoverController },
        });

        return await popover.present();
    }
}
