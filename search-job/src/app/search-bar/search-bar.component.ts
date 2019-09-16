import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  dataUrl =  'https://nut-case.s3.amazonaws.com/jobs.json';
  jobData : any;
  search: any = {};
  constructor(private commonService: CommonService) { 
  }

  ngOnInit() {
    
      
  }
  searchLocation = (locations, result) => {
    locations = locations.toString().split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
    var location = [result.location.toLowerCase()];
    if (location[0].includes(',')) {
        location = location[0].split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
    }
    return location.some(loc => {
        let flag = false;
        locations.forEach(loca => {
            if (loc.trim().includes(loca.trim()))
                flag = true;
        });
        return flag;
    });
}

searchSkill = (skillSet, result) => {
    skillSet = skillSet.toString().split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
    var skill = [result.skills.toLowerCase()];
    if (skill[0].includes(',')) {
        skill = skill[0].split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
    }
    return skill.some(skl => {
        let flag = false;
        skillSet.forEach(skill => {
            if (skl.trim().includes(skill.trim()))
                flag = true;
        });
        return flag;
    });
}

searchExp = (experience, result) => {
    let floor = -1;
    let ceil = -1;
    let exp = result.experience.toLowerCase();
    let index = exp.indexOf('yrs');
    let limits = [];
    if (index > 0) {
        exp = exp.slice(0, index);
    }
    if (exp.toLowerCase().includes('fresher')) {
        limits = [0, 0];
    }
    else if (exp.includes('-')) {
        limits = exp.split('-').map(limit => limit.trim());
    }
    else if (exp.includes('to')) {
        limits = exp.split('to').map(limit => limit.trim());
    } else {
        limits = [exp, exp];
    }
    floor = parseInt(limits[0]);
    ceil = parseInt(limits[1]);
    if (experience >= floor && experience <= ceil) {
        return true;
    } else {
        return false;
    }
}

searchJobs = () => {
    let data = this.commonService.getJobsData();
          let results = data;
          if (this.search.location && this.search.location.length > 0) {
              results = results.filter(result => {
                  return this.searchLocation(this.search.location, result);
              });
          }

          if (this.search.skills && this.search.skills.length > 0) {
              results = results.filter(result => {
                  return this.searchSkill(this.search.skills, result);
              });
          }

          if (this.search.experience>=0) {
              results = results.filter(result => {
                  if (result.experience.length <= 0) return false;
                  return this.searchExp(this.search.experience, result);
              });
          }
          this.commonService.setDataToShow(results);
          
        }
        resetJobs(){
          this.commonService.setDataToShow(this.commonService.getJobsData());
        }
}
