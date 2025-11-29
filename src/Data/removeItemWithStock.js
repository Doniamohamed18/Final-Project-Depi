// removeItemWithStock.js
import { increaseStock } from "./productsSlice";
import { removeItem } from "./cartSlice";
import {toast} from "react-hot-toast";

export const removeItemWithStock = (id) => (dispatch, getState) => {
  const { cartItems } = getState().cart;
  const item = cartItems.find(i => i.id === id);

  if (!item) return;

  // رجّع الـ stock
  dispatch(increaseStock({ id, quantity: item.quantity }));

  // امسح من الكارت
  dispatch(removeItem(id));
   toast.success(
          <div className="toast-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={item.images[0]}
              alt={item.title}
              className="toast-img"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <div>{item.title} removed from cart</div>
            </div>
          </div>
        );


};
