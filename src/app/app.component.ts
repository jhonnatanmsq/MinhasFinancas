import {Component} from '@angular/core';

import {ModalController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {ModalLoginPage} from './_pages/modal-login/modal-login.page';
import {Router} from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private firebase: AngularFireAuth,
        public modalController: ModalController,
        private router: Router
    ) {
        this.authGuard();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    authGuard() {
        this.firebase.authState.subscribe(user => {
            if (user) {
                this.initializeApp();
            } else {
                this.presentModal();
            }
        });
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalLoginPage
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data == null) {
            this.presentModal();
        } else {
            this.router.navigate(['/']);
        }
    }
}
