import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SetorResponse } from '../models/setorResponse.model';
import { Observable } from 'rxjs';

const ENDERECO_API: string = `${environment.api}/setor`;

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(private http: HttpClient) { }

  public getAll(ativo: boolean): Observable<SetorResponse[]>{
    return this.http.get<SetorResponse[]>(`${ENDERECO_API}/?ativo=${ativo}`)
  }

  public getById(id: number): Observable<SetorResponse>{
    return this.http.get<SetorResponse>(`${ENDERECO_API}/${id}`);
  }

  public getByNome(nome: string): Observable<SetorResponse[]> {
    return this.http.get<SetorResponse[]>(`${ENDERECO_API}/nome?nome=${nome}`);
  }
}
