import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../server"

const UserActivation = () => {
  // console.log("UserActivationPage rendered");
  const { token } = useParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    // console.log("Token:", token);
    const activateUser = async () => {
      try {
        const { data } = await axios.post(
          `${server}/user/user-activation/${token}`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log("data" , data)

        toast.success(data.message || "Account Activated Successfully");

        navigate("/");
      } catch (error) {
        console.log("activation failed" , error )
        toast.error(
          error.response?.data?.message || "Activation Failed"
        );

        navigate("/sign-up");
      }
    };


    activateUser();
  }, [token, navigate]);

  return (
    <div className="h-screen flex justify-center items-center text-xl font-semibold">
      Activating your account...
    </div>
  );
};

export default UserActivation;

