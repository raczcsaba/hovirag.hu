export interface data {
  id:number;
  title: string;
  description: string;
  category: string,
  pictures: kep[] | undefined
}

export interface kep {
  alt:string,
  high:string
}

export interface main {
  cim:string,
  leiras:string,
  alcim:string,
  altartalom:string,
  kep:string,
  alt:string,
  motto:string
}

export interface contact {
  nev:string,
  email:string,
  tel:string,
  cegnev:string,
  cegadat:string,
  alt:string,
  kep:string,
  licencek:string
}
