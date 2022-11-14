import { BaixarEquipamentoRequest } from './../models/equipment/baixarEquipamentoRequest.model';
import { EquipamentoRequest } from './../models/equipment/equipamentoRequest.model';
import { TipoEquipamentoResponse } from './../models/equipment/tipoEquipamentoResponse.model';
import { TipoEquipamentoRequest } from './../models/equipment/tipoEquipamentoRequest.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EquipamentoResponse } from '../models/equipment/equipamentoResponse.model';

const ENDERECO_API: string = `${environment.api}/equipamento`;

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) {}

  //tipos de equipamentos
  public salvarTipo(tipo: TipoEquipamentoRequest){
    if(tipo.id){
      return this.http.put(`${ENDERECO_API}/tipo`, tipo);
    }
    else{
      return this.http.post(`${ENDERECO_API}/tipo`, tipo);
    }
  };

  public getTipos(ativo: boolean): Observable<TipoEquipamentoResponse[]>{
    return this.http.get<TipoEquipamentoResponse[]>(`${ENDERECO_API}/tipo?ativo=${ativo}`);
  }

  public getTipoById(id: number) : Observable<TipoEquipamentoResponse>{
    return this.http.get<TipoEquipamentoResponse>(`${ENDERECO_API}/tipo/${id}`);
  };

  //equipamentos
  public salvar(equipamento: EquipamentoRequest){
    if(equipamento.id){
      return this.http.put(`${ENDERECO_API}`,equipamento);
    }
    else{
      return this.http.post(`${ENDERECO_API}`,equipamento);
    }
  };

  public getAll(ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/?ativo=${ativo}`)
  }

  public baixar(equipamento: BaixarEquipamentoRequest){
    return this.http.put(`${ENDERECO_API}/baixar`, equipamento);
  }

  public ativar(id: number){
    return this.http.put(`${ENDERECO_API}/${id}/ativar`, null);
  }

  public desativar(id: number){
    return this.http.put(`${ENDERECO_API}/${id}/desativar`, null);
  }

  public excluir(id: number){
    return this.http.delete(`${ENDERECO_API}/${id}`);
  }

  public getById(id: number) : Observable<EquipamentoResponse>{
    return this.http.get<EquipamentoResponse>(`${ENDERECO_API}/${id}`)
  }

  public getByNome(nome: string) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/nome?nome=${nome}`);
  }

  public getByTipo(tipo: number, ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/tipo_equip?tipoId=${tipo}&ativo=${ativo}`);
  }

  public getBySetor(setor: number, ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/setor?setorId=${setor}&ativo=${ativo}`);
  }

  /* public getByMarca(marca: string, ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/marca?marca=${marca}&ativo=${ativo}`);
  }

  public getByModelo(modelo: string, ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/modelo?modelo=${modelo}&ativo=${ativo}`);
  }

  public getByFabricante(fabricante: string, ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/fabricante?fabricante=${fabricante}&ativo=${ativo}`);
  }

  public getBySerial(serial: string, ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/serial?serial=${serial}&ativo=${ativo}`);
  } */
}
