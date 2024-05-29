import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import User from "../pages/users"
import create from "../pages/users/create"
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
      <Route path="/user"
          element={
          <Menu>
            <Private Component={User} />
          </Menu>
        } 
      />
      <Route path="/user/create"
          element={
           <Menu>
             <Private Component={create} />
           </Menu>
        } 
      />
      <Route path="/user/create/:id"
          element={
           <Menu>
             <Private Component={create} />
           </Menu>
        } 
      />
    </Routes>
  );
};

export default RoutesComponent;
