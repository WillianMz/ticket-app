export class UsuarioModel {
    public contaUsuarioId?: string;
    public nome: string;
    public email: string;
    public telefone: string;
    public apelido: string;
    public ativa?: boolean;
    public senha?: string;
    public senhaConfirmacao?: string;
}