import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/order.model';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  @Input() indexNumber: number;
  loading = false;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {}

  onDecline() {
    this.loading = true;
    this.http
      .patch(
        'https://wonders-a0885-default-rtdb.firebaseio.com/orders/' +
          this.order.id +
          '.json',
        { ...this.order, status: 'declined' }
      )
      .subscribe(() => {
        this.order.status = 'declined';
        this.cartService.loadOrders();
        this.loading = false;
      });
  }

  onApprove() {
    this.loading = true;
    this.http
      .patch(
        'https://wonders-a0885-default-rtdb.firebaseio.com/orders/' +
          this.order.id +
          '.json',
        { ...this.order, status: 'approved' }
      )
      .subscribe(() => {
        this.cartService.loadOrders();
        this.order.status = 'approved';
        this.loading = false;
      });
  }

  onDelete() {
    this.http
      .delete(
        'https://wonders-a0885-default-rtdb.firebaseio.com/orders/' +
          this.order.id +
          '.json'
      )
      .subscribe((res) => {
        console.log(res);
        this.cartService.loadOrders();
        this.cartService.ordersChanged.next(true);
      });
  }
}
