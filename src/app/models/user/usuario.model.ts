export class Usuario {
    public id?: number;
    public nome?: string;
    public email?: string;
    public perfil: string;
    public imgPerfil?: string;
    public emailConfirmado: boolean;
    public bloqueado: boolean;
    public roles: string[];
}