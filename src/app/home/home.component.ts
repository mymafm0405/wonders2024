import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/cat.model';
import { ProductsServiceService } from '../shared/products-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cats: Category[] = [];

  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.cats = this.productsService.getCats();
    this.productsService.catChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.cats = this.productsService.getCats();
        }
      }
    )
  }
}
