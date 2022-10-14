import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamadoRequest } from 'src/app/models/chamadoRequest.model';
import { EquipamentoResponse } from 'src/app/models/equipamentoResponse.model';
import { SetorResponse } from 'src/app/models/setorResponse.model';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { SetorService } from 'src/app/services/setor.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-open',
  templateUrl: './ticket-open.page.html',
  styleUrls: ['./ticket-open.page.scss'],
})
export class TicketOpenPage implements OnInit {

  chamadoForm: FormGroup;
  setores: SetorResponse[];
  equipamento: EquipamentoResponse;
  selecionarPrioridade: boolean = false;
  sucesso: boolean;
  mensagem: string;

  constructor(
    private setorService: SetorService,
    private equipamentoService: EquipamentoService,
    private chamadoService: TicketService,
    private router: Router
  ) { 
    const chamado = new ChamadoRequest();
    this.validarFormulario(chamado);
  }

  ngOnInit() {
  }

  get inputEquipamento(){
    return this.chamadoForm.get('equipamento');
  }

  get inputSetor(){
    return this.chamadoForm.get('setor');
  }

  get inputAssunto(){
    return this.chamadoForm.get('assunto');
  }

  get inputDescricao(){
    return this.chamadoForm.get('descricao');
  }

  public identificarEquipamento(){
    this.obterEquipamento(this.inputEquipamento?.value);
    //this.obterSetores();
  }

  public salvar(){
    const chamadoRequest = new ChamadoRequest();
    chamadoRequest.equipamentoId = this.inputEquipamento?.value;
    chamadoRequest.assunto = this.inputAssunto?.value;
    chamadoRequest.descricao = this.inputDescricao?.value;

    this.chamadoService.chamadoEquipamento(chamadoRequest).subscribe({
      next: (response) => {
        this.sucesso = response['sucesso'];
        this.mensagem = response['mensagem'];

        if(this.sucesso){
          alert(this.mensagem);
          //this.notification.alertSucesso('Novo chamado', this.mensagem, 2000, true);
          //this.router.navigate(['/ticket']);
        }
        else{
          alert(this.mensagem);
        }
      },
      error: () => {
        alert('Erro');
      }
    });
  }


  private obterEquipamento(id: string){
    this.equipamentoService.getById(parseInt(id)).subscribe({
      next: (response) => {
        if(response){
          this.equipamento = response;
          //this.carregarDadosFormulario(this.equipamento);
          //remover depois
          //this.notification.showInfo('Equipamento identificado');
          alert('Equipamento identificado');
        }
        else{
          //this.notification.showWarning('Equipamento não identificado');
          alert('Equipamento não identificado');
        }
      },
      error: () => {
        //this.notification.showError('Erro ao carregar dados do equipamento');
        alert('Erro ao carregar dados do equipamento');
      }
    })
  }


  private validarFormulario(chamado: ChamadoRequest){
    this.chamadoForm = new FormGroup({
      equipamento: new FormControl(chamado.equipamentoId, [Validators.required]),
      setor: new FormControl(chamado.setorId),
      prioridade: new FormControl(chamado.prioridade),
      assunto: new FormControl(chamado.assunto, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      descricao: new FormControl(chamado.descricao,[
        Validators.required,
        Validators.minLength(35),
        Validators.maxLength(1000)
      ])
    });
  }

}
