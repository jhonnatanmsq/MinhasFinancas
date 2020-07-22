import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {path: 'variacao/:id', loadChildren: './_pages/variacao/variacao.module#VariacaoPageModule'},
    {path: 'favorito/:id', loadChildren: './_pages/favorito/favorito.module#FavoritoPageModule'},
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
        path: 'popover-principal',
        loadChildren: () => import('./_pages/popover-principal/popover-principal.module').then(m => m.PopoverPrincipalPageModule)
    },
    {
        path: 'variacao',
        loadChildren: () => import('./_pages/variacao/variacao.module').then(m => m.VariacaoPageModule)
    },
  {
    path: 'popover-principal',
    loadChildren: () => import('./_pages/popover-principal/popover-principal.module').then( m => m.PopoverPrincipalPageModule)
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
