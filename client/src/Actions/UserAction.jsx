import { REGISTER, LOGIN, REGISTER_FAIL, LOGIN_FAIL, LOGOUT,UPLOAD_PHOTO,INCREMENT,DECREMENT } from "./Action";
import axios from "axios";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgtswnvyb/image/upload"; 
const UPLOAD_PRESET = "User_profile"



export const Register = (userdata) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/register', userdata);
        
    
        dispatch({ 
            type: REGISTER, 
            payload: {
                user: response.data.user,
                token: response.data.token
            }
        });
       
        return response.data.user
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response?.data || error.message });
        throw error
    }
};

export const Login = (userdata) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/login', userdata);
        dispatch({ 
            type: LOGIN, 
            payload: {
                user: response.data.user,
                token: response.data.token
            }
        });
        
        return response.data.user
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response?.data || error.message });
        throw error
    }
};

export const Logout = () => (dispatch) => {
    dispatch({ type: LOGOUT })
};

export const UploadImage = (file) => async (dispatch) => {
    try {
        const formdata = new FormData()
        formdata.append('file',file)
        formdata.append('upload_preset', UPLOAD_PRESET)
        const response = await axios.post(CLOUDINARY_URL,formdata,{
            headers:{'Content-Type': 'multipart/formdata'}
        })
        dispatch({type:UPLOAD_PHOTO , payload:response.data.secure_url })

        return response.data.secure_url
    } catch (error) {
        console.error('Photo upload to Cloudinary failed:', error)
        throw error
    }
}

export const increment = () =>{
    return{
        type:INCREMENT

    }
}
export const decrement = () =>{
    return{
        type:DECREMENT
    }
}