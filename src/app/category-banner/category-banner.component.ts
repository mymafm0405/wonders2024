import { Component, Input } from '@angular/core';
import { CatBanner } from '../shared/cat-banner.model';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrl: './category-banner.component.css'
})
export class CategoryBannerComponent {
  @Input() catBanner: CatBanner;
}
