export interface Product {
  _id: string;
  title: string;
  price: string;
  rating?: string;
  image?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScrapeResponse {
  count: number;
  data: Product[];
}
