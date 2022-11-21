import { SetorResponse } from "../sector/setorResponse.model";
import { OperadorResponse } from "./operadorResponse.model";

export class ChamadoRequest {
  public ticketId?: number;
  public equipamentoId?: string;
  public setorId?: number;
  public tipoId?: number;
  public prioridade?: number;
  public assunto: string;
  public descricao: string;
  public operadorId?: number;
  public anexo?: string;
}