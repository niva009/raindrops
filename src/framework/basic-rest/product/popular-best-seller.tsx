'use client';
import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchPopularProducts = async () => {
  try {
    const location = localStorage.getItem('location');

    if (location) {
      const parsedLocation = JSON.parse(location);
      const { latitude, longitude } = parsedLocation;

      // Construct the form data
      const formData = new URLSearchParams();
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/location-products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        }
      );

      if (response.ok) {
        const products = await response.json();
        return products?.products.reverse();
      } else {
        console.error(`Failed to fetch products: ${response.statusText}`);
        return [];
      }
    } else {
      console.warn('Location not provided');
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const usePopularProducts = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.BEST_SELLER_PRODUCTS, options],
    fetchPopularProducts,
    {

      onError: (error) => {
        console.error('Error in useBestSellerProductsQuery:', error);
      },
    }
  );
};
