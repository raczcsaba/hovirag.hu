import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject } from "rxjs";

const colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];

@Injectable({
  providedIn: 'root'
})


export class PagecolorService {
  private messageSource = new BehaviorSubject(1);
  currentMessage = this.messageSource.asObservable();

  constructor(private cookieService: CookieService) { }
  colorValue:number = 23;

  start(){
    if (this.cookieService.check('color')){
      this.colorValue=Number(this.cookieService.get('color'));
    }
    this.changeMessage(this.colorValue)
  }
  getSlider(){
    return this.colorValue;
  }
  getColor(param?:number) {
    switch (param) {
      case 1:
        if (this.colorValue>25)return 'hot';
        else if (this.colorValue>20) return 'mild';
        else return 'cold';
      case 2:
        return colors[22-(this.colorValue - 12)];
      default:
        return colors[this.colorValue - 12];
    }
  }

  setColor(color:number) {
    this.changeMessage(color)

    this.cookieService.set('color',color+'');
    this.colorValue = color;
  }
  changeMessage(message: number) {
    this.messageSource.next(message)
  }
}
