import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default RoutesComponent;
