import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from '../shared/cat.model';
import { ProductsServiceService } from '../shared/products-service.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/product.model';
import { storage } from '../shared/firebase-config';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-cpadmin',
  templateUrl: './cpadmin.component.html',
  styleUrl: './cpadmin.component.css'
})
export class CpadminComponent implements OnInit {
  @ViewChild('myImage') myImage: ElementRef;
  @ViewChild('banner') banner: ElementRef;
  @ViewChild('mainBanner') mainBanner: ElementRef;
  @ViewChild('slide1') slide1: ElementRef;
  @ViewChild('slide2') slide2: ElementRef;
  @ViewChild('slide3') slide3: ElementRef;
  @ViewChild('slide4') slide4: ElementRef;
  @ViewChild('slide5') slide5: ElementRef;

  loading = false;
  cats: Category[] = [];

  constructor(private usersService: UsersService, private router: Router, private productsService: ProductsServiceService, private http: HttpClient) {}
  ngOnInit(): void {
    if (!this.usersService.getIsAdminStatus()) {
      this.router.navigate(['/']);
    }

    this.cats =
    this.productsService.getCats();
  }

  onAddCat(catF: NgForm) {
    this.loading = true;
    const newCat: Category = {
      id: '',
      name: catF.controls.name.value
    }

    this.http.post('https://wonders-a0885-default-rtdb.firebaseio.com/categories.json', newCat).subscribe(
      (resData: {name: string}) => {
        if (resData.name) {
          this.http.patch('https://wonders-a0885-default-rtdb.firebaseio.com/categories/'+resData.name+'.json', {...newCat, id: resData.name}).subscribe(
            (res: Category) => {
              this.productsService.addCat(res);
              // Add cat banner
              const bannerRef = ref(storage, 'images/'+resData.name+'/'+resData.name);
              uploadBytes(bannerRef, this.banner.nativeElement.files[0]);
              this.productsService.catChanged.next(true);
              this.loading = false;
            }
          )
        }
      }
    )
  }

  onAddProduct(productF: NgForm) {
    this.loading = true;
    const catId = productF.controls.catId.value;
    const name = productF.controls.name.value;
    const desc = productF.controls.desc.value;
    const price = productF.controls.price.value;

    const newProduct: Product = new Product('', catId, name, desc, price, [])

    this.http.post('https://wonders-a0885-default-rtdb.firebaseio.com/products.json', newProduct).subscribe(
      (resData: {name: string}) => {
        // Here I store the image with the product id
        const productImages: string[] = [];

        const imageRef = ref(storage, 'images/'+catId+'/'+resData.name+ '/1');
        uploadBytes(imageRef, this.myImage.nativeElement.files[0]);

        // listAll(ref(storage,'images/'+catId+'/'+resData.name)).then(imgs => {
        //   imgs.items.forEach(item => {
        //     // This is the product id
        //     console.log(item.name);

        //     getDownloadURL(item).then(url => {
        //       // This is the image url
        //       console.log(url);
        //     })
        //   })
        // })

        // Here I update the product id and images array
        this.http.patch('https://wonders-a0885-default-rtdb.firebaseio.com/products/'+resData.name+'.json', {...newProduct, id: resData.name, images: productImages}).subscribe(
          (res: Product) => {
            this.productsService.addProduct({...res})
            this.productsService.productsChanged.next(true);
            this.loading = false;


          }
        )
      }
    )

  }

  onUpdateMainBanner() {
    this.loading = true;
    const bannerRef = ref(storage, 'images/main-banner/'+this.mainBanner.nativeElement.value);
    uploadBytes(bannerRef, this.mainBanner.nativeElement.files[0]).then(val => {
      console.log(val);
      this.productsService.mainBannerChanged.next(true);
      this.loading = false;
    })
  }

  onUpdateSlide1() {
    this.loading = true;
    const slide1Ref = ref(storage, 'images/slides/1');
    uploadBytes(slide1Ref, this.slide1.nativeElement.files[0]).then(val => {
      console.log(val);
      this.productsService.fetchSlides();
      this.loading = false;
    })
  }
  onUpdateSlide2() {
    this.loading = true;
    const slide2Ref = ref(storage, 'images/slides/2');
    uploadBytes(slide2Ref, this.slide2.nativeElement.files[0]).then(val => {
      console.log(val);
      this.productsService.fetchSlides();
      this.loading = false;
    })
  }
  onUpdateSlide3() {
    this.loading = true;
    const slide3Ref = ref(storage, 'images/slides/3');
    uploadBytes(slide3Ref, this.slide3.nativeElement.files[0]).then(val => {
      console.log(val);
      this.productsService.fetchSlides();
      this.loading = false;
    })
  }
  onUpdateSlide4() {
    this.loading = true;
    const slide4Ref = ref(storage, 'images/slides/4');
    uploadBytes(slide4Ref, this.slide4.nativeElement.files[0]).then(val => {
      console.log(val);
      this.productsService.fetchSlides();
      this.loading = false;
    })
  }
  onUpdateSlide5() {
    this.loading = true;
    const slide5Ref = ref(storage, 'images/slides/5');
    uploadBytes(slide5Ref, this.slide5.nativeElement.files[0]).then(val => {
      console.log(val);
      this.productsService.fetchSlides();
      this.loading = false;
    })
  }
}
