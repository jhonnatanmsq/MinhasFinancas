import {Component, OnInit, ViewChild} from '@angular/core';
import {PortifolioDTO} from '../../_models/portifolio.dto';
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
    templateUrl: './portifolio.page.html',
    styleUrls: ['./portifolio.page.scss'],
})
export class PortifolioPage implements OnInit {

    @ViewChild('barChart', null) barChart;

    bars: any;
    colorArray: any;
    valores: any[] = [];
    dias: any[] = [];
    allValues: any[];
    allDays: any[];
    visible = true;

    dados: any;

    investimento: PortifolioDTO;
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

        await this.service.findById(id).subscribe(res => {
            this.investimento = res.data();
            this.investimento.id = res.id;
            this.b3Service.findPapel(this.investimento.papel).subscribe(res => {
                if (res['Error Message']) {
                    this.erroB3();
                } else {
                    this.allValues = Object.values(res['Time Series (Daily)']);
                    this.allDays = Object.keys(res['Time Series (Daily)']);

                    this.allValues.forEach(value => {
                        if (this.valores.length <= 9) {
                            this.valores.push(value['4. close']);
                            media += +value['4. close'];
                            if (+value['4. close'] > maior) {
                                maior = +value['4. close'];
                            }
                            if (+value['4. close'] < menor || menor === 0) {
                                menor = +value['4. close'];
                            }
                        }
                    });

                    this.allDays.forEach(value => {
                        if (this.dias.length <= 9) {
                            this.dias.push(value);
                        }
                    });

                    this.dados = {
                        ultima: this.valores[0],
                        variacao: +this.valores[0] - +this.investimento.valorCompra,
                        media: (media / this.valores.length),
                        maior,
                        menor,
                        percentagem: ((+this.valores[0] - +this.investimento.valorCompra) / +this.investimento.valorCompra) * 100,
                        gastoTotal: +this.investimento.valorCompra * +this.investimento.quantidade,
                        valorTotal: +this.investimento.quantidade * this.valores[0],
                        liquido: (+this.investimento.quantidade * this.valores[0]) - (+this.investimento.valorCompra * +this.investimento.quantidade),
                        inclinacao: (this.valores[0] - maior) === 0 ? (((this.valores[0] - menor) / maior) * 100) : (((this.valores[0] - maior) / maior) * 100)
                    };

                    this.createBarChart();
                }
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
            });
        }
    }

    createBarChart() {
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'line',
            data: {
                labels: this.dias.reverse(),
                datasets: [{
                    label: 'Cotação em R$',
                    data: this.valores.reverse(),
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgb(38, 194, 129)',
                    borderWidth: 2
                }]
            },
            options: {
                legend: {
                    fontColor: 'white'
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
