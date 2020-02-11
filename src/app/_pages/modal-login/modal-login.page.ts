import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.page.html',
    styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage implements OnInit {

    constructor(private modalController: ModalController, private firebase: AngularFireAuth, private router: Router) {
    }

    ngOnInit() {
    }

    logar(email: string, senha: string) {
        this.firebase.auth.signInWithEmailAndPassword(email, senha).then(res => {
            alert('Logado com sucesso!');
            this.close({Sucesso: 'Logado com sucesso!'});
            this.router.navigate(['/tabs/tab2']);
        }).catch(error => {
            alert(error);
        });
    }

    async close(data) {
        await this.modalController.dismiss(data);
    }
}
