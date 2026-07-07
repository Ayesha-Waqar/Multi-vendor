import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../server"

const ActivationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const activateUser = async () => {
      try {
        const { data } = await axios.post(
          `${server}/user/activation/${token}`,
          {},
          {
            withCredentials: true,
          }
        );

        toast.success(data.message || "Account Activated Successfully");

        navigate("/");
      } catch (error) {
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

export default ActivationPage;
// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { server } from "../server"

// const ActivationPage = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const activateUser = async () => {
//       try {
//         const { data } = await axios.post(
//           `${server}/user/activation/${token}`,
//           {},
//           {
//             withCredentials: true,
//           }
//         );

//         toast.success(data.message || "Account Activated Successfully");

//         navigate("/");
//       } catch (error) {
//         console.log( error.response?.data?.message)
//          console.log(error)
//         toast.error(
//           error.response?.data?.message || "Activation Failed"
//         );

//         navigate("/sign-up");
//       }
//     };

//     activateUser();
//   }, [token, navigate]);

//   return (
//     <div className="h-screen flex justify-center items-center text-xl font-semibold">
//       Activating your account...
//     </div>
//   );
// };

// export default ActivationPage;