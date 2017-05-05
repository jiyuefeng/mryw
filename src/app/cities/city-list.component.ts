import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";

@Component({
    templateUrl: './citiy-list.component.html',
    styleUrls: ['city-list.component.scss']
})
export class CityListComponent implements OnInit {

  userCities: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userCities = this.authService.getCurrentUser().userCities;
  }

}
