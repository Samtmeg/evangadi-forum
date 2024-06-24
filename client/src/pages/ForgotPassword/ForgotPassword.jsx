import React from 'react';
import { useRef, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import {useNavigate, Link} from "react-router-dom"
import Layout from '../../components/Layout/Layout';
import classes from './forgotpassword.module.css'

function ForgotPassword () {

    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(true);
    
    const emailDom = useRef();

    async function handleSubmit (e){
        e.preventDefault();

        const emailValue = emailDom.current.value;

        if( !emailValue){
            alert("please provide your email")
            return;
        }
        try {
            const {data} = await axiosInstance.post("users/forgot",{
                email:emailValue,
            })
            toggleVisibility ()
            console.log(data)
        } catch (error) {
            alert(error?.response?.data?.msg)
            console.log(error.response.data)
        }
    }

    function toggleVisibility () {
        setIsVisible(!isVisible);
    };

    function goToRegister () {
        navigate("/register");
    }

    return (
        <Layout>
            <div className ={classes.forgot__home__container}>
                <div className = {classes.forgot__container}>
                    <div className = {classes.forgot__form__container}>
                        <div className = {classes.forgot__card}>
                            {isVisible ?
                            <div>
                                <div>
                                    <p className = {classes.forgot__title}>Reset your password</p>
                                    <p> Fill in your e-mail address below and we will send you an email with further instructions.</p> 
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div class="container">
                                        
                                        <div>
                                            <input 
                                                ref = {emailDom}  
                                                type="text" 
                                                placeholder="email" 
                                                name="email" 
                                                id="email" 
                                            />                        
                                        </div>
                                        <div>
                                            <button type="submit" className={classes.forgotbtn}>Submit Email</button>                        
                                        </div>
                                    </div>
                                    <div className = {classes.forgot__aact__exists}>
                                        <Link to ="/login">Already have an account?</Link>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className = {classes.forgot__submitted}>
                                <p className = {classes.forgot__submitted__title}>Reset instruction is sent to your email</p>
                                <p>Check your email to reset your password.</p>
                            </div>
                            }
                        </div>
                    </div>
                    <div className = {classes.forgot__info__container}>
                        <p className = {classes.forgot__about}>About</p>

                        <h1>Evangadi Networks</h1>

                        <p className = {classes.forgot__info}>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>

                        <p className = {classes.forgot__info}>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>

                        <button className = {classes.forgot__new__account} onClick={() => goToRegister()} >
                            CREATE A NEW ACCOUNT
                        </button>                        
                    </div>

                </div>
            </div>

        </Layout>
    );
}

export default ForgotPassword;
