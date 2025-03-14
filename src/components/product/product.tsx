'use client';

import { useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useParams } from 'next/navigation';
import useWindowSize from '@utils/use-window-size';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'src/app/i18n/client';
import  AddToSingleCartButton from '../product/product-cards/single-cart-button'

const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = useParams();
  const {slug} = pathname
  const { width } = useWindowSize();
  
  const { data, isLoading } = useProductQuery(slug as string);

  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);


  console.log("data query..:", data);

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) return <p className={"pt-8 pb-8"}>Loading...</p>;
  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = data?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(data!, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);


  console.log("product id", pathname.slug);
  console.log("produt details..:", data);

  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-7 mb-8 lg:mb-12 bg-white p-5 rounded">
        <div className="col-span-5 mb-6 overflow-hidden  md:mb-8 lg:mb-0 xl:flex justify-center">
          {!!data?.images?.length ? (
            <ThumbnailCarousel
              images={data?.images}
              galleryClassName="xl:w-[100px]"
              lang={lang}
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={`http://localhost:5555/${data?.image}`}
                alt={data?.name!}
                width={900}
                height={680}
                style={{ width: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 ">
          <div className="pb-4 lg:pb-8">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-large font-bold my-4 
font-style: italic transition-colors duration-300 text-brand-dark md:text-2xl xl:text-2xl ">
                {data?.name.toUpperCase()}
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
  <h4 style={{ color: "#28837a", fontSize: "26px", margin: 0 }}>₹{data?.sale_price}</h4>
  <del style={{ fontSize: "20px", color: "#262522" }}>₹{data?.price}</del>
</div>

<div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginTop:"10px" }}>
  <h3 style={{ margin: 0,  fontWeight:"700px"}}>{data?.productAttribute?.value}</h3>
  <h3 style={{ margin: 0 , fontWeight:"400px"}}>{data?.productAttribute?.type}</h3>
</div>

          </div>

          <div>
            <h4 style={{fontSize:"23px", fontWeight:"400px"}}>Description:</h4>
            <p>{data?.description}</p>
          </div>

          <div className="pb-2">
            {isEmpty(variations) && (
              <>
                {Number(data.stock) > 0 || !outOfStock ? (
                  <span className="text-sm font-medium text-yellow">
                    {t('text-only') +
                      ' ' +
                      data.stock +
                      ' ' +
                      t('text-left-item')}
                  </span>
                ) : (
                  <div className="text-base text-red-500 whitespace-nowrap">
                    {t('text-out-stock')}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
         <AddToSingleCartButton productId ={data._id}/>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default ProductSingleDetails;
