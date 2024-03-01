import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrl: './latest-products.component.css'
})
export class LatestProductsComponent implements OnInit {
  latestProduct: Product[] = [];
  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.latestProduct = this.productsService.getLastProduct();
  }
}
