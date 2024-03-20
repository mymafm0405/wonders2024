import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsServiceService } from '../shared/products-service.service';
import { Product } from '../shared/product.model';
import { Category } from '../shared/cat.model';
import { CatBanner } from '../shared/cat-banner.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../shared/firebase-config';

@Component({
  selector: 'app-cateogry',
  templateUrl: './cateogry.component.html',
  styleUrl: './cateogry.component.css'
})
export class CateogryComponent implements OnInit {
  @ViewChild('catBannerImage') catBannerImage: ElementRef;
  @Input() catId: string;
  @Input() category: Category;
  catProducts: Product[];
  catBanner: CatBanner;
  loading = false;
  isAdminLogin = false;
  showEditForm = false;

  constructor(private productsService: ProductsServiceService, private route: ActivatedRoute, private usersService: UsersService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loading = true
    this.catProducts = this.productsService.getProductsForCat(this.catId);
    this.catBanner = this.productsService.getCatBanner(this.catId);
    if (this.catProducts) {
      this.loading = false;
    }

    this.productsService.catBannerChanged.subscribe(
      (status: boolean) => {
        if (status) {
          console.log(this.category.id)
          if (this.category.id === this.productsService.currentCatBanner.catId) {
            this.catBanner = this.productsService.currentCatBanner;
          }
        }
      }
    )

    this.isAdminLogin = this.usersService.getIsAdminStatus();

    this.usersService.loginStatus.subscribe(
      (status: boolean) => {
        if (status) {
          this.isAdminLogin = this.usersService.getIsAdminStatus();
        }
      }
    )

    this.productsService.productsChanged.subscribe(
      (status: boolean) => {
        if(status) {
          this.catProducts = this.productsService.getProductsForCat(this.catId);
          console.log(this.catProducts);
        }
      }
    )

    this.route.params.subscribe(
      (params: Params) => {
        this.catId = params['id'];
        if (this.catId) {
          this.catProducts = this.productsService.getProductsForCat(this.catId)
          this.catBanner = this.productsService.getCatBanner(this.catId);
        }
      }
    )
  }

  onEdit() {
    this.showEditForm = true;
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.http.delete('https://wonders-a0885-default-rtdb.firebaseio.com/categories/'+this.category.id+'.json').subscribe(
        () => {
          console.log('deleted')
          this.productsService.fetchCats();
        }
      )
    }
  }

  onUpdate(editF: NgForm) {
    if (this.catBannerImage.nativeElement.files[0]) {
      console.log('found file')
      const bannerRef = ref(storage, 'images/'+this.category.id+'/'+this.category.id);
      uploadBytes(bannerRef, this.catBannerImage.nativeElement.files[0]).then(val => {
        this.productsService.catChanged.next(true);
      })
    }
    if (editF.controls.name.value.length > 0) {
      this.http.patch('https://wonders-a0885-default-rtdb.firebaseio.com/categories/'+this.category.id+'.json', {...this.category, name: editF.controls.name.value}).subscribe(
        (cat) => {
          console.log(cat);
          this.router.navigate(['/']);
          this.productsService.catChanged.next(true);
        }
      )
    }
  }
}

