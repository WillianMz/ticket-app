import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ticket-open',
    loadChildren: () => import('./pages/ticket-open/ticket-open.module').then( m => m.TicketOpenPageModule)
  },
  {
    path: 'ticket-list',
    loadChildren: () => import('./pages/ticket-list/ticket-list.module').then( m => m.TicketListPageModule)
  },
  {
    path: 'sector-list',
    loadChildren: () => import('./pages/sector-list/sector-list.module').then( m => m.SectorListPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'home',
    //loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
    redirectTo:'ticket-list'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
