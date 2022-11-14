import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilResponse } from 'src/app/models/pessoa/perfilResponse.model';
import { Usuario } from 'src/app/models/user/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  perfil: PerfilResponse;

  public appPages = [
    /* { title: 'Home', url: '/home', icon: 'home' }, */
    { title: 'Abrir Chamado', url: '/ticket-open', icon: 'add' },
    { title: 'Meus Chamados', url: '/ticket-list', icon: 'ticket' },
    { title: 'Laboratórios', url: '/sector-list', icon: 'layers' },
    { title: 'Perfil', url: '/perfil', icon: 'newspaper' },
    { title: 'Sobre', url: '/about', icon: 'book' }
    /* { title: 'Sair', url: '/about', icon: 'exit' } */
  ];

  constructor(
    private loginService: LoginService,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.configurarNavBar();
  }
  ngOnInit(): void {
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
