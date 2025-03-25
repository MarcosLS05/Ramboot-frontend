import { IBebida } from './bebida.interface';
import { ISnack } from './snack.interface';
import { IZona } from './zona.interface';

export interface IBono {
  id: number;
  nombre: string;
  precio: number;
  snack: ISnack;
  bebida: IBebida;
  zona: IZona;
}
