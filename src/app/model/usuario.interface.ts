import { ITipousuario } from './tipousuario.interface';
import { IGcontrata } from './gcontrata.interface';
export interface IUsuario {
  id: number;
  username: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  dni: string;
  cp: string;
  telefono: string;
  email: string;
  feedback: string;
  password: string;
  active: boolean;
  saldo: number;
  creadoEn: Date;
  ultimoLoginEn: Date;
  tipousuario: ITipousuario;
  Gcontrata: IGcontrata;
}
