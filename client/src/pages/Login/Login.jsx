import React from 'react';
import { useRef, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import {useNavigate, Link} from "react-router-dom"
import Layout from '../../components/Layout/Layout';
import classes from './login.module.css'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function Login () {
    const navigate = useNavigate()
    
    const emailDom = useRef();
    const pswDom = useRef();

    const [showpswDom, setShowPswDom] = useState(false);

    async function handleSubmit (e){
        e.preventDefault();

        const emailValue = emailDom.current.value;
        const pswValue = pswDom.current.value;


        if( !emailValue || !pswValue){
            alert("please provide all required info")
            return;
        }
        try {
            const {data} = await axiosInstance.post("users/login",{
                email:emailValue,
                password:pswValue
            })
            alert("login successful.")
            localStorage.setItem("accessToken",data.accessToken)
            navigate("/")
            console.log(data)
        } catch (error) {
            alert(error?.response?.data?.msg)
            console.log(error.response.data)
        }
    }

    function togglePswDomVisibility () {
        setShowPswDom(!showpswDom);
    };

    function goToRegister () {
        navigate("/register");
    }

    return (
        <Layout>
            <div className ={classes.home_container}>
                <div className = {classes.login__container}>
                    <div className = {classes.login__form__container}>
                        <div className = {classes.login__card}>
                            <div>
                                <p className = {classes.login__title}>Login to your account</p>
                                <span style={{ color: '#344767' }}>Don't have an account?</span> 
                                <span className = {classes.login__span}> <Link to ="/register">Create a new account</Link></span>
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

                                    <div className={classes.login__pswdom__container}>
                                        <input 
                                            ref = {pswDom} 
                                            type = {showpswDom ? 'text' : 'password'} 
                                            placeholder="psw" 
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

                                    <div>
                                        <p className = {classes.forgot__password}><Link to ="/forgot">Forgot password?</Link></p>
                                    </div>

                                    <div>
                                        <button type="submit" className={classes.registerbtn}>Login</button>                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className = {classes.login__info__container}>
                        <p className = {classes.login__about}>About</p>

                        <h1>Evangadi Networks</h1>

                        <p className = {classes.login__info}>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>

                        <p className = {classes.login__info}>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>

                        <button className = {classes.create__new__account} onClick={() => goToRegister()} >
                            CREATE NEW ACCOUNT
                        </button>                        
                    </div>

                </div>
            </div>

        </Layout>

        
    )
}

export default Login;

