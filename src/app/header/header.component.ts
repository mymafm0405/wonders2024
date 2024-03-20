import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { CartService } from '../shared/cart.service';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../shared/firebase-config';
import { ProductsServiceService } from '../shared/products-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAdminLogin = false;
  cartItems = 0;
  orders = 0;
  mainBannerUrl = '';

  constructor(private usersService: UsersService, private cartService: CartService, private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.cartService.loadOrders();
    this.orders = this.cartService.getOrders().filter(order => order.status === 'pending').length;

    this.cartService.ordersChanged.subscribe(
      (status: boolean) => {
        if (status) {
          console.log('yessss')
          this.orders = this.cartService.getOrders().filter(order => order.status === 'pending').length;
        }
      }
    )
    this.getMainBanner();

    this.cartItems = this.cartService.getCartItems().length;

    this.cartService.cartItemsChanged.subscribe(
      (changed: boolean) => {
        this.cartItems = this.cartService.getCartItems().length;
      }
    );

    this.cartService.itemAmountChanged.subscribe(
      (amountChanged: number) => {
        this.cartItems += amountChanged;
      }
    )

    this.usersService.loginStatus.subscribe(
      (status: boolean) => {
        this.isAdminLogin = status;
      }
    )

    this.productsService.mainBannerChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.getMainBanner();
        }
      }
    )
  }

  onLoginButton() {
    if (this.isAdminLogin) {
      this.usersService.loginStatus.next(false);
      this.usersService.isAdminLogin = false;
    }
  }

  getMainBanner() {
    listAll(ref(storage, 'images/main-banner')).then(imgs => {
      imgs.items.forEach(img => {
        getDownloadURL(img).then(url => {
          this.mainBannerUrl = url;
          console.log(this.mainBannerUrl);
        })
      })
    })
  }
}
