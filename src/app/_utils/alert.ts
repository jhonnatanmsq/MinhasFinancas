import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable()
export class Alert {

    constructor(public alertController: AlertController) {
    }

    async presentAlert(message: any, header: any, buttonText: any, handler: any) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons: [
                {
                    text: buttonText,
                    cssClass: 'secondary',
                    handler
                }
            ]
        });
        await alert.present();
    }

    async infoErrorAlert(handler: any, btnText = 'Recarregar') {
        const alert = await this.alertController.create({
            header: 'Ocorreu um erro!',
            message: 'Não foi possível buscar as informações necessárias!\n\n' +
                '\nVerifique a sua conexão com a internet e tente novamente mais tarde',
            buttons: [
                {
                    text: btnText,
                    cssClass: 'secondary',
                    handler
                }
            ]
        });
        await alert.present();
    }
}
