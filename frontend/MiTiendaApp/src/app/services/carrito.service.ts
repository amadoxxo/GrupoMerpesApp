import { Injectable, signal, computed } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface ProductoItem {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoSignal = signal<ProductoItem[]>([]);

  carrito = this.carritoSignal.asReadonly();

  total = computed(() => {
    return this.carritoSignal().reduce((acc, item) => acc + (item.precio * item.cantidad),0);
  });

  private storage!: Storage;

  constructor() {
    this.inicializarStorage();
  }

  private async inicializarStorage() {
    this.storage = new Storage();

    await this.storage.create();

    const carritoGuardado = await this.storage.get('carrito');

    if (carritoGuardado) {
      this.carritoSignal.set(carritoGuardado);
    }
  }

  private async guardarCarrito() {
    await this.storage.set('carrito', this.carritoSignal());
  }

  async agregarProducto(producto: ProductoItem) {
    const actual = this.carritoSignal();

    const index = actual.findIndex(p => p.id === producto.id);

    if (index > -1) {
      const actualizado = [...actual];

      actualizado[index].cantidad += 1;

      this.carritoSignal.set(actualizado);
    } else {
      this.carritoSignal.set([...actual,{ ...producto,cantidad: 1 }]);
    }

    await this.guardarCarrito();
  }

  async eliminarProducto(id: number) {
    const actual = this.carritoSignal();

    const index = actual.findIndex(p => p.id === id);

    if (index > -1) {
      const actualizado = [...actual];

      if (actualizado[index].cantidad > 1) {
        actualizado[index].cantidad -= 1;
      } else {
        actualizado.splice(index, 1);
      }

      this.carritoSignal.set(actualizado);

      await this.guardarCarrito();
    }
  }

  async vaciarCarrito() {
    this.carritoSignal.set([]);

    await this.storage.remove('carrito');
  }
}
