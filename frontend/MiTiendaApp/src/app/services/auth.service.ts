import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal para almacenar el usuario actual logueado (null si no hay sesión)
  usuarioLogueado = signal<any>(null);

  setUsuario(usuario: any) {
    this.usuarioLogueado.set(usuario);
  }

  cerrarSesion() {
    this.usuarioLogueado.set(null);
  }
}
