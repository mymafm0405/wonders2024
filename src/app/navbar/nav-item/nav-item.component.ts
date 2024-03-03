import { Component, Input } from '@angular/core';
import { ProductsServiceService } from '../../shared/products-service.service';
import { Category } from '../../shared/cat.model';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input() navItem: Category;

  constructor(private productsService: ProductsServiceService) {}
}
