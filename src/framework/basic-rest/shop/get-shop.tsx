import { Shop } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import axios from 'axios';

export const fetchShop = async (_slug: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/vendor-product/${_slug}`);
  return data;
};
export const useShopQuery = (slug: string) => {
  return useQuery<Shop, Error>([API_ENDPOINTS.SHOP, slug], () =>
    fetchShop(slug)
  );
};
