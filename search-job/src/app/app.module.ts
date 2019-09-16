import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../maretial-module';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { CommonService } from './services/common-service.service'


@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    SearchBarComponent,
    LoginComponentComponent],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    DemoMaterialModule,
    HttpClientModule
    
  ],
  providers: [HttpClientModule,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
