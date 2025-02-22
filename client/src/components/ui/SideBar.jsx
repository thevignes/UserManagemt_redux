import React from 'react'
import { useState } from 'react';
import { Users, UserPlus, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    return (

      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-900`}>
      
        <div className="flex items-center justify-between h-16 px-4">
                <Link to="/admin/home">
                {isSidebarOpen && (
            <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
          )}
                </Link>
        
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-blue-400 hover:text-blue-300"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4">
            <Link to="/admin/user">
            <a 
              href=""
              className="flex items-center p-3 mb-3 text-gray-300 rounded-lg hover:bg-blue-900 hover:text-blue-400 transition-colors"
            >

              <Users size={20} />
              {isSidebarOpen && <span className="ml-4">Users</span>}
            </a>
            </Link>
            <a 
              href=""
              className="flex items-center p-3 mb-3 text-gray-300 rounded-lg hover:bg-blue-900 hover:text-blue-400 transition-colors"
            >
              <UserPlus size={20} />
              <Link to="/add/user">
              
              {isSidebarOpen && <span className="ml-4">Add User</span>}
              </Link>
            </a>
          </div>
        </nav>
      </div>
  
  )
}

export default SideBar
