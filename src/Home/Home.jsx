import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCardColor from "./ProductCardColor";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../Data/productsSlice";

function Home() {

  // Fetch products from "RTK"
  const dispatch = useDispatch();
  const { products, loading, categories } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistCount = useSelector(state => state.wishlist.wishlist.length);
  const totalUniqueItems = cartItems.length;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); //quantity
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);//price 

  //call data from Api & 3 random products
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const [featuredproduct, setFeaturedproduct] = useState(null);
  const [miniProducts, setMiniProducts] = useState([]);

  //Arr -> 1 featured & 2 mini products
  useEffect(() => {
    if (!loading) {
      const allProducts = categories.flatMap((cat) => products[cat] || []);
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      setFeaturedproduct(shuffled[0]);
      setMiniProducts(shuffled.slice(1, 3));
    }
  }, [loading, products, categories]);

  //Loading 
  if (loading) return <h2>Loading...</h2>;
   
// best 3
  const featuredItems = [
    ...(products.laptops?.filter((item) => item.title.includes("MacBook")) || []),
    ...(products.tablets?.filter((item) => item.title.includes("iPad")) || []),
    ...(products["mobile-accessories"]?.filter((item) =>
      item.title.includes("AirPods")
    ) || []),
  ].slice(0, 3);

  const combined = categories.flatMap((category) => products[category] || []);

  //elmontagat ele arbt t5las
  const bestSellers = [...combined]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 3);

    //Trending
  const trending = [...combined]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (a.stock !== b.stock) return a.stock - b.stock;
      return b.discountPercentage - a.discountPercentage;
    })
    .slice(0, 3);

    //Top Discount
  const topDiscount = [...combined]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 4);

  const allProductsArr = Object.values(products).flat();

  const topRating = [...allProductsArr].sort((a, b) => b.rating - a.rating)[0];
  const topDiscountfeatured = [...allProductsArr].sort(
    (a, b) => b.discountPercentage - a.discountPercentage
  )[0];
  const topPriceDrop = [...allProductsArr].sort((a, b) => b.price - a.price)[0];
  const lowestStock = [...allProductsArr].sort((a, b) => a.stock - b.stock)[0];

  const featured = [topRating, topDiscountfeatured, topPriceDrop, lowestStock];

  return (
    <div>

      {/* Hero Section */}
      <section id="hero" className="hero section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="content-wrapper" data-aos="fade-up" data-aos-delay={100}>
              <h1 className="hero-title col-lg-12">Discover Amazing Products</h1>
              <p className="hero-description col-lg-8 col-6">
                Explore our curated collection of premium items designed to enhance
                your lifestyle.
              </p>
              <div className="hero-actions">
                <Link to="/Products" className="btn-primary">
                  Shop Now
                </Link>
                <Link to="/Products" className="btn-secondary">
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Product */}
          <div className="hero-visuals" style={{ position: "relative" }}>
            {featuredproduct && (
              <Link
                to={`/ProductDetails/${featuredproduct.id}`}
                className="product-showcase"
              >
                <div className="product-card featured">
                  <img
                    src={featuredproduct.thumbnail}
                    alt={featuredproduct.title}
                    className="img-fluid"
                  />

                  {featuredproduct.discountPercentage > 0 && (
                    <div className="product-badge">
                      -{Math.round(featuredproduct.discountPercentage)}%
                    </div>
                  )}

                  <div className="product-info">
                    <h4>{featuredproduct.title}</h4>
                    <div className="price">
                      <span className="sale-price">
                        $
                        {Math.round(
                          featuredproduct.price *
                          (1 - featuredproduct.discountPercentage / 100)
                        )}
                      </span>
                      <span className="original-price">${featuredproduct.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Mini products */}
            <div className="product-grid">
              {miniProducts.map((item) => (
                <Link key={item.id} to={`/ProductDetails/${item.id}`} className="product-mini">
                  <img src={item.thumbnail} alt={item.title} className="img-fluid" />
                </Link>
              ))}
            </div>

            {/* Floating Icons */}
            <div className="floating-elements">
              <Link to="/Cart" className="floating-icon cart">
                <i className="bi bi-cart3" />
                <span className="notification-dot">{totalUniqueItems}</span>
              </Link>

              <Link to="/Wishlist" className="floating-icon wishlist">
                <i className="bi bi-heart" />
                <span className="notification-dot">{wishlistCount}</span>
              </Link>

              <div className="floating-icon search">
                <i className="bi bi-search" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Cards */}
      <section id="promo-cards" className="promo-cards section">
        <div className="container">
          <div className="row gy-4">
            {categories.map((category, index) => {
              const items = products[category] || [];
              const randomProduct = items[Math.floor(Math.random() * items.length)];

              return (
                <div key={index} className="col-lg-4">
                  <div className="category-card">
                    <div className="category-image">
                      <img
                        src={randomProduct?.thumbnail}
                        alt={randomProduct?.title}
                        className="img-fluid"
                      />
                    </div>

                    <div className="category-content">
                      <h4>{category}</h4>
                      <p>{items.length} products</p>
                      <Link to={`/Products/${category}`} className="card-link">
                        Shop Now <i className="bi bi-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="best-sellers" className="best-sellers section">
        <div className="container section-title">
          <h2>Best Sellers</h2>
        </div>

        <div className="container mt-5">
          <div className="row g-5">
            {featured.map((item, i) => (
              <div className="col-lg-3 col-md-6" key={i}>
                <ProductCardColor item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending - Best Sellers - Featured */}
      <div id="cards" className="cards section">
        <div className="container">
          <div className="row gy-4">
            {/* Trending */}
            <div className="col-lg-4 col-md-6">
              <div className="product-category">
                <h3 className="category-title">
                  <i className="bi bi-fire" /> Trending Now
                </h3>

                <div className="product-list">
                  {trending.map((item) => (
                    <Link to={`/ProductDetails/${item.id}`} key={item.id} className="product-link">
                      <div className="product-card">
                        <div className="product-image">
                          <img src={item.thumbnail} alt={item.title} className="img-fluid" />
                        </div>

                        <div className="product-info">
                          <h4>{item.title}</h4>
                          <span>${item.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Sellers */}
            <div className="col-lg-4 col-md-6">
              <div className="product-category">
                <h3 className="category-title">
                  <i className="bi bi-award" /> Best Sellers
                </h3>

                <div className="product-list">
                  {bestSellers.map((product) => (
                    <Link to={`/ProductDetails/${product.id}`} key={product.id} className="product-link">
                      <div className="product-card">
                        <div className="product-image">
                          <img src={product.thumbnail} alt={product.title} className="img-fluid" />
                        </div>

                        <div className="product-info">
                          <h4>{product.title}</h4>
                          <span>${product.price}</span>
                          <span className="badge bg-warning text-dark">
                            Stock left: {product.stock}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured */}
            <div className="col-lg-4 col-md-6">
              <div className="product-category">
                <h3 className="category-title">
                  <i className="bi bi-star" /> Featured Items
                </h3>

                <div className="product-list">
                  {featuredItems.map((item) => (
                    <Link key={item.id} to={`/ProductDetails/${item.id}`} className="product-link">
                      <div className="product-card">
                        <div className="product-image">
                          <img src={item.thumbnail} alt={item.title} className="img-fluid" />
                        </div>

                        <div className="product-info">
                          <h4>{item.title}</h4>
                          <span>${item.price}</span>
                          <span>({item.rating})</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discount Section */}
      <section className="call-to-action">
        <div className="container">
          <div className="row featured-products-row">
            {topDiscount.map((item, index) => (
              <div key={item.id} className="col-lg-3 col-md-6 mb-4">
                <Link to={`/ProductDetails/${item.id}`} className="product-link">
                  <div className="product-showcase">
                    <div className="product-image">
                      <img src={item.thumbnail} alt={item.title} className="img-fluid" />
                      <div className="discount-badge">
                        -{Math.round(item.discountPercentage)}%
                      </div>
                    </div>

                    <div className="product-details">
                      <h6>{item.title}</h6>
                      <div className="price-section">
                        <span className="original-price">${item.price}</span>
                        <span className="sale-price">
                          $
                          {Math.round(item.price * (1 - item.discountPercentage / 100))}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Home;
