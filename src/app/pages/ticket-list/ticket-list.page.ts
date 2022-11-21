import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuarioLogado = user;
    }
    this.pendentes();
  }

  verChamado(id: number){
    this.router.navigate([`/ticket-form/${id}`]);
  }

  abrirChamado(){
    this.router.navigate(['/ticket-open']);
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

  private async listarMeusChamados(status: number){
    const loading = await this.loadingCtrl.create({
      cssClass: 'backdrop-opacity',
      message: 'Aguarde...',
      animated: true,
      spinner: 'lines'
    });
    await loading.present();

    this.ticketService.getMeusChamados(status).subscribe({
      next: (response) => {
        if(response){
          this.chamados = response;
          loading.dismiss();
        }
        else{
          //this.notificacao('top','Não foi possível obter os chamados!');
          this.alerta('Obter chamados','Nenhum chamado encontrado');
          loading.dismiss();
        }
      },
      error: () => {
        this.notificacao('top','Ocorreu um erro ao consultar seus chamados!');
        loading.dismiss();
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

  private async alerta(titulo: string, mensagem: string, subtitulo?: string){
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
