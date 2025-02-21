
  import React, { useCallback, useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch, RootState } from "../../../../redux/store";
  import {
    removeFromCart,
    incrementCartAsync,
    addToCartAsync,
    viewCartAsync,
    decrementCartAsync
  } from "../../../../redux/reducer/cartReducer";
  import Modal from "react-modal";



  const customStyles = {
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "1px solid black",
      width: "90%", 
      maxWidth: "600px", 
      height: "auto",
      maxHeight: "600px", 
      overflowY: "auto",
      padding: "20px",
      borderRadius: "10px",
      zIndex: 1000, 
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 999, 
    },
  };


  interface AddToCartButtonProps {
    productId: string;
  }

  const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showModal, setShowModal] = useState(false);

    const cartItems = useSelector((state: RootState) => {
      return Array.isArray(state.cart.products) ? state.cart.products : [];
    });

    const cartItem = cartItems.find((item) => item.productId === productId);

    useEffect(() => {
      dispatch(viewCartAsync());
    }, [dispatch]);

    // ✅ Handle Add to Cart
    const handleAdd = useCallback(() => {
      if (!cartItem) {
        dispatch(addToCartAsync({ id: productId }))
          .unwrap()
          .catch((error) => {
            if (error.code === 405) {
              setShowModal(true); // Show the modal when error 405 occurs
            }
          })
          .finally(() => {
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
          <button
            onClick={handleAdd}
            style={{backgroundColor:"#28837a"}} className="text-white px-10 py-2 rounded-xl"
          >
            Add to Cart
          </button>
        ) : (
          <div style={{ backgroundColor: "#28837a" }} className="flex items-center px-6 py-1 rounded-xl">
            <button
              onClick={handleRemove}
              className="text-white w-12 h-8 flex items-center justify-center rounded-full"
            >
              -
            </button>
            <span style={{ color: "white" }} className="text-lg font-semibold w-8 text-center">
              {cartItem?.quantity || 1}
            </span>
            <button
              onClick={handleAdd}
             className="text-white w-12 h-8 flex items-center justify-center rounded-full"
            >
              +
            </button>
          </div>
        )}

        {/* 🔴 React Modal Component */}
        <Modal
          isOpen={showModal}
          style={customStyles}
          ariaHideApp={false}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Vendor Restriction Modal"
          className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20 relative text-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold text-red-600 mb-4">Oops! Vendor Restriction</h2>
          <p className="text-gray-700">Your cart contains items from other shops. Would you like to reset your cart for adding items from this shop?</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Got It
            </button>
          </div>
        </Modal>
      </div>
    );
  };

  export default AddToCartButton;

