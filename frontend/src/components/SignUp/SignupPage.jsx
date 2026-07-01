import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from '../../styles/styles';
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx"
import { HiOutlineUpload } from "react-icons/hi";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState('')

  const handleSubmit = async (e) => {
    console.log("gggggggg")
  }

  const handleFileInput = (e) => {
    // console.log(e)
    const file = e.target.files[0]
    setAvatar(file)
  }
  return (

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

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


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar Picture
              </label>
              <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-3 transition-colors duration-200 hover:border-blue-400">

                {/* Avatar Display wrapper */}
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center group">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar-preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <RxAvatar className="h-full w-full text-gray-300" />
                  )}
                </div>

                {/* Upload Action Block */}
                <div className="text-center">
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    <HiOutlineUpload className="text-gray-500 text-sm" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileInput}
                      className="sr-only"
                    />
                  </label>
                  <p className="mt-1.5 text-xs text-gray-400">
                    Accepted format: .jpg, .png (Max: 5MB)
                  </p>
                </div>

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
              <h4 className="text-gray-600">Already have an account?</h4>
              <Link to="/login" className="text-blue-600 font-medium pl-2 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage
