import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InvestimentosService} from './_service/investimentos.service';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FavoritosService} from './_service/favoritos.service';
import {B3Service} from './_service/b3.service';
import {DividendosService} from './_service/dividendos.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ModalLoginPageModule} from './_pages/modal-login/modal-login.module';
import {Loading} from './_utils/loading';
import {Alert} from './_utils/alert';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        ModalLoginPageModule,
        AngularFireDatabaseModule],
    providers: [
        StatusBar,
        SplashScreen,
        InvestimentosService,
        FavoritosService,
        DividendosService,
        B3Service,
        Loading,
        Alert,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
