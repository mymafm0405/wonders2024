import { Component, OnInit } from '@angular/core';
import { Category } from './shared/cat.model';
import { ProductsServiceService } from './shared/products-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  cats: Category[] = [];

  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.cats = this.productsService.getCats();
  }
}
