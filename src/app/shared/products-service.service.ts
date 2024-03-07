import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Category } from './cat.model';
import { FooterIcons } from './footet-icons.model';
import { CatBanner } from './cat-banner.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  catIdChanged = new Subject<boolean>();

  catBanners: CatBanner[] = [
    new CatBanner('1', 'https://img.fruugo.com/product/7/92/161822927_max.jpg'),
    new CatBanner('2', 'https://m.media-amazon.com/images/I/41FCJ0NtlXL._AC_SY1000_.jpg'),
    new CatBanner('3', 'https://m.media-amazon.com/images/I/41FCJ0NtlXL._AC_SY1000_.jpg'),
  ]

  footerIcons: FooterIcons[] = [
    new FooterIcons('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/1200px-Facebook_Logo_2023.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/1200px-Facebook_Logo_2023.png')
  ];

  slides: string[] = [
    'https://img.fruugo.com/product/7/92/161822927_max.jpg',
    'https://m.media-amazon.com/images/I/41FCJ0NtlXL._AC_SY1000_.jpg',
    'https://i5.walmartimages.com/seo/SYNPOS-5-16-Years-Girls-Dress-Sequin-Lace-Wedding-Party-Flower-Dress-Kids-Tulle-Prom-Ball-Gowns-Christmas-Dresses_81b905f7-69fe-472e-89dd-fc28118b48df.1cef94359f045b32a2098a9e3f6034aa.jpeg',
    'https://fbargainsgalore.co.uk/wp-content/uploads/2023/04/Half-sleeve-flower-girl-dress-green-1.jpeg'
  ]

  cats: Category[] = [
    new Category('1', 'Kids'),
    new Category('2', 'Accessorices'),
    new Category('3', 'Collections')
  ]

  products: Product[] = [
    new Product('1', '1', 'Kids dress 1', 'Some description about the product will be here', 200, ['https://m.media-amazon.com/images/I/41FCJ0NtlXL._AC_SY1000_.jpg', '']),
    new Product('2', '1', 'Kids dress 2', 'Some description about the product will be here', 150, ['https://img.fruugo.com/product/7/92/161822927_max.jpg', '']),
    new Product('3', '2', 'Kids dress 3', 'Some description about the product will be here', 250, ['https://i5.walmartimages.com/seo/SYNPOS-5-16-Years-Girls-Dress-Sequin-Lace-Wedding-Party-Flower-Dress-Kids-Tulle-Prom-Ball-Gowns-Christmas-Dresses_81b905f7-69fe-472e-89dd-fc28118b48df.1cef94359f045b32a2098a9e3f6034aa.jpeg', '']),
    new Product('4', '3', 'Kids dress 4', 'Some description about the product will be here', 300, ['https://fbargainsgalore.co.uk/wp-content/uploads/2023/04/Half-sleeve-flower-girl-dress-green-1.jpeg', '']),
  ];
  constructor() { }

  getProductsForCat(cat_id: string) {
    const catProducts = this.products.filter((product) => { return product.catId === cat_id});
    return catProducts;
  }

  getCats() {
    return this.cats.slice();
  }
  getCatById(id: string) {
    return this.cats.find((cat) => cat.id === id);
  }
  getLastProduct() {
    const lastProducts: Product[] = [];
    this.cats.forEach((cat) => {
      const catProducts = this.products.filter((product) => {return product.catId === cat.id})
      lastProducts.push(catProducts[catProducts.length - 1]);
    });
    return lastProducts;
  }

  getSlides() {
    return this.slides.slice();
  }

  getFooterIcons() {
    return this.footerIcons.slice();
  }

  getCatBanner(catId: string) {
    const catBanner = this.catBanners.find(catB => catB.catId === catId);
    return catBanner;
  }

  getProductById(id: string) {
    return this.products.find((product) => product.id === id);
  }
}
