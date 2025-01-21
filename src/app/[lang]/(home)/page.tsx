'use client';

import Container from '@components/ui/container';
import HeroSliderBlock from '@components/hero/hero-slider-block';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
    homeGridSlider as gridSlider,
    homeGridHero as gridHero,
    homeGridHero2 as gridHero2,
} from '@framework/static/banner';
import BannerGrid from "@components/common/banner-grid";
import CategoryGridBlock from "@components/common/category-grid-block";
import ProductWithBestDeals from "@components/product/product-with-best-deals";
import ListingTabsElectronicFeed from '@components/product/feeds/listingtabs-electronic-feed';
import LatestblogCarousel from '@components/common/latestblog-carousel';

export default function Page({
    params: { lang },
}: {
    params: {
        lang: string;
    };
}) {
    const [sliderBanner, setSliderBanner] = useState<any[]>([]);

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

    useEffect(() => {
        fetchBanner();
    }, []); // Empty dependency array to run this only on mount

    return (
        <>
            <Container>
                <div className="grid grid-cols-1 xl:grid-cols-1 w-full">
                    {/* HeroSliderBlock now uses sliderBanner instead of heroSlider */}
                    <HeroSliderBlock
                        heroBanner={sliderBanner} // Use dynamic data from API
                        showHeroContent={true}
                        className="w-full mb-5 xl:mb-12"
                        contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 md:min-h-[270px] xl:min-h-[375px] rounded"
                        lang={lang}
                    />
                </div>

                <CategoryGridBlock lang={lang} className="mb-8 lg:mb-12" />
            </Container>
            <div className={'bg-zinc-100 py-10 sm:py-14'}>
                <Container>
                    <ProductWithBestDeals lang={lang} className={'navSlider'} />
                    <BestSellerProductFeed lang={lang} className="mb-8 lg:mb-15" />
                    <BannerGrid
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
                    <LatestblogCarousel lang={lang} />
                </Container>
            </div>
        </>
    );
}
