import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { CartItem } from '../shared/cart-item.model';
import { ProductsServiceService } from '../shared/products-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService, private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems.forEach((cartItem) => {
      const product = this.productsService.getProductById(cartItem.productId);
      this.totalPrice = this.totalPrice + product.price;
    })
  }
}
