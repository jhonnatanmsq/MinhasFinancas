import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {path: 'portifolio/:id', loadChildren: './_pages/portifolio/portifolio.module#PortifolioPageModule'},
    {path: 'favorito/:id', loadChildren: './_pages/favorito/favorito.module#FavoritoPageModule'},
    {path: 'dividendo/:id', loadChildren: './_pages/dividendo/dividendo.module#DividendoPageModule'},
    {
        path: 'dividendo',
        loadChildren: () => import('./_pages/dividendo/dividendo.module').then(m => m.DividendoPageModule)
    },
    {
        path: 'favorito',
        loadChildren: () => import('./_pages/favorito/favorito.module').then(m => m.FavoritoPageModule)
    },
    {
        path: 'modal-cadastro',
        loadChildren: () => import('./_pages/modal-cadastro/modal-cadastro.module').then(m => m.ModalCadastroPageModule)
    },
    {
        path: 'modal-login',
        loadChildren: () => import('./_pages/modal-login/modal-login.module').then(m => m.ModalLoginPageModule)
    },
    {
        path: 'portifolio',
        loadChildren: () => import('./_pages/portifolio/portifolio.module').then(m => m.PortifolioPageModule)
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
