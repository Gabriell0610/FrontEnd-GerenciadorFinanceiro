import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Private from "./private";
import { Menu } from "../components/index";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <Menu>
            <Private Component={Home} />
          </Menu>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
