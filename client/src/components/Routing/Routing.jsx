import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import QuesWithAns from '../../pages/QuestwithAns/QuesWithAns';
import Ask from '../../pages/Ask/Ask';
import Nada from '../../pages/Nada/nada';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';

function Routing() {

    return (
    <Router>
        <Routes>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/register" element = {<Register/>}/>
            <Route path="/forgot" element = {<ForgotPassword/>}/>
            <Route path="/" 
                element = {
                <ProtectedRoutes
                    redirect= {"/login"}
                >
                    <Home/>
                </ProtectedRoutes>
                }
            />
            <Route path="/question/:qnid" 
                element = {
                <ProtectedRoutes
                    redirect= {"/login"}
                >
                    <QuesWithAns/>
                </ProtectedRoutes>
                }
            />
            <Route path="/ask" 
                element = {
                <ProtectedRoutes
                    redirect= {"/login"}
                >
                    <Ask/>
                </ProtectedRoutes>
                }
            />
            <Route path="/reset/:resetToken" element = {<ResetPassword/>}/>
            <Route path="*" element = {<Nada/>}/>
        </Routes>
    </Router>
    )
}

export default Routing


