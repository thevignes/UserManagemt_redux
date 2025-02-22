import React, { useState, useRef ,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NatureVideo from '../assets/6394054-uhd_4096_2048_24fps.mp4'
import Navbar from '@/components/ui/Navbar'
import { UploadImage } from '@/Actions/UserAction'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const fileInputRef = useRef(null);

  console.log('the user photo url',user)
  console.log('User Name:', user?.name || user?.user?.name)
  const [previewImage, setPreviewImage] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif']
      const maxSize = 5 * 1024 * 1024

      if (!validTypes.includes(file.type)) {
        toast.error('Only JPEG, PNG, and GIF files are allowed', {
          position: "top-right",
          autoClose: 3000,
        })
        return
      }

      if (file.size > maxSize) {
        toast.error('File size should be less than 5MB', {
          position: "top-right",
          autoClose: 3000,
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)

      dispatch(UploadImage(file))
        .then((response) => {
          console.log('Upload response:', response)
          if (response) {
            toast.success('Profile photo updated', {
              position: "top-right",
              autoClose: 3000
            })
          } else {
            throw new Error('No photo URL returned')
          }
        })
        .catch((error) => {
          console.error('Photo upload error:', error)
          toast.error('Failed to upload profile photo', {
            position: "top-right",
            autoClose: 3000,
          });
          
          setPreviewImage(null)
        });
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    try {
      toast.success('Profile updated successfully', {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (error) {
      toast.error('Failed to update profile', {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }
  // console.log('the user photo url',user)
  // console.log('User Name:', user?.name || user?.user?.name || 'No Name')

  // const userName = user?.name || user?.user?.name || 'User'
  // const userEmail = user?.email || user?.user?.email || 'No Email'
  // const userPhoto = user?.photo || user?.user?.photo || null

  // useEffect(() => {
  //   console.log('Full Redux User State:', user)
  //   console.log('User Object Keys:', Object.keys(user || {}))
  //   console.log('Name:', userName)
  //   console.log('Email:', userEmail)
  //   console.log('Photo:', userPhoto)
  // }, [user])

  return (
    <>
    <Navbar/>
    
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
          <h2 className="text-4xl font-bold mb-4">Your Profile</h2>
          <p className="text-xl mb-4">Manage your personal information</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-16 bg-black text-white">
        <form onSubmit={handleUpdateProfile} className="w-full max-w-md space-y-6">
          <div className="flex justify-center mb-6">
            <div 
              className="relative w-32 h-32 rounded-full border-4 border-gray-600 cursor-pointer hover:border-blue-500 transition-all"
              onClick={triggerFileInput}
            >
              {previewImage || user?.user?.photo ? (
                <img 
                  src={previewImage || user?.user?.photo} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  Upload Photo
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <div className="w-full p-3 bg-[#282828] border border-[#282828] rounded-md text-white">
              {user?.user?.name || 'No name found'}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <div className="w-full p-3 bg-[#282828] border border-[#282828] rounded-md text-white">
              {user?.user?.email || 'No email found'}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
    
    </>
  )
}

export default Profile