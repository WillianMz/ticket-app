import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pais } from 'src/app/models/pessoa/pais.model';
import { PessoaResponse } from 'src/app/models/pessoa/pessoaResponse.model';
import { Uf } from 'src/app/models/pessoa/uf.model';
import { Usuario } from 'src/app/models/user/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilForm: FormGroup;
  perfil: PessoaResponse;
  urlFotoPerfil: string;
  estados: Uf[];
  paises: Pais[];
  usuario: Usuario;
  
  constructor(
    private pessoaService: PessoaService,
    private loginService: LoginService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute
  ) { 
    const perfil = new PessoaResponse();
    this.validarFormulario(perfil);
  }

  ngOnInit() {
    this.paises = this.pessoaService.getPaises();
    this.estados = this.pessoaService.getEstados();
    this.dadosDoUsuarioLogado();
    this.carregarPerfil();
  }

  private dadosDoUsuarioLogado(){
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuario = user;
    }
  }
  
  //meu perfil
  private carregarPerfil(){
    this.pessoaService.meuPerfil().subscribe({
      next: (response) => {
        if(response){
          this.perfil = response;
          this.urlFotoPerfil = this.perfil.imgPerfil!;
          console.log(this.perfil);
          this.validarFormulario(this.perfil);
        }
      }
    });
  }

  private validarFormulario(pessoa: PessoaResponse){
    this.perfilForm = new FormGroup({
      nome: new FormControl(pessoa.nomeCompleto, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      telefone: new FormControl(pessoa.telefone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14)
      ]),
      cidade: new FormControl(pessoa.cidade, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      uf: new FormControl(pessoa.uf, [ Validators.required ]),
      pais: new FormControl(pessoa.pais, [ Validators.required ]),
      imagem: new FormControl(pessoa.imgPerfil)
    });
  }

}
