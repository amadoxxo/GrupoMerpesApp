import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { CarritoService, ProductoItem } from '../services/carrito.service';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonToast
} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonToast
  ]
})
export class Tab1Page implements OnInit {
  private apiService     = inject(ApiService);
  private carritoService = inject(CarritoService);
  private cdr            = inject(ChangeDetectorRef);

  productos: ProductoItem[] = [];
  isToastOpen = false;
  mensajeToast = '';

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.apiService.getProductos().subscribe({
      next: (data) => {
        console.log('Productos recibidos:', data);
        this.productos = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.mostrarToast('No se pudo conectar con el servidor.');
      }
    });
  }

  async agregarAlCarrito(producto: ProductoItem) {
    await this.carritoService.agregarProducto(producto);
    this.mostrarToast(`¡${producto.nombre} agregado al carrito!`);
  }

  mostrarToast(mensaje: string) {
    this.mensajeToast = mensaje;
    this.isToastOpen = true;
  }
}
