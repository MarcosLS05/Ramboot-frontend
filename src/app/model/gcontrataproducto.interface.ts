import { IProducto } from "./producto.interface";
import { IPage } from "./model.interface";
import { IGcontrata } from "./gcontrata.interface";

export interface IGcontrataproducto {
    id: number;
    cantidad: number;
    importe: number;
    IGcontrata: number;
    IProducto: number;
}