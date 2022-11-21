import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChamadoResponse } from 'src/app/models/ticket/chamadoResponse.model';
import { CriadorResponse } from 'src/app/models/pessoa/criadorResponse.model';
import { FinalizarRequest } from 'src/app/models/ticket/finalizarRequest.model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.page.html',
  styleUrls: ['./ticket-form.page.scss'],
})
export class TicketFormPage implements OnInit {

  chamadoId: number;
  ticketForm: FormGroup;
  solucaoForm: FormGroup;
  chamado: ChamadoResponse;
  criador: CriadorResponse;
  sucesso: boolean;
  mensagem: string;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    const chamado = new ChamadoResponse();
    this.validarFormulario(chamado);
  }

  ngOnInit() {
    //pega o id na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.chamadoId = parseInt(id);
      this.carregarChamado(this.chamadoId);
    }
  }

  private carregarChamado(id: number){
    this.ticketService.getById(id).subscribe({
      next: (response) => {
        if(response){
          console.log(response);
          this.chamado = response;
          this.criador = this.chamado.criador;
          this.validarFormulario(this.chamado);
        }
        else{
          //this.notification.showInfo('Chamado não encontrado!');
          this.router.navigate(['/ticket']);
        }
      },
      error: () => {
        //this.notification.showError('Não foi possível carregar os dados do chamado!');
      }
    });
  }

  private validarFormulario(chamado: ChamadoResponse){
    this.ticketForm = new FormGroup({
      id: new FormControl(chamado.id),
      dtAbertura: new FormControl(chamado.dataAbertura),
      criador: new FormControl(chamado.criador?.nome),
      setor: new FormControl(chamado.setor?.id),
      assunto: new FormControl(chamado.assunto),
      descricao: new FormControl(chamado.descricao),
      status: new FormControl(chamado.status),
      prioridade: new FormControl(chamado.prioridade),
      dtFechamento: new FormControl(chamado.dataFechamento),
      solucao: new FormControl(chamado.solucao),
      operador: new FormControl(chamado.operador?.id),
      equipamento: new FormControl(`${chamado.equipamentoId}-${chamado.equipamentoNome}`),
      finalizador: new FormControl(chamado.finalizador?.nome)
    });
  }

  private validarFormSolucao(solucao: FinalizarRequest){
    this.solucaoForm = new FormGroup({
      solucaoAplicada: new FormControl(solucao.solucao, [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

}
