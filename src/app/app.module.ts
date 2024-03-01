import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavItemComponent } from './navbar/nav-item/nav-item.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { LatestProductsComponent } from './latest-products/latest-products.component';
import { CateogryComponent } from './cateogry/cateogry.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FooterComponent } from './footer/footer.component';
import { SocialItemComponent } from './footer/social-item/social-item.component';
import { SlideItemComponent } from './slideshow/slide-item/slide-item.component';
import { CategoryBannerComponent } from './category-banner/category-banner.component';

import { IgxCarouselModule } from 'igniteui-angular';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    NavItemComponent,
    SlideshowComponent,
    LatestProductsComponent,
    CateogryComponent,
    ProductItemComponent,
    FooterComponent,
    SocialItemComponent,
    SlideItemComponent,
    CategoryBannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
