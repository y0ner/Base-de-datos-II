// src/app/services/inventario.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventarioI } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/inventarios/`;

    private apiUrl = 'inventarios';

  constructor(private http: HttpClient) {}

  
  getInventarioById(id: number): Observable<InventarioI> {
    return this.http.get<InventarioI>(`${this.apiUrl}/inventarios/${id}`);
  }
  
  obtenerInventarioPorId(id: number): Observable<InventarioI> {
    return this.http.get<InventarioI>(`${this.apiUrl}/inventario/${id}`);
  }

  actualizarInventario(inventario: InventarioI): Observable<any> {
    return this.http.put(`${this.apiUrl}/inventario/${inventario.id}`, inventario);
  }

  getAllInventarios(): Observable<InventarioI[]> {
    return this.http.get<InventarioI[]>(this.base_path);
  }

  getOneInventario(id: number): Observable<InventarioI> {
    return this.http.get<InventarioI>(`${this.base_path}${id}`);
  }

  createInventario(data: InventarioI): Observable<InventarioI> {
    return this.http.post<InventarioI>(this.base_path, data);
  }

  updateInventario(id: number, data: InventarioI): Observable<InventarioI> {
    return this.http.put<InventarioI>(`${this.base_path}${id}`, data);
  }

  deleteInventario(id: number): Observable<InventarioI> {
    return this.http.delete<InventarioI>(`${this.base_path}${id}`);
  }
}
