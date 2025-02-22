import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import AdminReducer from "@/Reducers/AdminReducer";
import userReducer from "@/Reducers/UserReducer"; 

const rootReducer = combineReducers({
  user: userReducer, 
  admin:AdminReducer
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;
