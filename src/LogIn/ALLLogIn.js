import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import "./Login.css"

function ALLLogIn() {
  return (
    <div>
        <Navbar/>
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
              <form className="auth-form-content">
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
                <button type="submit" className="auth-btn primary-btn mb-3">
                  Sign In
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
            {/* Register Form */}
            <div className="auth-form register-form">
              <div className="form-header">
                <h3>Create Account</h3>
                <p>Join us today and get started</p>
              </div>
              <form className="auth-form-content">
                <div className="name-row">
                  <div className="input-group">
                    <span className="input-icon">
                      <i className="bi bi-person" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      required=""
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-icon">
                      <i className="bi bi-person" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      required=""
                      autoComplete="family-name"
                    />
                  </div>
                </div>
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
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-icon">
                    <i className="bi bi-lock" />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create password"
                    required=""
                    autoComplete="new-password"
                  />
                  <span className="password-toggle">
                    <i className="bi bi-eye" />
                  </span>
                </div>
                <div className="input-group mb-3">
                  <span className="input-icon">
                    <i className="bi bi-lock-fill" />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    required=""
                    autoComplete="new-password"
                  />
                  <span className="password-toggle">
                    <i className="bi bi-eye" />
                  </span>
                </div>
                <div className="terms-check mb-4">
                  <input type="checkbox" id="termsRegister" required="" />
                  <label htmlFor="termsRegister">
                    I agree to the <a href="#">Terms of Service</a> and{" "}
                    <a href="#">Privacy Policy</a>
                  </label>
                </div>
                <button type="submit" className="auth-btn primary-btn mb-3">
                  Create Account
                  <i className="bi bi-arrow-right" />
                </button>
                <div className="divider">
                  <span>or</span>
                </div>
                <button type="button" className="auth-btn social-btn">
                  <i className="bi bi-google" />
                  Sign up with Google
                </button>
                <div className="switch-form">
                  <span>Already have an account?</span>
                  <button
                    type="button"
                    className="switch-btn"
                    data-target="login"
                  >
                    Sign in
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
   <Footer/>
    </div>
  )
}

export default ALLLogIn