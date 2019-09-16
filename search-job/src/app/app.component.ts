import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  showLogin = true;
  constructor(private commonService: CommonService){}
  ngOnInit() {
    if(localStorage.getItem('userData')){
      this.showLogin = false;
    }
    else{
      this.showLogin = true;
    }
    this.commonService._loginSubject.subscribe(()=>{
      this.showLogin = false;
    })
  }
  
}
