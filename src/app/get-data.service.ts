import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {data, fooldal, kep, energetikai, marka} from './datainterface'

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  constructor() { }
  mydata:data[] = [];
  url:string = "http://localhost:1337";
  rickroll:boolean = false
  getData(api:string):Promise<AxiosResponse>{

    return axios.get(this.url+api, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    })

  }


  sortMunka(value:AxiosResponse){
    this.mydata = [];
    value.data.data.forEach((value: any) => {
      let kepek:kep[] = [];
      try {
        value.attributes.kepek.data.forEach((k:any)=>{
          let kepem:kep = {
            normal:this.url + k.attributes.formats.medium.url + "",
            high:this.url + k.attributes.formats.large.url + ""
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

  sortMain(value:AxiosResponse){

      let main: fooldal = {
        cim:value.data.data.attributes.cim,
        leiras:value.data.data.attributes.leiras,
        alcim:value.data.data.attributes.alcim,
        altartalom:value.data.data.attributes.altartalom,
        kep:value.data.data.attributes.kep.data.attributes.url,
        alt:value.data.data.attributes.kep.data.attributes.alternativeText,
        motto:value.data.data.attributes.motto

      };
      return main
  }

  sortEnergia(value:AxiosResponse){
    let energ: energetikai = {
      cim:value.data.data.attributes.cim,
      leiras:value.data.data.attributes.leiras,
      kep:value.data.data.attributes.kep.data.attributes.url,
      alt:value.data.data.attributes.kep.data.attributes.alternativeText,
    };
    return energ

  }
  sortMarka(value:AxiosResponse){
    let mark: energetikai = {
      cim:value.data.data.attributes.cim,
      leiras:value.data.data.attributes.leiras,
      kep:value.data.data.attributes.kep.data.attributes.url,
      alt:value.data.data.attributes.kep.data.attributes.alternativeText,
    };
    return mark

  }
}
