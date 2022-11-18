import {Component, OnInit} from '@angular/core';
import { GetDataService } from  '../get-data.service'
import { main } from '../datainterface'
import { PagecolorService } from  '../pagecolor.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];
  mydata:main = {cim:" ",leiras:" ", alcim:" ",altartalom:" ", kep:" ", alt:" ", motto:" "}

  constructor(public colorService:PagecolorService, public dataservice: GetDataService, private router: Router) { }

  ngOnInit(): void {
    this.dataservice.getData('/api/fooldals/1?populate=*').then((dat) => {
      this.mydata = this.dataservice.sortData(dat)
    })
    .catch(error => {
      this.router.navigate(['/', 'error']);
    })
  }

}
