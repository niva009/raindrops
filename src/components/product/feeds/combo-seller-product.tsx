'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { useComboSellerProduct } from '@framework/product/get-combo-seller-products';
import { LIMITS } from '@framework/utils/limits';
import { ROUTES } from '@utils/routes';
import {FC} from "react";

interface Props {
    lang: string;
    className?: string;
    variant?: string;
}
const BestSellerProductFeed: FC<Props> = ({
   lang,
   className,
}) => {
  const { data, isLoading, error } = useComboSellerProduct({
    limit: 15,
  });


  console.log("bestsellerproducts..:", data);

  
  return (
    <ProductsCarousel
      sectionHeading="Combo-offer-products"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
      lang={lang}
      className={className}
    />
  );
}
export default BestSellerProductFeed;
