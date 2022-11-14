import { OperadorResponse } from './operadorResponse.model';
import { SetorResponse } from './../sector/setorResponse.model';
import { CriadorResponse } from './criadorResponse.model';

export class ChamadoResponse {
    public id?: number;
    public dataAbertura: string;
    public tipo?: number;
    public criador: CriadorResponse;
    public setor: SetorResponse;
    public assunto: string;
    public descricao: string;
    public status?: number;
    public prioridade?: number;
    public dataFechamento?: string;
    public solucao?: string;
    public operador?: OperadorResponse;
    public equipamentoId?: number;
    public equipamentoNome?: string;
}