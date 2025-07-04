import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GuestbookContext } from "../api/GuestBookContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(GuestbookContext);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
