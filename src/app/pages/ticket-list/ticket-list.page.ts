import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ChamadoResponse } from 'src/app/models/ticket/chamadoResponse.model';
import { Usuario } from 'src/app/models/user/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
})
export class TicketListPage implements OnInit {

  chamados: ChamadoResponse[];
  chamado: ChamadoResponse;
  chamadoId: number;
  sucesso: boolean;
  mensagem: string;
  descricao: string;
  usuarioLogado: Usuario;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private loginService: LoginService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuarioLogado = user;
    }
    this.pendentes();
  }

  pendentes(){
    this.listarMeusChamados(2);
  }

  finalizados(){
    this.listarMeusChamados(6);
  }

  todos(){
    this.listarMeusChamados(0);
  }

  private listarMeusChamados(status: number){
    this.ticketService.getMeusChamados(status).subscribe({
      next: (response) => {
        if(response){
          this.chamados = response;
        }
        else{
          this.notificacao('top','Não foi possível obter os chamados!');
        }
      },
      error: () => {
        this.notificacao('top','Ocorreu um erro ao consultar seus chamados!');
      }
    });
  }

  async notificacao(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
