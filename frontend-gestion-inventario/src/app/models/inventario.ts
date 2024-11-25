// src/app/models/inventario.model.ts

export interface InventarioI {
    id?: number;
    product: {
        id: number;
        name: string;
    };
    movement_type: string; // 'entrada' o 'salida'
    quantity: number;
    movement_date: Date;
    remarks?: string; // Campo opcional
}
