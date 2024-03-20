import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  cartItemsChanged = new Subject<boolean>();
  itemAmountChanged = new Subject<number>();
  ordersChanged = new Subject<boolean>();
  orders: Order[] = [];

  constructor(private http: HttpClient) {}

  getCartItems() {
    return this.cartItems.slice();
  }

  addToCart(cartItem: CartItem) {
    this.cartItems.push(cartItem);
    this.cartItemsChanged.next(true);
  }

  removeOneItem(itemId: string) {
    const foundItem = this.cartItems.find((item) => item.productId === itemId);
    const index = this.cartItems.indexOf(foundItem);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  addOrder(order: Order) {
    this.http
      .post(
        'https://wonders-a0885-default-rtdb.firebaseio.com/orders.json',
        order
      )
      .subscribe((resData: { name: string }) => {
        this.orders.push({ ...order, id: resData.name });
        this.ordersChanged.next(true);
      });
  }

  getOrders() {
    return this.orders.slice();
  }

  loadOrders() {
    this.http
      .get('https://wonders-a0885-default-rtdb.firebaseio.com/orders.json')
      .pipe(map((resData) => {
        const ordersData: Order[] = [];
        for(const key in resData) {
          if (resData.hasOwnProperty(key)) {
            ordersData.push({...resData[key], id: key})
          }
        }
        return ordersData;
      }))
      .subscribe(
        (data: Order[]) => {
          this.orders = data;
          this.ordersChanged.next(true);
          console.log(this.orders)
        }
      )
  }
}
