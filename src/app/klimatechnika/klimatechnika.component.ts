import { Component, OnInit } from '@angular/core';
import { GetDataService } from  '../get-data.service'
import { data } from '../datainterface'


@Component({
  selector: 'app-klimatechnika',
  templateUrl: './klimatechnika.component.html',
  styleUrls: ['./klimatechnika.component.sass']
})


export class KlimatechnikaComponent implements OnInit {
  mydata?: data[] = [];

  constructor(public dataservice:GetDataService) { }

  ngOnInit(): void {
    this.dataservice.getData().then((dat) => this.mydata = this.dataservice.sortData(dat))

  }

}
