import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login } from "../Data/authSlice";
import "./Login.css"

import { useNavigate } from 'react-router-dom'

function ALLLogIn() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();




  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const resultAction = await dispatch(login(form));

    if (login.fulfilled.match(resultAction)) {
      const role = resultAction.payload.role;
      const redirect = role === "admin" ? "/admin" : "/";
      navigate(redirect, { replace: true });
    } else {
      setErr(resultAction.payload || "Login failed");
    }

    setLoading(false);
  };


  return (
    <div>
      <Navbar />
      <main className="main">
        {/* Page Title */}
        <div className="page-title light-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">Login</h1>
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="current">Login</li>
              </ol>
            </nav>
          </div>
        </div>
        {/* End Page Title */}
        {/* Login Section */}
        <section id="login" className="login section">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div
                  className="auth-container"
                  data-aos="fade-in"
                  data-aos-delay={200}
                >
                  {/* Login Form */}
                  <div className="auth-form login-form active">
                    <div className="form-header">
                      <h3>Welcome Back</h3>
                      <p>Sign in to your account</p>
                    </div>
                    <form className="auth-form-content" onSubmit={onSubmit}>
                      <div className="input-group mb-3">
                        <span className="input-icon">
                          <i className="bi bi-envelope" />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                          required=""
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-icon">
                          <i className="bi bi-lock" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          required=""
                          autoComplete="current-password"
                          value={form.password}
                          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                        />
                        <span className="password-toggle">
                          <i className="bi bi-eye" />
                        </span>
                      </div>
                      <div className="form-options mb-4">
                        <div className="remember-me">
                          <input type="checkbox" id="rememberLogin" />
                          <label htmlFor="rememberLogin">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">
                          Forgot password?
                        </a>
                      </div>
                      {err && <p className="text-red-500 text-sm">{err}</p>}
                      <button type="submit" className="auth-btn primary-btn mb-3" disabled={loading}>
                        {loading ? "..." : "Login"}
                        <i className="bi bi-arrow-right" />
                      </button>
                      <div className="divider">
                        <span>or</span>
                      </div>
                      <button type="button" className="auth-btn social-btn">
                        <i className="bi bi-google" />
                        Continue with Google
                      </button>
                      <div className="switch-form">
                        <span>Don't have an account?</span>
                        <button
                          type="button"
                          className="switch-btn"
                          data-target="register"
                        >
                          Create account
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Login Section */}
      </main>
      <Footer />
    </div>
  )
}

export default ALLLogIn