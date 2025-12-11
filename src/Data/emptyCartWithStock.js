// emptyCartWithStock.js
import { increaseStock } from "./productsSlice";
import { emptyCart } from "./cartSlice";
import { toast } from "react-hot-toast";

export const emptyCartWithStock = () => (dispatch, getState) => {
  const { cartItems } = getState().cart;

  cartItems.forEach(item => {
    dispatch(increaseStock({ id: item.id, quantity: item.quantity }));
  });

  dispatch(emptyCart());
  toast.error("cart now is empty");
  
};
