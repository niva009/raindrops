'use client';

import Link from 'next/link';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import { useEffect, useState } from 'react';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import { useDispatch, useSelector } from "react-redux";
import { viewCartAsync } from "../../../redux/reducer/cartReducer"; // Redux action



const CheckoutCard: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { products, totalPrice, totalDiscount, totalitems } = useSelector((state: RootState) => state.cart);


  useEffect(() => {
    dispatch(viewCartAsync()); 
  }, [dispatch])



  console.log("products checkout", products);


  useEffect(() => {
    setLoading(false);
  }, []);
  const { items, total, isEmpty } = useCart();

  function orderHeader() {
    !isEmpty && router.push(`/${lang}${ROUTES.ORDER}`);
  }
  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: totalPrice,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: '$0',
    },
    {
      id: 3,
      name: t('text-total'),
      price: totalPrice,
    },
  ];
  const mounted = useIsMounted();
  return (
    <>
      <div className="px-4 pt-4 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7 bg-white rounded">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('text-product')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('text-sub-total')}
          </span>
        </div>
        {isLoading ? (
          <div className="w-full">
            <SearchResultLoader uniqueKey={`product-key`} />
          </div>
        ) : products.length !==0 ? (
          products.map((item) => <CheckoutItem item={item} key={item._id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )}
        {mounted &&
          checkoutFooter.map((item: any) => (
            <CheckoutCardFooterItem item={item} key={item.id} />
          ))}
    
      </div>
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={`/${lang}${ROUTES.TERMS}`} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={`/${lang}${ROUTES.PRIVACY}`} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
    </>
  );
};

export default CheckoutCard;
