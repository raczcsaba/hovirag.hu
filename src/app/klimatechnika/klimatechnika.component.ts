import { Component, OnInit } from '@angular/core';
import { GetDataService } from  '../get-data.service'
import {data, kep} from '../datainterface'
import { PagecolorService } from  '../pagecolor.service'


@Component({
  selector: 'app-klimatechnika',
  templateUrl: './klimatechnika.component.html',
  styleUrls: ['./klimatechnika.component.sass']
})


export class KlimatechnikaComponent implements OnInit {
  mydata?: data[] = [];
  nodata:boolean = false;
  constructor(public dataservice:GetDataService, public colorservice:PagecolorService) { }

  ngOnInit(): void {
    this.dataservice.getData().then((dat) => {
      if(typeof dat != "undefined") {
        this.mydata = this.dataservice.sortData(dat)
      }else{ this.nodata = true}
    })
  };

  //mycaraousel
  getpic(pic:kep[] | undefined) {
    if (typeof pic != 'undefined'){
      return pic[0].normal;
    }

    return "http://localhost:1337/uploads/medium_tapai3_35a176febf.jpg";
  }
}
