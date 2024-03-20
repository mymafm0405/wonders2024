import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsServiceService } from '../shared/products-service.service';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../shared/firebase-config';
import { Product } from '../shared/product.model';
import { CartItem } from '../shared/cart-item.model';
import { CartService } from '../shared/cart.service';
import { UsersService } from '../shared/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  productId: string;
  catId: string;
  productImages: string[] = [];
  activeUrl = '';
  currentProduct: Product;
  catProducts: Product[] = [];
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsServiceService,
    private cartService: CartService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.usersService.getIsAdminStatus();
    this.productId = this.route.snapshot.params['id'];
    this.catId = this.route.snapshot.params['catId'];
    this.currentProduct = this.productsService.getProductById(this.productId);
    this.catProducts = this.productsService.getProductsForCat(this.catId);

    listAll(ref(storage, 'images/' + this.catId + '/' + this.productId)).then(
      (imgs) => {
        imgs.items.forEach((img) => {
          getDownloadURL(img).then((url) => {
            this.productImages.push(url);
            this.activeUrl = url;
            console.log(url);
          });
        });
      }
    );
    // this.productImages = this.productsService.getProductImages(this.catId, this.productId);
    console.log(this.productImages);
    console.log(this.productId);
    console.log(this.catId);

    this.route.params.subscribe(
      (params: Params) => {
        this.productImages = [];
        this.activeUrl = '';
        this.productId = params['id'];
        this.catId = params['catId'];
        this.currentProduct = this.productsService.getProductById(this.productId);
        listAll(ref(storage, 'images/' + this.catId + '/' + this.productId)).then(
          (imgs) => {
            imgs.items.forEach((img) => {
              getDownloadURL(img).then((url) => {
                this.productImages.push(url);
                this.activeUrl = url;
                console.log(url);
              });
            });
          }
        );
      }
    )
  }

  onImgClick(imgUrl: string) {
    this.activeUrl = imgUrl;
    console.log(this.activeUrl);
  }

  onAddToCart() {
    const cartItem: CartItem = new CartItem(this.catId, this.productId);
    this.cartService.addToCart(cartItem);
  }
}
