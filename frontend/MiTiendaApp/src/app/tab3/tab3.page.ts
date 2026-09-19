import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonTitle, IonToast, IonToolbar } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonInput, IonIcon, IonButton, IonToast]
})
export class Tab3Page {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  isLoginMode = true;
  nombre = '';
  email = '';
  password = '';

  get usuarioLogueado() {
    return this.authService.usuarioLogueado();
  }

  mensajeToast = '';
  isToastOpen = false;

  cambiarModo() {
    this.isLoginMode = !this.isLoginMode;
  }

  submitAuth() {
    if (this.isLoginMode) {
      const credenciales = { email: this.email, password: this.password };
      this.apiService.loginUsuario(credenciales).subscribe({
        next: (res) => {
          this.authService.setUsuario(res);
          this.mostrarToast('¡Inicio de sesión exitoso!');
        },
        error: (err) => {
          console.error(err);
          this.mostrarToast('Error al iniciar sesión. Verifica tus datos.');
        }
      });
    } else {
      const nuevoUsuario = { nombre: this.nombre, email: this.email, password: this.password };
      this.apiService.registrarUsuario(nuevoUsuario).subscribe({
        next: (res) => {
          this.mostrarToast('¡Registro exitoso! Ahora puedes iniciar sesión.');
          this.isLoginMode = true;
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
    this.mostrarToast('Sesión cerrada.');
  }

  mostrarToast(msg: string) {
    this.mensajeToast = msg;
    this.isToastOpen = true;
    this.cdr.detectChanges();
  }
}
