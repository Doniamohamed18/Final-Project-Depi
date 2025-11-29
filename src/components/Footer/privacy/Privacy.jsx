import React from 'react'

function Privacy() {
    return (
        <div>
            <main className="main">
                {/* Page Title */}
                <div className="page-title light-background">
                    <div className="container d-lg-flex justify-content-between align-items-center">
                        <h1 className="mb-2 mb-lg-0">Privacy</h1>
                        <nav className="breadcrumbs">
                            <ol>
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="current">Privacy</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* End Page Title */}
                {/* Privacy Section */}
                <section id="privacy" className="privacy section">
                    <div className="container" data-aos="fade-up">
                        {/* Header */}
                        <div className="privacy-header" data-aos="fade-up">
                            <div className="header-content">
                                <span className="update-badge">Last Updated: February 27, 2025</span>
                                <h2>Privacy Policy</h2>
                                <p>
                                    We respect your privacy and are committed to protecting your
                                    personal data. This privacy policy explains how we handle your
                                    information.
                                </p>
                                <div className="privacy-badges">
                                    <div className="badge-item">
                                        <i className="bi bi-shield-check" />
                                        <span>Data Protection</span>
                                    </div>
                                    <div className="badge-item">
                                        <i className="bi bi-lock" />
                                        <span>Secure Storage</span>
                                    </div>
                                    <div className="badge-item">
                                        <i className="bi bi-person-lock" />
                                        <span>Privacy First</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Information Collection */}
                        <div className="info-section" data-aos="fade-up">
                            <div className="section-grid">
                                <div className="info-card">
                                    <div className="card-header">
                                        <i className="bi bi-collection" />
                                        <h3>Information We Collect</h3>
                                    </div>
                                    <div className="card-content">
                                        <ul className="info-list">
                                            <li>Name and contact information</li>
                                            <li>Account credentials</li>
                                            <li>Payment details</li>
                                            <li>Device information</li>
                                            <li>Usage data and preferences</li>
                                            <li>Communication records</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="card-header">
                                        <i className="bi bi-graph-up" />
                                        <h3>How We Use Data</h3>
                                    </div>
                                    <div className="card-content">
                                        <ul className="info-list">
                                            <li>Provide and improve services</li>
                                            <li>Process transactions</li>
                                            <li>Send updates and notifications</li>
                                            <li>Personalize user experience</li>
                                            <li>Analyze service usage</li>
                                            <li>Ensure security</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="card-header">
                                        <i className="bi bi-share" />
                                        <h3>Information Sharing</h3>
                                    </div>
                                    <div className="card-content">
                                        <ul className="info-list">
                                            <li>Service providers</li>
                                            <li>Business partners</li>
                                            <li>Legal requirements</li>
                                            <li>With user consent</li>
                                            <li>Business transactions</li>
                                            <li>Analytics partners</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Security Measures */}
                        <div className="security-section" data-aos="fade-up">
                            <div className="section-header">
                                <h3>Data Security Measures</h3>
                                <p>We implement appropriate security measures to protect your data</p>
                            </div>
                            <div className="measures-grid">
                                <div className="measure-item">
                                    <i className="bi bi-shield-lock" />
                                    <h4>Encryption</h4>
                                    <p>
                                        All data is encrypted during transmission and storage using
                                        industry-standard protocols
                                    </p>
                                </div>
                                <div className="measure-item">
                                    <i className="bi bi-fingerprint" />
                                    <h4>Access Control</h4>
                                    <p>
                                        Strict access controls and authentication measures protect your
                                        information
                                    </p>
                                </div>
                                <div className="measure-item">
                                    <i className="bi bi-eye-slash" />
                                    <h4>Data Privacy</h4>
                                    <p>Regular privacy assessments and data minimization practices</p>
                                </div>
                                <div className="measure-item">
                                    <i className="bi bi-patch-check" />
                                    <h4>Compliance</h4>
                                    <p>Adherence to international data protection regulations</p>
                                </div>
                            </div>
                        </div>
                        {/* User Rights */}
                        <div className="rights-section" data-aos="fade-up">
                            <div className="rights-content">
                                <h3>Your Privacy Rights</h3>
                                <p>You have several rights regarding your personal data:</p>
                                <div className="rights-grid">
                                    <div className="right-item">
                                        <i className="bi bi-eye" />
                                        <h4>Right to Access</h4>
                                        <p>You can request a copy of your personal data</p>
                                    </div>
                                    <div className="right-item">
                                        <i className="bi bi-pencil-square" />
                                        <h4>Right to Rectification</h4>
                                        <p>You can update or correct your information</p>
                                    </div>
                                    <div className="right-item">
                                        <i className="bi bi-trash" />
                                        <h4>Right to Erasure</h4>
                                        <p>Request deletion of your personal data</p>
                                    </div>
                                    <div className="right-item">
                                        <i className="bi bi-download" />
                                        <h4>Right to Data Portability</h4>
                                        <p>Transfer your data to another service</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Additional Information */}
                        <div className="additional-info" data-aos="fade-up">
                            <div className="info-grid">
                                <div className="info-item">
                                    <h4>Cookies Policy</h4>
                                    <p>
                                        We use cookies to enhance your browsing experience. You can
                                        control cookie preferences through your browser settings.
                                    </p>
                                </div>
                                <div className="info-item">
                                    <h4>Children's Privacy</h4>
                                    <p>
                                        Our services are not intended for children under 13. We do not
                                        knowingly collect data from children.
                                    </p>
                                </div>
                                <div className="info-item">
                                    <h4>Policy Updates</h4>
                                    <p>
                                        We may update this policy periodically. We will notify you of any
                                        material changes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Contact Section */}
                        <div className="privacy-contact" data-aos="fade-up">
                            <div className="contact-box">
                                <div className="contact-icon">
                                    <i className="bi bi-envelope-open" />
                                </div>
                                <div className="contact-content">
                                    <h4>Privacy Questions?</h4>
                                    <p>
                                        If you have any questions about this Privacy Policy, please
                                        contact our Data Protection Officer
                                    </p>
                                    <a href="#" className="contact-button">
                                        Contact DPO
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /Privacy Section */}
            </main>

        </div>
    )
}

export default Privacy