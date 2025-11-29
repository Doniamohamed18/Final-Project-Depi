import React from 'react'

function MainSupport() {
    return (
        <div>
            <main className="main">
                {/* Page Title */}
                <div className="page-title light-background">
                    <div className="container d-lg-flex justify-content-between align-items-center">
                        <h1 className="mb-2 mb-lg-0">Support</h1>
                        <nav className="breadcrumbs">
                            <ol>
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="current">Support</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* End Page Title */}
                {/* Support Section */}
                <section id="support" className="support section">
                    <div className="container" data-aos="fade-up">
                        {/* Support Header */}
                        <div className="support-header" data-aos="fade-up">
                            <div className="header-content">
                                <h2>Help &amp; Support Center</h2>
                                <p>Find answers, tutorials, and help from our support team</p>
                            </div>
                        </div>
                        {/* Quick Support Actions */}
                        <div className="quick-support" data-aos="fade-up" data-aos-delay={100}>
                            <div className="action-item live-chat">
                                <div className="action-content">
                                    <i className="bi bi-chat-text" />
                                    <h4>Live Chat</h4>
                                    <p>Chat with our support team</p>
                                    <a href="#" className="action-button">
                                        Start Chat
                                    </a>
                                </div>
                            </div>
                            <div className="action-item phone">
                                <div className="action-content">
                                    <i className="bi bi-telephone" />
                                    <h4>Call Us</h4>
                                    <p>24/7 support line</p>
                                    <a href="tel:1234567890" className="action-button">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>
                            <div className="action-item email">
                                <div className="action-content">
                                    <i className="bi bi-envelope" />
                                    <h4>Email Support</h4>
                                    <p>Get email support</p>
                                    <a href="#" className="action-button">
                                        Send Email
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Help Topics */}
                        <div className="help-categories" data-aos="fade-up" data-aos-delay={200}>
                            <h3>Popular Help Topics</h3>
                            <div className="category-cards">
                                <a
                                    href="#"
                                    className="category-card"
                                    data-aos="zoom-in"
                                    data-aos-delay={100}
                                >
                                    <span className="icon">
                                        <i className="bi bi-box-seam" />
                                    </span>
                                    <h5>Orders &amp; Shipping</h5>
                                    <ul>
                                        <li>Track your order</li>
                                        <li>Shipping methods</li>
                                        <li>Returns &amp; exchanges</li>
                                    </ul>
                                    <span className="arrow">
                                        <i className="bi bi-arrow-right" />
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="category-card"
                                    data-aos="zoom-in"
                                    data-aos-delay={200}
                                >
                                    <span className="icon">
                                        <i className="bi bi-wallet2" />
                                    </span>
                                    <h5>Billing &amp; Payments</h5>
                                    <ul>
                                        <li>Payment methods</li>
                                        <li>Invoices</li>
                                        <li>Refund status</li>
                                    </ul>
                                    <span className="arrow">
                                        <i className="bi bi-arrow-right" />
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="category-card"
                                    data-aos="zoom-in"
                                    data-aos-delay={300}
                                >
                                    <span className="icon">
                                        <i className="bi bi-person-gear" />
                                    </span>
                                    <h5>Account Settings</h5>
                                    <ul>
                                        <li>Profile management</li>
                                        <li>Password reset</li>
                                        <li>Privacy settings</li>
                                    </ul>
                                    <span className="arrow">
                                        <i className="bi bi-arrow-right" />
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="category-card"
                                    data-aos="zoom-in"
                                    data-aos-delay={400}
                                >
                                    <span className="icon">
                                        <i className="bi bi-shield-check" />
                                    </span>
                                    <h5>Security</h5>
                                    <ul>
                                        <li>Account security</li>
                                        <li>Two-factor auth</li>
                                        <li>Privacy policy</li>
                                    </ul>
                                    <span className="arrow">
                                        <i className="bi bi-arrow-right" />
                                    </span>
                                </a>
                            </div>
                        </div>
                        {/* Self Help */}
                        <div className="self-help" data-aos="fade-up" data-aos-delay={300}>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="content-box">
                                        <h3>Self-Help Resources</h3>
                                        <p className="subtitle">
                                            Find answers quickly with our comprehensive resources
                                        </p>
                                        <div className="resource-links">
                                            <a href="#" className="resource-link">
                                                <i className="bi bi-play-circle" />
                                                <div className="link-content">
                                                    <h6>Video Tutorials</h6>
                                                    <p>Step-by-step video guides</p>
                                                </div>
                                            </a>
                                            <a href="#" className="resource-link">
                                                <i className="bi bi-file-text" />
                                                <div className="link-content">
                                                    <h6>User Guides</h6>
                                                    <p>Detailed documentation</p>
                                                </div>
                                            </a>
                                            <a href="#" className="resource-link">
                                                <i className="bi bi-book" />
                                                <div className="link-content">
                                                    <h6>Knowledge Base</h6>
                                                    <p>Articles and tutorials</p>
                                                </div>
                                            </a>
                                            <a href="#" className="resource-link">
                                                <i className="bi bi-tools" />
                                                <div className="link-content">
                                                    <h6>Troubleshooting</h6>
                                                    <p>Common issues and fixes</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="faq-section">
                                        <h4>Common Questions</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h3>
                                                    How do I track my order?
                                                    <i className="bi bi-plus faq-toggle" />
                                                </h3>
                                                <div className="faq-answer">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        You can track your order using your order number in the
                                                        tracking section.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="faq-item">
                                                <h3>
                                                    Can I change my shipping address?
                                                    <i className="bi bi-plus faq-toggle" />
                                                </h3>
                                                <div className="faq-answer">
                                                    <p>
                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                        laboris. Contact support to change your shipping address
                                                        before the item ships.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="faq-item">
                                                <h3>
                                                    What payment methods do you accept?
                                                    <i className="bi bi-plus faq-toggle" />
                                                </h3>
                                                <div className="faq-answer">
                                                    <p>
                                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                                        esse cillum dolore eu fugiat nulla pariatur. We accept all
                                                        major credit cards and PayPal.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /Support Section */}
            </main>

        </div>
    )
}

export default MainSupport