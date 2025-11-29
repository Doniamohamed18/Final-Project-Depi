import ScrollToTop from "./ScrollToTop/ScrollToTop"
import { Outlet } from "react-router-dom";
import "./index.css"

function App() {
  return (
    <div>
      <ScrollToTop />  
      <Outlet />
    </div>
  );
}

export default App;
