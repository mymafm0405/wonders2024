import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '../../shared/cat.model';
import { ProductsServiceService } from '../../shared/products-service.service';

@Component({
  selector: 'app-cat-page',
  templateUrl: './cat-page.component.html',
  styleUrl: './cat-page.component.css'
})
export class CatPageComponent implements OnInit {
  catId: string;
  cat: Category;

  constructor(private route: ActivatedRoute, private productsService: ProductsServiceService, private router: Router) {}

  ngOnInit(): void {
    this.catId = this.route.snapshot.params['id'];
    this.cat = this.productsService.getCatById(this.catId);
    if (!this.cat) {
      this.router.navigate(['/'])
    }

    this.route.params.subscribe(
      (params: Params) => {
        this.catId = params['id'];
        this.cat = this.productsService.getCatById(this.catId);
        if (!this.cat) {
          this.router.navigate(['/'])
        }
      }
    )
  }
}
