import { Router } from "express";
import AdminLogin from "../AdminController/Auth.js";
import{AddUser,DeleteUser,EditUser, UserList} from '../AdminController/AdminController.js'

const Route = Router()

Route.post('/adminLogin', AdminLogin);
Route.post('/addUser',AddUser)
Route.delete('/deleteUser/:id',DeleteUser)
Route.post('/editUser/:id',EditUser)
Route.get('/users',UserList)
export default Route
