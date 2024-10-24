import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaI } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/categorias/`

  constructor(
    private http:HttpClient
  ) { }

  getAllCategoria():Observable<CategoriaI[]>{
    return this.http
      .get<CategoriaI[]>(this.base_path)
  }
  
  getOneCategoria(id: number):Observable<CategoriaI>{
    return this.http
      .get<CategoriaI>(`${this.base_path}${id}`)
  }

  createCategoria(data: any):Observable<CategoriaI>{
    return this.http.post<CategoriaI>(this.base_path, data)
  }

  updateCategoria(id: number, data: any): Observable<CategoriaI> {
    return this.http.put<CategoriaI>(`${this.base_path}${id}`, data);
  }

  deleteCategoria(id: number): Observable<CategoriaI> {
    return this.http.delete<CategoriaI>(`${this.base_path}${id}`);
  }

}
