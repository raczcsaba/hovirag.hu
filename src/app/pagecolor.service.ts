import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject } from "rxjs";

const colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];

@Injectable({
  providedIn: 'root'
})

export class PagecolorService {

  constructor(private cookieService: CookieService) { }

  colorValue = 23;
  acMode = 'acauto.png'

  private messageSource = new BehaviorSubject(1);
  currentMessage = this.messageSource.asObservable();
  private ACmessageSource = new BehaviorSubject('');
  ACcurrentMessage = this.ACmessageSource.asObservable();

  start(){
    if (this.cookieService.check('color')){
      this.colorValue=Number(this.cookieService.get('color'));
    }
    if (this.cookieService.check('acmode')){
      this.acMode=this.cookieService.get('acmode');
    }
    this.changeMessage(this.colorValue)
    this.changeACMessage(this.acMode)
  }

  //1 = basic colors
  //2 = inverse colors
  //0 or other = normal colors
  getColor(param?:number) {
    switch (param) {
      case 1:
        if (this.colorValue>30)return 'hot';
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

  setAc(mode:string) {
    this.changeACMessage(mode)
    this.cookieService.set('acmode',mode);
    this.acMode = mode;
  }

  changeMessage(message: number) {
    this.messageSource.next(message)
  }

  changeACMessage(message: string) {
    this.ACmessageSource.next(message)
  }
}
