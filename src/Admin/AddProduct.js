// ./Admin/AddProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AddProduct() {
  const { user, loading } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    discountPercent: "",
    isFeatured: false,
    isOnSale: false,
    coverImage: null,
    brand: "",
  });

  // Load categories
  useEffect(() => {

    if (loading) return
    if (!isAuthenticated || !isAdmin) {
      navigate("/", { replace: true })
      return
    }

    const loadCats = async () => {
      try {
        const res = await fetch("http://localhost:5000/category/getCategories", {
          method: "GET",
          credentials: "include",
        })
        const data = await res.json()
        setCategories(Array.isArray(data) ? data : (data?.categories || []));
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCats(false);
      }
    }

    loadCats();
  }, [loading, isAuthenticated, isAdmin, navigate])


  // Handle input change
  const onChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file") {
      const file = files?.[0] || null;
      setForm((prev) => ({ ...prev, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!isAuthenticated || !isAdmin) {
      navigate('/', { replace: true })
      return
    }

    if (!form.title || !form.description || !form.price || !form.stock) {
      setMsg(" All required fields must be filled.");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("brand", form.brand);
    fd.append("price", form.price);
    fd.append("stock", form.stock);
    if (form.category) fd.append("category", form.category);
    fd.append("discountPercent", form.discountPercent || "0");
    fd.append("isFeatured", form.isFeatured);
    fd.append("isOnSale", form.isOnSale);
    if (form.coverImage) fd.append("coverImage", form.coverImage);

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:5000/products/CreateProduct", {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));


      if (res.status === 401 || res.status === 403) {
        setMsg(' Not authorized')
        navigate('/', { replace: true })
        return
      }

      if (!res.ok) throw new Error(data?.error || "Failed to create product");

      setMsg("✅ Product added successfully");

      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        discountPercent: "",
        isFeatured: false,
        isOnSale: false,
        coverImage: null,
        brand: "",
      });
      setPreview(null);
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) return null
  if (!isAuthenticated || !isAdmin) return null

  return (
    <div className="container">
      <h3 className="mb-4">Add Product</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title *</label>
            <input type="text" name="title" value={form.title} onChange={onChange} className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Price *</label>
            <input type="number" name="price" value={form.price} onChange={onChange} className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Stock *</label>
            <input type="number" name="stock" value={form.stock} onChange={onChange} className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select name="category" value={form.category} onChange={onChange} className="form-select" disabled={loadingCats}>
              <option value="">{loadingCats ? "Loading..." : "Select category"}</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Description *</label>
            <textarea name="description" value={form.description} onChange={onChange} className="form-control" rows={4} required />
          </div>
          <div className="col-12">
            <label className="form-label">Brand *</label>
            <textarea name="brand" value={form.brand} onChange={onChange} className="form-control" rows={4} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Discount Percent</label>
            <input type="number" name="discountPercent" value={form.discountPercent} onChange={onChange} className="form-control" min="0" max="100" />
          </div>

          <div className="col-md-6 d-flex align-items-center gap-3">
            <div className="form-check">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={onChange} className="form-check-input" />
              <label className="form-check-label">Featured</label>
            </div>

            <div className="form-check">
              <input type="checkbox" name="isOnSale" checked={form.isOnSale} onChange={onChange} className="form-check-input" />
              <label className="form-check-label">On Sale</label>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Cover Image</label>
            <input type="file" name="coverImage" onChange={onChange} className="form-control" />
            {preview && <img src={preview} alt="preview" className="img-thumbnail mt-2" style={{ width: "150px" }} />}
          </div>

        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={submitting}>
          {submitting ? "Submitting..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;


