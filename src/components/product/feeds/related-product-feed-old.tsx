'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { LIMITS } from '@framework/utils/limits';

interface RelatedProductsProps {
  lang: string;
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductFeedOld: React.FC<RelatedProductsProps> = ({
  lang,
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading="FRESH PRODUCTS"
      categorySlug="/search"
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
      lang={lang}
    />
  );
};

export default RelatedProductFeedOld;
