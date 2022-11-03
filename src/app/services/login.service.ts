import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { CadastroUsuarioRequest } from '../models/user/cadastroUsuarioRequest.model';
import { CadastroUsuarioResponse } from '../models/user/cadastroUsuarioResponse.model';
import { LoginRequest } from '../models/auth/loginRequest.model';
import { LoginResponse } from '../models/auth/loginResponse.model';
import { Usuario } from '../models/user/usuario.model';

const CHAVE_TOKEN: string = "ticketapp";
const ENDERECO_API: string = `${environment.api}/usuario`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  criarContaDeUsuario(novaConta: CadastroUsuarioRequest): Observable<CadastroUsuarioResponse | null>{
    return this.http.post(ENDERECO_API, novaConta);
  }

  //OK
  fazerLogin(login: LoginRequest): Observable<LoginResponse | null>{
    return this.http.post(`${ENDERECO_API}/login`, login);
  }

  //OK
  fazerLogout(){
    delete localStorage[CHAVE_TOKEN];
    this.router.navigate(['/login']);
  }
  
  //OK
  salvarToken(token: string){
    localStorage.setItem(CHAVE_TOKEN, token);
  }

  obterToken() {
    const token = localStorage.getItem(CHAVE_TOKEN);
    return token;
  }

  //OK
  public usuarioLogado() : Usuario | null{
    const token = localStorage.getItem(CHAVE_TOKEN);
    if(token) {

      //verifica se esta expirado
      if(this.tokenExpirado()){
        this.router.navigate(['/login']);
        return null;
      }

      const decoded: any = jwt_decode.default(token);
      let usuario = new Usuario();
      usuario.email= decoded.email;
      usuario.nome = decoded.name;
      usuario.perfil = decoded.role;
      console.log(usuario.email= decoded.email);
      console.log(usuario.nome = decoded.name);
      return usuario;
    }
    else{
      this.router.navigate(['/login']);
      return null
    }
  }

  //OK
  tokenExpirado(): boolean {
    const token = localStorage.getItem(CHAVE_TOKEN);
    if(!token){
      return true;
    }

    const date = this.obterDataExpiracaoDoToken();
    if(date == undefined){
      return false;
    }

    //se a data do token for maior que a atual nao esta expirado
    //caso contrario esta expirado
    return !(date.valueOf() > new Date().valueOf());
  }

  //OK
  private obterDataExpiracaoDoToken(): Date | null{
    const token = localStorage.getItem(CHAVE_TOKEN);
    if(token){
      const decoded: any = jwt_decode.default(token);

      if(decoded.exp === undefined){
        return null;
      }

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    }
    else{
      return null;
    }
  }

  usuarioEstaLogado() {
    const token = localStorage.getItem(CHAVE_TOKEN);
    if(!token){
      return false;
    }
    else if(this.tokenExpirado()){
      return false;
    }

    return true;
  }

}
