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
import { CpadminComponent } from './cpadmin/cpadmin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category/:id', component: CatPageComponent},
  {path: 'login/:login', component: LoginComponent},
  {path: 'cpadmin', component: CpadminComponent},
  {path: 'cart', component: CartComponent},
  {path: 'contactus', component: ContactComponent},
  {path: 'aboutus', component: AboutComponent},
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
    HomeComponent,
    CpadminComponent,
    LoginComponent,
    CartComponent,
    CartItemComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HammerModule,
    IgxCarouselModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
