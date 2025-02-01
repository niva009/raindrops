import { Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import axios from 'axios';

export const fetchProduct = async (_slug: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/product/${_slug}`);
  return data.data;
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, slug], () =>
    fetchProduct(slug)
  );
};
