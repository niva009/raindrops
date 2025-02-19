'use client';

import OrderTable from '@components/order/order-table';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function OrdersPageContent({ lang }: { lang: string }) {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially true to show loading state

  const fetchOrders = async () => {
    setIsLoading(true);
    
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user-orders`, {
        headers: {
          Authorization: token ? `${token}` : '',
        },
      });

      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log('Order information:', orders);

  return (
    <>
      {!isLoading ? (
        <OrderTable orders={orders?.data} lang={lang} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
