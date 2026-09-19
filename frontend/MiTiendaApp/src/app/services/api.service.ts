import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5217/api';

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/registro`, usuario);
  }

  loginUsuario(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, credenciales);
  }

  crearOrden(orden: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ordenes`, orden);
  }
}
