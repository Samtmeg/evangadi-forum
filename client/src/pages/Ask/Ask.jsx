import React, {useRef} from 'react';
import classes from './ask.module.css'
import axiosInstance from '../../axiosConfig'
import {useNavigate} from "react-router-dom"
import Layout from '../../components/Layout/Layout';

function Ask () {

    const titleDom = useRef();
    const descDom = useRef();
    const navigate = useNavigate();

    async function handleSubmit (e){
        e.preventDefault();

        const titleValue = titleDom.current.value;
        const descValue = descDom.current.value;
        const newquestion = {
            title: titleValue,
            description: descValue,
            tag:''
        }
        
        if( !titleValue || !descValue){
            alert("Fill all required information")
            return;
        }

        try {
            await axiosInstance.post('questions/submitQuestion', newquestion, {
                headers:{
                Authorization: "Bearer " + localStorage.getItem("accessToken")
                }})
            alert("question posted successful.")
            navigate("/")
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Layout>
            <div className = {classes.ask__info__container} >
                <h2>Steps to ask a good question</h2>
                <ul>
                    <li>Summarize your problems in a one-line title</li>
                    <li>Describe your problem in more detail</li>
                    <li>Describe what you tried and what you expected to happen</li>
                    <li>Review your question and post it here</li>
                </ul>
            </div>

            <form 
                className = {classes.ask__form__container} 
                onSubmit={handleSubmit}
            >
                <h2>Post Your Question</h2>
                <input ref={titleDom} type="text" placeholder="title" name="title" id="title"/>  
                <textarea ref = {descDom} placeholder="write your question" id="desc" name="desc" rows="4" cols="50" required></textarea>
                <button type="submit">Post Question</button>
            </form>
        </Layout>
    );
}

export default Ask;
