import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/angular';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonToast
  ]
})
export class Tab3Page {

  private apiService  = inject(ApiService);
  private authService = inject(AuthService);
  private cdr         = inject(ChangeDetectorRef);

  isLoginMode = true;

  nombre = '';
  email = '';
  password = '';

  mensajeToast = '';
  isToastOpen = false;

  get usuarioLogueado() {
    return this.authService.usuarioLogueado();
  }

  cambiarModo() {
    this.isLoginMode = !this.isLoginMode;

    this.nombre   = '';
    this.email    = '';
    this.password = '';
  }

  submitAuth() {
    if (this.isLoginMode) {

      if (!this.email.trim() || !this.password.trim()) {
        this.mostrarToast('Ingresa tu correo y contraseña.');
        return;
      }

      const credenciales = {
        email: this.email.trim(),
        password: this.password
      };

      this.apiService.loginUsuario(credenciales).subscribe({
        next: async (res) => {
          await this.authService.setUsuario(res);

          this.nombre   = '';
          this.email    = '';
          this.password = '';

          this.mostrarToast('¡Inicio de sesión exitoso!');
        },
        error: (err) => {
          console.error(err);
          this.mostrarToast('Error al iniciar sesión. Verifica tus datos.');
        }
      });

    } else {
      if (
        !this.nombre.trim() ||
        !this.email.trim() ||
        !this.password.trim()
      ) {
        this.mostrarToast('Completa todos los campos.');
        return;
      }

      const nuevoUsuario = {
        nombre:   this.nombre.trim(),
        email:    this.email.trim(),
        password: this.password
      };

      this.apiService.registrarUsuario(nuevoUsuario).subscribe({
        next: async (res) => {
          await this.authService.setUsuario(res);

          this.nombre   = '';
          this.email    = '';
          this.password = '';

          this.mostrarToast('¡Registro exitoso! Has iniciado sesión.');
        },
        error: (err) => {
          console.error(err);
          this.mostrarToast('Error al registrar usuario.');
        }
      });
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion();

    this.nombre   = '';
    this.email    = '';
    this.password = '';

    this.mostrarToast('Sesión cerrada.');
  }

  mostrarToast(msg: string) {
    this.mensajeToast = msg;
    this.isToastOpen = true;

    this.cdr.detectChanges();
  }
}
