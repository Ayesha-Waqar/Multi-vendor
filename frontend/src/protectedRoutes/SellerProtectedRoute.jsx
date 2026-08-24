import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader"

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSeller) {
    return <Navigate to={`/shop-login`} replace />;
  }

  // console.log("isLoading:", isLoading);
  // console.log("isSeller:", isSeller);
  // console.log("seller:", seller);
  return children;
};

export default SellerProtectedRoute;