import { ModulosGuard } from './guards/modulos.guard';
import { UsuarioComponent } from './layout/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    component: UsuarioComponent,
    children: [
      {
        canActivateChild: [ModulosGuard],
        path: 'home',
        loadChildren: () => import('./pages/ticket-list/ticket-list.module').then( m => m.TicketListPageModule)
      },
      {
        canActivateChild: [ModulosGuard],
        path: 'ticket-open',
        loadChildren: () => import('./pages/ticket-open/ticket-open.module').then( m => m.TicketOpenPageModule)
      },
      {
        canActivateChild: [ModulosGuard],
        path: 'ticket-list',
        loadChildren: () => import('./pages/ticket-list/ticket-list.module').then( m => m.TicketListPageModule)
      },
      {
        canActivateChild: [ModulosGuard],
        path: 'ticket-form',
        loadChildren: () => import('./pages/ticket-form/ticket-form.module').then( m => m.TicketFormPageModule)
      },
      {
        canActivateChild: [ModulosGuard],
        path: 'sector-list',
        loadChildren: () => import('./pages/sector-list/sector-list.module').then( m => m.SectorListPageModule)
      },
      {
        canActivateChild: [ModulosGuard],
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
      },
      {
        canActivateChild: [ModulosGuard],
        path: 'perfil',
        loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    /* component: LoginComponent, */
    children: [
      { 
        path:'login',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
