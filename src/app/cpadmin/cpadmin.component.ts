import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cpadmin',
  templateUrl: './cpadmin.component.html',
  styleUrl: './cpadmin.component.css'
})
export class CpadminComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}
  ngOnInit(): void {
    if (!this.usersService.getIsAdminStatus()) {
      this.router.navigate(['/']);
    }
  }
}
