import { Injectable, signal, computed } from '@angular/core';

export interface ProductoItem {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSignal = signal<ProductoItem[]>([]);

  carrito = this.carritoSignal.asReadonly();

  total = computed(() => {
    return this.carritoSignal().reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  });

  agregarProducto(producto: any) {
    const actual = this.carritoSignal();
    const index = actual.findIndex(p => p.id === producto.id);

    if (index > -1) {
      const actualizado = [...actual];
      actualizado[index].cantidad += 1;
      this.carritoSignal.set(actualizado);
    } else {
      this.carritoSignal.set([...actual, { ...producto, cantidad: 1 }]);
    }
  }

  eliminarProducto(id: number) {
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
    }
  }

  vaciarCarrito() {
    this.carritoSignal.set([]);
  }
}
