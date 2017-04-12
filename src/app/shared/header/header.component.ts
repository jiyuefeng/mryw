import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../services/auth/auth.service';
import {UserModel} from "../services/auth/user.model";

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    currentUser: UserModel;
    constructor(public authService: AuthService, public router: Router) {
    }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
