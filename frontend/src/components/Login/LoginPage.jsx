import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from '../../styles/styles';
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    return (

        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                    Login to your account
                </h2>
            </div>

            <div className="mt-8 mx-auto w-full sm:max-w-md">
               
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                           
                            <div className="relative mt-1">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                                    {visible ? (
                                        <AiOutlineEye
                                            className="cursor-pointer"
                                            size={22}
                                            onClick={() => setVisible(false)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className="cursor-pointer"
                                            size={22}
                                            onClick={() => setVisible(true)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-900 cursor-pointer">
                                    Remember Me
                                </label>
                            </div>
                            <div>
                                <a href=".forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
                            >
                                Submit
                            </button>
                        </div>

                        <div className="flex items-center justify-center w-full text-sm pt-2">
                            <h4 className="text-gray-600">Not have any account?</h4>
                            <Link to="/sign-up" className="text-blue-600 font-medium pl-2 hover:underline">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;