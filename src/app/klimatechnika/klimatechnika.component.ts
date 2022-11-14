import { Component, OnInit } from '@angular/core';
import { GetDataService } from  '../get-data.service'
import {data, kep} from '../datainterface'
import { PagecolorService } from  '../pagecolor.service'
import { ActivatedRoute } from '@angular/router';


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
  nodata:boolean = false;
  constructor(public dataservice:GetDataService, public colorservice:PagecolorService,private activatedroute:ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.type= data['page'];
    })
    this.dataservice.getData().then((dat) => {
      if(dat.status == 200) {
        this.mydata = this.dataservice.sortData(dat)
        if (this.dataservice.rickroll){
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
        }
        this.mydata.forEach(value => {
          if (value.category=="klimatechnika"){
            this.klima.push(value)
          }
          else{
            this.hutes.push(value);
          }
        })
        //console.log(this.hutes);





      }else{ this.nodata = true}

    })
    //ez itt nagyon fájt
    this.colorservice.currentMessage.subscribe(message =>{
      if (!this.nodata){

        this.filterItem(message)

      }
    })
  };

  //mycaraousel
  getpic(pic:kep[] | undefined) {
    if (typeof pic != 'undefined'){
      if (pic[0].normal=="istenfaszaverjebele"){
        return "../../assets/img/sad.png";
      }
      else {
        return pic[0].normal;
      }
    }
    return "../../assets/img/sad.png";
  }

  //filter items
  indexk = 0;
  indexh = 0;

  filterItem(r:number){
    r-=12;
    this.filtered = [];
    console.log(this.filtered.length)

    if (r==11){
      console.log("huugeci")
      this.mydata.forEach(val => {
        this.filtered.push(val)
      });
    }
    else if (r<11){
      console.log("au " + this.hutes.length)
      this.hutes.forEach(val => {
        this.filtered.push(val)
      });
      let h = this.klima.length >= r ? r : this.klima.length;
      //console.log(h+" sdfg")
      for (let i = 0;i<h;i++){
        this.filtered.push(this.klima[i]);
        //console.log("hossz " + this.filtered.length)
      }
    } else{
      console.log("au " + this.hutes.length)
      this.klima.forEach(val => {
        this.filtered.push(val)
      });
      let h = this.hutes.length >= 22-r ? 22-r : this.hutes.length;
      //console.log(h+" sdfg")
      for (let i = 0;i<h;i++){
        this.filtered.push(this.hutes[i]);
        //console.log("hossz " + this.filtered.length)
      }
    }

  }


  /*filterItem(dat:data[]){
    let r = this.colorservice.getSlider()-12
    this.filtered = [];
    this.indexk = 0
    this.indexh = 0
    dat.forEach(d => {
      if (d.category == "klimatechnika"){
        if (r>=11){ this.filtered.push(d) }
        else if (this.indexk > 11-r) {  }
        else { this.indexk++; this.filtered.push(d); }

      }else if (d.category == "hutestechnika"){
        if (r<=11){ this.filtered.push(d) }
        else if (this.indexh > 11 - (r - 11)) {  }
        else { this.indexh++; this.filtered.push(d); }
      }
    })
  }


  filterItem(category: string) {
    let r = this.colorservice.getSlider()-12
    if (category == "klimatechnika"){
      if (r>11){
        return true;
      }
      else if (r==0){
        return false
      }else if((22-r)/2>this.indexk){
        //console.log(r+" index: " + this.indexk)
        this.indexk = 0;
        return true
      }else {
        console.log(r+" index: " + this.indexk)

        this.indexk++;
        return false
      }

    }
    else if (category == "hutestechnika"){
      if (r<=11){
        return true;
      }
      else if (r==22){
        return false
      }else if(r/2<=this.indexh){
        this.indexh = 0;
        return true
      }else {
        console.log(r+" index: " + this.indexh)

        this.indexh++;
        return false
      }
    }
    else {
      return false
    }

  }*/
}
