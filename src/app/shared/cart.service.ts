import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  cartItemsChanged = new Subject<boolean>();

  constructor() { }

  getCartItems() {
    return this.cartItems.slice();
  }

  addToCart(cartItem: CartItem) {
    this.cartItems.push(cartItem);
    this.cartItemsChanged.next(true);
  }
}
