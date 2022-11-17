import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {data, main, kep, contact} from './datainterface'

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  constructor() { }

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
    let mydata:data[] = [];
    value.data.data.forEach((value: any) => {
      let categ = value.attributes.category.data?value.attributes.category.data.attributes.name:" "
      this.rickroll = categ == " " || this.rickroll;
      let d:data = {
        id:value.attributes.ids,
        title: value.attributes.nev,
        description: value.attributes.leiras,
        category: categ,
        pictures: this.sortKepek(value.attributes.kepek.data??[])
      }
      mydata.push(d);
    });
    return mydata;
  }

  sortKepek(dat:any){
    let kepek:kep[] = dat[0] ? [] : [{alt:"hovirag.hu",high:"istenfaszaverjebele"}];
    if (dat.length==1){
      kepek = [{
        alt:this.url + dat[0].attributes.alternativeText,
        high:this.url + dat[0].attributes.url
      }]
    }
    else {
      dat.forEach( (k:any) => {
        let kepem:kep = {
          alt:this.url + k.attributes.alternativeText??"hovirag.hu",
          high:this.url + k.attributes.url??"istenfaszaverjebele"
        }
        kepek.push(kepem);
      })
    }
    return kepek
  }

  sortData(value:AxiosResponse){

      let main: main = {
        cim:value.data.data.attributes.cim,
        leiras:value.data.data.attributes.leiras  ?? " ",
        alcim:value.data.data.attributes.alcim  ?? " ",
        altartalom:value.data.data.attributes.altartalom  ?? " ",
        kep:value.data.data.attributes.kep.data.attributes.url ?? "../../assets/img/sad.png",
        alt:value.data.data.attributes.kep.data.attributes.alternativeText ?? " ",
        motto:value.data.data.attributes.rovidszoveg ?? " "

      };
      return main
  }

  sortContact(value:AxiosResponse){
    let cont: contact = {
      nev:value.data.data.attributes.nev  ?? " ",
      email:value.data.data.attributes.email  ?? " ",
      tel:value.data.data.attributes.telefon  ?? " ",
      cegnev:value.data.data.attributes.cegnev  ?? " ",
      kep:value.data.data.attributes.profilkep.data.attributes.url ?? "../../assets/img/sad.png",
      alt:value.data.data.attributes.profilkep.data.attributes.alternativeText ?? " ",
      cegadat:value.data.data.attributes.cegadatok ?? " ",
      licencek:value.data.data.attributes.keplicencek ?? " "
    };
    return cont
  }
}
