import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Order } from '../shared/order.model';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isAdminLogin = false;

  constructor(private cartService: CartService, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.orders = this.cartService.getOrders();

    if (!this.usersService.getIsAdminStatus()) {
      this.router.navigate(['/']);``
    }

    this.cartService.ordersChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.orders = this.cartService.getOrders();
        }
      }
    )
  }
}
