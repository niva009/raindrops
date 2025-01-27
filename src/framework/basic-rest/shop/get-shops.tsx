import { Shop } from '@framework/types';
import axios from 'axios';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchShops = async ({ queryKey }: any) => {
  const [_key, { latitude, longitude }] = queryKey;


  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/location-vendors`, {
    params: { latitude, longitude }, 
  });

  console.log("Shops Details Response:", data);

  return { shop: { data } };
};


export const useShopsQuery = (latitude: number | null, longitude: number | null) => {
  return useQuery<{ shop: { data: Shop[] } }, Error>(
    [API_ENDPOINTS.SHOPS, { latitude, longitude }],
    fetchShops
    // {
    //   enabled: !!latitude && !!longitude, 
    // }
  );
};
