import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";

function Products() {
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const [productList, setProductList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/getProducts", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 401 || res.status === 403) {
          setError("Not authorized");
          navigate("/", { replace: true });
          return;
        }

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setProductList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  if (authLoading || loadingProducts) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  const featuredProducts = productList?.filter(product => product.isFeatured);

  return (
    <div className='mt-5'>
      <h3 className='my-3'>Featured Products</h3>
      <div className='row g-4'>
        {featuredProducts.map(product => (
          <div className='col-12 col-md-4' key={product._id}>
            <div className='d-flex flex-column gap-3 border border-secondary p-3 rounded'>
              <img
                src={`http://localhost:5000/images/${product.coverImage}`}
                alt={product.title}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h6>{product.title}</h6>
              <strong style={{ color: '#F86D72' }}>{product.price} $</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
