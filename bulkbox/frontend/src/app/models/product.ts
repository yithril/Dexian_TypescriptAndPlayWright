export interface Product {
  id: number;
  model: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  stock: number;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  subcategories: string[];
}

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}
