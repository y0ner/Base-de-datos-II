import { TipoProductoI } from './tipo-producto';

export interface ProductoI {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock_actual: number;
  stock_minimo: number;
  tipoproducto: TipoProductoI | number; // Permite usar el ID o el objeto completo
}
