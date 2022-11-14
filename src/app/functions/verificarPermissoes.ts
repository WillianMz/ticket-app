export class VerificarPermissoes {

    public static temPermissao(roles: string[], permissoesDoUsuario: string): boolean {
        for(let role of roles) {
            if(permissoesDoUsuario.includes(role)){
                return true;
            }
        }

        return false;
    }
}