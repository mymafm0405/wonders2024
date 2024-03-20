import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/product.model';
import { ProductsServiceService } from '../../shared/products-service.service';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../shared/firebase-config';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: {catId: string, productId: string, numOfItems: number};
  @Input() itemIndex: number;
  @Output() dec = new EventEmitter<Product>();
  @Output() inc = new EventEmitter<Product>();

  product: Product;
  imageUrl: string;

  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    console.log(this.cartItem)
    this.product = this.productsService.getProductById(this.cartItem.productId);
    listAll(ref(storage, 'images/'+this.product.catId+'/'+this.product.id)).then(imgs => {
      imgs.items.forEach(img => {
        getDownloadURL(img).then(url => {
          this.imageUrl = url;
        })
      })
    })
  }

  onDecItem() {
    this.dec.emit(this.product);
    if (this.cartItem.numOfItems > 1) {
      this.cartItem.numOfItems -= 1;
    }
  }

  onIncItem() {
    this.inc.emit(this.product);
    this.cartItem.numOfItems += 1;
  }
}
