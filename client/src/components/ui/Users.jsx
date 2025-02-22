import { DeleteUser, GetUsers } from '@/Actions/AdminAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import SideBar from './SideBar';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@radix-ui/react-alert-dialog';

const AdminUsers = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const handleDelete = () => {
    if (!deleteUserId) return;

    dispatch(DeleteUser(deleteUserId))
      .then((response) => {
        toast.success(response?.message||"User deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        // alert(response?.message)
      })
      .catch((error) => {
        toast.error(error.message || "Failed to delete user!", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  return (
    <div className="flex">
      <SideBar className="min-h-screen" />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

       
        <div className="mb-6 relative">
          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <div className="pl-4">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full p-3 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

       
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/admin/users/edit/${user._id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center">
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                        </Link>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => setDeleteUserId(user._id)}
                            >
                              <FaTrash className="inline mr-1" /> Delete
                            </button>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg">
                            <AlertDialogTitle className="text-lg font-semibold">
                              Confirm Deletion
                            </AlertDialogTitle>
                            <AlertDialogDescription className="mt-2 text-gray-600">
                              Are you sure you want to delete this user? This action cannot be undone.
                            </AlertDialogDescription>
                            <div className="flex justify-end mt-4 space-x-4">
                              <AlertDialogCancel asChild>
                                <button className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
                                  Cancel
                                </button>
                              </AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <button
                                  onClick={handleDelete}
                                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                  Confirm
                                </button>
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchTerm ? 'No users match your search criteria' : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AdminUsers;
