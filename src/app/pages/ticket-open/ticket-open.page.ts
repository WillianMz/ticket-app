import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { TicketService } from 'src/app/services/ticket.service';
import { SetorResponse } from 'src/app/models/sector/setorResponse.model';
import { EquipamentoResponse } from 'src/app/models/equipment/equipamentoResponse.model';
import { ChamadoRequest } from 'src/app/models/ticket/chamadoRequest.model';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-ticket-open',
  templateUrl: './ticket-open.page.html',
  styleUrls: ['./ticket-open.page.scss'],
})
export class TicketOpenPage implements OnInit {

  chamadoForm: FormGroup;
  setores: SetorResponse[];
  equipamento: EquipamentoResponse;
  sucesso: boolean;
  mensagem: string;
  anexoForm: any;
  anexoNome: string;
  urlAnexo: string;

  constructor(
    private setorService: SectorService,
    private equipamentoService: EquipamentoService,
    private chamadoService: TicketService,
    private router: Router,
    private toastController: ToastController,
    private uploadService: UploadService
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

  public upload(file: any){
    this.anexoForm = file[0];
    this.anexoNome = file[0].name;
    this.fazerUpload();
  }

  public salvar(){
    const chamadoRequest = new ChamadoRequest();
    chamadoRequest.equipamentoId = this.inputEquipamento?.value;
    chamadoRequest.assunto = this.inputAssunto?.value || `Equipamento ${chamadoRequest.equipamentoId}`;
    chamadoRequest.descricao = this.inputDescricao?.value;
    chamadoRequest.anexo = this.urlAnexo;

    this.chamadoService.chamadoEquipamento(chamadoRequest).subscribe({
      next: (response) => {
        this.sucesso = response['sucesso'];
        this.mensagem = response['mensagem'];

        if(this.sucesso){
          //alert(this.mensagem);
          this.notificacao('top', this.mensagem);
          this.chamadoForm.reset();
          this.router.navigate(['/ticket-list']);
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

  async notificacao(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position
    });

    await toast.present();
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

  private fazerUpload(){
    let formdata = new FormData();
    formdata.append('file', this.anexoForm, this.anexoNome);

    this.uploadService.arquivo(formdata).subscribe({
      next: (response) => {
        if(response){
          this.urlAnexo = response['objeto'];
          console.log(this.urlAnexo);
        }
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

}
