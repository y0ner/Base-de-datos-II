import { CategoriaI } from './categoria'; // Ajusta la ruta si es necesario
export interface ProductoI {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock_actual: number;
  stock_minimo: number;
  categoria: CategoriaI | null;  // Cambia de `null` a `CategoriaI | null`
}
