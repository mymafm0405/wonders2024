import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';
import { Category } from '../shared/cat.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  navItems: Category[] = [];
  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.navItems = this.productsService.getCats();
  }
}
