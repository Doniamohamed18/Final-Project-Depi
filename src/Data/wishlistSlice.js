import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// جلب العناصر المخزنة مسبقًا من localStorage
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
      // 1) هات المنتج اللي هيتشال قبل الفلترة
      const removedItem = state.wishlist.find((i) => i.id === action.payload);

      // 2) فلتره بعدها
      state.wishlist = state.wishlist.filter((i) => i.id !== action.payload);

      // 3) حفظ اللسيت في localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));

      // 4) لو المنتج موجود.. اعمل Toast جميل بالصورة
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
