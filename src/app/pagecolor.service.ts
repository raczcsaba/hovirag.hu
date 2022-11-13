import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

const colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];

@Injectable({
  providedIn: 'root'
})


export class PagecolorService {

  constructor(private cookieService: CookieService) { }
  colorValue:number = 19;

  start(){
    if (this.cookieService.check('color')){
      this.colorValue=Number(this.cookieService.get('color'));
    }
  }
  getColor(light?:boolean) {
    if (light==true){
      if (this.colorValue>25)return 'hot'
      else if (this.colorValue>20) return 'mild'
      else return 'cold'
    }else {
      return colors[this.colorValue - 12];
    }
  }

  setColor(color:number) {
    this.cookieService.set('color',color+'');
    this.colorValue = color;

  }
}
