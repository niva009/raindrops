'use client';

import { usePopularProductsQuery } from '@framework/product/get-all-popular-products';
import SectionHeader from '@components/common/section-header';
import ProductCardAlpine from '@components/product/product-cards/product-card-medium';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { LIMITS } from '@framework/utils/limits';
import Alert from '@components/ui/alert';
import ProductFlashSaleCoral from '@components/product/product-cards/product-flash-sale-coral';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';

interface ProductFeedProps {
  lang: string;
  className?: string;
}

export default function PopularProductWithBestDeals({
  lang,
  className = '',
}: ProductFeedProps) {
  const { t } = useTranslation('common');
  const limit = LIMITS.POPULAR_PRODUCTS_TWO_LIMITS;
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: limit,
  });

  return (
    <div className={`-mt-2.5 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 ${className}`}>
      <SectionHeader
        sectionHeading="text-popular-product"
        sectionSubHeading="text-fresh-grocery-items"
        headingPosition="center"
        lang={lang}
      />
      {/* @ts-ignore */}
      <Element
        name="grid"
        className="grid-cols-7 gap-3 md:grid lg:grid-cols-5 2xl:grid-cols-7 lg:gap-5 xl:gap-7"
      >
        <div className="md:sticky md:top-20 lg:top-24 md:h-[600px] lg:h-[690px] 3xl:h-auto col-span-3 lg:col-span-2 mb-3 md:mb-0">
          <div className="h-auto overflow-hidden border-2 border-yellow-200 rounded-md 3xl:h-full shadow-card">
            <h2 className="bg-yellow-200 text-center font-bold text-brand-dark font-manrope p-2.5 text-15px lg:text-base">
              {t('text-deals-of-the-week')}
            </h2>
            <ProductFlashSaleCoral
              product={data?.[0]!}
              date={Date.now() + 4000000 * 60}
              lang={lang}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-4 gap-3 lg:col-span-3 2xl:col-span-5 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:gap-4 2xl:gap-5">
          {error ? (
            <Alert message={error?.message} className="col-span-full" />
          ) : isLoading ? (
            Array.from({ length: limit! }).map((_, idx) => (
              <ProductCardLoader
                key={`popular-product-${idx}`}
                uniqueKey={`popular-product-${idx}`}
              />
            ))
          ) : (
            data
              ?.slice(1, 11)
              ?.map((product: any) => (
                <ProductCardAlpine
                  key={`popular-product-${product.id}`}
                  product={product}
                  lang={lang}
                />
              ))
          )}
        </div>
      </Element>
    </div>
  );
}
