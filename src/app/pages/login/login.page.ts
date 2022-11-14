import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/auth/loginRequest.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:  FormGroup;
  mensagem: string;
  sucesso: boolean;
  mensagemDeErro: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { 
    const login = new LoginRequest();
    login.email = '';
    login.senha = '';
    this.startForm(login);
  }

  ngOnInit() {
  }

  get inputEmail(){
    return this.loginForm.get('email');
  }

  get inputSenha(){
    return this.loginForm.get('senha');
  }

  public entrar(){
    let login = new LoginRequest;
    login.email = this.inputEmail?.value;
    login.senha = this.inputSenha?.value;
    /* login.email = 'willianmazzorana@hotmail.com';
    login.senha = '@Willian2022';
 */

    this.loginService.fazerLogin(login).subscribe({
      next: (response) => {
        if(response) {
          this.sucesso = response['sucesso'];
          if(this.sucesso){
            const token = response['mensagem'];
            this.loginService.salvarToken(token);
            this.router.navigate(['']);
          }
          else{
            this.mensagemDeErro = response['mensagem'];
          }
        }
        else{
          alert('Aqui');
        }
      },
      error: (error) => {
        alert('Erro' + error.error);
      }
    });
  }

  private startForm(login: LoginRequest) {
    this.loginForm = new FormGroup({
      email: new FormControl(login.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        Validators.maxLength(200)
      ]),
      senha: new FormControl(login.senha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }

}
