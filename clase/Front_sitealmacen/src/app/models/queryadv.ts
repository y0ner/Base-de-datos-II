export interface Consulta1I {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  stockmin: number;
  cantidad: number;
  tipoproducto: string;  // Cambia de `null` a `CategoriaI | null`
}
    