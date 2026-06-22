export interface Book {
  id: number;
  sku: string;
  title: string;
  author: string;
  genre: string;
  format: string;
  price: number;
  stock: number;
  blurb: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  tagline: string;
}

export interface Member {
  id: number;
  username: string;
  password: string;
  name: string;
}
