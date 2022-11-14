import { SetorResponse } from './../models/sector/setorResponse.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetorRequest } from '../models/sector/setorRequest.model';

const ENDERECO_API: string = `${environment.api}/setor`;

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) {}

  public salvar(setor: SetorRequest){
    if(setor.id){
      return this.http.put(`${ENDERECO_API}`, setor);
    }
    else {
      return this.http.post(`${ENDERECO_API}`, setor);
    }
  }

  public getAll(ativo: boolean): Observable<SetorResponse[]>{
    return this.http.get<SetorResponse[]>(`${ENDERECO_API}/?ativo=${ativo}`)
  }

  public delete(id: number){
    return this.http.delete(`${ENDERECO_API}/${id}`);
  }

  public getById(id: number): Observable<SetorResponse>{
    return this.http.get<SetorResponse>(`${ENDERECO_API}/${id}`);
  }

  public disable(id: number){
    return this.http.put(`${ENDERECO_API}/${id}/disable`,null);
  }

  public enable(id: number) {
    return this.http.put(`${ENDERECO_API}/${id}/enable`, null);
  }
 
  public getByNome(nome: string): Observable<SetorResponse[]> {
    return this.http.get<SetorResponse[]>(`${ENDERECO_API}/nome?nome=${nome}`);
  }
}
