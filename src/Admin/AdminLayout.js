import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { Menu, X, BookOpen, PlusCircle, Home } from "lucide-react"
import { useSelector } from "react-redux";

function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) { 
      if (!isAuthenticated || !isAdmin) {
        navigate("/", { replace: true });
      }
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h4>Loading Admin Data...</h4>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h4>Access Denied. Redirecting...</h4>
      </div>
    )
  }

  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* Sidebar */}
      <aside
        className={`bg-dark text-white p-3 position-fixed h-100`}
        style={{
          width: "250px",
          transform: open || window.innerWidth >= 768 ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 1050
        }}
      >
        <button
          className="btn btn-link text-white d-md-none position-absolute top-0 end-0 m-2"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>

        <h5 className="mb-4">Admin Panel</h5>

        <nav className="nav flex-column gap-2">
          <NavLink to="/admin/Products" className="nav-link text-white">
            <BookOpen size={16} className="me-2" />
            All Products
          </NavLink>

          <NavLink to="/admin/add-product" className="nav-link text-white">
            <PlusCircle size={16} className="me-2" />
            Add Product
          </NavLink>

          <NavLink to="/" className="nav-link text-white">
            <Home size={16} className="me-2" />
            Back Home
          </NavLink>
        </nav>
      </aside>

      {/* Main Area */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: window.innerWidth >= 768 ? "250px" : "0"
        }}
      >

        {/* Header */}
        <header className="bg-white shadow-sm px-3 py-2 d-flex align-items-center">
          <button
            className="btn btn-outline-secondary d-md-none me-2"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h5 className="mb-0">Admin Dashboard</h5>
        </header>

        <main className="p-4">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AdminLayout
