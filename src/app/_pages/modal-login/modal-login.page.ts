import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Alert} from '../../_utils/alert';

@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.page.html',
    styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage implements OnInit {

    constructor(private modalController: ModalController,
                private firebase: AngularFireAuth,
                private router: Router,
                public alert: Alert) {
    }

    ngOnInit() {
    }

    logar(email: string, senha: string) {
        this.firebase.auth.signInWithEmailAndPassword(email, senha).then(res => {
            this.alert.presentAlert('Logado com sucesso!', null, 'OK', null);
            this.close({Sucesso: 'Logado com sucesso!'});
            this.router.navigate(['/tabs/tab1']);
        }).catch(error => {
            this.alert.presentAlert('Ocorreu um erro ao tentar efetuar o login.\n' +
                'Tente novamente mais tarde', null, 'OK', null);
        });
    }

    async close(data) {
        await this.modalController.dismiss(data);
    }
}
