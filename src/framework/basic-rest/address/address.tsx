import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAddress = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/view-address`,
      {
        headers: {
          Authorization: `${token}` 
        }
      }
    );
    console.log("address info",response?.data?.data )
    return  response.data?.data; // Corrected return statement
  } catch (error) {
    throw new Error("Error fetching address: " + error.message);
  }
};

const useAddressQuery = () => {
  return useQuery(["address"], fetchAddress); // Replaced undefined API_ENDPOINTS.ADDRESS
};

export { useAddressQuery, fetchAddress };
