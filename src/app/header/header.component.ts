import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAdminLogin = false;
  cartItems = 0;

  constructor(private usersService: UsersService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems().length;

    this.cartService.cartItemsChanged.subscribe(
      (changed: boolean) => {
        this.cartItems = this.cartService.getCartItems().length;
      }
    );

    this.usersService.loginStatus.subscribe(
      (status: boolean) => {
        this.isAdminLogin = status;
      }
    )
    // this.isAdminLogin = this.usersService.getIsAdminStatus();
  }

  onLoginButton() {
    if (this.isAdminLogin) {
      this.usersService.loginStatus.next(false);
      this.usersService.isAdminLogin = false;
    }
  }
}
