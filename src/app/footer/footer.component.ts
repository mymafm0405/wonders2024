import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';
import { FooterIcons } from '../shared/footet-icons.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  footerIcons: FooterIcons[] = [];
  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.footerIcons = this.productsService.getFooterIcons();
  }
}
