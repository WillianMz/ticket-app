import { PerfilRequest } from './../models/pessoa/perfilRequest.model';
import { PerfilResponse } from './../models/pessoa/perfilResponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pais } from '../models/pessoa/pais.model';
import { Uf } from '../models/pessoa/uf.model';
import { OperadorResponse } from '../models/ticket/operadorResponse.model';

const ENDERECO_API: string = `${environment.api}/pessoa`;

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  public meuPerfil(): Observable<PerfilResponse> {
    return this.http.get<PerfilResponse>(`${ENDERECO_API}/meu-perfil`);
  }

  public salvarPerfil(perfil: PerfilRequest) {
    return this.http.post(`${ENDERECO_API}/perfil`, perfil);
  }

  public getPaises (): Array<Pais> {
    const paises: Array<Pais> = [
      { id: 'BR', nome: 'Brasil'}
    ];
    return paises;
  }

  public getEstados(): Array<Uf> {
    const estados: Array<Uf> = [
      {id: 1, paisId: 1, sigla:'AC', nome: 'Acre'},
      {id: 1, paisId: 1, sigla:'AL', nome: 'Alagoas'},
      {id: 1, paisId: 1, sigla:'AP', nome: 'Amapá'},
      {id: 1, paisId: 1, sigla:'AM', nome: 'Amazonas'},
      {id: 1, paisId: 1, sigla:'BA', nome: 'Bahia'},
      {id: 1, paisId: 1, sigla:'CE', nome: 'Ceara'},
      {id: 1, paisId: 1, sigla:'DF', nome: 'Distrito Federal'},
      {id: 1, paisId: 1, sigla:'ES', nome: 'Espírito Santo'},
      {id: 1, paisId: 1, sigla:'GO', nome: 'Goiás'},
      {id: 1, paisId: 1, sigla:'MA', nome: 'Maranhão'},
      {id: 1, paisId: 1, sigla:'MT', nome: 'Mato Grosso'},
      {id: 1, paisId: 1, sigla:'MS', nome: 'Mato Grosso do Sul'},
      {id: 1, paisId: 1, sigla:'MG', nome: 'Minas Gerais'},
      {id: 1, paisId: 1, sigla:'PA', nome: 'Pará'},
      {id: 1, paisId: 1, sigla:'PB', nome: 'Paraíba'},
      {id: 1, paisId: 1, sigla:'PR', nome: 'Paraná'},
      {id: 1, paisId: 1, sigla:'PE', nome: 'Pernambuco'},
      {id: 1, paisId: 1, sigla:'PI', nome: 'Piauí'},
      {id: 1, paisId: 1, sigla:'RJ', nome: 'Rio de Janeiro'},
      {id: 1, paisId: 1, sigla:'RN', nome: 'Rio Grande do Norte'},
      {id: 1, paisId: 1, sigla:'RG', nome: 'Rio Grande do Sul'},
      {id: 1, paisId: 1, sigla:'RO', nome: 'Rondônia'},
      {id: 1, paisId: 1, sigla:'RR', nome: 'Roraima'},
      {id: 1, paisId: 1, sigla:'SC', nome: 'Santa Catarina'},
      {id: 1, paisId: 1, sigla:'SP', nome: 'São Paulo'},
      {id: 1, paisId: 1, sigla:'SE', nome: 'Sergipe'},
      {id: 1, paisId: 1, sigla:'TO', nome: 'Tocantins'}
    ];

    return estados;
  }

  public getOperadores(ativo: boolean): Observable<OperadorResponse[]>{
    return this.http.get<OperadorResponse[]>(`${ENDERECO_API}/operadores?ativo=${ativo}`)
  }
}
