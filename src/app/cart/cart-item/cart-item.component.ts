import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../shared/cart-item.model';
import { Product } from '../../shared/product.model';
import { ProductsServiceService } from '../../shared/products-service.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  product: Product;

  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.product = this.productsService.getProductById(this.cartItem.productId);
  }
}
