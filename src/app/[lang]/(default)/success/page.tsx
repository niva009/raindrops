'use client';

import React, { useEffect} from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter } from 'next/navigation'
import { viewCartAsync } from "../../../../../redux/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";


const SuccessPage = () => {

    const router = useRouter()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(viewCartAsync());
      }, [dispatch]);

      const { products, totalPrice } = useSelector((state) => state.cart);


const redirectHome = () =>{
    router.push('/en');
    localStorage.removeItem("addressId")    
}

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Lottie Animation */}
            <div className="mb-4">
                <DotLottieReact
                    src="https://lottie.host/9774161b-1076-43cd-a144-69dfb2d987e2/dcVhwxd1Xp.lottie"
                    loop
                    autoplay
                    style={{ width: "auto", height: 300 }}
                />
            </div>

            {/* Success Message */}
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
                <h2 className="text-lg text-gray-700">We have received your order and will deliver it within 30 minutes.</h2>
            </div>

            {/* Order Details Table */}
            <div className="mt-4 w-full max-w-lg border-4 border-gray-300 p-4 bg-white rounded-lg shadow-lg">
                <table className="table-auto w-full text-center border-collapse border border-gray-400">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border border-gray-400">Image</th>
                            <th className="px-4 py-2 border border-gray-400">Name</th>
                            <th className="px-4 py-2 border border-gray-400">quantity</th>
                            <th className="px-4 py-2 border border-gray-400">price</th>
                        </tr>
                    </thead>
            
                    <tbody>
                    {products && products.length > 0 ? (
                            products.map((data, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-400">
                                        <img src={ `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data.image}`} alt={data.name} className="w-12 h-12 object-cover" />
                                    </td>
                                    <td className="px-4 py-2 border border-gray-400">{data.name}</td>
                                    <td className="px-4 py-2 border border-gray-400">{data.quantity}</td>
                                    <td className="px-4 py-2 border border-gray-400">₹{data.sale_price}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center text-gray-500 py-4">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
    <tr className="bg-gray-100 font-bold">
        <td colSpan="3" className="text-right px-4 py-2 border border-gray-400">Total Amount:</td>
        <td className="px-4 py-2 border border-gray-400 text-green-700">₹{totalPrice}</td>
    </tr>
</tfoot>
                </table>
            </div>

            {/* Return Home Button */}
            <button className="mt-5 bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            onClick={() => redirectHome()}>
                Return Home
            </button>
        </div>
    );
};

export default SuccessPage;
