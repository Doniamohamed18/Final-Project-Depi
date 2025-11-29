// ./index.jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Data/store";
import { Toaster } from "react-hot-toast";


// صفحاتك
import AllHome from './Home/AllHome';
import AllContact from './Contact/AllContact';
import AllAccount from './Account/AllAccount';
import AllSupport from './components/Footer/Support/AllSupport';
import AllTerms from './components/Footer/Tos/AllTerms';
import AllPrivacy from './components/Footer/privacy/AllPrivacy';
import AllProductDetails from './ProductDetails/AllProductDetails';
import AllProducts from "./Products/AllProducts";
import AllCheckout from './Checkout/AllCheckout';
import AllCart from "./Cart/AllCart";
import AllWishlist from './Wishlist/AllWishlist';
import AllAbout from './About/AllAbout';
import ALLLogIn from './LogIn/ALLLogIn';
import AllRegister from './Register/AllRegister';
import NotFound from "./PageNotFound/NotFound";


export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AllHome /> }, // الصفحة الافتراضية
      { path: "AllContact", element: <AllContact /> },
      { path: "AllAccount", element: <AllAccount /> },
      { path: "AllSupport", element: <AllSupport /> },
      { path: "AllTerms", element: <AllTerms /> },
      { path: "AllPrivacy", element: <AllPrivacy /> },
      { path: "ProductDetails/:id", element: <AllProductDetails /> },
      { path: "Products", element: <AllProducts /> },
      { path: "Products/:categoryName", element: <AllProducts /> },
      { path: "Checkout", element: <AllCheckout /> },
      { path: "Cart", element: <AllCart /> },
      { path: "Wishlist", element: <AllWishlist /> },
      { path: "About", element: <AllAbout /> },
      { path: "LogIn", element: <ALLLogIn /> },
      { path: "Register", element: <AllRegister /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </Provider>
);
