import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  removeFromCart,
  incrementCartAsync
} from "../../../../redux/reducer/cartReducer";
import { addToCartAsync, viewCartAsync, decrementCartAsync } from "../../../../redux/reducer/cartReducer";

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => {
    console.log("Cart Items from Redux:", state.cart.products); 
    return Array.isArray(state.cart.products) ? state.cart.products : [];
  });

  const cartItem = cartItems.find((item) => item.productId === productId);

  useEffect(() => {
    dispatch(viewCartAsync()); 
  }, [dispatch]);

  // ✅ Handle Add to Cart
  const handleAdd = useCallback(() => {
    if (!cartItem) {
      dispatch(addToCartAsync({ id: productId })).then(() => {
        dispatch(viewCartAsync()); 
      });
    } else {
      dispatch(incrementCartAsync({ id: cartItem?.productId })).then(() => {
        dispatch(viewCartAsync()); 
      });
    }
  }, [cartItem, dispatch, productId]);

  // ✅ Handle Remove from Cart
  const handleRemove = useCallback(() => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decrementCartAsync({ id: cartItem?.productId })).then(() => {
        dispatch(viewCartAsync()); 
      });
    } else {
      dispatch(removeFromCart({ id: cartItem._id }));
      dispatch(viewCartAsync()); 
    }
  }, [cartItem, dispatch]);

  return (
    <div className="flex items-center justify-center">
      {!cartItem ? (
        <button onClick={handleAdd}  style={{backgroundColor:"#28837a"}} className="text-white px-10 py-2 rounded-xl">
          Add to Cart
        </button>
      ) : (
        <div style={{backgroundColor:"#28837a"}} className="flex items-center  px-6 space  py-1 rounded-xl">
          <button onClick={handleRemove} className="text-white w-12 h-8 flex items-center justify-center rounded-full">
            -
          </button>
          <span style={{color:"white"}} className="text-lg  font-semibold w-8 text-center">{cartItem?.quantity || 1}</span>
          <button onClick={handleAdd} className="text-white w-12 h-8 flex items-center justify-center rounded-full">
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
