'use client';

import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

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

const OrderTable: React.FC<{ orders?: any[] }> = ({ orders = [] }) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [singleOrder, setSingleOrder] = useState<any>(null);
  const token = localStorage.getItem("token");

  // Open Modal
  const openModal = () => setIsOpen(true);
  // Close Modal
  const closeModal = () => setIsOpen(false);

  // Fetch Single Order Details
  const orderInfo = async (id: string) => {
    try {
      if (!id) {
        alert('Please select an order');
        return;
      }
      const order = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/${id}`, {
        headers: { Authorization: `${token}` }
      });

      if (order.data.success) {
        setSingleOrder(order.data?.data);
        openModal();
      }
    } catch (error) {
      console.log("Error fetching order:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead style={{ background: "#28837a" }}>
          <tr>
            <th className="px-4 py-2 border-b text-white">Order ID</th>
            <th className="px-4 py-2 border-b text-white">Order Date</th>
            <th className="px-4 py-2 border-b text-white">Quantity</th>
            <th className="px-4 py-2 border-b text-white">Total Price</th>
            <th className="px-4 py-2 border-b text-white">View Details</th>

          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border-b">{order._id}</td>
              <td className="px-4 py-2 border-b">{dayjs(order.createdAt).format('DD MMM YYYY')}</td>
              <td className="px-2 py-0 border-b">{order.productInformation.length}</td>
              <td className="px-2 py-0 border-b">₹{order.totalAmount}</td>
              <td className="px-4 py-2 border-b">
                <button 
                  style={{ color: "black", padding: "6px 10px" }} 
                  onClick={() => orderInfo(order._id)}
                >
                  View Details
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p className="text-center py-4">No orders found.</p>}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Order Details"
        ariaHideApp={false}
      >
        <h2 style={{ textAlign: "center", fontSize: "26px", fontWeight: "bolder" }}>
          Order Details
        </h2>

        {singleOrder && (
          <>
            <table className="min-w-full bg-white border border-gray-200">
              <thead style={{ background: "#28837a" }}>
                <tr>
                  <th className="px-4 py-2 border-b text-white">Image</th>
                  <th className="px-4 py-2 border-b text-white">Name</th>
                  <th className="px-4 py-2 border-b text-white">Quantity</th>
                  <th className="px-4 py-2 border-b text-white">Sale Price</th>
                </tr>
              </thead>
              <tbody>
                {singleOrder.productInformation.map((product: any) => (
                  <tr key={product._id} className="text-center">
                    <td className="border-b">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.image}`}
                        alt={product.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{product.name}</td>
                    <td className="px-2 py-0 border-b">{product.quantity}</td>
                    <td className="px-2 py-0 border-b">₹{product.sale_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-4">
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>Total: ₹{singleOrder.totalAmount}</p>
              <p style={{ fontSize: "16px", color: "#555" }}>Payment Type: {singleOrder.payment_type}</p>
            </div>
          </>
        )}

        {/* Close Button */}
        <div className="text-center mt-4">
          <button onClick={closeModal} style={{ padding: "8px 15px", background: "#28837a", color: "white", borderRadius: "5px" }}>
            Close
          </button>
        </div>

      </Modal>
    </div>
  );
};


export default OrderTable;

