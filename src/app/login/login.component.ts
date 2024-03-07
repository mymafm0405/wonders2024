import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  isAdminLogin = false;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    if (this.usersService.getIsAdminStatus()) {
      this.router.navigate(['/cpadmin']);
    }
    console.log(this.route.snapshot.params)
    if (this.route.snapshot.params['login'] === 'login') {
      this.usersService.loginPage.next(true);
    } else {
      this.usersService.loginPage.next(false);
    }
  }
  onSubmit(f: NgForm) {
    console.log(f);
    if (this.usersService.checkUser(f.controls.username.value, f.controls.password.value)) {
      this.router.navigate(['/cpadmin']);
    }

  }

  ngOnDestroy(): void {
    this.usersService.loginPage.next(false);
  }
}
