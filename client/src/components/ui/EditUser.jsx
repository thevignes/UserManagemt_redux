import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react'
import { FaPhoneAlt, FaLock, FaUser, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from "./SideBar";
import { Edit_user } from "@/Actions/AdminAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditUser = () => {
    const { userId } = useParams(); 
    const navigate = useNavigate(); 
    const dispatch = useDispatch()

    const users = useSelector((state) => 
        state.admin.users?.find(user => user._id === userId)
    )

    const [userData, setUserdata] = useState({
        name: '',
        email: '',
        password: ''
    })


    useEffect(() => {
        if (users) {
            setUserdata({
                name: users.name || '',
                email: users.email || '',
                password: ''
            })
        }
    }, [users])

    const Handform = async (e) => {
        e.preventDefault();

        
        dispatch(Edit_user({
            ...userData, 
            userId: userId
        }))
        .then((response) => {
            if (response?.success) {
                toast.success(response.message)
                navigate('/admin/user') 
            } else {
                alert(response?.message || "Failed to update user")
            }
        })
        .catch((error) => {
            console.error("Error updating user:", error)
            alert("An error occurred while updating the user")
        })
    }

    const handleCancel = () => {
        navigate('/users') 
    }


    if (!users) {
        return (
            <div className="flex">
                <SideBar/>
                <div className="flex-1 p-4">
                    <div className="text-center text-red-500">
                        User not found or loading...
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex">
            <SideBar/>
            <div className="flex-1 p-4">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Edit User</h1>
                    
                    <form onSubmit={Handform}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                <div className="flex items-center">
                                    <FaUser className="mr-2" />
                                    Name
                                </div>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userData.name}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter user's name"
                                onChange={(e) => setUserdata({...userData, name: e.target.value})}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                <div className="flex items-center">
                                    <FaEnvelope className="mr-2" />
                                    Email
                                </div>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter user's email"
                                onChange={(e) => setUserdata({...userData, email: e.target.value})}
                            />
                        </div>
                
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                <div className="flex items-center">
                                    <FaLock className="mr-2" />
                                    Password
                                </div>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={userData.password}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Leave blank to keep current password"
                                onChange={(e) => setUserdata({...userData, password: e.target.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-4"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default EditUser