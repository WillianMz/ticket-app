import { AnexoResponse } from './anexoResponse.model';
import { OperadorResponse } from './operadorResponse.model';
import { SetorResponse } from './../sector/setorResponse.model';
import { CriadorResponse } from '../pessoa/criadorResponse.model';
export class ChamadoResponse {
    public id?: number;
    public dataAbertura: string;
    public tipo?: number;
    public criador: CriadorResponse;
    public setor: SetorResponse;
    public assunto: string;
    public descricao: string;
    public status?: string;
    public prioridade?: number;
    public dataFechamento?: string;
    public solucao?: string;
    public operador?: OperadorResponse;
    public equipamentoId?: number;
    public equipamentoNome?: string;
    public finalizador?: OperadorResponse;
    public anexos?: AnexoResponse[];
}