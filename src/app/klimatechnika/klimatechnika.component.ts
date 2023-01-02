import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  promo: data[] = []
  gazsziv: data[] = []
  filtered: data[] = [];
  type:string = " "
  selected?: data;
  actualPromo?: data;
  sIndex = 0;
  displayStyle = "none";
  public screenHeight: number = 0;
  @Input() oldal?: string;



  constructor(public dataservice:GetDataService, public colorservice:PagecolorService, private router: Router) { }

  ngOnInit(): void {
    this.dataservice.getData('/api/munkaks?populate=*').then((dat) => {
      if (this.dataservice.rickroll){
        console.log("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley")
      }
      if (!this.oldal){
        this.dataservice.sortMunka(dat).forEach(value => {
          switch (value.category){
            case 'hutestechnika':
              this.mydata.push(value)
              this.hutes.push(value);
              return
            case 'klimatechnika':
              this.mydata.push(value)
              this.klima.push(value)
              return;
            case 'hoszivattyu':
              this.gazsziv.push(value);
              return;
            case 'szakszervíz':
              this.promo.push(value);
              return;
          }
        })
        this.promo.sort((a, b) => {return a.id>b.id?1:-1})
        this.filterItem(this.colorservice.colorValue,this.colorservice.acMode);
      }else {
        this.dataservice.getData('/api/munkaks?populate=*').then((dat) => {
          this.dataservice.sortMunka(dat).forEach(value => {
            if (value.category == (this.oldal=="page1"?"oldal1":"oldal2")){
              this.filtered.push(value)
            }
          })
          this.filtered.sort((a, b) => {return a.id>b.id?1:-1})
        })
      }

    })
    .catch(error => {
      this.router.navigate(['/', 'error']);
    })
    this.screenHeight = window.innerHeight
    this.colorservice.currentMessage.subscribe(message =>{
      this.filterItem(message,this.colorservice.acMode)
    })
    this.colorservice.ACcurrentMessage.subscribe(message => {
      this.filterItem(this.colorservice.colorValue, message)
    })
  };

  //filter items

  filterMix(r:number){
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
      this.actualPromo = this.promo[2]
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
      this.actualPromo = this.promo[0]
      let h = this.hutes.length >= 22-r ? 22-r : this.hutes.length;
      this.mydata.forEach(val => {
        if (val.category=="klimatechnika"){
          this.filtered.push(val)
        }else if (indexh<h){
          this.filtered.push(val)
          indexh++;
        }
      });
    }
  }

  filterItem(r:number,mode:string){
    this.filtered = []
    switch (mode){
      case 'acheat.png':
        this.actualPromo = this.promo[1];
        this.gazsziv.forEach(val => {
          this.filtered.push(val);
        })
        this.filtered.sort((a, b) => {return a.id>b.id?1:-1})
        return;
      case 'accool.png':
        this.filterMix(r);
        this.filtered.sort((a, b) => {return a.id>b.id?1:-1})
        return;
      case 'acauto.png':
        this.filterMix(r)
        this.actualPromo = this.promo[3]
        this.gazsziv.forEach(val => {
          this.filtered.push(val);
        })
        this.filtered.sort((a, b) => {return a.id>b.id?1:-1})
        return;
    }
    this.filtered.sort((a, b) => {return a.id>b.id?1:-1})
  }

  //modal

  openPopup() {
    this.displayStyle = "flex";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  select(dat:data,i:number) {
    if (dat.pictures?.[0].high != 'http://95.138.193.252:32018/uploads/sad_e74e398710.png'){
      this.selected = dat;
      this.sIndex = i;
      this.openPopup()
    }
  }

  nextPic() {
    let l = this.selected?this.selected.pictures?this.selected.pictures.length:0:0
    this.sIndex = this.sIndex < l - 1 ? this.sIndex + 1 : 0;
  }

  prevPic() {
    let l = this.selected?this.selected.pictures?this.selected.pictures.length:0:0
    this.sIndex -= this.sIndex > 0 ? 1 : -l + 1
  }

  onResize($event: any) {
    this.screenHeight = window.innerHeight
  }
}
