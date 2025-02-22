import { ADMIN_LOGIN,ADMIN_LOGOUT,ADD_USER,EDIT_USER,DELETE_USER,GET_USERS } from "@/Actions/AdminAct";


const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    token:localStorage.getItem('adminToken'),
    users : []

}

const AdminReducer =(state = initialState , action) =>{
    switch (action.type) {
        case ADMIN_LOGIN:
            return {...state,isAuthenticated: true,
            user: action.payload.user,
            token: action.payload.token,
            loading: false,
            error: null}
            case GET_USERS:
            return {...state,users:action.payload}
            case ADD_USER :
            return {...state,users: [...state.users, action.payload]}
          
            case EDIT_USER:
            return {
            ...state,
            users: state.users.map(user => 
            user._id === action.payload._id ? action.payload : user
                )
                }
            case DELETE_USER :
    
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
            };

            case ADMIN_LOGOUT :
            return {
            ...state,
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null
                }
            default:
            return state

    }
}

export default AdminReducer;