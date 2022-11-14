import { UsuarioResponse } from './../models/user/usuarioResponse.model';
import { EsqueciMinhaSenha } from './../models/user/esqueciMinhaSenha.model';
import { RecuperarSenha } from './../models/user/recuperarSenha.model';
import { Usuario } from 'src/app/models/user/usuario.model';
import { AtivarUsuarioRequest } from './../models/user/ativarUsuarioRequest.model';
import { AlterarSenhaRequest } from './../models/user/alterarSenhaRequest';
import { UsuarioRoleRequest } from './../models/user/usuarioRoleRequest.model';
import { Observable } from 'rxjs';
import { RoleRequest } from './../models/user/roleRequest.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleResponse } from '../models/user/roleResponse.model';
import { UsuarioModel } from '../models/user/usuarioModel';
import { EditarUsuarioModel } from '../models/user/editarUsuarioModel';
import { environment } from 'src/environments/environment';
import { ListarUsuarioModel } from '../models/user/listarUsuarioModel';
import { CadastroUsuarioRequest } from '../models/user/cadastroUsuarioRequest.model';
import { CadastroUsuarioResponse } from '../models/user/cadastroUsuarioResponse.model';
import { ListarIdUsuarioModel } from '../models/user/listarIdUsuarioModel';

const ENDERECO_API: string = `${environment.api}/usuario`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  public criarRole(role: RoleRequest) : Observable<any>{
    return this.http.post(`${ENDERECO_API}`, role);
  }

  public getRoles(): Observable<RoleResponse[]>{
    return this.http.get<RoleResponse[]>(`${ENDERECO_API}/list-role`);
  }

  public adicionarUsuarioRole(usuarioRole: UsuarioRoleRequest) {
    return this.http.post(`${ENDERECO_API}/role-usuario`, usuarioRole);
  }

  public removerUsuarioRole(usuario: UsuarioRoleRequest) {
    return this.http.put(`${ENDERECO_API}/role-usuario`, usuario);
  }

  public adicionar(usuario: CadastroUsuarioRequest): Observable<CadastroUsuarioResponse | null>{
    return this.http.post(`${ENDERECO_API}`, usuario);
  }

  public getAll(): Observable<UsuarioResponse[]>{
    return this.http.get<UsuarioResponse[]>(`${ENDERECO_API}`);
  }

  public editar(usuario: EditarUsuarioModel) {
    return this.http.put(`${ENDERECO_API}`, usuario);
  }

  public getById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${ENDERECO_API}/${id}`);
  }

  public delete(id: string){
    return this.http.delete(`${ENDERECO_API}/${id}`);
  }

  public alterarSenha(senha: AlterarSenhaRequest) {
    return this.http.post(`${ENDERECO_API}/alterar-senha`, senha);
  }

  public ativarConta(ativarUsuario: AtivarUsuarioRequest) {
    return this.http.post(`${ENDERECO_API}/ativar-conta`, ativarUsuario);
  }

  public solicitarCodigo(email: string) {
    return this.http.post(`${ENDERECO_API}/solicitar-codigo?email=${email}`, null);
  }

  public bloquear(conta: string) {
    return this.http.post(`${ENDERECO_API}/bloquear?usuarioId=${conta}`, null);
  }

  public desbloquear(conta: string) {
    return this.http.post(`${ENDERECO_API}/desbloquear?usuarioId=${conta}`, null);
  }

  public esqueciMinhaSenha(email: EsqueciMinhaSenha) {
    return this.http.post(`${ENDERECO_API}/esqueci-minha-senha`, email);
  }

  public recuperarSenha(recuperar: RecuperarSenha) {
    return this.http.post(`${ENDERECO_API}/confirmar-esqueci-senha`, recuperar);
  }

}
