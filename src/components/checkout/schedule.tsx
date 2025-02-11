  import React, { useState, useEffect } from 'react';
  import Modal from 'react-modal';
  import { useTranslation } from 'src/app/i18n/client';
  import { useDispatch, useSelector } from "react-redux";
  import { viewCartAsync } from "../../../redux/reducer/cartReducer";
  import axios from 'axios';
  import { ToastContainer, toast } from 'react-toastify';
  import { applyCoupon } from "../../../redux/reducer/cartReducer";

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


  export default function Schedule({ lang }) {
    const { t } = useTranslation(lang, 'common');
    const [modalIsOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [couponcodes, setCouponCodes] = useState([]);
    const [couponResponse, setCouponResponse] = useState("");
    const [newCartValue, setNewCartValue] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [isCouponApplied, setIsCouponApplied] = useState(false); // Tracks if a coupon has been applied
    const { products, totalPrice } = useSelector((state) => state.cart);
    const [selectedPayment, setSelectedPayment] = useState("");

    useEffect(() => {
      dispatch(viewCartAsync());
    }, [dispatch]);
    

    const companyId = products[0]?.companyId;
    const userId = products[0]?.userId;

    useEffect(() => {
      const fetchCoupons = async () => {
        if (companyId) {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/view-coupon/${companyId}`
            );
            if (response.status === 200) {
              setCouponCodes(response.data?.data);
            }
          } catch (error) {
            console.error("Error fetching coupon codes:", error);
          }
        }
      };
      fetchCoupons();
    }, [companyId]);

    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }

    const validateCoupon = async (couponCode) => {
      try {
        if (userId && couponCode) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/coupon/coupon-validation`,
            { userId, couponCode }
          );

          if (response.status === 200) {

            const discount = response?.data?.discountAmount;
            setCouponResponse(response);
            setNewCartValue(response?.data?.newTotalPrice);
            setDiscountAmount(response?.data?.discountAmount);
            setIsCouponApplied(true); // Mark coupon as applied
            dispatch(applyCoupon(discount));
            closeModal();
            return true;
          } else {
            setCouponResponse(response.data.message || "Invalid coupon code.");
            console.log("invalid coupon code");
            return false;
          }
        } else {
          console.log("User ID and coupon code are required");
          setCouponResponse("User ID and coupon code are required.");
        }
      } catch (error) {
        console.error("Error validating coupon code:", error);
        setCouponResponse("Error occurred during coupon validation.");
        toast.error( error?.response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        closeModal();
      }
    };

    return (
      <div className="w-full">
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#28837a",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={openModal}
        >
          <h3 style={{ color: "white", fontWeight: "bolder", paddingTop: "5px" }}>
            Apply Coupon Code
          </h3>
          <p style={{ color: "#12c9b7", paddingTop: "10px" }}>
            Save more with coupons available for you
          </p>
        </div>

        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          style={customStyles}
          
          contentLabel="Available Coupons"
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Available Coupons
          </h2>
          <div>
            {couponcodes.length > 0 ? (
              couponcodes.map((coupon, index) => (
                <div
                  key={coupon._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: "0",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {coupon.couponCode}
                    </h3>
                    <p style={{ margin: "5px 0", color: "#555" }}>
                      {coupon.description}
                    </p>
                    <p style={{ margin: "5px 0", color: "#999" }}>
                      Minimum Order: ₹{coupon.cartAmount || 0}
                    </p>
                  </div>
                  <button
                    style={{
                      backgroundColor: isCouponApplied ? "#ccc" : "#28837a",
                      color: isCouponApplied ? "#666" : "white",
                      padding: "5px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: isCouponApplied ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!isCouponApplied) validateCoupon(coupon.couponCode);
                    }}
                    disabled={isCouponApplied}
                  >
                    {isCouponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "#555" }}>
                No coupons available.
              </p>
            )}
          </div>
        </Modal>

        {couponResponse && discountAmount !== 0 && (
          <div style={{

            padding: "20px",
            marginTop: "20px",
            textAlign: "center",
          }}>
            <h5 style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#28a745",
              marginBottom: "10px",
            }}>
              {couponResponse?.data?.couponMessage}
            </h5>
            <h4 style={{
              fontSize: "16px",
              color: "#28837a",
            }}>
              Discount Amount: ₹{discountAmount}
            </h4>
            <h4 style={{
              fontSize: "16px",
              color: "#333",
            }}>
            </h4>
          </div>
        )}
        <ToastContainer />

        <div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ color: "#28837a", fontWeight: "bold", fontSize: "22px" }}>Amount to Pay</h3>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color:"black" }}>₹{totalPrice-discountAmount}</h2>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Choose Payment Method</h3>
        <button
          style={{
            backgroundColor: selectedPayment === "online" ? "#28837a" : "#ddd",
            color: selectedPayment === "online" ? "white" : "black",
            padding: "10px 20px",
            margin: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setSelectedPayment("online")}
        >
          Pay Online
        </button>
        <button
          style={{
            backgroundColor: selectedPayment === "cod" ? "#28837a" : "#ddd",
            color: selectedPayment === "cod" ? "white" : "black",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setSelectedPayment("cod")}
        >
          Cash on Delivery
        </button>
      </div>
        </div>
      </div>
    );
  }
