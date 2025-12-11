import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../Data/productsSlice";
import { Link } from "react-router-dom";
import "./Products.css"
import { addItem } from "../Data/cartSlice"
import { addToWishlist } from "../Data/wishlistSlice"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer/Footer"
import { addToCartWithStock } from "../Data/addToCartWithStock";
import { useParams } from "react-router-dom";


const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector(state => state.wishlist.wishlist);

  // ✅ State
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [brandCounts, setBrandCounts] = useState({});
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const maxValue = 3000;
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [itemsPerPage, setItemsPerPage] = useState(12);


  const { categoryName } = useParams();

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
      setCurrentPage(1);
      setSelectedBrands([]);
    }
  }, [categoryName]);



  // ✅ Fetch products
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // ✅ Count brands for selected category
  useEffect(() => {
    if (selectedCategory && products[selectedCategory]) {
      const counts = {};
      products[selectedCategory].forEach((p) => {
        counts[p.brand] = (counts[p.brand] || 0) + 1;
      });
      setBrandCounts(counts);
    }
  }, [selectedCategory, products]);

  // ✅ Available brands for selected category
  const availableBrands = useMemo(() => {
    if (!selectedCategory) return [];
    const brands = products[selectedCategory]?.map((p) => p.brand);
    return [...new Set(brands)];
  }, [selectedCategory, products]);

  // ✅ Filtered products
  const filteredProducts = useMemo(() => {
    let list = [];

    if (selectedCategory && products[selectedCategory]) {
      list = [...products[selectedCategory]];
    } else {
      // لو مفيش كاتيجوري، خلي كل المنتجات
      Object.values(products).forEach(catProducts => {
        list = list.concat(catProducts);
      });
    }

    // فلتر حسب البراند
    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    // فلتر حسب السعر
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // فلتر البحث
    if (searchTerm && searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      list = list.filter((p) =>
        p.title && p.title.toLowerCase().includes(q)
      );
    }

    // ترتيب
    if (sortBy === "low") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "high") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedCategory, products, selectedBrands, priceRange, sortBy, searchTerm]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);



  const handleAddToCart = (product) => {
    dispatch(addToCartWithStock({ product, quantity: 1 }));

  };



  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center p-5">Loading...</div>
        <Footer />
      </>
    );
  }


  const presetPriceRange = (v) => {
    if (v === "all") return setPriceRange([0, maxValue]);

    if (v.includes("-")) {
      const [min, max] = v.split("-").map(Number);
      return setPriceRange([min, max]);
    }

    if (v.includes("+")) {
      return setPriceRange([200, maxValue]);
    }

    return setPriceRange([0, Number(v)]);
  };




  return (
    <>
      <Navbar />
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Category</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="current">Category</li>
            </ol>
          </nav>
        </div>
      </div>
      <br />

      <div className="container">
        <div className="row">

          {/* SIDEBAR */}
          <div className="col-lg-3">
            <div className="sidebar-widget">

              {/* Categories */}
              <h4 className="widget-title">Categories</h4>
              <ul className="category-tree list-unstyled">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={`category-item ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                      setSelectedBrands([]);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {cat.replace("-", " ")}
                  </li>
                ))}
              </ul>

              {/* Price Range */}
              <div className="pricing-range-widget widget-item mt-4">
                <h3 className="widget-title">Price Range</h3>
                <div className="price-range-container">
                  <div className="current-range mb-3">
                    <span className="min-price">${priceRange[0]}</span>
                    <span className="max-price float-end">${priceRange[1]}</span>
                  </div>

                  <div className="range-slider">
                    <div className="slider-track"></div>
                    <div
                      className="slider-progress"
                      style={{
                        left: `${(priceRange[0] / maxValue) * 100}%`,
                        right: `${100 - (priceRange[1] / maxValue) * 100}%`,
                      }}
                    ></div>
                    <input
                      type="range"
                      className="min-range"
                      min="0"
                      max={maxValue}
                      step="10"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
                      }
                    />
                    <input
                      type="range"
                      className="max-range"
                      min="0"
                      max={maxValue}
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
                      }
                    />
                  </div>

                  <div className="price-inputs mt-3">
                    <div className="row g-2">
                      <div className="col-6">
                        <div className="input-group input-group-sm">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Min"
                            min="0"
                            max={maxValue}
                            step="10"
                            value={priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group input-group-sm">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Max"
                            min="0"
                            max={maxValue}
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div className="brand-filter-widget widget-item mt-4">
                  <h3 className="widget-title">Filter by Brand</h3>
                  <div className="brand-search mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search brands..."
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                    />
                  </div>

                  <div className="brand-list">
                    {availableBrands
                      .filter((brand) =>
                        brand.toLowerCase().includes(brandSearch.toLowerCase())
                      )
                      .map((brand, index) => (
                        <div className="form-check mb-1" key={index}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`brand-${index}`}
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                          />
                          <label className="form-check-label" htmlFor={`brand-${index}`}>
                            {brand} ({brandCounts[brand] || 0})
                          </label>
                        </div>
                      ))}
                  </div>

                  <div className="brand-actions mt-2 d-flex gap-2">

                    <button className="btn btn-sm btn-link" onClick={() => setSelectedBrands([])}>
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PRODUCT LIST */}

          <div className="col-lg-9">

            {/* ================== CATEGORY HEADER SECTION ================== */}
            <section id="category-header" className="category-header section">
              <div className="container" data-aos="fade-up">

                {/* Filter and Sort Options */}
                <div className="filter-container mb-4" data-aos="fade-up" data-aos-delay="100">
                  <div className="row g-3">

                    {/* Search Products */}
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="filter-item search-form">
                        <label htmlFor="productSearch" className="form-label">Search Products</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="productSearch"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <button className="btn search-btn" type="button">
                            <i className="bi bi-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price Preset */}
                    <div className="col-12 col-md-6 col-lg-2">
                      <div className="filter-item">
                        <label className="form-label">Price Range</label>
                        <select
                          className="form-select"
                          onChange={(e) => presetPriceRange(e.target.value)}
                        >
                          <option value="all">All Prices</option>
                          <option value="25">Under $25</option>
                          <option value="25-50">$25 to $50</option>
                          <option value="50-100">$50 to $100</option>
                          <option value="100-200">$100 to $200</option>
                          <option value="200+">$200 & Above</option>
                        </select>
                      </div>
                    </div>

                    {/* Sort */}
                    <div className="col-12 col-md-6 col-lg-2">
                      <div className="filter-item">
                        <label className="form-label">Sort By</label>
                        <select
                          className="form-select"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="default">Featured</option>
                          <option value="low">Price: Low to High</option>
                          <option value="high">Price: High to Low</option>
                          <option value="rating">Customer Rating</option>
                          <option value="new">Newest Arrivals</option>
                        </select>
                      </div>
                    </div>

                    {/* View + Items Per Page */}
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="filter-item">
                        <label className="form-label">View</label>
                        <div className="d-flex align-items-center">

                          {/* View Buttons */}
                          <div className="view-options me-3">
                            <button
                              type="button"
                              className={`btn view-btn ${viewType === "grid" ? "active" : ""}`}
                              onClick={() => setViewType("grid")}
                            >
                              <i className="bi bi-grid-3x3-gap-fill"></i>
                            </button>
                            <button
                              type="button"
                              className={`btn view-btn ${viewType === "list" ? "active" : ""}`}
                              onClick={() => setViewType("list")}
                            >
                              <i className="bi bi-list-ul"></i>
                            </button>
                          </div>

                          {/* Items Per Page */}
                          <div className="items-per-page">
                            <select
                              className="form-select"
                              value={itemsPerPage}
                              onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                              <option value="12">12 per page</option>
                              <option value="24">24 per page</option>
                              <option value="48">48 per page</option>
                              <option value="96">96 per page</option>
                            </select>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Active Filters */}
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="active-filters">
                        <span className="active-filter-label">Active Filters:</span>
                        <div className="filter-tags">

                          {/* Category tag */}
                          {selectedCategory && (
                            <span className="filter-tag">
                              {selectedCategory}
                              <button className="filter-remove" onClick={() => setSelectedCategory(null)}>
                                <i className="bi bi-x"></i>
                              </button>
                            </span>
                          )}

                          {/* Brand tags */}
                          {selectedBrands.map((b) => (
                            <span className="filter-tag" key={b}>
                              {b}
                              <button className="filter-remove" onClick={() =>
                                setSelectedBrands(selectedBrands.filter((x) => x !== b))
                              }>
                                <i className="bi bi-x"></i>
                              </button>
                            </span>
                          ))}

                          {/* Search tag */}
                          {searchTerm && (
                            <span className="filter-tag">
                              {searchTerm}
                              <button className="filter-remove" onClick={() => setSearchTerm("")}>
                                <i className="bi bi-x"></i>
                              </button>
                            </span>
                          )}

                          {/* Clear all */}
                          {(selectedCategory || selectedBrands.length > 0 || searchTerm) && (
                            <button
                              className="clear-all-btn"
                              onClick={() => {
                                setSelectedCategory(null);
                                setSelectedBrands([]);
                                setSearchTerm("");
                              }}
                            >
                              Clear All
                            </button>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>


            {/* Products */}
            <div className="category-product-list section">
              <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row g-4">
                  {paginatedProducts.map((product) => (
                    <div className="col-6 col-xl-4" key={product.id}>
                      <div className="product-card" data-aos="zoom-in">
                        <div className="product-image">
                          <img src={product.images[0]} alt={product.title} className="main-image img-fluid" />
                          <img src={product.images?.[1] || product.images?.[0]} alt={product.title} className="hover-image img-fluid" />
                        </div>
                        <div class="product-overlay">
                          <div class="product-actions">
                            <Link to={`/ProductDetails/${product.id}`} type="button" class="action-btn" data-bs-toggle="tooltip" title="Quick View" >
                              <i class="bi bi-eye"></i>
                            </Link>
                            <button type="button" class="action-btn" data-bs-toggle="tooltip" title="Add to Cart"
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock === 0} >
                              <i class="bi bi-cart-plus"></i>
                            </button>
                            <button type="button" class="action-btn" data-bs-toggle="tooltip" title="Add to Wishlist"
                              onClick={() => dispatch(addToWishlist(product))}>
                              <i className="bi bi-heart-fill" />
                            </button>
                          </div>
                        </div>
                        <div className="product-details">
                          <div className="product-category text-center">{product.brand}</div>
                          <h4 className="product-title text-center">{product.title}</h4>
                          <div className="product-meta d-flex justify-content-between text-center">
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">
                              <i className="bi bi-star-fill"></i> {product.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {paginatedProducts.length === 0 && (
                    <div className="text-center p-5">No Products Found</div>
                  )}
                </div>
              </div>
            </div>


            {/* Pagination */}
            <div className="category-pagination my-4 d-flex gap-2 justify-content-center">
              <button
                className="btn btn-dark"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn ${currentPage === i + 1 ? "btn-dark" : "btn-light"}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn btn-dark"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(currentPage + 1);

                }}
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
