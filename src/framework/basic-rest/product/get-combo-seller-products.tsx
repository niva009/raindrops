'use client';
import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchCombosellerProduct = async () => {
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

      if (!response.ok) {
        console.error(`Failed to fetch products: ${response.statusText}`);
        return [];
      }

      const productsData = await response.json();
      console.log("API Response combo:", productsData);

      if (productsData?.products && Array.isArray(productsData.products)) {
        const filteredProducts = productsData.products.filter(
          (product: Product) => product.type === "combo"
        );

        console.log("Filtered Combo Products:", filteredProducts); 
        return filteredProducts;
      }

      return [];
    } else {
      console.warn('Location not provided');
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const useComboSellerProduct = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.BEST_SELLER_PRODUCTS, options], 
    fetchCombosellerProduct,
    {
      onError: (error) => {
        console.error('Error in useComboSellerProduct:', error);
      },
    }
  );
};
