import { Component, Input, OnInit } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';
import { Product } from '../shared/product.model';
import { Category } from '../shared/cat.model';
import { CatBanner } from '../shared/cat-banner.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cateogry',
  templateUrl: './cateogry.component.html',
  styleUrl: './cateogry.component.css'
})
export class CateogryComponent implements OnInit {
  @Input() catId: string;
  @Input() category: Category;
  catProducts: Product[] = [];
  catBanner: CatBanner;

  constructor(private productsService: ProductsServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.catProducts = this.productsService.getProductsForCat(this.catId)
    this.catBanner = this.productsService.getCatBanner(this.catId);

    this.route.params.subscribe(
      (params: Params) => {
        this.catId = params['id'];
        if (this.catId) {
          this.catProducts = this.productsService.getProductsForCat(this.catId)
          this.catBanner = this.productsService.getCatBanner(this.catId);
        }
      }
    )
  }
}
