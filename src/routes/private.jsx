/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";

const Private = ({ Component }) => {
  const session = JSON.parse(localStorage.getItem("token"));
  return session?.token ? <Component /> : <Navigate to="/login" />;
};

export default Private;
