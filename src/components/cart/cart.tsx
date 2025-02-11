import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewCartAsync } from "../../../redux/reducer/cartReducer"; // Redux action
import { RootState } from "../../../redux/store"; // Redux state
import Scrollbar from "@components/ui/scrollbar";
import { useUI } from "@contexts/ui.context";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import DeleteIcon from "@components/icons/delete-icon";
import { useTranslation } from "src/app/i18n/client";
import { IoClose } from "react-icons/io5";

export default function Cart({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, "common");
  const { closeDrawer } = useUI();
  const dispatch = useDispatch();

 
  const { products, totalPrice, totalDiscount, totalitems } = useSelector((state: RootState) => state.cart);

  const isEmpty = products.length === 0; 

  useEffect(() => {
    dispatch(viewCartAsync()); 
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="relative flex items-center justify-between w-full border-b p-5 md:p-7 border-border-base">
        <Heading variant="titleMedium">{t("text-shopping-cart")}</Heading>
        <div className="flex items-center">
          {!isEmpty && (
            <button
              className="flex items-center text-15px transition duration-150 ease-in text-brand-dark opacity-50 hover:opacity-100"
              aria-label={t("text-clear-all")}
              onClick={() => dispatch({ type: "cart/resetCart" })} 
            >
              <DeleteIcon />
              <span className="pl-1">{t("text-clear-all")}</span>
            </button>
          )}

          <button
            className="px-4 py-6 text-2xl transition-opacity focus:outline-none text-brand-dark hover:opacity-60"
            onClick={closeDrawer}
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      </div>

      {!isEmpty ? (
        <Scrollbar className="flex-grow w-full cart-scrollbar">
          <div className="w-full px-5 md:px-7 h-[calc(100vh_-_300px)]">
            {products?.map((item) => (
              <CartItem item={item} key={item._id} lang={lang} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <EmptyCart lang={lang} />
      )}

      <div className="px-5 pt-5 pb-5 border-t border-border-base md:px-7 md:pt-6 md:pb-6">
        <div className="flex pb-5 md:pb-7">
          <div className="pr-3">
            <Heading className="mb-2.5">{t("text-sub-total")}:</Heading>
            <Text className="leading-6">{t("text-cart-final-price-discount")}</Text>
          </div>
          <div className="shrink-0 font-semibold text-base md:text-lg text-brand-dark min-w-[80px] text-right">
          ₹{totalPrice}
          </div>
        </div>
        <div className="flex flex-col" onClick={closeDrawer}>
          <Link
            href={!isEmpty ? `/${lang}${ROUTES.CHECKOUT}` : `/${lang}`}
            
            className={`w-full px-5 py-3 md:py-4 flex items-center bg-green-800 justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-brand-light focus:outline-none transition duration-300 hover:bg-opacity-90 ${
              isEmpty ? "cursor-not-allowed text-brand-dark text-opacity-25 bg-fill-four hover:bg-fill-four" : ""
            }`}
          >
            <span className="py-0.5">{t("text-proceed-to-checkout")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
