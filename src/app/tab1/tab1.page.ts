import {Component} from '@angular/core';
import {PortifolioDTO} from '../_models/portifolio.dto';
import {InvestimentosService} from '../_service/investimentos.service';
import {Route, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {ModalCadastroPage} from '../_pages/modal-cadastro/modal-cadastro.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    investimentos: PortifolioDTO[];

    investimento: PortifolioDTO;

    investimentoTotal: number;

    constructor(private service: InvestimentosService, private router: Router, public modalController: ModalController) {
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.carregarItens();
    }

    async carregarItens() {
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
        });
    }

    variante(id: number) {
        this.router.navigate(['/tabs/portifolio', id]);
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalCadastroPage,
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


}
