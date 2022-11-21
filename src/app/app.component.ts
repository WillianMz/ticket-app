import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilResponse } from './models/pessoa/perfilResponse.model';
import { Usuario } from './models/user/usuario.model';
import { LoginService } from './services/login.service';
import { PessoaService } from './services/pessoa.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  usuario: Usuario;
  perfil: PerfilResponse;

  public appPages = [
    /* { title: 'Home', url: '/home', icon: 'home' }, */
    { title: 'Meus Chamados', url: '/ticket-list', icon: 'ticket' },
    { title: 'Abrir Chamado', url: '/ticket-open', icon: 'add' },
    { title: 'Laboratórios', url: '/sector-list', icon: 'layers' },
    { title: 'Perfil', url: '/perfil', icon: 'newspaper' },
    { title: 'Sobre', url: '/about', icon: 'book' }
  ];

  constructor(
    private loginService: LoginService,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.configurarNavBar();
  }

  configurarNavBar(){
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuario = user;
      this.carregarPerfil();
    }
  }

  sair(){
    this.loginService.fazerLogout();
  }

  private carregarPerfil(){
    this.pessoaService.meuPerfil().subscribe({
      next: (response) => {
        if(response){
          this.perfil = response;
        }
        else{
          this.router.navigate(['/users/account']);
        }
      }
    });
  }
}
