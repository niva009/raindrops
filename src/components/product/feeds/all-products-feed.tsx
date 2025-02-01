'use client';

import { Fragment } from 'react';
import ProductCardAlpine from '@components/product/product-cards/product-card';
import type { FC } from 'react';
import { useProductsQuery } from '@framework/product/get-all-products';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import SectionHeader from '@components/common/section-header';
import { useModalAction } from '@components/common/modal/modal.context';
import slice from 'lodash/slice';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useTranslation } from 'src/app/i18n/client';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
interface ProductFeedProps {
  lang: string;
  element?: any;
  className?: string;
  data?: any;
}
const AllProductFeed: FC<ProductFeedProps> = ({
  lang,
  element,
  data,
  className = '',
}) => {
  const { t } = useTranslation(lang, 'common');


  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    error,
  } = useProductsQuery({
    limit: LIMITS.PRODUCTS_LIMITS,
  });

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }

  console.log("1234", data);

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader
          sectionHeading="All Products"
          className="mb-0"
          lang={lang}
        />
        <div
          className="lg:hidden transition-all text-brand -mt-1.5 font-semibold text-sm md:text-15px hover:text-brand-dark"
          role="button"
          onClick={handleCategoryPopup}
        >
          {t('text-categories')}
        </div>
      </div>
      {data.length === 0 ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading && !data?.data?.length ? (
            Array.from({ length: LIMITS.PRODUCTS_LIMITS }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            <>
                  <Fragment>
                    {data?.data?.map((product: Product) => (
                      <ProductCardAlpine
                        key={`product--key${product.id}`}
                        product={product}
                        lang={lang} variant={''}                      />
                    ))}
                  </Fragment>

            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProductFeed;
