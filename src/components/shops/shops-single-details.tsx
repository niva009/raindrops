'use client';

import { useShopQuery } from '@framework/shop/get-shop';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useUI } from '@contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { Element } from 'react-scroll';
import Container from '@components/ui/container';
import { Drawer } from '@components/common/drawer/drawer';
import ShopSidebar from '@components/shops/shop-sidebar';
import ShopSidebarDrawer from '@components/shops/shop-sidebar-drawer';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import useWindowSize from '@utils/use-window-size';
import motionProps from '@components/common/drawer/motion';
import { useTranslation } from 'src/app/i18n/client';
import React, { useState} from 'react';
import vendorimage from '../../assets/placeholders/fresss.jpeg'


export default function ShopsSingleDetails({ lang }: { lang: string }) {
    const { t } = useTranslation(lang, 'common');
    const pathname = useParams();
    const { slug } = pathname;
    const { data, isLoading } = useShopQuery(slug as string);
    const { openShop, displayShop, closeShop } = useUI();
    const { width } = useWindowSize();
    const dir = getDirection(lang);
    const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
    const productData = data?.data;

    if (isLoading) return <p>Loading...</p>;


    console.log("shop query ", data);
    console.log("prodcut", productData)
  



    return (
        <>

            <div className="flex items-center px-4 py-4 border-b lg:hidden md:px-6 border-border-base mb-7 bg-white">
                <div className="flex shrink-0">
                    <Image
                        src={data?.image ?`http://localhost:5555/${data?.image}`: vendorimage}
                        alt={`${data?.company_name}`}
                        width={66}
                        height={66}
                        className="rounded-md"
                        style={{ width: 'auto' }}
                    />
                </div>
                <div className="ltr:pl-4 rtl:pr-4">
                    <h2 className="font-semibold text-brand-dark text-15px">
                        {data?.company_name}
                    </h2>
                    <button
                        className="block text-sm font-medium transition-all text-brand hover:text-brand-muted"
                        onClick={openShop}
                    >MoreInfo
                        {t('')}
                    </button>
                </div>
            </div>
            <Container>
                {/* @ts-ignore */}
                <Element
                    name="grid"
                    className="flex flex-col pb-16 lg:flex-row lg:pt-8 lg:pb-20"
                >
                    <div className="shrink-0 hidden lg:block lg:w-80 xl:w-[350px] 2xl:w-96 lg:sticky lg:top-20 category-mobile-sidebar">
                        <div className=" bg-white rounded shadow-vendorSidebar ">
                            <ShopSidebar data={data} lang={lang} />
                        </div>
                    </div>

                    <div className="w-full lg:ltr:pl-7 lg:rtl:pr-7">
                        <AllProductFeed data={data} lang={lang} />
                    </div>
                </Element>
            </Container>
            {/*TODO: multiple drawer uses throughout the app is a bad practice */}
            <Drawer
                placement={dir === 'rtl' ? 'right' : 'left'}
                open={displayShop}
                onClose={closeShop}
                // @ts-ignore
                level={null}
                contentWrapperStyle={contentWrapperCSS}
                {...motionProps}
            >
                <ShopSidebarDrawer data={data} lang={lang} />
            </Drawer>
        </>
    );
}
