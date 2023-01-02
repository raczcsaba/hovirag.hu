import { Component,OnInit } from '@angular/core';
import { PagecolorService } from  './pagecolor.service'
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{

  constructor(public colorservice:PagecolorService, private metaTagService: Meta) {}

  title = 'hovirag';

  pic:string = "";
  public click = true

  ngOnInit() {
    this.colorservice.currentMessage.subscribe(message =>{
      this.pic = this.getbg(message);
    })
    this.colorservice.start();
    setTimeout(() => {
      this.pic = this.getbg(this.colorservice.colorValue);
    },0)
  }

  clickEvent(){
    this.click = !this.click;
  }

  getbg(value: number) {
    if(value>20){
      return 'url("../../assets/img/bgnewhot.jpg")'
    }
    return "url('../../assets/img/bgnewcold.jpg')"
  }
}
