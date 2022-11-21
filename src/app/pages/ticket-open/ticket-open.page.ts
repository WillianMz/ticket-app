import { UploadService } from './../../services/upload.service';
import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { TicketService } from 'src/app/services/ticket.service';
import { SetorResponse } from 'src/app/models/sector/setorResponse.model';
import { EquipamentoResponse } from 'src/app/models/equipment/equipamentoResponse.model';
import { ChamadoRequest } from 'src/app/models/ticket/chamadoRequest.model';
import { SectorService } from 'src/app/services/sector.service';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-ticket-open',
  templateUrl: './ticket-open.page.html',
  styleUrls: ['./ticket-open.page.scss'],
})
export class TicketOpenPage implements OnInit, AfterViewInit, OnDestroy {

  chamadoForm: FormGroup;
  setores: SetorResponse[];
  equipamento: EquipamentoResponse;
  sucesso: boolean;
  mensagem: string;
  anexoForm: any;
  anexoNome: string;
  urlAnexo: string;
  result = null;
  scanActive: boolean = false;
  setorId: number;
  informarEquipamento: boolean;
  selecionarSetor: boolean;

  constructor(
    private setorService: SectorService,
    private equipamentoService: EquipamentoService,
    private chamadoService: TicketService,
    private router: Router,
    private toastController: ToastController,
    private uploadService: UploadService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.setorId = parseInt(params.setorId);
      }
    );  

    const chamado = new ChamadoRequest();
    this.validarFormulario(chamado);
  }

  ngOnInit() {
    if(this.setorId){
      this.informarEquipamento = false;
      this.selecionarSetor = true;
      this.listarSetores(true);
      const chamado = new ChamadoRequest();
      chamado.setorId = this.setorId;
      this.validarFormulario(chamado);
    }
    else{
      this.informarEquipamento = true;
      this.selecionarSetor = false;
    }
  }

  ngAfterViewInit(): void {
    BarcodeScanner.prepare();
  }

  ngOnDestroy(): void {
      
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

  public async lerQrCode(){
    this.scanActive = true;
    document.querySelector('body').classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    // if the result has content
    if (result.hasContent) {
      this.obterEquipamento(result.content);
    }

    document.querySelector('body').classList.remove('scanner-active');
    this.scanActive = false;
  }

  public identificarEquipamento(){
    this.obterEquipamento(this.inputEquipamento?.value);
  }

  public upload(file: any){
    this.anexoForm = file[0];
    this.anexoNome = file[0].name;
    this.fazerUpload();
  }

  public voltar(){
    this.router.navigate(['/home']);
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
          const request = new ChamadoRequest();
          request.equipamentoId =  id;
          this.validarFormulario(request);
        }
        else{
          //alert('Equipamento não identificado');
          this.alerta('Equipamento','Equipamento não encontrado!');
        }
      },
      error: () => {
        this.alerta('Equipamento','Não foi possível identificar o equipamento!');
      }
    });
  }

  private validarFormulario(chamado: ChamadoRequest){
    /* this.chamadoForm = new FormGroup({
      equipamento: new FormControl(chamado.equipamentoId, [Validators.required]),
      setor: new FormControl(chamado.setorId),
      prioridade: new FormControl(chamado.prioridade),
      assunto: new FormControl(chamado.assunto, [
        //Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      descricao: new FormControl(chamado.descricao,[
        Validators.required,
        Validators.minLength(35),
        Validators.maxLength(1000)
      ])
    }); */
    if(this.setorId){
      this.chamadoForm = new FormGroup({
        equipamento: new FormControl(chamado.equipamentoId),
        setor: new FormControl(chamado.setorId, [Validators.required]),
        prioridade: new FormControl(chamado.prioridade),
        assunto: new FormControl(chamado.assunto),
        descricao: new FormControl(chamado.descricao,[
          Validators.required,
          Validators.minLength(35),
          Validators.maxLength(2000)
        ])
      });
     } 
     else {
       this.chamadoForm = new FormGroup({
         equipamento: new FormControl(chamado.equipamentoId, [Validators.required]),
         setor: new FormControl(chamado.setorId),
         prioridade: new FormControl(chamado.prioridade),
         assunto: new FormControl(chamado.assunto),
         descricao: new FormControl(chamado.descricao,[
           Validators.required,
           Validators.minLength(10),
           Validators.maxLength(2000)
         ])
       });
      }
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

  private listarSetores(ativo: boolean) {
    this.setorService.getAll(ativo).subscribe({
      next: (response) => {
        this.setores = response.map(item => {
          return {
            ...item,
            ativoString: item.ativo ? 'Ativo' : 'Inativo'
          }
        });
        
      },
      error: () => {
      }
    });
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
