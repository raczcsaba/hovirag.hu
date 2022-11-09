import {Component, HostListener, OnInit} from '@angular/core';

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
    { url: '', title: 'Főpldal' },
    { url: '/energetikai', title: 'Energetikai Tanusítás' },
    { url: '/klimatechnika', title: 'Klímatechnika' },
    { url: '/hutestechnika', title: 'Hűtéstechnika' },
    { url: '/kapcsolat', title: 'Kapcsolat' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
    console.log(this.isSticky + " " + window.pageYOffset)
  }
}
