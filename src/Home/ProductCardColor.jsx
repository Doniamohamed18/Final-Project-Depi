import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// تأكد من أن هذه المسارات صحيحة
import { addToWishlist } from "../Data/wishlistSlice";
import { addToCartWithStock } from "../Data/addToCartWithStock";


// 🆕 1. دالة مُساعدة للـ Selector: تبحث وتُعيد قيمة المخزون فقط
// هذه هي الخطوة الحاسمة لتمكين المكون من التحديث عندما يتغير المخزون في productsSlice
const selectProductStock = (state, productId) => {
    const allProducts = state.products.products;
    if (allProducts && productId !== null) {
        for (const category in allProducts) {
            // نضمن استخدام String() للمطابقة الآمنة
            const foundProduct = allProducts[category].find(p => String(p.id) === String(productId));
            if (foundProduct) return foundProduct.stock;
        }
    }
    return null; 
};


function ProductCardColor({ item }) {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.wishlist);

    // fallback لكائن المنتج (مهم: يجب أن يحتوي على ID صحيح)
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
    

    // 🛑 2. استخدام الـ Selector المُركز لقراءة المخزون الحي من Redux State
    const stockFromState = useSelector(state => selectProductStock(state, safeItem.id));

    // 3. جلب المخزون الفعلي المحدث
    // إذا وجدنا قيمة في الـ State (بعد التحديث)، نستخدمها، وإلا نستخدم القيمة الأولية من الـ props
    const currentStock = stockFromState !== null ? stockFromState : safeItem.stock;

    // ----------------------------------------------------
    // منطق الألوان والصور (Swatches Logic)
    // ----------------------------------------------------

    // استخدم أول 3 صور كألوان (swatches)
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

    const handleAddToCart = () => {
        // نستخدم currentStock للتأكد من أننا لا نضيف منتجًا إذا كان المخزون المحدث صفرًا
        if (currentStock > 0) { 
           dispatch(addToCartWithStock({ product: safeItem, quantity: 1 }));


        }
    };


    return (
        <div className="product-item">
            {/* صورة المنتج */}
            <div className="product-image" style={{ backgroundColor: activeColor }}>
                <img src={currentImage} alt={safeItem.title} className="img-fluid" />
                <div className="product-badge trending-badge">Trending</div>

                {/* أزرار تفاعلية */}
                <div className="product-actions">
                    <button
                        // نستخدم String() هنا أيضاً للمقارنة الآمنة
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
                    // 🛑 نعتمد على currentStock المحدث لتعطيل الزر
                    disabled={currentStock <= 0} 
                >
                    {currentStock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

            </div>

            {/* معلومات المنتج */}
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
                <div className="product-rating">
                    ⭐ {safeItem.rating} | Stock: **{currentStock}** | <br />Discount: {safeItem.discountPercentage}%
                </div>

                {/* ألوان المنتج */}
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