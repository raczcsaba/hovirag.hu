import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {data, main, kep, contact} from './datainterface'
import { Item, kepItem } from './responseInterface'

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  constructor() { }

  url:string = "http://95.138.193.252:32018";
  rickroll:boolean = false;
  munka:number = 0

  getData(api:string):Promise<AxiosResponse>{
    return axios.get(this.url+api)
  }

  sortMunka(value:AxiosResponse){
    let mydata:data[] = [];
    value.data.data.forEach((value: Item) => {
      let categ = value.attributes?.category?.data?.attributes?.name;
      this.rickroll = !categ || this.rickroll;
      mydata.push({
        id:value.attributes.ids,
        title: value.attributes.nev,
        description: value.attributes.leiras,
        category: categ??' ',
        pictures: this.sortKepek(value.attributes.kepek.data)
      });
    });
    return mydata;
  }

  sortKepek(dat:kepItem[]){
    let kepek:kep[] = []
    if(!dat){
      dat = [{id:1,attributes:{url:'/uploads/sad_e74e398710.png',alternativeText:'noimg'}}];
    }
    dat.forEach((k:kepItem) => {
      kepek.push({
        alt:k.attributes.alternativeText,
        high:this.url + (k.attributes.url)
      })
    })
    return kepek;
  }

  sortData(value:AxiosResponse){
      return  {
        cim:value.data.data.attributes.cim,
        leiras:value.data.data.attributes.leiras,
        alcim:value.data.data.attributes.alcim,
        altartalom:value.data.data.attributes.altartalom,
        kep:value.data.data.attributes.kep.data.attributes.url,
        alt:value.data.data.attributes.kep.data.attributes.alternativeText,
        motto:value.data.data.attributes.rovidszoveg ?? " "
      };
  }

  sortContact(value:AxiosResponse){
    return  {
      nev:value.data.data.attributes.nev,
      email:value.data.data.attributes.email  ?? " ",
      tel:value.data.data.attributes.telefon  ?? " ",
      cegnev:value.data.data.attributes.cegnev  ?? " ",
      kep:value.data.data.attributes.profilkep.data.attributes.url,
      alt:value.data.data.attributes.profilkep.data.attributes.alternativeText,
      cegadat:value.data.data.attributes.cegadatok ?? " ",
      licencek:value.data.data.attributes.keplicencek ?? " "
    }
  }
}
