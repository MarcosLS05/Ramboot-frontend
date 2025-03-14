import { ITipousuario } from "./tipousuario.interface";


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
    isActive: boolean;
    saldo: DoubleRange;
    fecha_creacion: Date;
    ultima_conexion: Date;
    tipousuario: ITipousuario;
    Gcontrata?: any;
}