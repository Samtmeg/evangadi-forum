import React from 'react';
import { useRef, useState} from 'react';
import axiosInstance from '../../axiosConfig';
import {useNavigate, Link} from "react-router-dom"
import Layout from '../../components/Layout/Layout';
import classes from './register.module.css'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function Register () {
    const navigate = useNavigate()
    const usernameDom = useRef();
    const fnameDom = useRef();
    const lnameDom = useRef();
    const emailDom = useRef();
    const pswDom = useRef();
    const pswrDom = useRef();

    async function handleSubmit (e){
        e.preventDefault();

        const usernameValue = usernameDom.current.value;
        const fnameValue = fnameDom.current.value;
        const lnameValue = lnameDom.current.value;
        const emailValue = emailDom.current.value;
        const pswValue = pswDom.current.value;
        const pswrValue = pswrDom.current.value;

        console.log(pswValue, pswrValue)

        if(!usernameValue || !fnameValue || !fnameValue || !emailValue || !pswValue || !pswrValue){
            alert("please provide all required info")
            return;
        }
        if(!(pswValue=== pswrValue)){
            alert("passwords don't match");
            return;
        }
        try {
            await axiosInstance.post("users/register",{
                username: usernameValue,
                firstname:fnameValue,
                lastname:lnameValue,
                email:emailValue,
                password:pswValue
            })
            alert("registered successful. Login")
            navigate("/login")
        } catch (error) {
            console.log(error.response)
        }
    }

    const [showpswDom, setShowPswDom] = useState(false);
    const [showpswrDom, setShowPswrDom] = useState(false);
        
    function togglePswDomVisibility () {
        setShowPswDom(!showpswDom);
    };

    function togglePswrDomVisibility () {
        setShowPswrDom(!showpswrDom);
    };
    
    function goToRegister () {
        navigate("/register");
    }

    return (
        <Layout>
            <div className ={classes.reg__home__container}>
                <div className = {classes.reg__container}>
                    <div className = {classes.reg__form__container}>
                        <div className = {classes.reg__card}>
                            <div>
                                <p className = {classes.reg__title}>Join the Network</p>
                                <span style={{ color: '#344767' }}>Already have an account?</span> 
                                <span className = {classes.reg__span}> <Link to ="/login">Sign In</Link></span>
                            </div>
                            <div className = {classes.test} >
                                <form onSubmit={handleSubmit} className={classes.reg__uinfo__container}>
                                        <div className={classes.reg__uemail__container}>
                                            <input 
                                                ref={usernameDom} 
                                                type="text" 
                                                placeholder="username" 
                                                name="username" 
                                                id="username" 
                                            />
                                            <input 
                                                ref = {emailDom}  
                                                type="text" 
                                                placeholder="email" 
                                                name="email" 
                                                id="email" 
                                            />
                                        </div>                        

                                        <div className={classes.reg__uname__container}>
                                            <input 
                                                ref = {fnameDom} 
                                                type="text"
                                                placeholder="first name" 
                                                name="fname" 
                                                id="fname"
                                            />
                                            <input 
                                                ref = {lnameDom}  
                                                type="text" 
                                                placeholder="last name" 
                                                name="lname" id="lname" 
                                            />
                                        </div>

                                        <div className={classes.reg__unpwd__container}> 
                                            <input 
                                                ref = {pswDom}  
                                                type={showpswDom ? "text" : "password"}
                                                placeholder="password" 
                                                name="psw" 
                                                id="psw"
                                            />  
                                            <button type="button" onClick={togglePswDomVisibility}>
                                                {showpswDom ? 
                                                <RiEyeFill size="24px" color="#ccc" />:
                                                <RiEyeOffFill size="24px" color="#ccc"/>
                                            }
                                            </button>
                                            <input 
                                                ref = {pswrDom}  
                                                type={showpswrDom ? "text" : "password"}
                                                placeholder="repeat password" 
                                                name="pswr" 
                                                id="pswr"
                                            />
                                            <button type="button" onClick={togglePswrDomVisibility}>
                                                {showpswrDom ? 
                                                <RiEyeFill size="24px" color="#ccc" />:
                                                <RiEyeOffFill size="24px" color="#ccc"/>
                                                }
                                            </button>

                                        </div>

                                        <div className = {classes.reg__pp__tos}>
                                            <p >I agree to the <a href="#">privacy policy </a>and <a href="#">terms of service.</a></p>
                                        </div>

                                        <div className = {classes.reg__button}>
                                            <button type="submit" class="registerbtn">agree and Join</button>                        
                                        </div>

                                        <div className = {classes.aact__exists}>
                                            <Link to ="/login">Already have an account?</Link>
                                        </div>
                                </form>                                
                            </div>
                        </div>
                    </div>
                    <div className = {classes.reg__info__container}>
                        <p className = {classes.reg__about}>About</p>

                        <h1>Evangadi Networks</h1>

                        <p className = {classes.reg__info}>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>

                        <p className = {classes.reg__info}>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>

                        <button className = {classes.reg__create__new__account} onClick={() => goToRegister()} >
                            CREATE A NEW ACCOUNT
                        </button>                        
                    </div>

                </div>
            </div>

        </Layout>
    )
}

export default Register;
