import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsers } from '@/Actions/AdminAction'
import { Logout_admin } from '@/Actions/AdminAction'
import { useNavigate } from 'react-router-dom'
import SideBar from '@/components/ui/SideBar'

const AdminHome = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.admin)
    const adminToken = localStorage.getItem('adminToken')

    useEffect(() => {
        if (!adminToken) {
            navigate('/admin/login')
        } else {
            dispatch(GetUsers())
        }
    }, [dispatch, navigate, adminToken])

    const HandleLogout = () => {
        dispatch(Logout_admin())
        .then(() => {
            navigate('/admin/login')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // If no token, don't render the component
    if (!adminToken) {
        return null
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <SideBar/>
            <div className="flex-1 overflow-auto">
                <header className="h-16 bg-white shadow-md flex items-center px-6 justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                    <button 
                        onClick={HandleLogout} 
                        className="bg-red-500 align-middle hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Logout
                    </button>
                </header>

                <main className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                            <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-2">{users.length}</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default AdminHome;