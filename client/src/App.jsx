import Register from "./Form/Register"
import {Routes,Route,Navigate } from "react-router-dom"
import LoginPage from "./Form/Login";
import Home from "./Home/Home";
import Profile from "./Home/Profile";
import AdminLogin from "./Form/AdminLogin";
import AdminHome from "./Home/AdminHome";
import AddUser from "./components/ui/AddUser";
import AdminUsers from "./components/ui/Users";
import EditUser from "./components/ui/EditUser";
import { PrivateRoute } from "./ProctedRoute/PrivateRoute";

function App() {

  return (
    <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/admin/login" element={<AdminLogin/>}/>

    {/* User routes */}
    <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
    </Route>

     {/* Admin route */}
    <Route element={<PrivateRoute adminOnly={true} />}>
      
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route path="/add/user" element={<AddUser/>}/>
        <Route path="/admin/user" element={<AdminUsers/>}/>
        <Route path="/admin/users/edit/:userId" element={<EditUser/>}/>
    </Route>
</Routes>
  )
}

export default App
