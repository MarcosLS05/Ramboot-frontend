import { IProducto } from './producto.interface';
import { IZona } from './zona.interface';

export interface IBono {
  id: number;
  nombre: string;
  precio: number;
  producto: IProducto;
  zona: IZona;
}
