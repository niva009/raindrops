'use client';

import VendorCard from '@components/cards/vendor-card';
import Alert from '@components/ui/alert';
import { useTranslation } from 'src/app/i18n/client';
import Heading from '@components/ui/heading';
import Container from '@components/ui/container';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

const ShopsPageContent: React.FC<{ lang: string }> = ({ lang }) => {

  const [shops, setShops] = useState<any[]>([]);


  const fetchShops = async () => {
    try {
        const location = localStorage.getItem("location");

        if (location) {
            const parsedLocation = JSON.parse(location);
            const { latitude, longitude } = parsedLocation;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            // Construct the form data
            const formData = new URLSearchParams();
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/location-vendors`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: formData.toString()
                }
            );

            if (response.ok) {
                
                const shopList = await response.json();

                setShops(shopList?.data);
            } else {
                console.log(`Failed to fetch shops: ${response.statusText}`);
            }
        } else {
            console.log("Location not provided");
        }
    } catch (error) {
        console.error("Error fetching vendors:", error);
    }
};

useEffect(() =>{
  fetchShops();
},[])

  return (
    <div className=" pb-14 lg:pb-16 xl:pb-20 pt-14">
        <Container>
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          shops
        </Heading>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 xl:gap-6">
          {shops.map((item) => (
            <VendorCard key={item._id} shop={item} lang={lang} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ShopsPageContent;
