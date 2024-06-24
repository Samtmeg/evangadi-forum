import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../DataProvider/DataProvider';

function ProtectedRoutes ({children, redirect})  {

    const navigate = useNavigate()
    const {user} = useContext(AppState)

    useEffect(()=>{
        if (!user){
            navigate("/login", {state:{redirect}})
        }
    },[user])

    return (children);
}

export default ProtectedRoutes;


// 
// const token = localStorage.getItem("accessToken")
    // useEffect(() => {
    //     if (!token) {
    //         navigate("/login");
    //     }
    // }, [token]);