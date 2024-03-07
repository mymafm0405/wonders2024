import { Component, Input } from '@angular/core';
import { Product } from '../shared/product.model';
import { CartService } from '../shared/cart.service';
import { CartItem } from '../shared/cart-item.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {}

  onAddToCart() {
    const cartItem: CartItem = new CartItem(this.product.catId, this.product.id);
    this.cartService.addToCart(cartItem);
  }
}
