import { use } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContex";
import Loading from "../Error&Spinner/Loading";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = use(AuthContext);
  const history = useLocation();

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate state={history.pathname} to={"/signin"} />;
  } else {
    return children;
  }
};

export default PrivateRoute;
