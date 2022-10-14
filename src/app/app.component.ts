import { Component } from '@angular/core';
import { Usuario } from './models/usuario.model';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  usuario: Usuario;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Abrir Chamado', url: '/ticket-open', icon: 'add' },
    { title: 'Setores', url: '/sector-list', icon: 'layers' },
    { title: 'Meus Tickets', url: '/ticket-list', icon: 'ticket' },
    /* { title: 'Feedback', url: '/ticket-open', icon: 'newspaper' }, */
    { title: 'Sobre', url: '/about', icon: 'book' }
  ];

  constructor(
    private loginService: LoginService
  ) {
    this.configurarNavBar();
  }

  configurarNavBar(){
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuario = user;
    }
  }

  sair(){
    this.loginService.fazerLogout();
  }
}
