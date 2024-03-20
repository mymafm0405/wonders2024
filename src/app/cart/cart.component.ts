import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { CartItem } from '../shared/cart-item.model';
import { ProductsServiceService } from '../shared/products-service.service';
import { Product } from '../shared/product.model';
import { NgForm } from '@angular/forms';
import { Order } from '../shared/order.model';
import { Customer } from '../shared/customer.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  @ViewChild('f') checkF: NgForm;

  cartItems: CartItem[] = [];
  filterCartItems: { catId: string; productId: string; numOfItems: number }[] =
    [];
  totalPrice = 0;
  cartProducts: Product[] = [];
  loading = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductsServiceService
  ) {}

  ngOnInit(): void {
    this.getMyCart();
    this.cartService.ordersChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.loading = false;
        }
      }
    )
  }

  onDec(pro: Product) {
    console.log('Dec', pro);
    console.log(this.filterCartItems);
    this.filterCartItems.find((item) => item.productId === pro.id).numOfItems -
      1;
    const foundPro = this.filterCartItems.find(
      (item) => item.productId === pro.id
    );
    if (foundPro.numOfItems === 1) {
      console.log(foundPro.numOfItems);
      this.filterCartItems = this.filterCartItems.filter(
        (item) => item.productId !== pro.id
      );
      console.log(this.filterCartItems);
    }
    console.log(this.filterCartItems);
    this.totalPrice = this.totalPrice - pro.price;
    this.cartService.itemAmountChanged.next(-1);
    this.cartService.removeOneItem(pro.id);
  }

  onInc(pro: Product) {
    console.log('Inc', pro);
    this.filterCartItems.find((item) => item.productId === pro.id).numOfItems +
      1;

    this.totalPrice = this.totalPrice + pro.price;
    this.cartService.itemAmountChanged.next(1);
  }

  getMyCart() {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems.forEach((cartItem) => {
      const product = this.productsService.getProductById(cartItem.productId);
      this.cartProducts.push(product);
      console.log(product);
      const foundPro = this.filterCartItems.find(
        (pro) => pro.productId === product.id
      );
      if (foundPro) {
        foundPro.numOfItems += 1;
      } else {
        this.filterCartItems.push({ ...cartItem, numOfItems: 1 });
      }

      this.totalPrice = this.totalPrice + product.price;
    });
  }

  onCheckout() {
    this.loading = true;
    const customerData = new Customer(
      this.checkF.controls.fullName.value,
      this.checkF.controls.address.value,
      this.checkF.controls.phone.value
    );
    const newOrder = new Order('', customerData, this.cartProducts, 'pending', this.totalPrice);
    this.cartService.addOrder(newOrder);

    console.log(this.checkF);
  }
}
