import Register from "./Pages/Register";
import Login from "./Pages/login";
import { Route, Routes } from "react-router-dom";
import FarmerDashbord from "./Pages/FarmerPage/FarmerDashbord";
import PrivateRouteFarmer from "./PrivateRouteFarmer";
import BuyerDashbord from "./Pages/BuyerPage/BuyerDashbord";
import Home from "./Pages/Home";
import PrivateRouteBuyer from "./PrivateRouteBuyer";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/farmer-dashboard" element={<PrivateRouteFarmer />}>
          <Route path="" element={<FarmerDashbord />} />
        </Route>
        <Route path="/buyer-dashboard" element={<PrivateRouteBuyer />}>
          <Route path="" element={<BuyerDashbord />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
