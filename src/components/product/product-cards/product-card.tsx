import cn from 'classnames';
import Image from '@components/ui/image';
import {Product} from '@framework/types';
import {useModalAction} from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import {useCart} from '@contexts/cart/cart.context';

import dynamic from 'next/dynamic';
import {useTranslation} from 'src/app/i18n/client';
import {ROUTES} from '@utils/routes';
import CheckIcon from '@components/icons/check-icon';
import Link from 'next/link';
import CartButton from '@components/product/product-cards/cart-button'



interface ProductProps {
    stock: Number;
    productId: Product;
    className?: string;
    variant: string
}


function RenderLabelStock({props}: { props: Object }) {
    let {data, lang}: any = props;
    // console.log(variant);
    const {t} = useTranslation(lang, 'common');
    const {_id, stock, type} = data ?? {};
    const {isInCart, isInStock} = useCart();
    const outOfStock = isInCart(_id) && !isInStock(_id);
   
    if (Number(stock) < 1 || outOfStock) {
        return (
            <p className="font-medium flex items-center space-x-1 text-[12px] text-skin-label_out out_stock">
                <CheckIcon fill={"text-skin-label_in"} opacity="1"/>
                <span> {t('text-out-stock')} </span>
            </p>
        );
    }
    return (
        <p className="font-medium flex items-center space-x-1 text-[12px] text-skin-label_in in_stock">
            <CheckIcon fill={"text-skin-label_in"} opacity="1"/>
            <span> {t('text-in-stock')} </span>
            <span className="text-brand-dark"><b>{stock}</b> {t('text-items')}</span>
        </p>
    )
}
const ProductCard: React.FC<ProductProps> = ({product, className, lang,variant="default"}) => {
    const {_id, name, image, companyId, quantity, stock, discount ,price, sale_price,productAttribute} = product ?? {};
    const company_name = companyId?.company_name; 
    const  type = productAttribute?.type;
    const  value = productAttribute?.value;
    const id  = _id
    const {isInCart, isInStock} = useCart();
    const outOfStock = isInCart(id) && !isInStock(id);
    
    
    return (
      <div>
      {/* <a href={`/${lang}${ROUTES.PRODUCTS}/${id}`}className="block"> */}
      <article
        className={cn(
          'flex flex-col gap-2 product-card relative p-2 sm:p-4  h-full  bg-white',
          className,
          Number(quantity) < 1 || outOfStock ? 'card-image--nojump': 'card-image--jump ',{
              'hover:shadow-navigation hover:z-50 ': variant === 'outBorder' || variant === 'noHeading',
              'rounded': variant === 'default' ,
          }
        )}
        title={name}
      >
        <div className="relative flex-shrink-0 ">
        <Link href={`/en/products/${id}`}>
          <div className="relative card-img-container overflow-hidden flex item-center w-full">
            <Image
              src={`http://localhost:5555/${image}`}
              alt={name || 'Product Image'}
              width={180}
              height={180}
            />
          </div>
          </Link>
          <div className="w-full h-full absolute top-0  z-10">
            {discount && (
              <span  style={{backgroundColor:'#28837a', color:"white", fontWeight:"bold"}} className="text-[12px] font-medium  uppercase inline-block rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {Math.round(discount)} % off
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full overflow-hidden relative product-cart-content">
          <Link
            href={`/${lang}${ROUTES.PRODUCTS}/${id}`}
            className="text-skin-base font-bold text-sm text-lg leading-5 min-h-[20px] line-clamp-2 mt-1 mb-2 hover:text-brand"
          >
            {name}
          </Link>

          <span style={{color:'black'}} className="inline-block font-bold text-[14px] ">
            {value} {type}
            </span>

          <Link
            href={`/${lang}${ROUTES.PRODUCTS}/${id}`}
            className="text-skin-base font-semibold text-sm text-lg 
font-style: italic leading-5 min-h-[20px] line-clamp-2 mt-1 mb-2 hover:text-brand"
          >
            {company_name}
          </Link>
          <div className="space-s-2">
            <span style={{color:"#28873a"}} className="inline-block font-bold text-[18px] ">
            ₹{sale_price}
            </span>
              <del className="mx-1  text-gray-600 text-opacity-70">
              ₹{price}
              </del>
          </div>
          <div className="mt-3 ">
            <RenderLabelStock props={{ data: product, lang: lang }} />
          </div>
          <div className="block product-cart-button font-semibold">
          <CartButton productId={id} />
          </div>
        </div>
      </article>
      {/* </a> */}
      </div>
    );
};

export default ProductCard;
