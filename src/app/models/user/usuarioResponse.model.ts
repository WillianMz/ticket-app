import { RoleResponse } from './roleResponse.model';

export class UsuarioResponse {
    public id: string;
    public nome: string;
    public email: string;
    public ativo: boolean;
    public ativoString: string;
    public roles: RoleResponse[];
}