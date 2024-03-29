import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent implements OnInit {
  slides: string[] = [];

  constructor(private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.productsService.fetchSlides();
    this.productsService.slidesChanged.subscribe(
      (status: boolean) => {
        console.log('hello');
        if (status) {
          this.slides = this.productsService.getSlides();
        }
      }
    )
  }
}
