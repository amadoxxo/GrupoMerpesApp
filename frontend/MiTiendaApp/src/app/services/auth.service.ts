import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioLogueado = signal<any>(null);

  setUsuario(usuario: any) {
    this.usuarioLogueado.set(usuario);
  }

  cerrarSesion() {
    this.usuarioLogueado.set(null);
  }
}
