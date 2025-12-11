import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeItem, emptyCart, updateItemQuantity, addItem } from "../Data/cartSlice"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { removeItemWithStock } from "../Data/removeItemWithStock";
import { updateCartQuantityWithStock } from "../Data/updateCartQuantityWithStock";
import "./Checkout.css"






function AllCheckout() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalUniqueItems = cartItems.length;
    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const isEmpty = cartItems.length === 0;

    const allProducts = useSelector((state) => state.products.products);

    const getRealProductStock = (id) => {
        for (const category in allProducts) {
            const foundProduct = allProducts[category].find(p => String(p.id) === String(id));
            if (foundProduct) return foundProduct.stock;
        }
        return 0;
    };

    const handleRemove = (id) => {
        dispatch(removeItemWithStock(id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        dispatch(updateCartQuantityWithStock(id, newQuantity));
    };

    useEffect(() => {

        function initCheckout() {
            // Detect checkout type
            const isMultiStepCheckout = document.querySelector('.checkout-steps') !== null;
            const isOnePageCheckout = document.querySelector('.checkout-section') !== null;

            // Initialize common functionality
            initInputMasks();
            initPromoCode();

            // Initialize checkout type specific functionality
            if (isMultiStepCheckout) {
                initMultiStepCheckout();
            }

            if (isOnePageCheckout) {
                initOnePageCheckout();
            }

            // Initialize tooltips (works for both checkout types)
            // initTooltips();
        }

        initCheckout();

        // Function to initialize multi-step checkout
        function initMultiStepCheckout() {
            const checkoutSteps = document.querySelectorAll('.checkout-steps .step');
            const checkoutForms = document.querySelectorAll('.checkout-form');
            const nextButtons = document.querySelectorAll('.next-step');
            const prevButtons = document.querySelectorAll('.prev-step');
            const editButtons = document.querySelectorAll('.btn-edit');
            const paymentMethods = document.querySelectorAll('.payment-method-header');
            const summaryToggle = document.querySelector('.btn-toggle-summary');
            const orderSummaryContent = document.querySelector('.order-summary-content');

            // Step Navigation
            nextButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const nextStep = parseInt(this.getAttribute('data-next'));
                    navigateToStep(nextStep);
                });
            });

            prevButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const prevStep = parseInt(this.getAttribute('data-prev'));
                    navigateToStep(prevStep);
                });
            });

            editButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const editStep = parseInt(this.getAttribute('data-edit'));
                    navigateToStep(editStep);
                });
            });

            // Payment Method Selection for multi-step checkout
            paymentMethods.forEach(header => {
                header.addEventListener('click', function () {
                    const radio = this.querySelector('input[type="radio"]');
                    if (radio) {
                        radio.checked = true;

                        const allPaymentMethods = document.querySelectorAll('.payment-method');
                        allPaymentMethods.forEach(method => {
                            method.classList.remove('active');
                        });

                        this.closest('.payment-method').classList.add('active');

                        const allPaymentBodies = document.querySelectorAll('.payment-method-body');
                        allPaymentBodies.forEach(body => {
                            body.classList.add('d-none');
                        });

                        const selectedBody = this.closest('.payment-method').querySelector('.payment-method-body');
                        if (selectedBody) {
                            selectedBody.classList.remove('d-none');
                        }
                    }
                });
            });

            // Order Summary Toggle (Mobile)
            if (summaryToggle) {
                summaryToggle.addEventListener('click', function () {
                    this.classList.toggle('collapsed');

                    if (orderSummaryContent) {
                        orderSummaryContent.classList.toggle('d-none');
                    }

                    // Toggle icon
                    const icon = this.querySelector('i');
                    if (icon) {
                        if (icon.classList.contains('bi-chevron-down')) {
                            icon.classList.remove('bi-chevron-down');
                            icon.classList.add('bi-chevron-up');
                        } else {
                            icon.classList.remove('bi-chevron-up');
                            icon.classList.add('bi-chevron-down');
                        }
                    }
                });
            }

            // Form Validation for multi-step checkout
            const forms = document.querySelectorAll('.checkout-form-element');
            forms.forEach(form => {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();

                    const requiredFields = form.querySelectorAll('[required]');
                    let isValid = true;

                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.classList.add('is-invalid');
                        } else {
                            field.classList.remove('is-invalid');
                        }
                    });

                    // If it's the final form and valid, show success message
                    if (isValid && form.closest('.checkout-form[data-form="4"]')) {
                        const formFields = form.querySelectorAll('.form-group, .review-sections, .form-check, .d-flex');
                        formFields.forEach(field => {
                            field.style.display = 'none';
                        });

                        const successMessage = form.querySelector('.success-message');
                        if (successMessage) {
                            successMessage.classList.remove('d-none');
                            successMessage.style.animation = 'fadeInUp 0.5s ease forwards';
                        }

                        // Simulate redirect after 3 seconds
                        setTimeout(() => {
                            console.log('Redirecting to order confirmation page...');
                        }, 3000);
                    }
                });
            });

            // Function to navigate between steps
            function navigateToStep(stepNumber) {
                checkoutSteps.forEach(step => {
                    const stepNum = parseInt(step.getAttribute('data-step'));

                    if (stepNum < stepNumber) {
                        step.classList.add('completed');
                        step.classList.remove('active');
                    } else if (stepNum === stepNumber) {
                        step.classList.add('active');
                        step.classList.remove('completed');
                    } else {
                        step.classList.remove('active', 'completed');
                    }
                });

                // Update step connectors
                const connectors = document.querySelectorAll('.step-connector');
                connectors.forEach((connector, index) => {
                    if (index + 1 < stepNumber) {
                        connector.classList.add('completed');
                        connector.classList.remove('active');
                    } else if (index + 1 === stepNumber - 1) {
                        connector.classList.add('active');
                        connector.classList.remove('completed');
                    } else {
                        connector.classList.remove('active', 'completed');
                    }
                });

                // Show the corresponding form
                checkoutForms.forEach(form => {
                    const formNum = parseInt(form.getAttribute('data-form'));

                    if (formNum === stepNumber) {
                        form.classList.add('active');

                        if (window.innerWidth < 768) {
                            form.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    } else {
                        form.classList.remove('active');
                    }
                });
            }
        }

        // Function to initialize one-page checkout
        function initOnePageCheckout() {
            const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');

            paymentOptions.forEach(option => {
                option.addEventListener('change', function () {
                    document.querySelectorAll('.payment-option').forEach(opt => {
                        opt.classList.remove('active');
                    });

                    this.closest('.payment-option').classList.add('active');
                    const paymentId = this.id;
                    document.querySelectorAll('.payment-details').forEach(details => {
                        details.classList.add('d-none');
                    });

                    document.getElementById(`${paymentId}-details`).classList.remove('d-none');
                });
            });

            // Form Validation for one-page checkout
            const checkoutForm = document.querySelector('.checkout-form');

            if (checkoutForm) {
                checkoutForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    //validation
                    const requiredFields = checkoutForm.querySelectorAll('[required]');
                    let isValid = true;

                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.classList.add('is-invalid');

                            if (isValid === false) {
                                field.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                                field.focus();
                                isValid = null;
                            }
                        } else {
                            field.classList.remove('is-invalid');
                        }
                    });

                    // If form is valid, show success message
                    if (isValid === true) {
                        const sections = document.querySelectorAll('.checkout-section');
                        sections.forEach((section, index) => {
                            if (index < sections.length - 1) {
                                section.style.display = 'none';
                            }
                        });

                        const termsCheck = document.querySelector('.terms-check');
                        const placeOrderContainer = document.querySelector('.place-order-container');

                        if (termsCheck) termsCheck.style.display = 'none';
                        if (placeOrderContainer) placeOrderContainer.style.display = 'none';

                        const successMessage = document.querySelector('.success-message');
                        if (successMessage) {
                            successMessage.classList.remove('d-none');
                            successMessage.style.animation = 'fadeInUp 0.5s ease forwards';
                        }

                        const orderReview = document.getElementById('order-review');
                        if (orderReview) {
                            orderReview.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }

                        setTimeout(() => {
                            console.log('Redirecting to order confirmation page...');
                        }, 3000);
                    }
                });

                const formInputs = checkoutForm.querySelectorAll('input, select, textarea');
                formInputs.forEach(input => {
                    input.addEventListener('input', function () {
                        if (this.value.trim()) {
                            this.classList.remove('is-invalid');
                        }
                    });
                });
            }
        }

        // Function to initialize input masks (common for both checkout types)
        function initInputMasks() {
            const cardNumberInput = document.getElementById('card-number');
            if (cardNumberInput) {
                cardNumberInput.addEventListener('input', function (e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 16) value = value.slice(0, 16);

                    let formattedValue = '';
                    for (let i = 0; i < value.length; i++) {
                        if (i > 0 && i % 4 === 0) {
                            formattedValue += ' ';
                        }
                        formattedValue += value[i];
                    }

                    e.target.value = formattedValue;
                });
            }

            // Expiry date input mask (format: MM/YY)
            const expiryInput = document.getElementById('expiry');
            if (expiryInput) {
                expiryInput.addEventListener('input', function (e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 4) value = value.slice(0, 4);

                    if (value.length > 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2);
                    }

                    e.target.value = value;
                });
            }

            // CVV input mask (3-4 digits)
            const cvvInput = document.getElementById('cvv');
            if (cvvInput) {
                cvvInput.addEventListener('input', function (e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 4) value = value.slice(0, 4);
                    e.target.value = value;
                });
            }

            // Phone number input mask
            const phoneInput = document.getElementById('phone');
            if (phoneInput) {
                phoneInput.addEventListener('input', function (e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 10) value = value.slice(0, 10);

                    if (value.length > 0) {
                        if (value.length <= 3) {
                            value = '(' + value;
                        } else if (value.length <= 6) {
                            value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                        } else {
                            value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6);
                        }
                    }

                    e.target.value = value;
                });
            }

            // ZIP code input mask (5 digits)
            const zipInput = document.getElementById('zip');
            if (zipInput) {
                zipInput.addEventListener('input', function (e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 5) value = value.slice(0, 5);
                    e.target.value = value;
                });
            }
        }

        // Function to handle promo code application (common for both checkout types)
        function initPromoCode() {
            const promoInput = document.querySelector('.promo-code input');
            const promoButton = document.querySelector('.promo-code button');

            if (promoInput && promoButton) {
                promoButton.addEventListener('click', function () {
                    const promoCode = promoInput.value.trim();

                    if (promoCode) {
                        // Simulate promo code validation
                        if (promoCode.toUpperCase() === 'DISCOUNT20') {
                            // Show success state
                            promoInput.classList.add('is-valid');
                            promoInput.classList.remove('is-invalid');
                            promoButton.textContent = 'Applied';
                            promoButton.disabled = true;

                            // Update order total (in a real app, this would recalculate based on the discount)
                            const orderTotal = document.querySelector('.order-total span:last-child');
                            const btnPrice = document.querySelector('.btn-price');

                            if (orderTotal) {
                                const currentTotal = parseFloat(orderTotal.textContent.replace('$', ''));
                                const discountedTotal = (currentTotal * 0.8).toFixed(2);
                                orderTotal.textContent = '$' + discountedTotal;

                                if (btnPrice) {
                                    btnPrice.textContent = '$' + discountedTotal;
                                }

                                const orderTotals = document.querySelector('.order-totals');
                                if (orderTotals) {
                                    const discountElement = document.createElement('div');
                                    discountElement.className = 'order-discount d-flex justify-content-between';
                                    discountElement.innerHTML = `
                <span>Discount (20%)</span>
                <span>-$${(currentTotal * 0.2).toFixed(2)}</span>
              `;

                                    const totalElement = document.querySelector('.order-total');
                                    if (totalElement) {
                                        orderTotals.insertBefore(discountElement, totalElement);
                                    }
                                }
                            }
                        } else {
                            promoInput.classList.add('is-invalid');
                            promoInput.classList.remove('is-valid');

                            setTimeout(() => {
                                promoInput.classList.remove('is-invalid');
                            }, 3000);
                        }
                    }
                });
            }
        }




    }, []);

    return (
        <div>
            <Navbar />
            {isEmpty ? (
                <div className="container text-center py-5">
                    <h3>Your cart is empty 🛒</h3>
                    <p className="text-muted mb-4">Please add some items before checking out.</p>
                    <Link to="/Products" className="btn btn-dark">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div>
                        {/* Page Title */}
                        <div className="page-title light-background">
                            <div className="container d-lg-flex justify-content-between align-items-center">
                                <h1 className="mb-2 mb-lg-0">Checkout</h1>
                                <nav className="breadcrumbs">
                                    <ol>
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="current">Checkout</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        {/* End Page Title */}
                    </div>

                    <div>
                        {/* Checkout Section */}
                        <section id="checkout" className="checkout section">
                            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                                <div className="row">
                                    <div className="col-lg-7">
                                        {/* Checkout Form */}
                                        <div className="checkout-container" data-aos="fade-up">
                                            <form className="checkout-form">
                                                {/* Customer Information */}
                                                <div className="checkout-section" id="customer-info">
                                                    <div className="section-header">
                                                        <div className="section-number">1</div>
                                                        <h3>Customer Information</h3>
                                                    </div>
                                                    <div className="section-content">
                                                        <div className="row">
                                                            <div className="col-md-6 form-group">
                                                                <label htmlFor="first-name">First Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="first-name"
                                                                    className="form-control"
                                                                    id="first-name"
                                                                    placeholder="Your First Name"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label htmlFor="last-name">Last Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="last-name"
                                                                    className="form-control"
                                                                    id="last-name"
                                                                    placeholder="Your Last Name"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email Address</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                name="email"
                                                                id="email"
                                                                placeholder="Your Email"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="phone">Phone Number</label>
                                                            <input
                                                                type="tel"
                                                                className="form-control"
                                                                name="phone"
                                                                id="phone"
                                                                placeholder="Your Phone Number"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Shipping Address */}
                                                <div className="checkout-section" id="shipping-address">
                                                    <div className="section-header">
                                                        <div className="section-number">2</div>
                                                        <h3>Shipping Address</h3>
                                                    </div>
                                                    <div className="section-content">
                                                        <div className="form-group">
                                                            <label htmlFor="address">Street Address</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="address"
                                                                id="address"
                                                                placeholder="Street Address"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="apartment">
                                                                Apartment, Suite, etc. (optional)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="apartment"
                                                                id="apartment"
                                                                placeholder="Apartment, Suite, Unit, etc."
                                                            />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 form-group">
                                                                <label htmlFor="city">City</label>
                                                                <input
                                                                    type="text"
                                                                    name="city"
                                                                    className="form-control"
                                                                    id="city"
                                                                    placeholder="City"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-4 form-group">
                                                                <label htmlFor="state">State</label>
                                                                <input
                                                                    type="text"
                                                                    name="state"
                                                                    className="form-control"
                                                                    id="state"
                                                                    placeholder="State"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-4 form-group">
                                                                <label htmlFor="zip">ZIP Code</label>
                                                                <input
                                                                    type="text"
                                                                    name="zip"
                                                                    className="form-control"
                                                                    id="zip"
                                                                    placeholder="ZIP Code"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="country">Country</label>
                                                            <select
                                                                className="form-select"
                                                                id="country"
                                                                name="country"
                                                                required
                                                            >
                                                                <option value="">Select Country</option>
                                                                <option value="US">United States</option>
                                                                <option value="CA">Canada</option>
                                                                <option value="UK">United Kingdom</option>
                                                                <option value="AU">Australia</option>
                                                                <option value="DE">Germany</option>
                                                                <option value="FR">France</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="save-address"
                                                                name="save-address"
                                                            />
                                                            <label className="form-check-label" htmlFor="save-address">
                                                                Save this address for future orders
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="billing-same"
                                                                name="billing-same"
                                                                defaultChecked=""
                                                            />
                                                            <label className="form-check-label" htmlFor="billing-same">
                                                                Billing address same as shipping
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Payment Method */}
                                                <div className="checkout-section" id="payment-method">
                                                    <div className="section-header">
                                                        <div className="section-number">3</div>
                                                        <h3>Payment Method</h3>
                                                    </div>
                                                    <div className="section-content">
                                                        <div className="payment-options">
                                                            <div className="payment-option active">
                                                                <input
                                                                    type="radio"
                                                                    name="payment-method"
                                                                    id="credit-card"
                                                                    defaultChecked=""
                                                                />
                                                                <label htmlFor="credit-card">
                                                                    <span className="payment-icon">
                                                                        <i className="bi bi-credit-card-2-front" />
                                                                    </span>
                                                                    <span className="payment-label">
                                                                        Credit / Debit Card
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="payment-option">
                                                                <input type="radio" name="payment-method" id="paypal" />
                                                                <label htmlFor="paypal">
                                                                    <span className="payment-icon">
                                                                        <i className="bi bi-paypal" />
                                                                    </span>
                                                                    <span className="payment-label">PayPal</span>
                                                                </label>
                                                            </div>
                                                            <div className="payment-option">
                                                                <input
                                                                    type="radio"
                                                                    name="payment-method"
                                                                    id="apple-pay"
                                                                />
                                                                <label htmlFor="apple-pay">
                                                                    <span className="payment-icon">
                                                                        <i className="bi bi-apple" />
                                                                    </span>
                                                                    <span className="payment-label">Apple Pay</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="payment-details" id="credit-card-details">
                                                            <div className="form-group">
                                                                <label htmlFor="card-number">Card Number</label>
                                                                <div className="card-number-wrapper">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="card-number"
                                                                        id="card-number"
                                                                        placeholder="1234 5678 9012 3456"
                                                                        required
                                                                    />
                                                                    <div className="card-icons">
                                                                        <i className="bi bi-credit-card-2-front" />
                                                                        <i className="bi bi-credit-card" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="expiry">Expiration Date</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="expiry"
                                                                        id="expiry"
                                                                        placeholder="MM/YY"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="cvv">Security Code (CVV)</label>
                                                                    <div className="cvv-wrapper">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="cvv"
                                                                            id="cvv"
                                                                            placeholder={123}
                                                                            required
                                                                        />
                                                                        <span
                                                                            className="cvv-hint"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            title="3-digit code on the back of your card"
                                                                        >
                                                                            <i className="bi bi-question-circle" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="card-name">Name on Card</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="card-name"
                                                                    id="card-name"
                                                                    placeholder="John Doe"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="payment-details d-none" id="paypal-details">
                                                            <p className="payment-info">
                                                                You will be redirected to PayPal to complete your purchase
                                                                securely.
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="payment-details d-none"
                                                            id="apple-pay-details"
                                                        >
                                                            <p className="payment-info">
                                                                You will be prompted to authorize payment with Apple Pay.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Order Review */}
                                                <div className="checkout-section" id="order-review">
                                                    <div className="section-header">
                                                        <div className="section-number">4</div>
                                                        <h3>Review &amp; Place Order</h3>
                                                    </div>
                                                    <div className="section-content">
                                                        <div className="form-check terms-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="terms"
                                                                name="terms"
                                                                required
                                                            />
                                                            <label className="form-check-label" htmlFor="terms">
                                                                I agree to the{" "}
                                                                <a
                                                                    href="#"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#termsModal"
                                                                >
                                                                    Terms and Conditions
                                                                </a>{" "}
                                                                and{" "}
                                                                <a
                                                                    href="#"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#privacyModal"
                                                                >
                                                                    Privacy Policy
                                                                </a>
                                                            </label>
                                                        </div>
                                                        <div className="success-message d-none">
                                                            Your order has been placed successfully! Thank you for your
                                                            purchase.
                                                        </div>
                                                        <div className="place-order-container">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary place-order-btn"
                                                            >
                                                                <span className="btn-text">Total Cart</span>
                                                                <span className="btn-price">
                                                                    {Math.ceil(cartTotal)} USD
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div
                                            className="order-summary"
                                            data-aos="fade-left"
                                            data-aos-delay={200}
                                        >
                                            <div className="order-summary-header">
                                                <h3>Order Summary</h3>
                                                <span className="item-count">{totalUniqueItems} Items</span>
                                            </div>
                                            <div className="order-summary-content">
                                                <div className="order-items">
                                                    {cartItems.map((product) => {
                                                        // 👈🏻 تعريف المخزون المتبقي داخل الـ map
                                                        const remainingStock = getRealProductStock(product.id);

                                                        return (
                                                            <div key={product.id} className="order-item">
                                                                <div className="order-item-image">
                                                                    <img
                                                                        src={product.images[0]}
                                                                        alt="Product"
                                                                        className="img-fluid"
                                                                    />
                                                                </div>
                                                                <div className="order-item-details">
                                                                    <h4>{product.title}</h4>
                                                                    <p className="order-item-variant">{product.brand}</p>
                                                                    <div className="order-item-price">
                                                                        <span className="quantity">{product.quantity} ×</span>
                                                                        <span className="price">{Math.ceil(product.price)}</span>
                                                                    </div>

                                                                    <div className='d-flex align-items-center gap-2 mt-2'>
                                                                        {/* زر الإزالة */}
                                                                        <button
                                                                            className='btn btn-danger'
                                                                            onClick={() => handleRemove(product.id)}
                                                                        >
                                                                            &times;
                                                                        </button>

                                                                        {/* زر النقصان (-) */}
                                                                        <button
                                                                            className="btn btn-outline-secondary"
                                                                            onClick={() => {
                                                                                if (product.quantity > 1) {
                                                                                    handleQuantityChange(product.id, product.quantity - 1);
                                                                                }
                                                                            }}
                                                                            disabled={product.quantity <= 1}
                                                                        >
                                                                            -
                                                                        </button>

                                                                        {/* زر الزيادة (+) */}
                                                                        <button
                                                                            className="btn btn-outline-success"
                                                                            onClick={() => {
                                                                                // الشرط: نزيد فقط إذا كان هناك مخزون متبقي (Remaining Stock)
                                                                                if (remainingStock > 0) {
                                                                                    handleQuantityChange(product.id, product.quantity + 1);
                                                                                }
                                                                            }}
                                                                            // تعطيل الزر إذا كان المخزون المتبقي صفر
                                                                            disabled={remainingStock === 0}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>

                                                                    {/* رسالة تنبيه للمخزون */}
                                                                    {remainingStock === 0 && <span className="text-danger small mt-1 d-block">Max quantity reached.</span>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="order-totals">
                                                    <div className="order-subtotal d-flex justify-content-between">
                                                        <span>Subtotal</span>
                                                        <span>{Math.ceil(cartTotal)} USD</span>
                                                    </div>
                                                    <div className="order-shipping d-flex justify-content-between">
                                                        <span>Shipping</span>
                                                        <span>5 USD</span>
                                                    </div>
                                                    <div className="order-tax d-flex justify-content-between">
                                                        <span>Tax</span>
                                                        <span>3 USD</span>
                                                    </div>
                                                    <div className="order-total d-flex justify-content-between">
                                                        <span>Total</span>
                                                        <span>{Math.ceil(cartTotal + 5 + 3)} USD</span>
                                                    </div>
                                                </div>
                                                <div className="secure-checkout">
                                                    <div className="secure-checkout-header">
                                                        <i className="bi bi-shield-lock" />
                                                        <span>Secure Checkout</span>
                                                    </div>
                                                    <div className="payment-icons">
                                                        <i className="bi bi-credit-card-2-front" />
                                                        <i className="bi bi-credit-card" />
                                                        <i className="bi bi-paypal" />
                                                        <i className="bi bi-apple" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* /Checkout Section */}
                    </div>
                </>
            )}
            <Footer />
        </div>

    )
}
export default AllCheckout