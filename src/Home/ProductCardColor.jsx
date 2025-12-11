import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../Data/wishlistSlice";
import { addToCartWithStock } from "../Data/addToCartWithStock";

//search about the product from all categories by id
const selectProductStock = (state, productId) => {
    const allProducts = state.products.products;
    if (allProducts && productId !== null) {
        for (const category in allProducts) {
            const foundProduct = allProducts[category].find(p => String(p.id) === String(productId));
            if (foundProduct) return foundProduct.stock;
        }
    }
    return null;
};

//take product from home 
function ProductCardColor({ item }) {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.wishlist);

    const safeItem = item || {
        id: null,
        title: "Loading...",
        price: 0,
        rating: 0,
        stock: 0,
        category: "Unknown",
        discountPercentage: 0,
        images: ["https://via.placeholder.com/250"],
    };

    //take from store or take stock from props
    const stockFromState = useSelector(state => selectProductStock(state, safeItem.id));
    const currentStock = stockFromState !== null ? stockFromState : safeItem.stock;

    //take first 3 images and connect every pic with color
    const images = safeItem.images.slice(0, 3);
    const colors = ["#ffffff", "gray", "black"];
    const colorVariants = colors.map((color, idx) => ({
        color,
        image: images[idx] || images[0],
    }));

    const [currentImage, setCurrentImage] = useState(images[0]);
    const [activeColor, setActiveColor] = useState(colors[0]);

    const handleColorClick = (color, image) => {
        setCurrentImage(image);
        setActiveColor(color);
    };

    //out of stock
    const handleAddToCart = () => {
        if (currentStock > 0) {
            dispatch(addToCartWithStock({ product: safeItem, quantity: 1 }));


        }
    };


    return (
        <div className="product-item">
            {/* product image*/}
            <div className="product-image" style={{ backgroundColor: activeColor }}>
                <img src={currentImage} alt={safeItem.title} className="img-fluid" />
                <div className="product-badge trending-badge">Trending</div>

                {/* button actions  */}
                <div className="product-actions">
                    <button
                        className={`action-btn wishlist-btn ${wishlistItems.find(w => String(w.id) === String(safeItem.id)) ? "active" : ""}`}
                        onClick={() => dispatch(addToWishlist(safeItem))}
                    >
                        <i className="bi bi-heart-fill" />
                    </button>
                    <button className="action-btn compare-btn">
                        <i className="bi bi-arrow-left-right" />
                    </button>
                    <button className="action-btn quickview-btn">
                        <i className="bi bi-zoom-in" />
                    </button>
                </div>

                <button
                    className="cart-btn"
                    onClick={handleAddToCart}
                    disabled={currentStock <= 0}
                >
                    {currentStock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

            </div>

            {/* product info  */}
            <div className="product-info">
                <div className="product-category">{safeItem.category}</div>
                <h4 className="product-name">{safeItem.title}</h4>
                <div className="product-price">
                    ${safeItem.price}{" "}
                    {safeItem.discountPercentage > 0 && (
                        <span className="old-price">
                            ${(safeItem.price / (1 - safeItem.discountPercentage / 100)).toFixed(2)}
                        </span>
                    )}
                </div>
                {/* product rating */}
                <div className="product-rating">
                    ⭐ {safeItem.rating} | Stock: **{currentStock}** | <br />Discount: {safeItem.discountPercentage}%
                </div>

                {/* color swatches */}
                <div className="color-swatches mt-2">
                    {colorVariants.map((v, idx) => (
                        <span
                            key={idx}
                            className={`swatch ${activeColor === v.color ? "active" : ""}`}
                            style={{ backgroundColor: v.color }}
                            onClick={() => handleColorClick(v.color, v.image)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCardColor;