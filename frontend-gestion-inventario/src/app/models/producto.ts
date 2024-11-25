import { CategoriaI } from './categoria'; // Ajusta la ruta si es necesario
export interface ProductoI {
  id: number;
  name: string;
  description: string;
  price: number;
  current_stock: number;
  minimum_stock: number;
  category: CategoriaI | null;  // Cambia de `null` a `CategoriaI | null`
}
