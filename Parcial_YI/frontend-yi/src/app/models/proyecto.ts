export interface ProyectoI { 
    id?: number;
    nombre: string;
    descripcion: string;
    monto: number;         // Monto total del proyecto
    fecha: string;         // Fecha (en formato string, asumiendo que viene como ISO 8601 desde la API)
    patrocinador: number;  // Relación con el patrocinador (ID del patrocinador)
}
