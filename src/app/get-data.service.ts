import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {data, main, kep, contact} from './datainterface'
import { Item, kepItem } from './responseInterface'

interface navbar {
  url: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})


export class GetDataService {

  constructor() { }


  LINKS: navbar[] = []

  url:string = "http://95.138.193.252:32018";
  rickroll:boolean = false;
  munka:number = 0

  getData(api:string):Promise<AxiosResponse>{
    return axios.get(this.url+api)
  }

  navSet(){
    this.getData("/api/fooldals").then(value => {
      let length = this.getLength(value)
      if (length>2){
        this.LINKS = [
          {url: '/page1', title: value.data.data?.[1].attributes.navcim},
          {url: '/page2', title: value.data.data?.[2].attributes.navcim},
          {url: '/munkak', title: 'Hőszivattyú'},
          {url: '/munkak', title: 'Klímatechnika'},
          {url: '/munkak', title: 'Hűtéstechnika'},
          {url: '/kapcsolat', title: 'Kapcsolat'},
        ]
      }
      else if (length>1){
        this.LINKS = [
          {url: '/page1', title: value.data.data?.[1].attributes.navcim},
          {url: '/munkak', title: 'Hőszivattyú'},
          {url: '/munkak', title: 'Klímatechnika'},
          {url: '/munkak', title: 'Hűtéstechnika'},
          {url: '/kapcsolat', title: 'Kapcsolat'},
        ]
      }
      else if (length == 1){
        this.LINKS = [
          {url: '/munkak', title: 'Hőszivattyú'},
          {url: '/munkak', title: 'Klímatechnika'},
          {url: '/munkak', title: 'Hűtéstechnika'},
          {url: '/kapcsolat', title: 'Kapcsolat'},
        ]
      }
    })
  }

  getLength(value:AxiosResponse){
    return value.data.meta.pagination.total;
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
