import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common-service.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  displayedColumns = ['companyname', 'experience', 'skills', 'title', 'location'];
  jobsData: MatTableDataSource<any>;
  fetchData: any = {};
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private commonService : CommonService) { }

  ngOnInit() {
    this.commonService.fetchJobsData().subscribe((res)=>{
      console.log(res);
      this.fetchData = res;
      this.commonService.setJobsData(this.fetchData.data);
      this.commonService.setDataToShow(this.fetchData.data);
      this.jobsData = new MatTableDataSource(this.commonService.getDataToShow());
      this.jobsData.paginator = this.paginator;
      this.jobsData.sort = this.sort;
      
    this.jobsData.filterPredicate = 
  (data: any, filter: string) => data.companyname.toLowerCase().indexOf(filter.toLowerCase()) != -1;
  this.jobsData.sortingDataAccessor = (data: any, sortHeaderId: string): any => {
    if (typeof data[sortHeaderId] === 'string') {
      return data[sortHeaderId].toLocaleLowerCase();
    }
    if(sortHeaderId ==='experience'){
      if(data[sortHeaderId].indexOf('-') != -1)
      return parseInt(data[sortHeaderId].split('-')[0])
      else if(data[sortHeaderId].indexOf('Fresher') != -1)
      {
        return 0;
      }
      
      return parseInt(data[sortHeaderId]);
    }
    return data[sortHeaderId];
  };   
})
    
    this.commonService._subject.subscribe(()=>{
      this.jobsData = new MatTableDataSource(this.commonService.getDataToShow());
      this.jobsData.paginator = this.paginator;
      this.jobsData.sort = this.sort;

    });
  }

  ngAfterViewInit() {
    
  }

  

  applyFilter(filterValue: string) {
    //this.jobsData = new MatTableDataSource(this.commonService.getDataToShow());
    //let dataToShow = this.commonService.getDataToShow();
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.jobsData.filter = filterValue;
    console.log(this.jobsData);

  }

}
