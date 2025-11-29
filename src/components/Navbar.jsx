import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import AnnouncementSlider from "./Footer/AnnouncementSlider"
import "./Navbar.css"
import { useState } from 'react';

function Navbar() {

    const [mobileNavActive, setMobileNavActive] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const wishlistCount = useSelector(state => state.wishlist.wishlist.length);

    const toggleMobileNav = () => {
        setMobileNavActive(!mobileNavActive);
        document.body.classList.toggle('mobile-nav-active');
    };

    const closeMobileNav = () => {
        setMobileNavActive(false);
        document.body.classList.remove("mobile-nav-active");
    };

    const totalUniqueItems = cartItems.length;
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <>
            <header id="header" className="header sticky-top">

                {/* Top Bar */}
                <div className="top-bar py-2">
                    <div className="container-fluid container-xl">
                        <div className="row align-items-center">
                            <div className="col-lg-4 d-none d-lg-flex">
                                <div className="top-bar-item">
                                    <i className="bi bi-telephone-fill me-2" />
                                    <span>Need help? Call us: </span>
                                    <NavLink to="tel:+1234567890">+1 (234) 567-890</NavLink>
                                </div>
                            </div>

                            <AnnouncementSlider />

                            <div className="col-lg-4 d-none d-lg-block">
                                <div className="d-flex justify-content-end">
                                    {/* Language & Currency same */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="main-header">
                    <div className="container-fluid container-xl">
                        <div className="d-flex py-3 align-items-center justify-content-between">

                            <NavLink to="/" className="logo d-flex align-items-center">
                                <h1 className="sitename">NiceShop</h1>
                            </NavLink>


                            <form className="search-form desktop-search-form">
                                <div className="input-group">
                                    <input type="text" class="form-control" placeholder="Search for products" />
                                    <button className="btn" type="submit">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </form>


                            <div className="header-actions d-flex align-items-center justify-content-end">


                                <button
                                    className="header-action-btn d-xl-none"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#mobileSearch"
                                    aria-expanded="false"
                                    aria-controls="mobileSearch"
                                >
                                    <i className="bi bi-search"></i>
                                </button>


                                {/* Account */} <div className="dropdown account-dropdown">
                                    <button className="header-action-btn" data-bs-toggle="dropdown"> <i className="bi bi-person" /> </button>
                                    <div className="dropdown-menu"> <div className="dropdown-header"> <h6> Welcome to <span className="sitename">FashionStore</span> </h6> <p className="mb-0">Access account &amp; manage orders</p> </div>
                                        <div className="dropdown-body">
                                            <NavLink className="dropdown-item d-flex align-items-center" to="/AllAccount" > <i className="bi bi-person-circle me-2" /> <span>My Profile</span> </NavLink>
                                            <NavLink className="dropdown-item d-flex align-items-center" to="account.html" > <i className="bi bi-bag-check me-2" /> <span>My Orders</span> </NavLink>
                                            <NavLink className="dropdown-item d-flex align-items-center" to="/Wishlist" > <i className="bi bi-heart me-2" /> <span>My Wishlist</span> </NavLink>
                                            <NavLink className="dropdown-item d-flex align-items-center" to="account.html" > <i className="bi bi-gear me-2" /> <span>Settings</span> </NavLink> </div>
                                        <div className="dropdown-footer"> <NavLink to="/LogIn" className="btn btn-primary w-100 mb-2"> Sign In </NavLink> <NavLink to="/Register" className="btn btn-outline-primary w-100"> Register </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* Wishlist */}
                                <NavLink to="/Wishlist" className="header-action-btn d-none d-md-block">
                                    <i className="bi bi-heart" />
                                    <span className="badge">{wishlistCount}</span>
                                </NavLink>

                                {/* Cart */}
                                <NavLink to="/Cart" className="header-action-btn">
                                    <i className="bi bi-cart3" />
                                    <span className="badge">{totalUniqueItems}</span>
                                </NavLink>

                                <i className="mobile-nav-toggle d-xl-none bi bi-list me-0"
                                    onClick={toggleMobileNav}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="header-nav ">
                    <div className="container-fluid container-xl position-relative">
                        <nav id="navmenu" className="navmenu">

                            <ul>
                                <li><NavLink to="/" className="active" onClick={closeMobileNav}>Home</NavLink></li>
                                <li><NavLink to="/About" onClick={closeMobileNav}>About</NavLink></li>
                                <li><NavLink to="/Products" onClick={closeMobileNav}>Category</NavLink></li>
                                <li><NavLink to="/Cart" onClick={closeMobileNav}>Cart</NavLink></li>
                                <li><NavLink to="/Checkout" onClick={closeMobileNav}>Checkout</NavLink></li>
                                <li><NavLink to="/AllContact" onClick={closeMobileNav}>Contact</NavLink></li>
                            </ul>

                        </nav>
                    </div>
                </div>

                {/* <!-- Mobile Search Form --> */}
                <div className="collapse" id="mobileSearch">
                    <div className="container">
                        <form className="search-form">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products" />
                                <button className="btn" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </header>
        </>
    )
}

export default Navbar;
