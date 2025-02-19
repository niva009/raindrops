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
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [reviewedProducts, setReviewedProducts] = useState<string[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [singleorder , setSingleOrder] = useState("");
  const token = localStorage.getItem("token");

  // Fetch reviewed product IDs from localStorage
  useEffect(() => {
    const storedReviews = localStorage.getItem('reviewedProducts');
    if (storedReviews) {
      try {
        const parsedReviews = JSON.parse(storedReviews);
        setReviewedProducts(Array.isArray(parsedReviews) ? parsedReviews : []);
      } catch {
        setReviewedProducts([]);
      }
    }
  }, []);

  // Save a new reviewed product ID to localStorage
  const addProductToReviewed = (productId: string) => {
    const updatedReviews = [...reviewedProducts, productId];
    setReviewedProducts(updatedReviews);
    localStorage.setItem('reviewedProducts', JSON.stringify(updatedReviews));
  };

  // Toggle expanded state for the row
  const toggleReadMore = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Trigger the review modal and set the selected order ID
  const triggerReview = (productId: string) => {
    setSelectedOrderId(productId);
    setIsModalOpen(true);
  };

  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  const orderInfo = async(id:any) =>{

    try {

      console.log("singleorderrrID", id);

      if(id){
        const order = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/${id}`,{
          headers:{
            Authorization: `${token}`
          }
        })
        console.log("responsee", order)
        if(order.data.success === true ){
     
          setSingleOrder(order.data)
          openModal();
        }
      }else{
        alert('Please select an order')
      }
    }catch(error){
      console.log(error)
    }
  }


  console.log("single order Details", singleorder);


  console.log("order information..:", orders);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead style={{background:"#28837a"}}>
          <tr>
            <th className="px-4 py-2 border-b text-white">orderId</th>
            <th className="px-4 py-2 border-b text-white">orderDate</th>
            <th className="px-4 py-2 border-b text-white">Quantity</th>
            <th className="px-4 py-2 border-b text-white">totalPrice</th>
            <th className="px-4 py-2 border-b text-white">viewFullDetails</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border-b">
                {order._id}
              </td>
              <td className="px-4 py-2 border-b">
              {dayjs(order.createdAt).format('DD MMM YYYY')}
              </td>
              <td className="px-2 py-0 border-b">{order.productInformation.length}</td>
              <td className="px-2 py-0 border-b">₹{order.totalAmount}</td>
              <td className="px-4 py-2 border-b">
              <button 
                style={{ color: "black", padding: "6px 10px" }} 
                onClick={() => orderInfo(order._id)}  // Fix here
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
        contentLabel="Example Modal"
      >
        <h2 style={{display:"flex", alignContent:"center",justifyContent:"center", fontSize:"26px", fontWeight:"bolder"}}>
          Order Details
        </h2>
        <table className="min-w-full bg-white border border-gray-200">
        <thead style={{background:"#28837a"}}>
          <tr>
            <th className="px-4 py-2 border-b text-white">image</th>
            <th className="px-4 py-2 border-b text-white">name</th>
            <th className="px-4 py-2 border-b text-white">Quantity</th>
            <th className="px-4 py-2 border-b text-white">price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border-b">
                {order._id}
              </td>
              <td className="px-4 py-2 border-b">
              {dayjs(order.createdAt).format('DD MMM YYYY')}
              </td>
              <td className="px-2 py-0 border-b">{order.productInformation.length}</td>
              <td className="px-2 py-0 border-b">₹{order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </Modal>
    </div>
  );
};

export default OrderTable;