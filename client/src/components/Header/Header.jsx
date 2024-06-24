import React from 'react';
import EvangadiLogoB from '../../assets/evangadi-logo-black.png'
import { useNavigate } from "react-router-dom"
import classes from './Header.module.css'

function Header () {

    const navigate = useNavigate()

    function goHome () {
        navigate("/");
    }

    function handleClick () {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return (
        <div className = {classes.fixed}>
            <div className ={classes.header_container}>
                <ul>
                    <li><img src={EvangadiLogoB} alt="Evangadi Logo" width="250" height="35" /></li>
                </ul>
                <div>
                    <button className = {classes.header_homebtn} onClick={goHome}>Home</button>
                    <button className = {classes.header_logout_btn} onClick={handleClick}>Log Out</button>
                </div>
            </div>            
        </div>
    );
}


export default Header;
