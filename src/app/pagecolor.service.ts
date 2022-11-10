import { Injectable } from '@angular/core';

const colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];

@Injectable({
  providedIn: 'root'
})


export class PagecolorService {

  constructor() { }
  colorValue:number = 19;

  getColor() {
    return colors[this.colorValue-12];
  }

  setColor(color:number) {
    this.colorValue = color;
  }
}
