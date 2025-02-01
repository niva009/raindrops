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

  // ✅ Fetch cart products instead of items
  const cartItems = useSelector((state: RootState) => {
    console.log("Cart Items from Redux:", state.cart.products);  // Debugging log
    return Array.isArray(state.cart.products) ? state.cart.products : [];
  });
  
  // ✅ Find the cart item based on `productId`
  const cartItem = cartItems.find((item) => item.productId === productId);

  useEffect(() => {
    dispatch(viewCartAsync());
  }, [dispatch]);

  // ✅ Handle Add to Cart
  const handleAdd = useCallback(() => {
    if (!cartItem) {
      dispatch(addToCartAsync({ id: productId }));
    } else {
      dispatch(incrementCartAsync({ id: cartItem._id }));  // Use `_id`
    }
  }, [cartItem, dispatch, productId]);

  // ✅ Handle Remove from Cart
  const handleRemove = useCallback(() => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decrementCartAsync({ id: cartItem._id }));
    } else {
      dispatch(removeFromCart({ id: cartItem._id }));
    }
  }, [cartItem, dispatch]);

  return (
    <div className="flex items-center justify-center">
      {!cartItem ? (
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
          <button onClick={handleRemove} className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
            -
          </button>
          <span className="text-lg font-semibold w-8 text-center">{cartItem?.quantity || 1}</span>
          <button onClick={handleAdd} className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
