'use client';

import Container from '@components/ui/container';
import HeroSliderBlock from '@components/hero/hero-slider-block';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
    homeGridHero as gridHero,
    homeGridHero2 as gridHero2,
} from '@framework/static/banner';
import BannerGrid from "@components/common/banner-grid";
import CategoryGridBlock from "@components/common/category-grid-block";
import ProductWithBestDeals from "@components/product/product-with-best-deals";
import ListingTabsElectronicFeed from '@components/product/feeds/listingtabs-electronic-feed';
import LatestblogCarousel from '@components/common/latestblog-carousel';
import Modal from 'react-modal';
import { FaLocationDot } from "react-icons/fa6";
import VendorCard from '@components/cards/vendor-card';


export default function Page({
    params: { lang },
}: {
    params: {
        lang: string;
    };
}) {
    const [sliderBanner, setSliderBanner] = useState<any[]>([]);
    const [shops, setShops] = useState<any[]>([]);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const fetchBanner = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/viewbanner`);
            if (response.status === 200) {
                console.log("response banner", response?.data?.data);
                setSliderBanner(response.data?.data || []);
            }
        } catch (error) {
            console.error("Error fetching banner", error);
        }
    };


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
                    const limitData = shopList.data.slice(0,6);
                    setShops(limitData);
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
},[]);

console.log("shops list.,", shops);
    

    useEffect(() => {
        fetchBanner();
        if (typeof window !== "undefined") {
            const status = localStorage.getItem("status");
            if (status !== "true") {
                setIsModalOpen(true); // Open modal if status is not "true"
            }
        }
    }, []);

    const handleAllowLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userLocation = {latitude, longitude}
                    setLocation(userLocation);

                    // Save to localStorage
                    localStorage.setItem("location",  JSON.stringify(userLocation));
                    localStorage.setItem("status", "true");

                    // Close modal
                    setIsModalOpen(false);
                },
                (error) => {
                    console.error("Error fetching location", error);
                    alert("Unable to access location. Please allow location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };


    console.log("location cords", location);

    return (
        <>
            <Container>
                {/* Modal */}
                <Modal
    isOpen={isModalOpen}
    contentLabel="Location Request Modal"
    ariaHideApp={false}
    shouldCloseOnOverlayClick={false} 
    shouldCloseOnEsc={false} 
    style={{
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000, // this for make modal above all content
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1001, // Ensures modal content is above overlay
        },
    }}
>
    <h2 style={{ marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }}>
        Please Allow Location Access
    </h2>
    <p style={{ marginBottom: '20px', fontSize: '16px', color: '#555' }}>
    We need your location to better display relevant products and stores near you.
    </p>
    <button
        onClick={handleAllowLocation}
        style={{
          backgroundColor: '#28837a',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto'
        }}
      >
         <FaLocationDot style={{ marginRight: '8px' }} />
        Allow Location
    </button>
</Modal>

                <div className="grid grid-cols-1 xl:grid-cols-1 w-full">
                    <HeroSliderBlock
                        heroBanner={sliderBanner}
                        showHeroContent={true}
                        className="w-full mb-5 xl:mb-12"
                        contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 md:min-h-[270px] xl:min-h-[375px] rounded"
                        lang={lang}
                    />
                </div>

                <BannerGrid
                    lang={lang}
                    data={gridHero2}
                    grid={3}
                    className="mb-8 mt-5 lg:mb-15"
                />
            </Container>
            <Container>
                <h3 style={{ fontWeight: "bolder", color: "black", fontSize: "26px" }}>
                    Product Category
                </h3>
                <CategoryGridBlock lang={lang} className="mb-8 mt-8 lg:mb-12" variant={''} />
            </Container>
            <div className={'bg-zinc-100 py-10 sm:py-14'}>
                <Container>
                    {/* <ProductWithBestDeals lang={lang} className={'navSlider'} /> */}

                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 xl:gap-6 mb-10">
          {shops.map((item) => (
            <VendorCard key={item._id} shop={item} lang={lang} />
          ))}
        </div>

                    <BestSellerProductFeed lang={lang} className="mb-8 lg:mb-15" /> 
                    {/* <BannerGrid
                        lang={lang}
                        data={gridHero}
                        grid={1}
                        className="mb-8 lg:mb-15"
                    />
                    <ListingTabsElectronicFeed lang={lang} colSiderbar={false} />
                    <BannerGrid
                        lang={lang}
                        data={gridHero2}
                        grid={3}
                        className="mb-8 lg:mb-15"
                    />
                    <PopularProductFeed lang={lang} className="mb-8 lg:mb-15" />
                    <LatestblogCarousel lang={lang} />  */}
                </Container>
            </div>
        </>
    );
}
