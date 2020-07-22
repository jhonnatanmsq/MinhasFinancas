import {Component, OnInit, ViewChild} from '@angular/core';
import {AtivoDto} from '../../_models/ativo.dto';
import {FavoritosDTO} from '../../_models/favoritos.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {InvestimentosService} from '../../_service/investimentos.service';
import {Chart} from 'chart.js';
import {B3Service} from '../../_service/b3.service';
import {ModalController} from '@ionic/angular';
import {Loading} from '../../_utils/loading';
import {Alert} from '../../_utils/alert';

@Component({
    selector: 'app-portifolio',
    templateUrl: './variacao.page.html',
    styleUrls: ['./variacao.page.scss'],
})
export class VariacaoPage implements OnInit {

    @ViewChild('barChart', null) barChart;

    bars: any;
    colorArray: any;
    valores: any[] = [];
    dias: any[] = [];
    allValues: any[];
    allDays: any[];
    visible = true;

    dados: any;

    investimento: AtivoDto;
    favorito: FavoritosDTO;

    ngOnInit() {
    }

    constructor(private route: ActivatedRoute,
                private router: Router,
                public modalController: ModalController,
                private service: InvestimentosService,
                private b3Service: B3Service,
                public loading: Loading,
                public alert: Alert) {
    }

    ionViewDidEnter() {
        const id = this.route.snapshot.params.id;
        this.carregarportifolio(id);
    }

    ionViewWillLeave() {
        this.dados = [];
        this.bars = [];
        this.valores = [];
        this.dias = [];
        this.allValues = [];
        this.allDays = [];
    }

    async carregarportifolio(id) {
        let media = 0.0;
        let maior = 0.0;
        let menor = 0.0;

        this.loading.createLoading('Carregando...');

        await this.service.findById(id).subscribe(papelRes => {
            this.investimento = papelRes.data();
            this.investimento.id = papelRes.id;
            this.b3Service.findPapel(this.investimento.papel).subscribe(res => {
                this.allValues = res.chart.result[0].indicators.adjclose[0].adjclose;
                this.allDays = res.chart.result[0].timestamp;

                this.allValues.forEach(value => {
                    this.valores.push(value);
                    media += +value;
                    if (+value > maior) {
                        maior = +value;
                    }
                    if (+value < menor || menor === 0) {
                        menor = +value;
                    }
                });

                this.allDays.forEach(value => {
                    this.dias.push(new Date(value * 1000).toLocaleDateString());
                });

                this.dados = {
                    ultima: this.valores[this.valores.length - 1],
                    variacao: +this.valores[this.valores.length - 1] - +this.investimento.valorCompra,
                    media: (media / this.valores.length),
                    maior,
                    menor,
                    percentagem: ((+this.valores[this.valores.length - 1] - +this.investimento.valorCompra) / +this.investimento.valorCompra) * 100,
                    gastoTotal: +this.investimento.valorCompra * +this.investimento.quantidade,
                    valorTotal: +this.investimento.quantidade * this.valores[this.valores.length - 1],
                    liquido: (+this.investimento.quantidade * this.valores[this.valores.length - 1]) - (+this.investimento.valorCompra * +this.investimento.quantidade),
                    inclinacao: (this.valores[this.valores.length - 1] - maior) === 0 ? (((this.valores[this.valores.length - 1] - menor) / maior) * 100) : (((this.valores[this.valores.length - 1] - maior) / maior) * 100)
                };

                this.createBarChart();
            }, error => {
                this.erroB3();
            });
        }, error => {
            this.erroB3();
        });
    }

    erroB3() {
        this.loading.dismissLoading();
        this.alert.infoErrorAlert(() => {
            this.router.navigate(['/tabs/tab1']);
        }, 'Voltar');
    }

    deletar(id) {
        const idParam = this.route.snapshot.params.id;
        if (id === idParam) {
            this.service.deletar(id).then(res => {
                this.router.navigate(['tabs/tab1']);
            }, error => {
                this.erroB3();
            });
        }
    }

    createBarChart() {
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'line',
            data: {
                labels: this.dias,
                datasets: [{
                    label: 'Cotação em R$',
                    data: this.valores,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgb(38, 194, 129)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'white',
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'white'
                        }
                    }]
                }
            }
        });

        this.loading.dismissLoading();
    }
}
