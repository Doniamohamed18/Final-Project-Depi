import { updateItemQuantity } from "./cartSlice";
import { increaseStock, decreaseStock } from "./productsSlice";
import toast from "react-hot-toast";

export const updateCartQuantityWithStock = (id, newQuantity) => (dispatch, getState) => {
  const state = getState();
  const item = state.cart.cartItems.find(i => i.id === id);
  if (!item) return;

  const oldQuantity = item.quantity;

  if (newQuantity > oldQuantity) {
    dispatch(decreaseStock({ id, quantity: newQuantity - oldQuantity }));
  } else {
    dispatch(increaseStock({ id, quantity: oldQuantity - newQuantity }));
  }

  dispatch(updateItemQuantity({ id, quantity: newQuantity }));
   toast.success(
          <div className="toast-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={item.images[0]}
              alt={item.title}
              className="toast-img"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <div>Quantity updated to{newQuantity}</div>
            </div>
          </div>
        );
};
