import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.wishlist.find((i) => i.id === item.id);

      if (!exists) {
        state.wishlist.push(item);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        toast.success(
          <div className="toast-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={item.images[0]}
              alt={item.title}
              className="toast-img"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <div>{item.title} added to wishlist</div>
            </div>
          </div>
        );
      } else {
        toast.error("item in wishlist");
      }
    },
    removeFromWishlist: (state, action) => {
     
      const removedItem = state.wishlist.find((i) => i.id === action.payload);

      
      state.wishlist = state.wishlist.filter((i) => i.id !== action.payload);

     
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));

      
      if (removedItem) {
        toast.error(
          <div
            className="toast-wrapper"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img
              src={removedItem.thumbnail || removedItem.images?.[0]}
              alt={removedItem.title}
              className="toast-img"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <div>{removedItem.title} removed from wishlist</div>
            </div>
          </div>
        );
      }
    },

    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.removeItem("wishlist");
      toast.success("Wishlist cleared");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
