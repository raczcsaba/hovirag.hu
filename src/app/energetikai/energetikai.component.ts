import {Component, Input, OnInit} from '@angular/core';
import { GetDataService } from  '../get-data.service'
import {data, main} from '../datainterface'
import { PagecolorService } from  '../pagecolor.service'
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-energetikai',
  templateUrl: './energetikai.component.html',
  styleUrls: ['./energetikai.component.sass']
})
export class EnergetikaiComponent implements OnInit {

  colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];
  mydata:main = {cim:" ",leiras:" ", alcim:" ",altartalom:" ", kep:" ", alt:" ", motto:" "}
  page = ''
  sub:Subscription = this.route.data.subscribe(value => {this.page = value['info']})


  constructor(public colorService:PagecolorService, public dataservice: GetDataService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.data.subscribe()
    this.dataservice.getData('/api/fooldals/?populate=*').then((dat) => {
      this.mydata = this.dataservice.sortData(dat.data.data[this.page=="page1"?1:2])
    })
    .catch(error => {
      this.router.navigate(['/', 'error']);
    })

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
