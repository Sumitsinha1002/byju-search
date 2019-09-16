import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  dataUrl =  'https://nut-case.s3.amazonaws.com/jobs.json';
  jobsData: any ={};
  dataToShow: any = {};
  _subject: Subject<any>;
  showLogin: boolean;
  _loginSubject: Subject<any>;
  constructor(private http: HttpClient) {
    this._subject = new Subject<any>();
    this._loginSubject = new Subject<any>();
   }

  fetchJobsData() {
    return this.http.get(this.dataUrl);
  }

  setJobsData(jobsData) {
    this.jobsData = jobsData;
  }

  getJobsData() {
    return this.jobsData;
  }

  getDataToShow () {
    return this.dataToShow;
  }

  setDataToShow (dataToShow) {
    this.dataToShow = dataToShow;
    this._subject.next(this.dataToShow);
  }

  setLogin(login){
   this. _loginSubject.next();
  }
  
  
}
