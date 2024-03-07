import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loginPage = new Subject<boolean>();
  loginStatus = new Subject<boolean>();
  isAdminLogin = false;

  users: User[] = [
    new User('1', 'Admin', 'admin', '123', 'admin')
  ]

  constructor() {}

  checkUser(username: string, password: string) {
    if (this.users.find(user => user.username === username && user.password === password)) {
      console.log('found')
      this.loginStatus.next(true);
      this.isAdminLogin = true;
      return true;
    } else {
      console.log('not found')
      this.loginStatus.next(false);
      return false;
    }
  }

  getIsAdminStatus() {
    return this.isAdminLogin;
  }
}
