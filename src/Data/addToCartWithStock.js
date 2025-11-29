// addToCartWithStock.js
import { decreaseStock } from "./productsSlice";
import { addItem } from "./cartSlice";
import toast from "react-hot-toast";

export const addToCartWithStock = ({ product, quantity = 1 }) => (dispatch, getState) => {
  const { products } = getState().products;

  let realProduct = null;
  for (const cat in products) {
    const found = products[cat].find(p => String(p.id) === String(product.id));
    if (found) realProduct = found;
  }

  if (!realProduct) {
    console.error("Product not found in Redux store");
    return;
  }

  if (realProduct.stock < quantity) {
    toast.error("Not enough stock!");
    return;
  }

  const productForCart = { ...realProduct };
  delete productForCart.stock;

  dispatch(addItem({ product: productForCart, quantity }));
  dispatch(decreaseStock({ id: realProduct.id, quantity }));

   toast.success(
          <div className="toast-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="toast-img"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <div>{product.title} added to cart</div>
            </div>
          </div>
        );
};
