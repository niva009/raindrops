import Link from "@components/ui/link";
import Image from "@components/ui/image";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { decrementCartAsync, incrementCartAsync, viewCartAsync,deleteFromCartAsync } from "../../../redux/reducer/cartReducer"; 
import { ROUTES } from "@utils/routes";
import Counter from "@components/ui/counter";

type CartItemProps = {
  item: any;
  lang: string;

};

const CartItem: React.FC<CartItemProps> = ({ lang, item }) => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>(); 

  return (
    <div
      className="group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0"
      title={item?.name}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={`http://localhost:5555/${item?.image ?? "/assets/placeholder/cart-item.svg"}`}
          width={100}
          height={100}
          loading="eager"
          alt={item.name || "Product Image"}
          style={{ width: "auto" }}
          className="object-cover bg-fill-thumbnail"
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => dispatch(deleteFromCartAsync({ id: item?.productId})).then(() =>{
            dispatch(viewCartAsync());
          })}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="pl-3 md:pl-4">
          <Link
            href={`/${lang}${ROUTES.PRODUCT}/${item?._id}`}
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            {item?.name}
          </Link>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            {item.unit} X {item.quantity}
          </div>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
          ₹{item.sale_price}
          </div>
          <Counter
  value={item.quantity}
  onIncrement={() => {
    dispatch(incrementCartAsync({ id: item?.productId })).then(() => {
      dispatch(viewCartAsync()); 
    });
  }}
  onDecrement={() => {
    dispatch(decrementCartAsync({ id: item?.productId })).then(() => {
      dispatch(viewCartAsync()); 
    });
  }}
  variant="cart"
  lang={"en"}
/>

        </div>

        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
         ₹{item.sale_price * item.quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
