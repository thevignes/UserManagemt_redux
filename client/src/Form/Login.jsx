import React, { useState } from 'react'
import { decrement, increment, Login } from '../Actions/UserAction'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NatureVideo from '../assets/6394054-uhd_4096_2048_24fps.mp4'

const LoginPage = () => {
  const [userData, setUserdata] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()

    dispatch(Login(userData))

      .then((response) => {
        setUserdata({
          email: '',
          password: '',
        })
        navigate('/home')

        toast.success(response?.msg || 'Login successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.msg || 
                        error?.response?.data?.message || 
                        'Login failed'

        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 relative overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 min-w-full min-h-full object-cover"
        >
          <source 
            src={NatureVideo}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center p-8">
          <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-xl mb-4">Sign in to continue your journey</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-16 bg-black text-white">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              What's your email?
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) => setUserdata({ ...userData, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="w-full p-3 bg-[#282828] border border-[#282828] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Enter your password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                onChange={(e) => setUserdata({ ...userData, password: e.target.value })}
                placeholder="Enter your password"
                required
                className="w-full p-3 bg-[#282828] border border-[#282828] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

         

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account? 
              <a 
                href="/" 
                className="text-blue-500 ml-1 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
  
      </div>
      <ToastContainer />
      
    </div>
  )
}

export default LoginPage