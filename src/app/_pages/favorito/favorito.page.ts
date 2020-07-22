import {Component, OnInit, ViewChild} from '@angular/core';
import {FavoritosDTO} from '../../_models/favoritos.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {Chart} from 'chart.js';
import {FavoritosService} from '../../_service/favoritos.service';
import {B3Service} from '../../_service/b3.service';
import {Loading} from '../../_utils/loading';
import {Alert} from '../../_utils/alert';

@Component({
    selector: 'app-favorito',
    templateUrl: './favorito.page.html',
    styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: FavoritosService,
                private b3Service: B3Service,
                public loading: Loading,
                public alert: Alert) {
    }

    @ViewChild('barChart', null) barChart;

    bars: any;
    colorArray: any;
    valores: any[] = [];
    dias: any[] = [];
    allValues: any[];
    allDays: any[];
    investimento: any;

    dados: any;

    favorito: FavoritosDTO;

    ngOnInit() {
    }

    ionViewDidEnter() {
        const id = this.route.snapshot.params.id;
        this.carregarFavorito(id);
    }

    ionViewWillLeave() {
        this.dados = [];
        this.bars = [];
        this.valores = [];
        this.dias = [];
        this.allValues = [];
        this.allDays = [];
    }

    async carregarFavorito(id) {
        let media = 0.0;
        let maior = 0.0;
        let menor = 0.0;

        await this.service.findById(id).subscribe(papelRes => {
            this.favorito = papelRes.data();

            this.b3Service.findPapel(this.favorito.papel).subscribe(res => {
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
                    papel: this.favorito.papel,
                    ultima: this.valores[this.valores.length - 1],
                    media: (media / this.valores.length),
                    maior,
                    menor
                };

                this.createBarChart();
            }, error => {
                this.erroB3();
            });
        }, error => {
            this.erroB3();
        });
    }

    deletar(id) {
        this.service.remove(id).then(res => {
            this.router.navigate(['/tabs/tab1']);
        }, error => {
            this.erroB3();
        });
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
    }

    erroB3() {
        this.loading.dismissLoading();
        this.alert.infoErrorAlert(() => {
            this.router.navigate(['/tabs/tab1']);
        }, 'Voltar');
    }

}
