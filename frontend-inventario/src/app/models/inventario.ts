// src/app/models/inventario.model.ts

export interface InventarioI {
    id?: number;
    producto: {
        id: number;
        nombre: string;
    };
    tipo_movimiento: string; // 'entrada' o 'salida'
    cantidad: number;
    fecha_movimiento: Date;
    observaciones?: string; // Campo opcional
}
