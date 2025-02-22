import { ADMIN_LOGIN,ADMIN_LOGOUT,ADD_USER,EDIT_USER,DELETE_USER,GET_USERS } from "./AdminAct";
import axios from "axios";
export const Admin_Login =  (data) => async (dispatch) =>{
        try {
            const response   = await axios.post('http://localhost:5000/admin/adminLogin',data)
            const { token, user } = response.data;
        
        dispatch({
            type: ADMIN_LOGIN,
            payload: { 
               user, 
               token 
            }
        });
        
        localStorage.setItem('adminToken', token);
        return response.data;
        } catch (error) {
            const errorMessgae=error.response?.data?.message || 'Login Failed'
            throw {message:errorMessgae}
            
        }
}

export const GetUsers = () => async(dispatch) =>{
try {
    const Token = localStorage.getItem('adminToken')
    const response = await axios.get("http://localhost:5000/admin/users",{
        headers: {
            'Authorization': `Bearer ${Token}`
        }
        
    })

    dispatch({
        type: GET_USERS,
        payload: response.data
    })
    return response.data
} catch (error) {
    const errorMessgae = error.response?.data?.message || 'cannot fetch users'

    throw{message:errorMessgae}
}
}
export const Add_user = (data) => async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/admin/addUser', data);
      dispatch({ type: ADD_USER, payload: response.data });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add user!";
      throw { message: errorMessage };
    }
  };
  
export const Edit_user = (data) => async(dispatch) =>{
    try {
        const response = await axios.post(`http://localhost:5000/admin/editUser/${data.userId}`, data);
        dispatch({type: EDIT_USER, payload: response.data.user});
        return { 
            success: true, 
            message: "User updated successfully", 
            user: response.data.user 
        };
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        return { 
            success: false, 
            message: errorMessage 
        };
    }
};
export const DeleteUser = (userId) => async(dispatch)=>{
    try {
        const response = await axios.delete(`http://localhost:5000/admin/deleteUser/${userId}`)
        dispatch({type:DELETE_USER,payload:userId})
        return response.data || { message: "User deleted successfully" }

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete user'
        throw { message: errorMessage }
    }
}

export const Logout_admin = () => async(dispatch)=>{
    try{
        localStorage.removeItem('adminToken')
        dispatch({type:ADMIN_LOGOUT})
        return { message: "Logged out successfully" }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to logout'
        throw { message: errorMessage }
    }
}