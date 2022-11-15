export interface data {
  title: string;
  description: string;
  category: string,
  pictures: kep[] | undefined
}
export interface kep {
  normal?:string,
  high:string

}
export interface energetikai {
  cim:string,
  leiras:string,
  kep:string,
  alt:string,
}
export interface marka {
  cim:string,
  leiras:string,
  kep:string,
  alt:string
}
export interface fooldal {
  cim:string,
  leiras:string,
  alcim:string,
  altartalom:string,
  kep:string,
  alt:string,
  motto:string

}

