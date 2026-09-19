import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonThumbnail, IonTitle, IonToast, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote, IonButton, IonToast]
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

  aumentarCantidad(producto: any) {
    this.carritoService.agregarProducto(producto);
  }

  disminuirCantidad(id: number) {
    this.carritoService.eliminarProducto(id);
  }

  finalizarOrdenReal() {
    const carritoItems = this.carritoService.carrito();
    if (carritoItems.length === 0) return;

    // Validación estricta por si el usuario de alguna forma intenta comprar sin sesión
    const usuario = this.usuarioLogueado;
    if (!usuario) {
      this.mostrarToast('Debes iniciar sesión en la pestaña "Cuenta" antes de finalizar la compra.');
      return;
    }

    const ordenPayload = {
      usuarioId: usuario.id || 1,
      productos: carritoItems.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad
      }))
    };

    this.apiService.crearOrden(ordenPayload).subscribe({
      next: (res) => {
        this.mostrarToast('¡Orden creada con éxito!');
        this.carritoService.vaciarCarrito();
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
