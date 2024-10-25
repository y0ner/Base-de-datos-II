import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleFacturaI } from '../models/detalle_factura';

@Injectable({
  providedIn: 'root'
})
export class DetallefacturaService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/detalles_facturas/`

  constructor(
    private http:HttpClient
  ) 
  { }
  getAllDetalleFacturas():Observable<DetalleFacturaI[]>{
    return this.http
      .get<DetalleFacturaI[]>(this.base_path)
  }

  getOneDetalleFactura(id: number):Observable<DetalleFacturaI>{
    return this.http
      .get<DetalleFacturaI>(`${this.base_path}${id}`)
  }

  createDetalleFactura(data: any):Observable<DetalleFacturaI>{
    return this.http.post<DetalleFacturaI>(this.base_path, data)
  }

  updateDetalleFactura(id: number, data: any): Observable<DetalleFacturaI> {
    return this.http.put<DetalleFacturaI>(`${this.base_path}${id}`, data);
  }

  deleteDetalleFactura(id: number): Observable<DetalleFacturaI> {
    return this.http.delete<DetalleFacturaI>(`${this.base_path}${id}`);
  }
}
