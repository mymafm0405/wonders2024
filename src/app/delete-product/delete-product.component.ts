import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  @Input() product: Product;

  constructor(private http: HttpClient, private productsService: ProductsServiceService) {}

  onDelete() {
    this.http.delete('https://wonders-a0885-default-rtdb.firebaseio.com/products/'+this.product.id+'.json').subscribe(
      (res) => {
        console.log(res);
        this.productsService.fetchProducts();
      }
    )
  }
}
