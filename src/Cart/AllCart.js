import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import { removeItemWithStock } from "../Data/removeItemWithStock";
import { emptyCartWithStock } from "../Data/emptyCartWithStock";
import { updateCartQuantityWithStock } from "../Data/updateCartQuantityWithStock";
import "./Cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const products = useSelector((state) => state.products.products);

    // 1. دالة مساعدة لجلب المنتج الحقيقي بأمان (String vs Number)
    const getRealProduct = (id) => {
        for (const cat in products) {
            const found = products[cat].find((p) => String(p.id) === String(id));
            if (found) return found;
        }
        return null;
    };

    const handleQuantityChange = (id, newQty) => {
        const item = cartItems.find((i) => i.id === id);
        if (!item) return;

        const realProduct = getRealProduct(id);
        const remainingStock = realProduct ? realProduct.stock : 0;

        // 🔥 الحسبة الصحيحة للحد الأقصى: اللي في إيدك + اللي في المخزن
        const maxAvailable = item.quantity + remainingStock;

        // التأكد من الحدود
        let finalQty = newQty;
        if (finalQty < 1) finalQty = 1;
        if (finalQty > maxAvailable) finalQty = maxAvailable;

        if (finalQty !== item.quantity) {
            dispatch(updateCartQuantityWithStock(id, finalQty));
        }
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const tax = +(subtotal * 0.1).toFixed(2);
    const shipping = subtotal > 300 ? 0 : 4.99;
    const total = +(subtotal + tax + shipping).toFixed(2);

    const handleRemove = (id) => {
        dispatch(removeItemWithStock(id));
    };

    const handleEmptyCart = () => {
        dispatch(emptyCartWithStock());
    };

    return (
        <>
            <Navbar />
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Cart</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="current">Cart</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section id="cart" className="cart section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="cart-items">
                                {/* Header */}
                                <div className="cart-header d-none d-lg-block">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6"><h5>Product</h5></div>
                                        <div className="col-lg-2 text-center"><h5>Price</h5></div>
                                        <div className="col-lg-2 text-center"><h5>Quantity</h5></div>
                                        <div className="col-lg-2 text-center"><h5>Total</h5></div>
                                    </div>
                                </div>

                                {cartItems.map((item) => {
                                    // بنجيب المنتج عشان نعرف الـ Stock المتبقي للزرار
                                    const realProduct = getRealProduct(item.id);
                                    const remainingStock = realProduct ? realProduct.stock : 0;
                                    const maxAvailable = item.quantity + remainingStock;

                                    return (
                                        <div key={item.id} className="cart-item">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
                                                    <div className="product-info d-flex align-items-center">
                                                        <div className="product-image">
                                                            <img
                                                                src={item.images[0]}
                                                                alt={item.title}
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <div className="product-details">
                                                            <h6 className="product-title">{item.title}</h6>
                                                            <div className="product-meta">
                                                                {item.color && <span className="product-color">Color: {item.color}</span>}
                                                                {item.size && <span className="product-size">Size: {item.size}</span>}
                                                            </div>
                                                            {/* عرض رسالة لو المخزون خلص */}
                                                            {remainingStock === 0 && (
                                                                <span className="text-danger" style={{ fontSize: "0.8rem" }}>Max stock reached</span>
                                                            )}
                                                            <button
                                                                className="remove-item d-block mt-2"
                                                                onClick={() => handleRemove(item.id)}
                                                            >
                                                                <i className="bi bi-trash" /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                                    <div className="price-tag">
                                                        <span className="current-price">${item.price.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                                    <div className="quantity-selector">
                                                        <button
                                                            className="quantity-btn decrease"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <i className="bi bi-dash" />
                                                        </button>

                                                        <input
                                                            type="number"
                                                            className="quantity-input"
                                                            value={item.quantity}
                                                            min={1}
                                                            max={maxAvailable} // استخدام الـ Max الصحيح
                                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                            // نمنع الكتابة اليدوية لأرقام خيالية
                                                            onBlur={(e) => {
                                                                let val = parseInt(e.target.value);
                                                                if (val > maxAvailable) handleQuantityChange(item.id, maxAvailable);
                                                                if (val < 1) handleQuantityChange(item.id, 1);
                                                            }}
                                                        />

                                                        <button
                                                            className="quantity-btn increase"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            disabled={remainingStock === 0} // نقفل الزرار لو مفيش مخزون إضافي
                                                        >
                                                            <i className="bi bi-plus" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                                    <div className="item-total">
                                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="cart-actions">
                                    <button className="btn btn-outline-remove" onClick={handleEmptyCart}>
                                        <i className="bi bi-trash" /> Clear Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ملخص الطلب - Order Summary */}
                        <div className="col-lg-4 mt-4 mt-lg-0">
                            <div className="cart-summary">
                                <h4 className="summary-title">Order Summary</h4>
                                <div className="summary-item">
                                    <span className="summary-label">Subtotal</span>
                                    <span className="summary-value">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-item shipping-item">
                                    <span className="summary-label">Shipping</span>
                                    <span className="summary-value">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Tax</span>
                                    <span className="summary-value">${tax.toFixed(2)}</span>
                                </div>
                                <div className="summary-total">
                                    <span className="summary-label">Total</span>
                                    <span className="summary-value">${total.toFixed(2)}</span>
                                </div>
                                <div className="checkout-button">
                                    <Link to="/Checkout" className="btn btn-accent w-100">
                                        Proceed to Checkout <i className="bi bi-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Cart;