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
  // Signal privado que contiene los elementos del carrito
  private carritoSignal = signal<ProductoItem[]>([]);

  // Signal público de solo lectura para exponer los elementos
  carrito = this.carritoSignal.asReadonly();

  // Signal computado para calcular el total de la compra automáticamente
  total = computed(() => {
    return this.carritoSignal().reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  });

  // Método para agregar un producto al carrito
  agregarProducto(producto: any) {
    const actual = this.carritoSignal();
    const index = actual.findIndex(p => p.id === producto.id);

    if (index > -1) {
      // Si ya existe, incrementamos la cantidad
      const actualizado = [...actual];
      actualizado[index].cantidad += 1;
      this.carritoSignal.set(actualizado);
    } else {
      // Si es nuevo, lo agregamos con cantidad 1
      this.carritoSignal.set([...actual, { ...producto, cantidad: 1 }]);
    }
  }

  // Método para remover o disminuir cantidad
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

  // Vaciar carrito tras simular compra
  vaciarCarrito() {
    this.carritoSignal.set([]);
  }
}
