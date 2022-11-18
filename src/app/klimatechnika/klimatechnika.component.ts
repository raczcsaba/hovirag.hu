import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { GetDataService } from  '../get-data.service'
import {data, kep} from '../datainterface'
import { PagecolorService } from  '../pagecolor.service'
import {Router} from "@angular/router";


@Component({
  selector: 'app-klimatechnika',
  templateUrl: './klimatechnika.component.html',
  styleUrls: ['./klimatechnika.component.sass']
})


export class KlimatechnikaComponent implements OnInit {

  mydata: data[] = [];
  klima: data[] = [];
  hutes: data[] = [];
  filtered: data[] = [];
  type:string = " "
  selected?: data;
  sIndex = 0;
  displayStyle = "none";

  constructor(public dataservice:GetDataService, public colorservice:PagecolorService, private router: Router) { }

  ngOnInit(): void {
    this.dataservice.getData('/api/munkaks?populate=*').then((dat) => {
      this.mydata = this.dataservice.sortMunka(dat)
      if (this.dataservice.rickroll){
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
      }
      this.mydata.forEach(value => {
        if (value.category=="hutestechnika"){
          this.hutes.push(value)
        }
        else{
          this.klima.push(value);
        }
      })
      this.filterItem(this.colorservice.colorValue);
    })
    .catch(error => {
      this.router.navigate(['/', 'error']);
    })
    this.colorservice.currentMessage.subscribe(message =>{
      this.filterItem(message)
    })
  };

  //mycaraousel
  getpic(pic:kep[] | undefined) {
    if (typeof pic != 'undefined'){
      if (pic[0].high=="istenfaszaverjebele"){
        return "../../assets/img/sad.png";
      }
      else {
        return pic[0].high;
      }
    }
    return "../../assets/img/sad.png";
  }

  //filter items
  filterItem(r:number){
    r-=12;
    this.filtered = [];
    let indexk = 0;
    let indexh = 0;
    if (r==11){
      this.mydata.forEach(val => {
        this.filtered.push(val)
      });
    }
    else if (r<11){
      let h = this.klima.length >= r ? r : this.klima.length;
      this.mydata.forEach(val => {
        if (val.category=="hutestechnika"){
          this.filtered.push(val)
        }else if (indexk<h){
          this.filtered.push(val)
          indexk++;
        }
      });
    } else{
      let h = this.hutes.length >= 22-r ? 22-r : this.hutes.length;
      this.mydata.forEach(val => {
        if (val.category=="klimatechnika"||val.category=="reklam"){
          this.filtered.push(val)
        }else if (indexh<h){
          this.filtered.push(val)
          indexh++;
        }
      });
    }

  }

  //modal

  openPopup() {
    this.displayStyle = "flex";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  select(dat:data) {
    this.selected = dat;
    this.sIndex = 0;
    this.openPopup()
  }

  nextPic() {
    let l = this.selected?this.selected.pictures?this.selected.pictures.length:0:0
    this.sIndex = this.sIndex < l - 1 ? this.sIndex + 1 : 0;
  }

  prevPic() {
    let l = this.selected?this.selected.pictures?this.selected.pictures.length:0:0
    this.sIndex -= this.sIndex > 0 ? 1 : -l + 1
  }
}
