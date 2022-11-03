import { Pais } from 'src/app/models/pessoa/pais.model';
export class Uf {
  public id?: number;
  public sigla: string;
  public nome: string;
  public paisId: number;
  public pais?: Pais;
}
