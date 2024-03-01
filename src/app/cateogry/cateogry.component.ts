import { Component, Input, OnInit } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';
import { Product } from '../shared/product.model';
import { Category } from '../shared/cat.model';
import { CatBanner } from '../shared/cat-banner.model';

@Component({
  selector: 'app-cateogry',
  templateUrl: './cateogry.component.html',
  styleUrl: './cateogry.component.css'
})
export class CateogryComponent implements OnInit {
  @Input() catId: string;
  @Input() category: Category;
  cat_products: Product[] = [];
  catBanner: CatBanner;

  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.cat_products = this.productsService.getProductsForCat(this.catId)
    this.catBanner = this.productsService.getCatBanner(this.catId);
  }
}
