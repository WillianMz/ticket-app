import { SetorResponse } from './setorResponse.model';
import { TipoEquipamentoResponse } from './tipoEquipamentoResponse.model';

export class EquipamentoResponse {
    public id?: number;
    public ativo?: boolean;
    public codInterno?: string;
    public tipo?: TipoEquipamentoResponse;
    public setor?: SetorResponse;
    public nome?: string;
    public descricao?: string;
    public fabricante?: string;
    public marca?: string;
    public modelo?: string;
    public numSerial?: string;
    public anoFabricacao?: string;
    public fornecedorId?: number;
    public notaFiscal: number;
    public chaveNFe?: string;
    public dtCompra: string;
    public valorCompra: string
    public tempoGarantia?: string;
    public anotacoes?: string;
    public foto?: string;
    public motivoBaixa?: string;
}