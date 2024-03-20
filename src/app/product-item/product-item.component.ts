import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { CartService } from '../shared/cart.service';
import { CartItem } from '../shared/cart-item.model';
import { ProductsServiceService } from '../shared/products-service.service';
import { storage } from '../shared/firebase-config';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  loading = false;
  isAdmin = false;

  constructor(private cartService: CartService, private productsService: ProductsServiceService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.isAdmin = this.usersService.getIsAdminStatus();
    this.loading = true;
    listAll(ref(storage, 'images/'+this.product.catId+'/'+this.product.id)).then(imgs => {
      imgs.items.forEach(item => {
        getDownloadURL(item).then(url => {
          console.log(url);
          this.product = {...this.product, images: [url]};
          this.loading = false;
        })
      })
    })
  }

  onAddToCart() {
    const cartItem: CartItem = new CartItem(this.product.catId, this.product.id);
    this.cartService.addToCart(cartItem);
  }
}
