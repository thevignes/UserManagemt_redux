import React, { useState } from 'react'
import { Register } from '@/Actions/UserAction'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NatureVideo from '../assets/6394054-uhd_4096_2048_24fps.mp4'
const RegisterUser = () => {
  const [userData, setUserdata] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = (e) => {
    e.preventDefault()

    dispatch(Register(userData))
      .then((response) => {
        setUserdata({
          name: '',
          email: '',
          password: '',
        })
      if(response && response.msg){
        toast.success(response.msg , {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }else{
        toast.success('Registred successfully' , {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        
      }
      setTimeout(()=>{

        navigate('/home')
      },3000)
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.msg || 
                        error?.response?.data?.message || 
                        'Registration failed'

        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 3500,
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
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-xl mb-4">Create your account and start your journey</p>
        </div>
      </div>

          <div className="w-1/2 flex items-center justify-center p-16 bg-black text-white">
        <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={(e) => setUserdata({ ...userData, name: e.target.value })}
              placeholder="Enter your name"
          
              className="w-full p-3 bg-[#282828] border border-[#282828] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
             
              className="w-full p-3 bg-[#282828] border border-[#282828] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Create a password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                onChange={(e) => setUserdata({ ...userData, password: e.target.value })}
                placeholder="Create a password"
           
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
            Sign up
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account? 
              <a 
                href="/login" 
                className="text-blue-500 ml-1 hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default RegisterUser