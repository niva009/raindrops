import { QueryOptionsType } from '@framework/types';
import axios from 'axios';

const fetchOrders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  // Retrieve the token inside the function to get the latest value
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user-orders`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );

    console.log('Data from orders:', data);
    return { data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

// Hook for using the query
const useOrdersQuery = (options: QueryOptionsType) => {
  return fetchOrders;
};

export { fetchOrders, useOrdersQuery };
