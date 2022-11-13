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

  mydata?: data[] = [];
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
      }else{ this.nodata = true}
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
}
