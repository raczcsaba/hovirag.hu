import {Component, ElementRef, HostListener, Input, OnInit, SimpleChange, ViewChild} from '@angular/core';
import { PagecolorService } from  '../pagecolor.service'
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {GetDataService} from "../get-data.service";

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

  LINKS: navbar[] = this.dataService.LINKS
  toggleNavLinks = false
  colors: string[] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo', 'twentythree'];
  activeUrl?:string;
  acmode = "acauto.png"
  selected = 'option1';

  constructor(public colorService: PagecolorService,private router: Router, private dataService: GetDataService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeUrl = router.url;
    });
  }

  //slider object
  @ViewChild('matslider') slider: any;

  //click event
  @Input() data: any;

  //Navbar scroll animation
  navbarfixed:boolean = false;
  @ViewChild('toppic')toppic?: ElementRef;
  height:number=10;

  @HostListener('window:scroll',['$event']) onscroll(){
    this.height = this.toppic?.nativeElement.offsetHeight * 0.3
    if(window.scrollY > this.height)
    {
      this.navbarfixed = true;
    }
    else
    {
      this.navbarfixed = false;
    }
  }

  //Responsive, small device
  navbarOpen = false;
  klima = false
  toggletime = false;

  ngOnInit(): void {
    this.navSet()
    setTimeout(() => {
      this.slider.value = this.colorService.colorValue;
      this.acmode = this.colorService.acMode;
      switch (this.acmode){
        case 'acheat.png':
          this.selected = "option2"
          return;
        case 'accool.png':
          if (this.slider.value==12){
            this.selected="option4";
          }
          else{
            this.selected="option3";
          }
          return;
        case 'acauto.png':
          this.selected = "option1"
          return;
      }
    },0)
  }

  //onclick event from input
  ngOnChanges() {
    this.closeToggle()
  }


  navSet(){
    this.dataService.getData("/api/fooldals").then(value => {
      let length = this.dataService.getLength(value)
      if (length>2){
        this.LINKS = [
          {url: '/page1', title: value.data.data?.[1].attributes.navcim},
          {url: '/page2', title: value.data.data?.[2].attributes.navcim},
          {url: '/munkak', title: 'Hőszivattyú'},
          {url: '/munkak', title: 'Klímatechnika'},
          {url: '/munkak', title: 'Hűtéstechnika'},
          {url: '/kapcsolat', title: 'Kapcsolat'},
        ]
      }
      else if (length>1){
        this.LINKS = [
          {url: '/page1', title: value.data.data?.[1].attributes.navcim},
          {url: '/munkak', title: 'Hőszivattyú'},
          {url: '/munkak', title: 'Klímatechnika'},
          {url: '/munkak', title: 'Hűtéstechnika'},
          {url: '/kapcsolat', title: 'Kapcsolat'},
        ]

      }
      else if (length == 1){
        this.LINKS = [
          {url: '/munkak', title: 'Hőszivattyú'},
          {url: '/munkak', title: 'Klímatechnika'},
          {url: '/munkak', title: 'Hűtéstechnika'},
          {url: '/kapcsolat', title: 'Kapcsolat'},
        ]
      }
    })
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
    this.navbarOpen = false
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

  //Color settings
  setColor(value:number){
    this.colorService.setColor(value)
    if (value==12){
      this.selected = 'option4'
      this.acmode="accool.png"
      this.colorService.setAc(this.acmode)
    }else if (value==34){
      this.selected = 'option3'
      this.acmode="accool.png"
      this.colorService.setAc(this.acmode)
    }else{
      this.acmode = 'acauto.png'
      this.colorService.setAc(this.acmode)

      this.selected = 'option1'
    }
  }

  getOppacity(value: number,i:number) {
    switch (this.activeUrl){
      case "/":return i==5? 30 : 0
      case "/page1":return i==0? 30 : 0
      case "/page2":return i==7? 30 : 0
      case "/kapcsolat":return i==4? 30 : 0
      case "/munkak":
        if (i==2){
          return value>33 ? 99 : value <= 17 ? 0 : (value - 11) * 4;
        }
        else if (i==1){
          return value<13 ? 99 : value > 29 ? 0 : (35 - value) * 4;
        }
        else if (i==6) {
          return 30;
        }
        else {
          return 0
        }
      default: return 0
    }
  }

  getColor(i: number) {
    return i == 2 ? 'rgba(255, 69, 0,0.' : i == 1 ? 'rgb(95, 158, 160,0.' : 'rgba(254,254,254,0.';
  }

  selectMunka(number: number) {
    if (number == 0){
      this.acmode='acauto.png'
      this.colorService.setAc(this.acmode)
      this.slider.value = 26
      this.setColor(26);
    }
    else if (number == 1){
      this.acmode='acheat.png'
      this.colorService.setAc(this.acmode)
    }else {
      this.acmode='accool.png'
      this.colorService.setAc(this.acmode)
      this.setSlider(number==2?2:1)
    }
  }

  changeMode() {
    if (this.acmode == "acheat.png"){
      this.acmode = "acauto.png"
      this.colorService.setAc(this.acmode)
      this.slider.value = 26;
      this.setColor(26)

      this.selected = "option1"
    }else if (this.acmode == "acauto.png"){
      this.selected = "option3"
      this.slider.value = 12;
      this.setColor(12)
      this.acmode = "accool.png"
      this.colorService.setAc(this.acmode)
    }else {
      this.slider.value = 26;
      this.setColor(26)
      this.selected = "option2"
      this.acmode = "acheat.png"
      this.colorService.setAc(this.acmode)
    }
  }
}
