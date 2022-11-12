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
