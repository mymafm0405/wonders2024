import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from './shared/users.service';
import { ProductsServiceService } from './shared/products-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoginPage = false;
  isAdminLogin = false;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private productsService: ProductsServiceService) {}

  ngOnInit(): void {
    this.usersService.loginPage.subscribe(
      (loginPage: boolean) => {
        this.isLoginPage = loginPage;
      }
    )

    this.productsService.fetchProducts();

    this.usersService.loginStatus.subscribe(
      (status: boolean) => {
        this.isAdminLogin = status;
      }
    )
  }
}
