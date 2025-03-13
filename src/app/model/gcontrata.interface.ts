import { IUsuario } from "./usuario.interface";
import { IZona } from "./zona.interface";

export interface IGcontrata {
    id: number;
    fecha_creacion: Date;
    metodoPago: string;
    ticket: string;
    usuario: IUsuario;
    zona: IZona;
}