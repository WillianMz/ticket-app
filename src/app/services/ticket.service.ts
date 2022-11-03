import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnexoRequest } from '../models/ticket/anexoRequest.model';
import { CancelarRequest } from '../models/ticket/cancelarRequest.model';
import { ChamadoRequest } from '../models/ticket/chamadoRequest.model';
import { ChamadoResponse } from '../models/ticket/chamadoResponse.model';
import { FinalizarRequest } from '../models/ticket/finalizarRequest.model';

const ENDERECO_API: string = `${environment.api}/ticket`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  public salvar(chamado: ChamadoRequest) {
    if(chamado.ticketId){
      return this.http.put(`${ENDERECO_API}`, chamado);
    }
    else{
      return this.http.post(`${ENDERECO_API}`, chamado);  
    }
  }

  public getAll(): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/`)
  }

  public chamadoEquipamento(chamado: ChamadoRequest) {
    return this.http.post(`${ENDERECO_API}/equipamento`, chamado);
  }

  public cancelar(motivo: CancelarRequest){
    return this.http.put(`${ENDERECO_API}/cancelar`, motivo);
  }
  
  public finalizar(motivo: FinalizarRequest) {
    return this.http.put(`${ENDERECO_API}/finalizar`, motivo);
  }
  
  public delete(id: number){
    return this.http.delete(`${ENDERECO_API}/${id}`);
  }  

  public getById(id: number): Observable<ChamadoResponse> {
    return this.http.get<ChamadoResponse>(`${ENDERECO_API}/${id}`);
  }

  public anexarArquivo(anexo: AnexoRequest){
    return this.http.post(`${ENDERECO_API}/anexo`, anexo);
  }

  public removerAnexo(anexo: number){
    return this.http.delete(`${ENDERECO_API}/anexo/${anexo}`);
  }

  public fazerVerificacoes(){
    return this.http.post(`${ENDERECO_API}/verificar`, null);
  }

  public getByTipo(id: number): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/tipo?tipoId=${id}`);
  }

  public getBySetor(id: number): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/setor?setorId=${id}`);
  }

  public getByCriador(id: number): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/criador?criadorId=${id}`);
  }

  public getByPrioridade(id: number): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/prioridade?prioridadeId=${id}`);
  }

  public getByStatus(id: number): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/status?statusId=${id}`);
  }
  
  public getByPeriodo(inicio: string, fim: string): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/periodo?inicio=${inicio}&fim=${fim}`);
  }

  public getByOperador(id: number): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/operador?operadorId=${id}`);
  }

  public atribuirOperador(chamado: number, operador: number) {
    return this.http.post(`${ENDERECO_API}/operador`, {chamadoId: chamado, operadorId: operador});
  }

  public getByDataAbertura(data: string): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/aberto?data=${data}`);
  }

  public getByDataFechamento(data: string): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/fechado?data=${data}`);
  }

  public getByAssunto(assunto: string): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/assunto?assunto=${assunto}`);
  }

  public getByDescricao(descricao: string): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/descricao?descricao=${descricao}`);
  }

  public getBySolucao(solucao: string): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/solucao?solucao=${solucao}`);
  }

  public getMeusChamados(status: number): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/meus-tickets?status=${status}`);
  }
}
