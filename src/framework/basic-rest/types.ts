import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image: Attachment;
  icon?: string;
  subcategories?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  [key: string]: unknown;
};
export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: string;
  salePrice:string;
  quantity: number;
  sold: number;
  unit: string;
  type:string;
  discount:string;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  image: Attachment;
  sku?: string;
  images?: Attachment[];
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  brand?: Brand;
  description?: string;
  variations?: object;
  variantIDs?:object;
  [key: string]: unknown;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};
export type Blog = {
  id: number | string;
  title: string;
  subTitle: string;
  shortDescription: string;
  authorName: string;
  date: {
    month: string;
    date: number;
    year: number;
  };
  totalWatchCount?: number;
  totalCommentCount?: number;
  titleTwo: string;
  category: string;
  image: string;
  sku?: string;
  content?: string;
  contentTwo?: string;
  contentThree?: string;
  quote: {
    content: string;
  };
  postList?: object;
  discount?: object;
  tags: {};
  comments?: object;
  [key: string]: unknown;
};
