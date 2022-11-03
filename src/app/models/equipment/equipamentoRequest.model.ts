import { EquipamentoAnexo } from "./equipamentoAnexo.model";

export class EquipamentoRequest {
    public id?: number;
    public ativo?: boolean;
    public codInterno?: string;
    public tipoId: number;
    public setorId: number;
    public nome: string;
    public descricao: string;
    public fabricante: string;
    public marca: string;
    public modelo: string;
    public numSerial: string;
    public anoFabricacao?: string;
    public fornecedorId?: number;
    public notaFiscal: number;
    public chaveNFe?: string;
    public dtCompra: string;
    public dtRecebimento: string;
    public garantiaExtendida?: number;
    public garantiaContratual?: number;
    public valorCompra: string;
    public anotacoes?: string;
    public foto?: string;
    public anexos?: EquipamentoAnexo[];
}