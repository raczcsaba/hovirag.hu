import {Component, OnInit} from '@angular/core';
import { GetDataService } from  '../get-data.service'
import { fooldal } from '../datainterface'
import { PagecolorService } from  '../pagecolor.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];
  mydata:fooldal = {cim:" ",leiras:" ", alcim:" ",altartalom:" ", kep:" ", alt:" ", motto:" "}
  constructor(public colorService:PagecolorService, public dataservice: GetDataService) { }

  ngOnInit(): void {
    this.dataservice.getData('/api/fooldals/1?populate=*').then((dat) => {
      if(dat.status == 200) {
        this.mydata = this.dataservice.sortMain(dat)

      }

    })
  }

}
