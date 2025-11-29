import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { getPagesList } from "./utils/getPagesFromRouter";
import "./NotFound.css"


function NotFound() {
    const [query, setQuery] = useState("");
    const pages = getPagesList();
    const navigate = useNavigate();

    const results = pages.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (path) => {
        navigate(path);
    };

    return (
        <>
            <Navbar />

            <main className="main">
                <div className="page-title light-background">
                    <div className="container d-lg-flex justify-content-between align-items-center">
                        <h1 className="mb-2 mb-lg-0">404</h1>
                        <nav className="breadcrumbs">
                            <ol>
                                <li><Link to="/">Home</Link></li>
                                <li className="current">404</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <section id="error-404" className="error-404 section">
                    <div className="container">
                        <div className="text-center">

                            <div className="error-icon mb-4">
                                <i className="bi bi-exclamation-circle"></i>
                            </div>

                            <h1 className="error-code mb-4">404</h1>

                            <h2 className="error-title mb-3">
                                Oops! Page Not Found
                            </h2>

                            <p className="error-text mb-4">
                                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                            </p>

                            {/* Search Input */}
                            <div className="search-box mb-4">
                                <div className="search-pages">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search for pages..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />

                                    {query && (
                                        <ul className="search-results">
                                            {results.length > 0 ? (
                                                results.map((p, i) => (
                                                    <Link key={i} onClick={() => handleSelect(p.path)}>
                                                        {p.name} <span className="small text-muted">({p.path})</span>
                                                    </Link>
                                                ))
                                            ) : (
                                                <li>No pages found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="error-action">
                                <Link to="/" className="btn btn-primary">Back to Home</Link>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default NotFound;
