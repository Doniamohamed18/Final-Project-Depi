import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { register } from "../Data/authSlice"

import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer'
import "./Register.css"

function AllRegister() {

  //state about form
  const [form, setForm] = useState({ email: "", password: "", name: "", confirmPassword: "" })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //onSubmit function
  const onSubmit = async (e) => {
    e.preventDefault()
    setErr("")

    // Validation
    if (!form.name.trim()) {
      return setErr("Please enter your full name")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      return setErr("Please enter a valid email address")
    }

    if (form.password.length < 8) {
      return setErr("Password must be at least 8 characters")
    }

    if (form.password !== form.confirmPassword) {
      return setErr("Passwords do not match")
    }

    setLoading(true)
   //admin or not && role
    const resultAction = await dispatch(register(form))
    if (register.fulfilled.match(resultAction)) {
      const role = resultAction.payload.role
      const redirect = role === "admin" ? "/admin" : "/"
      navigate(redirect, { replace: true })
    } else {
      setErr(resultAction.payload || "Register failed")
    }

    setLoading(false)
  }

  return (
    <div>
      <Navbar />
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

        {/* Register Section */}
        <section id="register" className="register section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="registration-form-wrapper">

                  <div className="form-header text-center">
                    <h2>Create Your Account</h2>
                    <p>Create your account and start shopping with us</p>
                  </div>

                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <form onSubmit={onSubmit}>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, name: e.target.value }))
                            }
                          />
                          <label>Full Name</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, email: e.target.value }))
                            }
                          />
                          <label>Email Address</label>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                minLength={8}
                                value={form.password}
                                onChange={(e) =>
                                  setForm((s) => ({ ...s, password: e.target.value }))
                                }
                              />
                              <label>Password</label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                minLength={8}
                                value={form.confirmPassword}
                                onChange={(e) =>
                                  setForm((s) => ({ ...s, confirmPassword: e.target.value }))
                                }
                              />
                              <label>Confirm Password</label>
                            </div>
                          </div>
                        </div>

                        {/* Error Message */}
                        {err && (
                          <p className="text-danger text-center mb-3">
                            {err}
                          </p>
                        )}

                        <div className="d-grid mb-4">
                          <button
                            type="submit"
                            className="btn btn-register"
                            disabled={loading}
                          >
                            {loading ? "..." : "Create account"}
                          </button>
                        </div>

                        <div className="login-link text-center">
                          <p>
                            Already have an account?{" "}
                            <Link to="/LogIn">Sign in</Link>
                          </p>
                        </div>

                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default AllRegister
