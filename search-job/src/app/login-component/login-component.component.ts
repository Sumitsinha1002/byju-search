import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private commonService: CommonService) { }
  user: any = {};
  ngOnInit() {
  }
  login() {
    localStorage.setItem('userData',JSON.stringify(this.user));
    this.commonService.setLogin(true);
  }
}
