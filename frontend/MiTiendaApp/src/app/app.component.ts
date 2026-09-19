import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {bag, cart, cartOutline, person, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      'cart-outline': cartOutline,
      'person': person,
      'bag': bag,
      'cart': cart,
      'person-circle-outline': personCircleOutline
    })
  }
}
