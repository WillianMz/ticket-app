import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private pessoaService: PessoaService,
    private loginService: LoginService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
