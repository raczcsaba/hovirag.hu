import {Component, HostListener, Input, OnInit, SimpleChange, ViewChild} from '@angular/core';
import { PagecolorService } from  '../pagecolor.service'
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

interface navbar {
  url: string;
  title: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})


export class NavbarComponent implements OnInit {

  LINKS: navbar[] = [
    {url: '/energetikai', title: 'Energetikai Tanusítás'},
    {url: '/munkak', title: 'Hűtéstechnika'},
    {url: '/munkak', title: 'Klímatechnika'},
    {url: '/kapcsolat', title: 'Kapcsolat'},
  ]
  colors: string[] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo', 'twentythree'];
  activeUrl?:string;

  constructor(public colorService: PagecolorService,private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeUrl = router.url;
    });
  }

  //slider object
  @ViewChild('matslider') slider: any;

  //kattintás event
  @Input() data: any;

  //navcuccok
  navbarfixed:boolean = false;
  @ViewChild('toppic')toppic: any; //Elementreffet nemértem :(
  height:number=10;
  @HostListener('window:scroll',['$event']) onscroll(){
    this.height = this.toppic.nativeElement.offsetHeight * 0.7
    if(window.scrollY > this.height)
    {
      this.navbarfixed = true;
    }
    else
    {
      this.navbarfixed = false;
    }
  }

  //responsive cuccok
  navbarOpen = false;
  klima = false
  toggletime = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.slider.value = this.colorService.colorValue;
    },0)
  }

  //navbar és klíma slider interaktív eseménykezelés
  ngOnChanges() {
    this.closeToggle()
  }

  toggleNavbar() {
    this.toggletime = true
    setTimeout(() => {
      this.navbarOpen = true;
      this.toggletime = false
    },0)
  }

  clima() {
    this.toggletime = true
    setTimeout(() => {
      this.klima = true
      this.toggletime = false
    },0)
  }

  setSlider(i: number) {
    this.toggletime = true;
    setTimeout(() => {
      if (this.slider.value>12&&i==1){
        this.klima = true
        setTimeout(() => {
          this.slider.value = 12
          this.colorService.setColor(12);
        },50)
      }else if (this.slider.value<34&&i==2){
        this.klima = true
        setTimeout(() => {
          this.slider.value = 34
          this.colorService.setColor(34);
        },50)
      }
      this.toggletime = false
    },0)
  }

  closeToggle(){
    if (!this.toggletime){
      this.klima = false;
      this.navbarOpen = false;
    }
}

  //klima/szin cuccok
  setColor(value:number){
    this.colorService.setColor(value)
  }

  getbg(value: number) {
    if(value>20){
      return 'url("../../assets/img/bghot.png")'
    }
    return "url('../../assets/img/bgcold.png')"
  }

  getOppacity(value: number,i:number) {
    switch (this.activeUrl){
      case "/":return i==4? 30 : 0
      case "/energetikai":return i==0? 30 : 0
      case "/kapcsolat":return i==3? 30 : 0
      case "/munkak":
        if (i==2){
          return value>33 ? 99 : value <= 17 ? 0 : (value - 11) * 4;
        }
        else if (i==1){
          return value<13 ? 99 : value > 29 ? 0 : (35 - value) * 4;
        }
        else {
          return 0;
        }
      default: return 0
    }
  }

  getColor(i: number) {
    return i==2?'rgba(255, 69, 0,0.':i==1?'rgb(95, 158, 160,0.':'rgba(254,254,254,0.';
  }

}
