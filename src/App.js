import { useEffect } from "react";
import { checkAuthStatus, logout } from "./Data/authSlice";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus())
      .unwrap()
      .catch(() => {
        dispatch(logout());
        document.cookie = "token=; Max-Age=0; path=/;";
        navigate("/", { replace: true }); 
      });
  }, [dispatch, navigate]);

  if (loading) return <div>Loading...</div>; 

  return (
    <div>
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default App;
