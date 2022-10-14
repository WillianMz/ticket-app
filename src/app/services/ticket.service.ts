import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChamadoRequest } from '../models/chamadoRequest.model';

const ENDERECO_API: string = `${environment.api}/ticket`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  public chamadoEquipamento(chamado: ChamadoRequest) {
    return this.http.post(`${ENDERECO_API}/equipamento`, chamado);
  }
}
