import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacturaI } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/facturas/`

  constructor(
    private http:HttpClient
  ) 
  { }
  getAllFacturas():Observable<FacturaI[]>{
    return this.http
      .get<FacturaI[]>(this.base_path)
  }

  getOneFactura(id: number):Observable<FacturaI>{
    return this.http
      .get<FacturaI>(`${this.base_path}${id}`)
  }

  createFactura(data: any):Observable<FacturaI>{
    return this.http.post<FacturaI>(this.base_path, data)
  }

  updateFactura(id: number, data: any): Observable<FacturaI> {
    return this.http.put<FacturaI>(`${this.base_path}${id}`, data);
  }

  deleteFactura(id: number): Observable<FacturaI> {
    return this.http.delete<FacturaI>(`${this.base_path}${id}`);
  }
}
