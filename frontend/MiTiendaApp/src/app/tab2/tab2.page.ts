import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonNote,
    IonButton,
    IonToast
  ]
})
export class Tab2Page {
  private carritoService = inject(CarritoService);
  private authService    = inject(AuthService);
  private apiService     = inject(ApiService);
  private cdr            = inject(ChangeDetectorRef);

  carrito = this.carritoService.carrito;
  total   = this.carritoService.total;

  mensajeToast = '';
  isToastOpen = false;

  get usuarioLogueado() {
    return this.authService.usuarioLogueado();
  }

  async aumentarCantidad(producto: any) {
    await this.carritoService.agregarProducto(producto);
  }

  async disminuirCantidad(id: number) {
    await this.carritoService.eliminarProducto(id);
  }

  async finalizarOrdenReal() {
    const carritoItems = await this.carritoService.carrito();
    if (carritoItems.length === 0) return;

    const usuario = this.usuarioLogueado;

    const ordenPayload = {
      usuarioId: usuario.id || 1,
      productos: carritoItems.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad
      }))
    };

    this.apiService.crearOrden(ordenPayload).subscribe({
      next: async (res) => {
        this.mostrarToast('¡Orden creada con éxito!');
        await this.carritoService.vaciarCarrito();
      },
      error: (err) => {
        console.error(err);
        this.mostrarToast('Error al procesar la orden.');
      }
    });
  }

  mostrarToast(msg: string) {
    this.mensajeToast = msg;
    this.isToastOpen = true;
    this.cdr.detectChanges();
  }
}
