import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import "./Register.css"

function AllRegister() {
  return (
    <div>
        <Navbar/>
        <main className="main">
  {/* Page Title */}
  <div className="page-title light-background">
    <div className="container d-lg-flex justify-content-between align-items-center">
      <h1 className="mb-2 mb-lg-0">Register</h1>
      <nav className="breadcrumbs">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="current">Register</li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Page Title */}
  {/* Register Section */}
  <section id="register" className="register section">
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="registration-form-wrapper">
            <div className="form-header text-center">
              <h2>Create Your Account</h2>
              <p>Create your account and start shopping with us</p>
            </div>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <form action="register.php" method="post">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      placeholder="Full Name"
                      required=""
                      autoComplete="name"
                    />
                    <label htmlFor="fullName">Full Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      required=""
                      autoComplete="email"
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          required=""
                          minLength={8}
                          autoComplete="new-password"
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          required=""
                          minLength={8}
                          autoComplete="new-password"
                        />
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      id="country"
                      name="country"
                      required=""
                    >
                      <option value="" selected="" disabled="">
                        Select your country
                      </option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="jp">Japan</option>
                      <option value="other">Other</option>
                    </select>
                    <label htmlFor="country">Country</label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="termsCheck"
                      name="termsCheck"
                      required=""
                    />
                    <label className="form-check-label" htmlFor="termsCheck">
                      I agree to the <a href="#">Terms of Service</a> and{" "}
                      <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="marketingCheck"
                      name="marketingCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="marketingCheck"
                    >
                      I would like to receive marketing communications about
                      products, services, and promotions
                    </label>
                  </div>
                  <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-register">
                      Create Account
                    </button>
                  </div>
                  <div className="login-link text-center">
                    <p>
                      Already have an account? <a href="#">Sign in</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="social-login">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <div className="divider">
                    <span>or sign up with</span>
                  </div>
                  <div className="social-buttons">
                    <a href="#" className="btn btn-social">
                      <i className="bi bi-google" />
                      <span>Google</span>
                    </a>
                    <a href="#" className="btn btn-social">
                      <i className="bi bi-facebook" />
                      <span>Facebook</span>
                    </a>
                    <a href="#" className="btn btn-social">
                      <i className="bi bi-apple" />
                      <span>Apple</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="decorative-elements">
              <div className="circle circle-1" />
              <div className="circle circle-2" />
              <div className="circle circle-3" />
              <div className="square square-1" />
              <div className="square square-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Register Section */}
</main>
<Footer/>
    </div>
  )
}

export default AllRegister