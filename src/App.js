import LandingPage from "./Components/LandingPage/LandingPage";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/ShoppingCart" element={<ShoppingCart/>}/>
        </Routes>
      
      </BrowserRouter>
    
    </div>
  );
}

export default App;
