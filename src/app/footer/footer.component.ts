import { Component, OnInit } from '@angular/core';
import { PagecolorService } from  '../pagecolor.service'
import {GetDataService} from "../get-data.service";
import {contact} from "../datainterface";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor(public colorService:PagecolorService, public dataservice: GetDataService) { }

  mydata:contact = {nev:" ", kep:" ", cegadat:" ", alt :" ", licencek:" ", cegnev:" ", tel:" ", email: " "}

  ngOnInit(): void {
    this.dataservice.getData('/api/elerhetosegs/1?populate=*').then((dat) => {
      if(dat.status == 200) {
        this.mydata = this.dataservice.sortContact(dat)

      }
    })
  }

}
