import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../Data/wishlistSlice";
import { addToCartWithStock } from "../Data/addToCartWithStock";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "./Wishlist.css";

function AllWishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const allProducts = useSelector((state) => state.products.products);

  // دالة للحصول على stock الحالي من products slice
  const getCurrentStock = (id) => {
    for (const cat in allProducts) {
      const p = allProducts[cat].find((x) => x.id === id);
      if (p) return p.stock;
    }
    return 0;
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (item) => {
    let product = null;
    for (const cat in allProducts) {
      product = allProducts[cat].find((p) => p.id === item.id);
      if (product) break;
    }
    if (!product || product.stock <= 0) return;
    dispatch(addToCartWithStock({ product, quantity: 1 }));

  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      let product = null;
      for (const cat in allProducts) {
        product = allProducts[cat].find((p) => p.id === item.id);
        if (product) break;
      }
      if (product && product.stock > 0) {
       dispatch(addToCartWithStock({ product, quantity: 1 }));

      }
    });
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="account">
        <div className="tab-pane fade show active" id="wishlist">
          <div className="section-header" data-aos="fade-up">
            <h2 className="text-center">My Wishlist</h2>
            <div className="header-actions text-center mb-4">
              <button
                type="button"
                className="btn-add-all"
                onClick={handleAddAllToCart}
              >
                Add All to Cart
              </button>
            </div>
          </div>

          <div className="wishlist-grid">
            {wishlistItems.length === 0 ? (
              <h4 className="empty-wishlist">Your wishlist is empty ❤️</h4>
            ) : (
              wishlistItems.map((item, index) => {
                const currentStock = getCurrentStock(item.id);
                return (
                  <div
                    className="wishlist-card"
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                  >
                    <div className="wishlist-image">
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        loading="lazy"
                      />
                      <button
                        className="btn-remove"
                        type="button"
                        aria-label="Remove from wishlist"
                        onClick={() => handleRemove(item.id)}
                      >
                        <i className="bi bi-trash" />
                      </button>

                      {item.discountPercentage && (
                        <div className="sale-badge">
                          -{item.discountPercentage}%
                        </div>
                      )}

                      {currentStock === 0 && (
                        <div className="out-of-stock-badge">Out of Stock</div>
                      )}
                    </div>

                    <div className="wishlist-content">
                      <h4>{item.title}</h4>

                      <div className="product-meta">
                        <div className="rating">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-half" />
                          <span>({item.rating || "4.5"})</span>
                        </div>

                        <div className="price">
                          <span className="current">${item.price}</span>
                        </div>
                      </div>

                      {currentStock === 0 ? (
                        <button type="button" className="btn-notify" disabled>
                          Notify When Available
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-add-cart"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllWishlist;
