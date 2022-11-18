import { Component, OnInit } from '@angular/core';
import {PagecolorService} from "../pagecolor.service";
import {GetDataService} from "../get-data.service";
import {contact} from "../datainterface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-kapcsolat',
  templateUrl: './kapcsolat.component.html',
  styleUrls: ['./kapcsolat.component.sass']
})
export class KapcsolatComponent implements OnInit {

  constructor(public colorService:PagecolorService, public dataservice: GetDataService, private router: Router) { }

  mydata:contact = {nev:" ", kep:" ", cegadat:" ", alt :" ", licencek:" ", cegnev:" ", tel:" ", email: " "}

  ngOnInit(): void {
    this.dataservice.getData('/api/elerhetosegs/1?populate=*').then((dat) => {
      this.mydata = this.dataservice.sortContact(dat)
    })
    .catch(error => {
      this.router.navigate(['/', 'error']);
    })
  }
}
