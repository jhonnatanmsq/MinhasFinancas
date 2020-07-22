import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {AtivoDto} from '../../_models/ativo.dto';
import {InvestimentosService} from '../../_service/investimentos.service';
import {FavoritosDTO} from '../../_models/favoritos.dto';
import {FavoritosService} from '../../_service/favoritos.service';
import {B3Service} from '../../_service/b3.service';
import {ProventosDto} from '../../_models/proventos.dto';
import {DividendosService} from '../../_service/dividendos.service';
import {Alert} from '../../_utils/alert';
import {Loading} from '../../_utils/loading';

@Component({
    selector: 'app-investimentos',
    templateUrl: './modal-cadastro.page.html',
    styleUrls: ['./modal-cadastro.page.scss'],
})
export class ModalCadastroPage implements OnInit {

    investimento: AtivoDto;
    favoritos: FavoritosDTO;
    provento: ProventosDto;

    tipo: string;

    consolidado: any[];

    total: any;

    constructor(private modalController: ModalController,
                private service: InvestimentosService,
                private dividendosService: DividendosService,
                private navParams: NavParams,
                public loading: Loading,
                private favoritoService: FavoritosService,
                public alert: Alert,
                private b3Service: B3Service) {
        this.tipo = navParams.get('tipo');
    }

    ngOnInit() {
    }

    cadastrarportifolio(papel: string, valorCompra: string, quantidade: string, dataIso: string) {

        const dataCompra = dataIso.split('T');

        this.investimento = {papel: papel.toUpperCase(), valorCompra, quantidade, dataCompra: dataCompra[0]};

        this.b3Service.findPapel(papel).subscribe(papelRes => {
            this.service.create(this.investimento).then(res => {
                this.alert.presentAlert(`Investimento ${this.investimento.papel.toUpperCase()} cadastrado com sucesso!`, 'Sucesso!', 'OK', null);
                this.close(this.investimento);
            }, error => {
                this.alert.presentAlert(error.message, 'Ocorreu um erro!', 'OK', null);
                this.close(error.message);
            });
        }, error => {
            this.alert.presentAlert('Papel não encontrado, tente novamente mais tarde!', 'Ocorreu um erro ao encotrar o Papel', 'OK', null);
            this.close({Error: 'Papel não encontrado'});
        });
    }

    cadastrarProvento(papel: string, valorDividendo: string, tipo: string, dataIso: string) {

        this.loading.createLoading('Processando...');

        const dataProvento = dataIso.split('T');

        this.provento = {papel: papel.toUpperCase(), valorDividendo, tipo, dataDividendo: dataProvento[0]};

        this.b3Service.findPapel(papel).subscribe(papelRes => {
            this.dividendosService.create(this.provento).then(res => {
                this.loading.dismissLoading();
                this.alert.presentAlert(`Dividendo ${this.provento.papel.toUpperCase()} cadastrado com sucesso!`, 'Sucesso!', 'OK', null);

                this.close(this.provento);
            }, error => {
                this.close(error.message);
                this.loading.dismissLoading();
                this.alert.presentAlert(error.message, 'Ocorreu um erro!', 'OK', null);
            });
        }, error => {
            this.close({Error: 'Papel não encontrado'});
            this.loading.dismissLoading();
            this.alert.presentAlert('Papel não encontrado, tente novamente mais tarde!', 'Ocorreu um erro ao encotrar o Papel', 'OK', null);
        });
    }

    async close(data) {
        await this.modalController.dismiss(data, 'cancel');
    }

    cadastrarFavorito(papel: string) {
        this.favoritos = {papel: papel.toUpperCase()};

        this.b3Service.findPapel(papel).subscribe(papelRes => {
            this.favoritoService.create(this.favoritos).then(res => {
                this.alert.presentAlert(`Investimento ${papel.toUpperCase()} cadastrado com sucesso!`, 'Sucesso!', 'OK', null);
                this.close(this.favoritos);
            }, error => {
                this.alert.presentAlert(error.message, 'Ocorreu um erro!', 'OK', null);
                this.close(error.message);
            });
        }, error => {
            this.alert.presentAlert('Papel não encontrado, tente novamente mais tarde!', 'Ocorreu um erro ao encotrar o Papel', 'OK', null);
            this.close({Error: 'Papel não encontrado'});
        });
    }

}
