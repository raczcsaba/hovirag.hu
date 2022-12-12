
  export interface Thumbnail {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
  }

  export interface Medium {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
  }

  export interface Small {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
  }

  export interface Large {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
  }

  export interface Formats {
    thumbnail: Thumbnail;
    medium: Medium;
    small: Small;
    large: Large;
  }

  export interface KepData {
    name?: string;
    alternativeText: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: Formats;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    url: string;
    previewUrl?: any;
    provider?: string;
    provider_metadata?: any;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface kepItem {
    id: number;
    attributes: KepData;
  }

  export interface Kepek {
    data: kepItem[];
  }

  export interface Attributes3 {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  }

  export interface Data {
    id: number;
    attributes: Attributes3;
  }

  export interface Category {
    data: Data;
  }

  export interface Attributes {
    nev: string;
    leiras: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    ids: number;
    kepek: Kepek;
    category: Category;
  }

  export interface Item {
    id: number;
    attributes: Attributes;
  }

  export interface Response {
    data: Item[];
  }


