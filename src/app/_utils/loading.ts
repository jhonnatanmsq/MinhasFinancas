import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable()
export class Loading {

    constructor(public loadingController: LoadingController) {
    }

    async createLoading(mensagem: any) {
        const loading = await this.loadingController.create({
            message: mensagem
        });
        await loading.present();
    }

    async dismissLoading() {
        await this.loadingController.dismiss();
    }
}
