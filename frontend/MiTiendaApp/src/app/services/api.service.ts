import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Inyección moderna usando la función inject()
  private http = inject(HttpClient);

  // Ajusta el puerto según el que te devuelva .NET al ejecutar 'dotnet run'
  private apiUrl = 'http://localhost:5217/api';

  // Ya no necesitas el constructor para esto

  // 1. Obtener productos del catálogo
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  // 2. Registrar usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/registro`, usuario);
  }

  // 3. Iniciar sesión
  loginUsuario(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, credenciales);
  }

  // 4. Enviar orden (Simulación de compra)
  crearOrden(orden: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ordenes`, orden);
  }
}
