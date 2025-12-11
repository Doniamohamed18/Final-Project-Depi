import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: localStorage.getItem("cart-shopping")
    ? JSON.parse(localStorage.getItem("cart-shopping"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.cartItems.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;  
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      localStorage.setItem("cart-shopping", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      localStorage.setItem("cart-shopping", JSON.stringify(state.cartItems));
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }

      localStorage.setItem("cart-shopping", JSON.stringify(state.cartItems));
    },

    emptyCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart-shopping", JSON.stringify([]));
    },
  },
});

export const { addItem, removeItem, emptyCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
