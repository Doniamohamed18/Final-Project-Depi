import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Footer.css"

function Footer() {
    return (
        <>
            <footer id="footer" className="footer dark-background">
                <div className="footer-main">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-widget footer-about">
                                    <a href="index.html" className="logo">
                                        <span className="sitename">NiceShop</span>
                                    </a>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
                                        nibh vehicula, facilisis magna ut, consectetur lorem. Proin eget
                                        tortor risus.
                                    </p>
                                    <div className="social-links mt-4">
                                        <h5>Connect With Us</h5>
                                        <div className="social-icons">
                                            <a href="https://www.facebook.com" target='_blank' aria-label="Facebook">
                                                <i className="bi bi-facebook" />
                                            </a>
                                            <a href="https://www.instagram.com" target='_blank' aria-label="Instagram">
                                                <i className="bi bi-instagram" />
                                            </a>
                                            <a href="https://pro.x.com/i/flow/login?mx=2" target='_blank' aria-label="Twitter">
                                                <i className="bi bi-twitter-x" />
                                            </a>
                                            <a href="https://www.tiktok.com/login" target='_blank' aria-label="TikTok">
                                                <i className="bi bi-tiktok" />
                                            </a>
                                            <a href="https://www.pinterest.com/" target='_blank' aria-label="Pinterest">
                                                <i className="bi bi-pinterest" />
                                            </a>
                                            <a href="https://www.youtube.com/" target='_blank' aria-label="YouTube">
                                                <i className="bi bi-youtube" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6">
                                <div className="footer-widget">
                                    <h4>Shop</h4>
                                    <ul className="footer-links">
                                        <li>
                                            <a href="category.html">All Products</a>
                                        </li>
                                        <li>
                                            <a href="category.html">women's wear</a>
                                        </li>
                                        <li>
                                            <a href="category.html">Men's wear</a>
                                        </li>
                                        <li>
                                            <a href="category.html">Accessories</a>
                                        </li>
                                        <li>
                                            <a href="category.html">Kid's Fashion</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6">
                                <div className="footer-widget">
                                    <h4>Support</h4>
                                    <ul className="footer-links">
                                        <li>
                                            <NavLink to="/AllSupport">Help Center</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/AllAccount">Order Status</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/AllContact">Contact Us</NavLink>
                                        </li>
                                        <li>
                                            <a href="#">Returns &amp; Exchanges</a>
                                        </li>
                                        <li>
                                            <a href="#">Size Guide</a>
                                        </li>
                                        <li>
                                            <a href="#">Shipping Info</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-widget">
                                    <h4>Contact Information</h4>
                                    <div className="footer-contact">
                                        <div className="contact-item">
                                            <i className="bi bi-geo-alt" />
                                            <span>123 Fashion Street, New York, NY 10001</span>
                                        </div>
                                        <div className="contact-item">
                                            <i className="bi bi-telephone" />
                                            <span>+1 (555) 123-4567</span>
                                        </div>
                                        <div className="contact-item">
                                            <i className="bi bi-envelope" />
                                            <span>hello@example.com</span>
                                        </div>
                                        <div className="contact-item">
                                            <i className="bi bi-clock" />
                                            <span>
                                                Monday-Friday: 9am-6pm
                                                <br />
                                                Saturday: 10am-4pm
                                                <br />
                                                Sunday: Closed
                                            </span>
                                        </div>
                                    </div>
                                    <div className="app-buttons mt-4">
                                        <a href="#" className="app-btn">
                                            <i className="bi bi-apple" />
                                            <span>App Store</span>
                                        </a>
                                        <a href="#" className="app-btn">
                                            <i className="bi bi-google-play" />
                                            <span>Google Play</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row gy-3 align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="copyright">
                                    <p>
                                        © <span>Copyright</span>{" "}
                                        <strong className="sitename">NiceShop</strong>. All Rights
                                        Reserved.
                                    </p>
                                </div>
                                <div className="credits mt-1">
                                    {/* All the links in the footer should remain intact. */}
                                    {/* You can delete the links only if you've purchased the pro version. */}
                                    {/* Licensing information: https://bootstrapmade.com/license/ */}
                                    {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
                                    Designed by <a href="https://bootstrapmade.com/">Donia's team</a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="d-flex flex-wrap justify-content-lg-end justify-content-center align-items-center gap-4">
                                    <div className="payment-methods">
                                        <div className="payment-icons">
                                            <i className="bi bi-credit-card" aria-label="Credit Card" />
                                            <i className="bi bi-paypal" aria-label="PayPal" />
                                            <i className="bi bi-apple" aria-label="Apple Pay" />
                                            <i className="bi bi-google" aria-label="Google Pay" />
                                            <i className="bi bi-shop" aria-label="Shop Pay" />
                                            <i className="bi bi-cash" aria-label="Cash on Delivery" />
                                        </div>
                                    </div>
                                    <div className="legal-links">
                                        <NavLink to="/AllTerms">Terms</NavLink>
                                        <NavLink to="/AllPrivacy">Privacy</NavLink>
                                        {/* <a href="tos.html">Cookies</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer