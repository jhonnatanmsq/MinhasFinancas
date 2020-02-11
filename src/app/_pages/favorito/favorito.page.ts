import {Component, OnInit, ViewChild} from '@angular/core';
import {FavoritosDTO} from '../../_models/favoritos.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {Chart} from 'chart.js';
import {FavoritosService} from '../../_service/favoritos.service';
import {B3Service} from '../../_service/b3.service';

@Component({
    selector: 'app-favorito',
    templateUrl: './favorito.page.html',
    styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private service: FavoritosService, private b3Service: B3Service) {
    }

    @ViewChild('barChart', null) barChart;

    bars: any;
    colorArray: any;
    valores: any[] = [];
    dias: any[] = [];
    allValues: any[];
    allDays: any[];

    dados: object;

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

        await this.service.findById(id).subscribe(res => {
            this.favorito = res.data();

            this.b3Service.findPapel(this.favorito.papel).subscribe(res => {
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
                    papel: this.favorito.papel,
                    ultima: this.valores[0],
                    media: (media / this.valores.length),
                    maior,
                    menor
                };

                this.createBarChart();
            });
        });
    }

    deletar(id) {
        this.service.remove(id).then(res => {
            this.router.navigate(['/tabs/tab1']);
        });
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
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });
    }

}
