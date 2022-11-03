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

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { 
    const login = new LoginRequest();
    this.startForm(login);
  }

  ngOnInit() {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get senha(){
    return this.loginForm.get('senha');
  }

  public entrar(){
    let login = new LoginRequest;
    login.email = this.email?.value;
    login.senha = this.senha?.value;

    this.loginService.fazerLogin(login).subscribe({
      next: (response) => {
        if(response?.sucesso == true) {
          this.loginService.salvarToken(response.token);
          this.router.navigate(['']);
        }
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
