import React, {useContext, useState, useEffect} from 'react';
import { AppState } from '../../components/DataProvider/DataProvider';
import axiosInstance from '../../../src/axiosConfig'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import Layout from '../../components/Layout/Layout';
import classes from './home.module.css'
import {useNavigate} from "react-router-dom"

function Home () {
    const {user} = useContext(AppState)
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.get('questions/all-questions', {
            headers:{
            Authorization: "Bearer " + localStorage.getItem("accessToken")
            }})
        .then((res)=>{
            setQuestions(res.data)
        }).catch((err)=>{
            console.log(err)
            navigate("/login");
        })
    }, []);

    function goToAsk () {
        navigate("/ask");
    }

    return (
        <Layout>
            <div className = {classes.ask__btn}>
                <button type="button" onClick={() => goToAsk()} >Ask Question</button>
                <p className = {classes.user_info}>Welcome {user?.firstname} {user?.lastname} </p>
            </div>
            <div>
                {
                questions?.map((singleQuestion) => (
                    <QuestionCard
                        key = {singleQuestion.questionid}
                        questionid = {singleQuestion.questionid}
                        userid = {singleQuestion.username}
                        title ={singleQuestion.title}
                    />
                    ))
                }
            </div>
        </Layout>
    );
}

export default Home;

