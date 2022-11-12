import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {data, kep} from './datainterface'
import {Observable} from "rxjs";
const url = "http://localhost:1337";

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  constructor() { }
  mydata:data[] = [];

  getData():Promise<AxiosResponse>{
    return axios.get('http://localhost:1337/api/munkaks?populate=*')
  }

  sortData(value:AxiosResponse){
    this.mydata = [];
    value.data.data.forEach((value: any) => {
      let d:data = {
        title: value.attributes.nev,
        description: value.attributes.leiras,
        category: value.attributes.category.data.attributes.name,
        pictures: undefined
      }

      let kepek:kep[] = [];
      value.attributes.kepek.data.forEach((k:any)=>{
        let kepem:kep = {
          normal:url + k.attributes.formats.medium.url,
          high:url + k.attributes.formats.large.url
        }
        kepek.push(kepem);
      })
      d.pictures = kepek;
      this.mydata.push(d);
      console.log(d);
    });
    return this.mydata;
  }


}
