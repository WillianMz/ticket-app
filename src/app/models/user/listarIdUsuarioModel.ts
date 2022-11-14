export class ListarIdUsuarioModel {
    sucesso: boolean;
    mensagem: string;
    objeto: {
      id: string;
      nome: string;
      email: string;
      ativo: boolean;
      roles: string[];
    }
}