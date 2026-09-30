import { Injectable, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario = signal<any>(null);
  private storage!: Storage;

  constructor() {
    this.inicializarStorage();
  }

  private async inicializarStorage() {
    this.storage = new Storage();

    await this.storage.create();

    const usuarioGuardado = await this.storage.get('usuario');

    if (usuarioGuardado) {
      this.usuario.set(usuarioGuardado);
    }
  }

  usuarioLogueado() {
    return this.usuario();
  }

  async setUsuario(usuario: any) {
    this.usuario.set(usuario);

    await this.storage.set('usuario', usuario);
  }

  async cerrarSesion() {
    this.usuario.set(null);

    await this.storage.remove('usuario');
  }
}
