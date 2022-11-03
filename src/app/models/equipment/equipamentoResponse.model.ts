import { EquipamentoAnexo } from './equipamentoAnexo.model';
import { TipoEquipamentoResponse } from './tipoEquipamentoResponse.model';
import { SetorResponse } from './../sector/setorResponse.model';

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
    public chaveNotaFiscal?: string;
    public dtCompra: string;
    public dtRecebimento: string;
    public garantiaExtendida?: number;
    public garantiaContratual?: number;
    public validadeGarantia?: string;
    public valorCompra: string;
    public anotacoes?: string;
    public foto?: string;
    public motivoBaixa?: string;
    public anexos?: EquipamentoAnexo[];
}