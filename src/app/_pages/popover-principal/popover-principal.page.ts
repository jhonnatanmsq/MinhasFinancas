import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, PopoverController} from '@ionic/angular';
import {AtivoDto} from '../../_models/ativo.dto';
import {ModalCadastroPage} from '../modal-cadastro/modal-cadastro.page';
import {Loading} from '../../_utils/loading';
import {B3Service} from '../../_service/b3.service';
import {Alert} from '../../_utils/alert';
import {Router} from '@angular/router';
import {ProventosDto} from '../../_models/proventos.dto';

@Component({
    selector: 'app-popover-principal',
    templateUrl: './popover-principal.page.html',
    styleUrls: ['./popover-principal.page.scss'],
})
export class PopoverPrincipalPage implements OnInit {

    proventos: ProventosDto[];
    investimentos: AtivoDto[];
    popover: PopoverController;

    constructor(public navParams: NavParams,
                public modalController: ModalController,
                public loading: Loading,
                public alert: Alert,
                private router: Router,
                private b3: B3Service) {
        this.proventos = navParams.get('proventos');
        this.investimentos = navParams.get('investimentos');
        this.popover = navParams.get('popover');
    }

    ngOnInit() {
    }

    consolidar() {
        if (this.investimentos) {
            this.consolidarCarteira();
        } else if (this.proventos) {
            this.consolidarProventos();
        }
    }

    async consolidarProventos() {
        this.close();
        await this.loading.createLoading('Calculando...');

        const calc = new Map();
        const total = {
            totalDividendos: 0,
            totalJuros: 0,
            totalRendimentos: 0
        };

        this.proventos.forEach(provento => {
            const papel = provento.papel;

            if (!calc[papel]) {
                calc[papel] = {
                    papel,
                    juros: 0,
                    dividendos: 0,
                    rendimentos: 0,
                    total: 0
                };
            }

            if (provento.tipo === 'Dividendo') {
                calc[papel].dividendos += +provento.valorDividendo;
                total.totalDividendos += +provento.valorDividendo;
            } else if (provento.tipo === 'Juros') {
                calc[papel].juros += +provento.valorDividendo;
                total.totalJuros += +provento.valorDividendo;
            } else if (provento.tipo === 'Rendimento') {
                calc[papel].rendimentos += +provento.valorDividendo;
                total.totalRendimentos += +provento.valorDividendo;
            }
            calc[papel].total += +provento.valorDividendo;

        });

        this.presentModal(calc, total, 'consolidarP');

    }

    async consolidarCarteira() {
        this.close();
        await this.loading.createLoading('Calculando...');

        let i = 0;
        const calc = new Map();
        const total = {
            totalCompra: 0,
            totalAtual: 0
        };

        this.investimentos.forEach(investimento => {
            const papel = investimento.papel;

            if (!calc[papel]) {
                calc[papel] = {
                    papel,
                    quantidade: 0,
                    valorCompra: 0,
                    valorAtual: 0,
                    diferenca: 0
                };
            }

            calc[papel].quantidade += +investimento.quantidade;
            calc[papel].valorCompra += +investimento.quantidade * +investimento.valorCompra;

        });

        Object.keys(calc).forEach(async papel => {
            await this.b3.findPapel(papel).subscribe(res => {

                calc[papel].valorCompra = parseFloat(calc[papel].valorCompra.toFixed(2));
                calc[papel].valorAtual = parseFloat((+calc[papel].quantidade * res.chart.result[0].meta.regularMarketPrice).toFixed(2));
                calc[papel].diferenca = parseFloat((+calc[papel].valorAtual - +calc[papel].valorCompra).toFixed(2));

                total.totalCompra += parseFloat(calc[papel].valorCompra.toFixed(2));
                total.totalAtual += parseFloat(calc[papel].valorAtual.toFixed(2));

                i++;
                if (i === Object.values(calc).length) {
                    this.presentModal(calc, total, 'consolidarC');
                }
            }, error => {
                this.erroB3();
            });
        });

    }

    async presentModal(calc, total, tipo) {
        await this.loading.dismissLoading();

        const modal = await this.modalController.create({
            component: ModalCadastroPage,
            componentProps: {
                tipo,
                consolidado: Object.values(calc),
                total
            }
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
    }

    erroB3() {
        this.loading.dismissLoading();
        this.alert.infoErrorAlert(() => {
            this.router.navigate(['/tabs/tab1']);
        }, 'Voltar');
    }

    close() {
        this.popover.dismiss();
    }

}
