import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ adminOnly = false }) => {
    const navigate = useNavigate();
    const { isAuthenticated: adminAuth, token: adminToken } = useSelector((state) => state.admin);
    const { isAuth: userAuth, token: userToken } = useSelector((state) => state.user);

    const storedAdminToken = localStorage.getItem('adminToken');
    const storedUserToken = localStorage.getItem('userToken');
    
    const isAuth = adminOnly 
        ? (adminAuth || !!storedAdminToken)
        : (adminAuth || userAuth || !!storedAdminToken || !!storedUserToken);
    
    const authToken = adminOnly 
        ? (adminToken || storedAdminToken)
        : (adminToken || userToken || storedAdminToken || storedUserToken);

    // useEffect(() => {

    //     const handlePopState = () => {
    //         if (!isAuth || !authToken) {
    //             navigate(adminOnly ? '/admin/login' : '/login', { replace: true });
    //         }
    //     };

    //     window.addEventListener('popstate', handlePopState);
        
    //     return () => {`
    //         window.removeEventListener('popstate', handlePopState);
    //     };
    // }, [isAuth, authToken, adminOnly, navigate]);

    if (!isAuth || !authToken) {
       
        if (adminOnly) {
            localStorage.removeItem('adminToken');
        } else {
            localStorage.removeItem('userToken');
            localStorage.removeItem('adminToken');
        }
    }
    
    return isAuth && authToken ? <Outlet /> : <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
}