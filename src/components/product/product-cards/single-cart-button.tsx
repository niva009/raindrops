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
import {useModalAction} from '@components/common/modal/modal.context';

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

const AddToSingleCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showCounter, setShowCounter] = useState(false);

  const {openModal} = useModalAction();

  const cartItems = useSelector((state: RootState) => {
    return Array.isArray(state.cart.products) ? state.cart.products : [];
  });

  const cartItem = cartItems.find((item) => item.productId === productId);


  function handleLogin() {
    openModal('LOGIN_VIEW');
}

  useEffect(() => {
    dispatch(viewCartAsync());
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    setButtonClicked(true);
    setShowCounter(true); // Show counter when adding
    setTimeout(() => setButtonClicked(false), 200);

    if (!cartItem) {
      dispatch(addToCartAsync({ id: productId }))
        .unwrap()
        .catch((error) => {

          console.log("add cart error", error);
          if (error.code === 405) {
            setShowModal(true);
          }
          else if(error === "Invalid or expired token"){
            handleLogin();
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

  const handleRemove = useCallback(() => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 200);

    if (cartItem && cartItem.quantity > 1) {
      dispatch(decrementCartAsync({ id: cartItem?.productId })).then(() => {
        dispatch(viewCartAsync());
      });
    } else {
      dispatch(removeFromCart({ id: cartItem._id }));
      setShowCounter(false); // Hide counter when removing the last item
      dispatch(viewCartAsync());
    }
  }, [cartItem, dispatch]);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
      {showCounter && cartItem ? (
        <div style={{ backgroundColor: "#28837a" }} className="flex items-center gap-2 p-2 rounded-xl">
          <button
            onClick={handleRemove}
            className={`text-white px-6 py-2 flex items-center justify-center rounded-xl transition-transform duration-200 ${
              buttonClicked ? "scale-110" : ""
            }`}
          >
            -
          </button>
          <span className="flex items-center text-lg font-semibold text-white w-8 text-center">
            {cartItem?.quantity || 1}
          </span>
          <button
            onClick={handleAdd}
            className={`text-white px-6 py-2 flex items-center justify-center rounded-xl transition-transform duration-200 ${
              buttonClicked ? "scale-110" : ""
            }`}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className={`w-full p-2 rounded-xl text-white transition-transform duration-200 ${
            buttonClicked ? "scale-110" : ""
          }`}
          style={{ backgroundColor: "#28837a" }}
        >
          Add to Cart
        </button>
      )}

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
        <p className="text-gray-700">
          Your cart contains items from other shops. Would you like to reset your cart for adding items from this shop?
        </p>
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

export default AddToSingleCartButton;
