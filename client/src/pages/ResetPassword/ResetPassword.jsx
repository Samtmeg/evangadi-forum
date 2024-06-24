import React from 'react';
import { useRef, useState,} from 'react';
import axiosInstance from '../../axiosConfig';
import {useNavigate} from "react-router-dom"
import Layout from '../../components/Layout/Layout';
import classes from './resetpassword.module.css'
import { useParams } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function ResetPassword () {

    const navigate = useNavigate()

    const [showpswDom, setShowPswDom] = useState(false);
    const [showpswrDom, setShowPswrDom] = useState(false);
        
    const pswDom = useRef();
    const pswrDom = useRef();
    const {resetToken} = useParams();

    function togglePswDomVisibility () {
        setShowPswDom(!showpswDom);
    };

    function togglePswrDomVisibility () {
        setShowPswrDom(!showpswrDom);
    };

    function goToRegister () {
        navigate("/register");
    }


    async function handleSubmit (e){
        e.preventDefault();

        const pswValue = pswDom.current.value;
        const pswrValue = pswrDom.current.value;

        if(!pswValue || !pswrValue){
            alert("please provide all required info")
            return;
        }
        if(!(pswValue=== pswrValue)){
            alert("passwords don't match");
            return;
        }

        try {
            await axiosInstance.post("users/reset",{
                resetToken:resetToken,
                newPassword:pswValue
            })
            alert("Password reset successfully")
            navigate("/login")
        } catch (error) {
            alert(error?.response?.data?.msg)
            console.log(error.response.data)
        }
    }

    return (
        <Layout>
            <div className ={classes.reset__home__container}>
                <div className = {classes.reset__container}>
                    <div className = {classes.reset__form__container}>
                        <div className = {classes.reset__card}>
                            <div>
                                <div>
                                    <p className = {classes.reset__title}>Reset your password</p>
                                    <p> Enter the new password you want to use for your account</p> 
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div class="container">
                                        <div className={classes.reset__unpwd__container}> 
                                            <div className={classes.reset__pswdom__container}> 
                                                <input 
                                                    ref = {pswDom}  
                                                    type={showpswDom ? "text" : "password"}
                                                    placeholder="New password" 
                                                    name="psw" 
                                                    id="psw"
                                                />  
                                                <button type="button" onClick={togglePswDomVisibility}>
                                                    {showpswDom ? 
                                                    <RiEyeFill size="24px" color="#ccc" /> :
                                                    <RiEyeOffFill size="24px" color="#ccc"/> 
                                                    }
                                                </button>
                                            </div>
                                            <div className={classes.reset__pswdom__container}>
                                                <input 
                                                    ref = {pswrDom}  
                                                    type={showpswrDom ? "text" : "password"}
                                                    placeholder="Repeat new password" 
                                                    name="pswr" 
                                                    id="pswr"
                                                />
                                                <button type="button" onClick={togglePswrDomVisibility}>
                                                    {showpswrDom ? 
                                                    <RiEyeFill size="24px" color="#ccc"/> :
                                                    <RiEyeOffFill size="24px" color="#ccc"/>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className={classes.resetbtn}>Reset Password</button>                        
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className = {classes.reset__info__container}>
                        <p className = {classes.reset__about}>About</p>

                        <h1>Evangadi Networks</h1>

                        <p className = {classes.reset__info}>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>

                        <p className = {classes.reset__info}>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>

                        <button className = {classes.reset__new__account} onClick={() => goToRegister()} >
                            CREATE A NEW ACCOUNT
                        </button>                        
                    </div>

                </div>
            </div>

        </Layout>
    );
}

export default ResetPassword;
