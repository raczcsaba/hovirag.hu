import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

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
    { url: '/energetikai', title: 'Energetikai Tanusítás' },
    { url: '/klimatechnika', title: 'Klímatechnika' },
    { url: '/hutestechnika', title: 'Hűtéstechnika' },
    { url: '/kapcsolat', title: 'Kapcsolat' },
  ]
  colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];


  constructor() { }

  ngOnInit(): void {
  }

  //navcuccok
  navbarfixed:boolean = false;
  @ViewChild('toppic')toppic: any; //Elementreffet nemértem :(
  height:number=10;
  @HostListener('window:scroll',['$event']) onscroll(){
    this.height = this.toppic.nativeElement.offsetHeight * 0.5
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
  clima() {
    this.klima = !this.klima;
  }

}
