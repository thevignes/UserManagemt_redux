import {
  REGISTER,
  LOGIN,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_FAIL,
  UPLOAD_PHOTO,
} from "@/Actions/Action";

const parseStoredItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    localStorage.removeItem(key);
    return null;
  }
};

const storedUser = parseStoredItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuth: !!storedToken,
  loading: false,

};
const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER:
        case LOGIN:
            try {
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            } catch (error) {
                console.error('Error storing user data:', error);
            }
            
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuth: true,
                loading: false
            };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            
            return {
                ...state,
                user: null,
                token: null,
                isAuth: false,
                loading: false
            };

        case UPLOAD_PHOTO:
            const updatedUser = {
                ...state.user,
                photo: action.payload
            };
   
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return {
                ...state,
                user: updatedUser
            };

        case LOGOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            
            return {
                ...state,
                user: null,
                token: null,
                isAuth: false,
                loading: false
            };

           
        default:
            return state;
    }
}
export default UserReducer