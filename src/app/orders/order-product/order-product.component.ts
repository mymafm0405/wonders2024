import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/product.model';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../shared/firebase-config';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.css'
})
export class OrderProductComponent implements OnInit{
  @Input() item: Product;
  imageUrl: string;

  ngOnInit(): void {
    listAll(ref(storage, 'images/'+this.item.catId+'/'+this.item.id)).then(imgs => {
      imgs.items.forEach(img => {
        getDownloadURL(img).then(url => {
          this.imageUrl = url;
        })
      })
    })

  }
}
