import { Injectable, OnInit } from '@angular/core';
import { Product } from './product.model';
import { Category } from './cat.model';
import { FooterIcons } from './footet-icons.model';
import { CatBanner } from './cat-banner.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { storage } from './firebase-config';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService implements OnInit {
  catIdChanged = new Subject<boolean>();
  catChanged = new Subject<boolean>();
  catBannerChanged = new Subject<boolean>();
  productsChanged = new Subject<boolean>();
  mainBannerChanged = new Subject<boolean>();
  slidesChanged = new Subject<boolean>();
  currentCatBanner: CatBanner;

  catBanners: CatBanner[] = [
    new CatBanner('1', 'https://img.fruugo.com/product/7/92/161822927_max.jpg'),
    new CatBanner(
      '2',
      'https://m.media-amazon.com/images/I/41FCJ0NtlXL._AC_SY1000_.jpg'
    ),
    new CatBanner(
      '3',
      'https://m.media-amazon.com/images/I/41FCJ0NtlXL._AC_SY1000_.jpg'
    ),
  ];

  footerIcons: FooterIcons[] = [
    new FooterIcons(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/1200px-Facebook_Logo_2023.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/1200px-Facebook_Logo_2023.png'
    ),
  ];

  slides: string[] = [];

  cats: Category[] = [];

  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchSlides();
  }

  fetchSlides() {
    console.log('hi hi')
    this.slides = [];
    listAll(ref(storage, 'images/slides/')).then(imgs => {
      imgs.items.forEach(img => {
        getDownloadURL(img).then(url => {
          console.log(url);
          this.slides.push(url)
          this.slidesChanged.next(true);
        })
      })
    })
  }

  addCat(cat: Category) {
    this.cats.push(cat);
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  fetchProducts() {
    this.http.get('https://wonders-a0885-default-rtdb.firebaseio.com/products.json')
    .pipe(map(resData => {
      const products: Product[] = []
      for (const key in resData) {
        if(resData.hasOwnProperty(key)) {

          products.push(resData[key])
        }
      }
      return products;
    }))
    .subscribe(
      (prodData: Product[]) => {
        this.products = prodData;
        this.productsChanged.next(true);
      }
      )
  }

  getProductsForCat(cat_id: string) {
    const catProducts = this.products.filter((product) => {
      return product.catId === cat_id;
    });
    return catProducts;
  }

  fetchCats() {
    this.http
      .get('https://wonders-a0885-default-rtdb.firebaseio.com/categories.json')
      .pipe(
        map((resData) => {
          const cats: Category[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              cats.push(resData[key]);
            }
          }
          return cats;
        })
      )
      .subscribe((catsData: Category[]) => {
        this.cats = catsData;
        // console.log(this.cats);
        this.catChanged.next(true);
      });
  }

  getCats() {
    return this.cats.slice();
  }

  getCatById(id: string) {
    return this.cats.find((cat) => cat.id === id);
  }
  getLastProduct() {
    const lastProducts: Product[] = [];
    if (this.cats.length > 0 && this.products.length > 0) {
      this.cats.forEach((cat) => {
        const catProducts = this.products.filter((product) => {
          return product.catId === cat.id;
        });
        if (catProducts.length > 0) {
          console.log('hello')
          lastProducts.push(catProducts[catProducts.length - 1]);
        }
      });
    }
    return lastProducts;
  }

  getSlides() {
    return this.slides.slice();
  }

  getFooterIcons() {
    return this.footerIcons.slice();
  }

  // getProductImages(catId: string, productId: string) {
  //   const productImages: string[] = [];
  //   listAll(ref(storage, 'images/'+catId+'/'+productId)).then(imgs => {
  //     imgs.items.forEach(img => {
  //       getDownloadURL(img).then(url => {
  //         productImages.push(url)
  //         console.log(url);
  //       })
  //     })
  //   })
  //   return productImages;
  // }

  getCatBanner(catId: string): CatBanner {
    let catBanner: CatBanner = new CatBanner(catId, '');
    listAll(ref(storage, 'images/'+catId)).then(imgs => {
      if (imgs.items[0]) {
        getDownloadURL(imgs.items[0]).then(url => {
          catBanner = new CatBanner(catId, url);
          this.currentCatBanner = catBanner;
          this.catBannerChanged.next(true)
          return catBanner;
        })
      }
    })
    return catBanner;
    // const catBanner = this.catBanners.find((catB) => catB.catId === catId);
  }

  getProductById(id: string) {
    return this.products.find((product) => product.id === id);
  }
}
