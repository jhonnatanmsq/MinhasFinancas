import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PortifolioDTO} from '../../_models/portifolio.dto';
import {InvestimentosService} from '../../_service/investimentos.service';
import {FavoritosDTO} from '../../_models/favoritos.dto';
import {FavoritosService} from '../../_service/favoritos.service';
import {B3Service} from '../../_service/b3.service';
import {DividendosDTO} from '../../_models/dividendos.dto';
import {DividendosService} from '../../_service/dividendos.service';
import {Alert} from '../../_utils/alert';

@Component({
    selector: 'app-investimentos',
    templateUrl: './modal-cadastro.page.html',
    styleUrls: ['./modal-cadastro.page.scss'],
})
export class ModalCadastroPage implements OnInit {

    investimento: PortifolioDTO;
    favoritos: FavoritosDTO;
    dividendos: DividendosDTO;

    tipo: string;

    constructor(private modalController: ModalController,
                private service: InvestimentosService,
                private dividendosService: DividendosService,
                private navParams: NavParams,
                private favoritoService: FavoritosService,
                public alert: Alert,
                private b3Service: B3Service) {
        this.tipo = navParams.get('tipo');
    }

    ngOnInit() {
    }

    cadastrarportifolio(papel: string, valorCompra: number, quantidade: number, dataIso: Date) {

        const dataCompra: Date = new Date(dataIso);

        this.investimento = {papel: papel.toUpperCase(), valorCompra, quantidade, dataCompra: dataCompra.toLocaleDateString()};

        this.b3Service.findPapel(papel).subscribe(res => {
            if (!res['Error Message']) {
                this.service.create(this.investimento).then(res => {
                    this.alert.presentAlert(`Investimento ${this.investimento.papel.toUpperCase()} cadastrado com sucesso!`, 'Sucesso!', 'OK', null);
                    this.close(this.investimento);
                }, error => {
                    this.alert.presentAlert(error.message, 'Ocorreu um erro!', 'OK', null);
                    this.close(error.message);
                });
            } else {
                this.alert.presentAlert('Papel não encontrado, tente novamente mais tarde!', 'Ocorreu um erro ao encotrar o Papel', 'OK', null);
                this.close({Error: 'Papel não encontrado'});
            }
        });
    }

    cadastrarDividendo(papel: string, valorDividendo: number, quantidade: number, dataIso: Date) {

        const dataDividendo: Date = new Date(dataIso);

        this.dividendos = {papel: papel.toUpperCase(), valorDividendo, quantidade, dataDividendo: dataDividendo.toLocaleDateString()};

        this.b3Service.findPapel(papel).subscribe(res => {
            if (!res['Error Message']) {
                this.dividendosService.create(this.dividendos).then(res => {
                    this.alert.presentAlert(`Dividendo ${this.dividendos.papel.toUpperCase()} cadastrado com sucesso!`, 'Sucesso!', 'OK', null);
                    this.close(this.dividendos);
                }, error => {
                    this.alert.presentAlert(error.message, 'Ocorreu um erro!', 'OK', null);
                    this.close(error.message);
                });
            } else {
                this.alert.presentAlert('Papel não encontrado, tente novamente mais tarde!', 'Ocorreu um erro ao encotrar o Papel', 'OK', null);
                this.close({Error: 'Papel não encontrado'});
            }
        });
    }

    async close(data) {
        await this.modalController.dismiss(data);
    }

    cadastrarFavorito(papel: string) {
        this.favoritos = {papel: papel.toUpperCase()};

        this.b3Service.findPapel(papel).subscribe(res => {
            if (!res['Error Message']) {
                this.favoritoService.create(this.favoritos).then(res => {
                    this.alert.presentAlert(`Investimento ${papel.toUpperCase()} cadastrado com sucesso!`, 'Sucesso!', 'OK', null);
                    this.close(this.favoritos);
                }, error => {
                    this.alert.presentAlert(error.message, 'Ocorreu um erro!', 'OK', null);
                    this.close(error.message);
                });
            } else {
                this.alert.presentAlert('Papel não encontrado, tente novamente mais tarde!', 'Ocorreu um erro ao encotrar o Papel', 'OK', null);
                this.close({Error: 'Papel não encontrado'});
            }
        });
    }

}
