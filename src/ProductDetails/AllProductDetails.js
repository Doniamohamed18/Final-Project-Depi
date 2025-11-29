import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Drift from "drift-zoom";
import "drift-zoom/dist/drift-basic.css";

import { useParams, Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../Data/wishlistSlice";
import { addToCartWithStock } from "../Data/addToCartWithStock";
import { fetchAllProducts } from "../Data/productsSlice";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "./ProductDetails.css";

function AllProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. جلب البيانات من Redux
  const { products, loading } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  // 2. العثور على المنتج الحالي
  // بنستخدم useMemo أو مجرد البحث المباشر (هنا البحث المباشر تمام لأن Redux بيحدث الـ reference)
  const allProducts = Object.values(products).flat();
  // مقارنة آمنة للـ ID
  const product = allProducts.find((item) => String(item.id) === String(id));

  const inWishlist = wishlist.find((i) => i.id === product?.id);

  // 3. إدارة الكمية والـ Stock
  const [quantity, setQuantity] = useState(1);
  // بنحسب الـ Max Live من المنتج مباشرة
  const maxStock = product?.stock || 0; 
  const MIN_QUANTITY = 1;

  // 🔥 إصلاح: تحديث الكمية المختارة لو المخزون قل فجأة
  useEffect(() => {
    if (quantity > maxStock && maxStock > 0) {
      setQuantity(maxStock);
    }
  }, [maxStock, quantity]);

  const handleDecrease = () => setQuantity((q) => Math.max(q - 1, MIN_QUANTITY));
  const handleIncrease = () => setQuantity((q) => Math.min(q + 1, maxStock));

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.min(Math.max(value, MIN_QUANTITY), maxStock));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCartWithStock({ product, quantity: quantity }));

    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      navigate("/checkout");
    } else {
      // نستخدم نفس الـ Logic الموحد
     dispatch(addToCartWithStock({ product, quantity: quantity }));

      navigate("/checkout");
    }
  };

  const handleAddToWishlist = () => {
    if (product && !inWishlist) {
      dispatch(addToWishlist(product));
    }
  };

  // 4. إدارة الصور (Drift & Swiper)
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  // 🔥 إصلاح خطير: الاعتماد على product.id فقط وليس product كله
  // عشان لما الـ Stock يتغير، الصور متعملش Reset
  useEffect(() => {
    if (product?.images?.length > 0) {
      setImages(product.images);
      // بنحط الصورة الأولى فقط لو مفيش صورة نشطة أو لو المنتج اتغير كلياً
      setActiveImage((prev) => (product.images.includes(prev) ? prev : product.images[0]));
    }
  }, [product?.id, product?.images]); 

  const mainImageRef = useRef(null);
  const driftRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    if (mainImageRef.current && activeImage) {
      if (driftRef.current) driftRef.current.destroy();
      driftRef.current = new Drift(mainImageRef.current, {
        paneContainer: mainImageRef.current.parentElement,
        inlinePane: false,
        containInline: true,
        zoomFactor: 2,
      });
    }
  }, [activeImage]);

  // Fetch Data if empty
  useEffect(() => {
    if (!products || Object.keys(products).length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products]);

  if (loading || !product) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-5">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <br /><br /><br />
      <main className="main">
        <div className="page-title light-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1>{product.title}</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li className="current">Product Details</li>
              </ol>
            </nav>
          </div>
        </div>

        <section id="product-details" className="product-details section">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row g-4">
              {/* الصور */}
              <div className="col-lg-7" data-aos="zoom-in" data-aos-delay={150}>
                <div className="product-gallery">
                  <div className="main-showcase">
                    <div className="image-zoom-container">
                      <img
                        ref={mainImageRef}
                        src={activeImage || product.thumbnail} // Fallback
                        alt="Product Main"
                        className="img-fluid main-product-image drift-zoom"
                        data-zoom={activeImage}
                      />
                      {/* أزرار التنقل بين الصور */}
                      {images.length > 1 && (
                        <div className="image-navigation">
                          <button
                            className="nav-arrow prev-image"
                            onClick={() => {
                              const currentIndex = images.indexOf(activeImage);
                              setActiveImage(
                                images[(currentIndex - 1 + images.length) % images.length]
                              );
                            }}
                          ><i className="bi bi-chevron-left" /></button>
                          <button
                            className="nav-arrow next-image"
                            onClick={() => {
                              const currentIndex = images.indexOf(activeImage);
                              setActiveImage(
                                images[(currentIndex + 1) % images.length]
                              );
                            }}
                          ><i className="bi bi-chevron-right" /></button>
                        </div>
                      )}
                    </div>
                  </div>

                  {images.length > 1 && (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={10}
                      slidesPerView={4}
                      navigation
                      pagination={{ clickable: true }}
                      className="thumbnail-grid"
                    >
                      {images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div
                            className={`thumbnail-wrapper thumbnail-item ${activeImage === img ? "active" : ""}`}
                            onClick={() => setActiveImage(img)}
                          >
                            <img src={img} alt="" className="img-fluid" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </div>

              {/* تفاصيل المنتج */}
              <div className="col-lg-5 product-details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p style={{ color: "gray" }}>{product.brand ? `Brand: ${product.brand}` : null}</p>

                <h4>Price: {product.price} USD</h4>
                
                {/* 🔥 عرض الـ Stock المحدث */}
                <p className={product.stock > 0 ? "text-success" : "text-danger"}>
                   {product.stock > 0 ? `Only ${product.stock} items remaining` : "Out of Stock"}
                </p>

                {/* quantity */}
                <div className="quantity-control">
                  <label>Quantity:</label>
                  <div className="d-flex align-items-center gap-2">
                    <button 
                      onClick={handleDecrease} 
                      className="btn btn-dark" 
                      disabled={quantity <= MIN_QUANTITY}
                    >-</button>
                    
                    <input
                      type="number"
                      value={quantity}
                      min={MIN_QUANTITY}
                      max={maxStock}
                      onChange={handleQuantityChange}
                      className="form-control text-center"
                      style={{ width: "80px" }}
                      disabled={maxStock === 0}
                    />
                    
                    <button 
                      onClick={handleIncrease} 
                      className="btn btn-dark"
                      disabled={quantity >= maxStock}
                    >+</button>
                  </div>
                </div>

                <br />

                {/* Buttons */}
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-dark"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>

                  <button
                    className="btn btn-warning"
                    onClick={handleBuyNow}
                    // لو المنتج في الكارت اسمح له يروح Checkout حتى لو الستوك خلص
                    disabled={product.stock === 0 && !cartItems.find(i => i.id === product.id)}
                  >
                    Buy now
                  </button>

                  <button
                    className={`btn ${inWishlist ? "btn-success" : "btn-outline-danger"}`}
                    onClick={handleAddToWishlist}
                    disabled={!!inWishlist}
                  >
                    {inWishlist ? "In Wishlist ❤️" : "Add to Wishlist ❤️"}
                  </button>
                </div>

                <br />
                <Link to="/Products" className="btn btn-outline-danger w-100 mt-3">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AllProductDetails;