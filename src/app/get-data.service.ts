import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {data, kep} from './datainterface'
const url = "http://localhost:1337";

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  constructor() { }
  mydata:data[] = [];
  rickroll:boolean = false
  getData():Promise<AxiosResponse>{

    return axios.get('http://localhost:1337/api/munkaks?populate=*', {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    })

  }

  sortData(value:AxiosResponse){
    this.mydata = [];
    value.data.data.forEach((value: any) => {
      let kepek:kep[] = [];
      try {
        value.attributes.kepek.data.forEach((k:any)=>{
          let kepem:kep = {
            normal:url + k.attributes.formats.medium.url + "",
            high:url + k.attributes.formats.large.url + ""
          }
          kepek.push(kepem);
        })
      }catch (error){
        kepek.push({normal:"istenfaszaverjebele",high:"istenfaszaverjebele"})
      }

      let categ = "istenfaszaverjebele"
      try {
        categ = value.attributes.category.data.attributes.name;

      }catch (error){
        console.log("asdf")

        this.rickroll = true;
      }
      let d:data = {
        title: value.attributes.nev,
        description: value.attributes.leiras,
        category: categ,
        pictures: kepek
      }
      this.mydata.push(d);
      console.log(d);
    });
    return this.mydata;
  }


}
