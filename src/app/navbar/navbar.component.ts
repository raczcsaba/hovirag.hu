import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { PagecolorService } from  '../pagecolor.service'

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


  constructor(public colorService: PagecolorService) {
  }

  @ViewChild('matslider') slider: any;

  ngOnInit(): void {
    this.colorService.start();
    setTimeout(() => {
      this.slider.value = this.colorService.colorValue
    },0)

  }

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


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    this.klima = false;
  }

  alttogle() {
    this.klima = false;
    if (this.navbarOpen) {
      this.navbarOpen = false;
    }
  }

  //klima cuccok
  setColor(value:number){
    this.colorService.setColor(value)

  }

  clima() {
    this.klima = !this.klima;
  }

  getbg(value: number) {
    if(value>20){
      return 'url("../../assets/img/bghot.png")'
    }
    return "url('../../assets/img/bgcold.png')"
  }

  getOppacity(value: number,i:number) {
    if (i==2){
      return value>33 ? 99 : value <= 17 ? 0 : (value - 11) * 4;
    }
    else if (i==1){
      return value<13 ? 99 : value > 29 ? 0 : (35 - value) * 4;

    }else {
      return 0;
    }
  }

  getColor(i: number) {
    return i==2?'rgba(255, 69, 0,0.':i==1?'rgb(95, 158, 160,0.':'rgba(0,0,0,0.';
  }

  setSlider(i: number) {
    if (this.slider.value>12&&i==1){
      this.slider.value = 12
      this.klima = true
      this.colorService.setColor(12);
    }else if (this.slider.value<34&&i==2){
      this.slider.value = 34
      this.klima = true
      this.colorService.setColor(34);
    }
  }
}
