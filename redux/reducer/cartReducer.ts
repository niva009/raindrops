import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  id: string;
  name: string;
  sale_price: number;
  discount: string;
  image: string;
  userId: string;
  category: string;
  productId: string;
  companyId: string;
  categoryname: string;
  isActive: boolean;
  isStatus: string;
  slug: string;
  stock: number;
  quantity: number;
  updatedAt: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


  export const addToCartAsync = createAsyncThunk(
    "cart/addToCartAsync",
    async ({ id }: { id: string }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5555/api/add-cart",
          { productId: id, quantity: 1 },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        return response.data?.data;
      } catch (error: any) {
        console.log("error adding to cart", error);
        if (error.response?.status === 405) {
          return rejectWithValue({ message: "Please add products from the same vendor.", code: 405 });
        }
        return rejectWithValue(error.response?.data?.message || "");
      }
  
    }
  );


// Async action to view the cart
export const viewCartAsync = createAsyncThunk(
  "cart/viewCartAsync",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5555/api/view-cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart items");
    }
  }
);


///remove allcart value


export const RemoveallCart = createAsyncThunk(
  "cart/removecart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("http://localhost:5555/api/delete-all-cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove all cart");
    }
  }
);

// Async action to increment item quantity in the cart
export const incrementCartAsync = createAsyncThunk(
  "cart/incrementCartAsync",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    console.log("incremnt idddd", id);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("http://localhost:5555/api/cart-increment", { productId: id }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("cartincremnt", response);
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to increment item quantity");
    }
  }
);

export const decrementCartAsync = createAsyncThunk(
  "cart/decrementCartAsync",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("http://localhost:5555/api/cart-dicrement", { productId: id }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to decrement item quantity");
    }
  }
);

export const deleteFromCartAsync = createAsyncThunk(
  "cart/deleteFromCartAsync",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:5555/api/delete-cart/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log("Deleted Cart Response:", response.data);
      return response.data?.data?.productId; 
    } catch (error: any) {
      console.error("Delete API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to delete item from cart");
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
    totalDiscount: 0,
    totalitems: 0,
    couponDiscount : 0,
    lowCartValue : 0,
  },
  reducers: {
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.filter((item) => item._id !== action.payload.id);
    },
    applyCoupon: (state, action) => {
      state.couponDiscount = action.payload;
    },
    removeCoupon: (state) => {
      state.couponDiscount = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(viewCartAsync.fulfilled, (state, action) => {
      console.log("API Response (viewCartAsync):", action.payload);
      state.products = Array.isArray(action.payload?.products) ? action.payload.products : [];
      state.totalPrice = action.payload?.totalPrice || 0;
      state.totalDiscount = action.payload?.totalDiscount || 0;
      state.totalitems = action.payload?.totalitems || 0;
      state.lowCartValue = action.payload?.lowCartValue || 0;
    });
    builder.addCase(RemoveallCart.fulfilled, (state, action) => {
      console.log("Cart has been cleared!", action.pay);
      state.products = [];
      state.totalPrice = 0;
      state.totalDiscount = 0;
      state.totalitems = 0;
      state.couponDiscount = 0;
    })
  
    // ✅ Handle item deletion
    builder.addCase(deleteFromCartAsync.fulfilled, (state, action) => {
      console.log("Deleted item from cart:", action.payload);
      state.products = state.products.filter((item) => item._id !== action.payload);
    });
  
    builder.addCase(incrementCartAsync.fulfilled, (state, action) => {
      console.log("Incremented Cart Response:", action.payload);
      if (!action.payload || !action.payload._id) return; 
  
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    });
  
    builder.addCase(decrementCartAsync.fulfilled, (state, action) => {
      console.log("Decremented Cart Response:", action.payload);
      if (!action.payload || !action.payload._id) return; 
  
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    });
  }
  
});


export const { applyCoupon, removeCoupon ,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;






