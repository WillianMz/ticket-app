import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipamentoResponse } from '../models/equipamentoResponse.model';
import { TipoEquipamentoResponse } from '../models/tipoEquipamentoResponse.model';

const ENDERECO_API: string = `${environment.api}/equipamento`;


@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) { }

  public getTipos(ativo: boolean): Observable<TipoEquipamentoResponse[]>{
    return this.http.get<TipoEquipamentoResponse[]>(`${ENDERECO_API}/tipo?ativo=${ativo}`);
  }

  public getTipoById(id: number) : Observable<TipoEquipamentoResponse>{
    return this.http.get<TipoEquipamentoResponse>(`${ENDERECO_API}/tipo/${id}`);
  };

  public getAll(ativo: boolean) : Observable<EquipamentoResponse[]>{
    return this.http.get<EquipamentoResponse[]>(`${ENDERECO_API}/?ativo=${ativo}`)
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
}
