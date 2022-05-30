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
    path: 'category-list',
    loadChildren: () => import('./pages/category-list/category-list.module').then( m => m.CategoryListPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ticket-anexo',
    loadChildren: () => import('./pages/ticket-anexo/ticket-anexo.module').then( m => m.TicketAnexoPageModule)
  },
  {
    path: 'ticket-comentario',
    loadChildren: () => import('./pages/ticket-comentario/ticket-comentario.module').then( m => m.TicketComentarioPageModule)
  },  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
