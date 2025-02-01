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

// Async action to add item to the cart via API
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
      return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
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

// Async action to decrement item quantity in the cart
export const decrementCartAsync = createAsyncThunk(
  "cart/decrementCartAsync",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("http://localhost:5555/api/cart-decrement", { productId: id }, {
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], 
    totalPrice: 0,
    totalDiscount: 0,
    totalitems: 0,
  },
  reducers: {
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    // ✅ View Cart: Store total price, discount, and items correctly
    builder.addCase(viewCartAsync.fulfilled, (state, action) => {
      console.log("API Response (viewCartAsync):", action.payload);
      state.products = Array.isArray(action.payload?.products) ? action.payload.products : [];
      state.totalPrice = action.payload?.totalPrice || 0; 
      state.totalDiscount = action.payload?.totalDiscount || 0; 
      state.totalitems = action.payload?.totalitems || 0;
    });

    // ✅ Increment Quantity
    builder.addCase(incrementCartAsync.fulfilled, (state, action) => {
      console.log("Incremented Cart Response:", action.payload);
      if (!action.payload) return;
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    });

    // ✅ Decrement Quantity
    builder.addCase(decrementCartAsync.fulfilled, (state, action) => {
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    });
  },
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;




