import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./components/Layout/Loader"

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller  , seller } = useSelector((state) => state.seller);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSeller) {
    return <Navigate to={`/seller/shop-login`} replace />;
  }

  return children;
};

export default SellerProtectedRoute;