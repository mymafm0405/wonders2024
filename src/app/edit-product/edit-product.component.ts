import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../shared/product.model';
import { HttpClient } from '@angular/common/http';
import { ProductsServiceService } from '../shared/products-service.service';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../shared/firebase-config';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  @ViewChild('editF') editF: NgForm;

  @ViewChild('img1') image1: ElementRef;
  @ViewChild('img2') image2: ElementRef;
  @ViewChild('img3') image3: ElementRef;

  @Input() product: Product;

  showEdit = false;
  loading = false;

  constructor(private http: HttpClient, private productsService: ProductsServiceService) {}

  ngOnInit(): void {}

  onEdit() {
    this.showEdit = !this.showEdit;
  }

  onSave() {
    this.loading = true;
    if (this.editF.controls.name.value && this.editF.controls.desc.value) {
      this.http.patch(
        'https://wonders-a0885-default-rtdb.firebaseio.com/products/' +
          this.product.id +
          '.json',
        {
          name: this.editF.controls.name.value,
          desc: this.editF.controls.desc.value,
        }
      ).subscribe(
        (res) => {
          console.log(res);
          this.loading = false;
        }
      )
    }
    if (this.editF.controls.name.value && !this.editF.controls.desc.value) {
      this.http.patch(
        'https://wonders-a0885-default-rtdb.firebaseio.com/products/' +
          this.product.id +
          '.json',
        {
          name: this.editF.controls.name.value
        }
      ).subscribe(
        (res) => {
          console.log(res);
          this.loading = false;
        }
      )
    }
    if (!this.editF.controls.name.value && this.editF.controls.desc.value) {
      this.http.patch(
        'https://wonders-a0885-default-rtdb.firebaseio.com/products/' +
          this.product.id +
          '.json',
        {
          desc: this.editF.controls.desc.value,
        }
      ).subscribe(
        (res) => {
          console.log(res);
          this.loading = false;
        }
      )
    }

    // Update pictures
    if (this.image1.nativeElement.files[0]) {
      const img1Ref = (ref(storage, 'images/'+this.product.catId+'/'+this.product.id+'/1'));
      uploadBytes(img1Ref, this.image1.nativeElement.files[0]).then(() => {
        this.loading = false;
      });
    }
    if (this.image2.nativeElement.files[0]) {
      const img2Ref = (ref(storage, 'images/'+this.product.catId+'/'+this.product.id+'/2'));
      uploadBytes(img2Ref, this.image2.nativeElement.files[0]).then(() => {
        this.loading = false;
      });
    }
    if (this.image3.nativeElement.files[0]) {
      const img3Ref = (ref(storage, 'images/'+this.product.catId+'/'+this.product.id+'/3'));
      uploadBytes(img3Ref, this.image3.nativeElement.files[0]).then(() => {
        this.loading = false;
      });
    }
  }

}
