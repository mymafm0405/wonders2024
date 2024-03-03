import { RouterModule, Routes } from '@angular/router';
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
import { CateogryComponent } from './category/cateogry.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FooterComponent } from './footer/footer.component';
import { SocialItemComponent } from './footer/social-item/social-item.component';
import { SlideItemComponent } from './slideshow/slide-item/slide-item.component';
import { CategoryBannerComponent } from './category-banner/category-banner.component';
import { CatPageComponent } from './category/cat-page/cat-page.component';
import { HomeComponent } from './home/home.component';

import { IgxCarouselModule } from 'igniteui-angular';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category/:id', component: CatPageComponent}
]
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
    CategoryBannerComponent,
    CatPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HammerModule,
    IgxCarouselModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
