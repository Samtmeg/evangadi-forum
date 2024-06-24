import React, {useContext, useState, useEffect, useRef} from 'react';
import { AppState } from '../../components/DataProvider/DataProvider';
import axiosInstance from '../../../src/axiosConfig'
import AnswerCard from '../../components/AnswerCard/AnswerCard';
import classes from './queswithans.module.css'
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';

function QuesWithAns () {
    const {user} = useContext(AppState)
    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState({})
    const [isVisible, setIsVisible] = useState(false);
    const answerDom = useRef();
    const parameters = useParams();
    console.log(parameters)
    const options = {
        params: { questionid:parameters.qnid },
        headers: {
            'Authorization': "Bearer " + `${localStorage.getItem("accessToken")}`
            }  
        };

    useEffect(() => {
        axiosInstance.get('questions/goToQuestion', options)
        .then((qres)=>{
            setQuestion(qres.data)
            axiosInstance.get('answer/getAnswers', options)
            .then((res)=>{
                setAnswers(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }, []);

    function toggleVisibility ()  {
        setIsVisible(!isVisible); // Toggle the state
    };


    async function handleSubmit (e){
        e.preventDefault();

        const answerValue = answerDom.current.value;
        const newanswer = {
            userid: user.userid,
            questionid: options.params.questionid,
            answer: answerValue
        }
                
        if( !answerValue){
            alert("answer form is empty")
            return;
        }
        try {
            await axiosInstance.post('answer/postAnswer', newanswer, {
                headers:{
                Authorization: "Bearer " + localStorage.getItem("accessToken")
                }})
            setAnswers((previousAnswers)=>{
                return [...previousAnswers,newanswer]
            })
            alert("answer posted successful.")
            toggleVisibility()
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Layout>
            <div className = {classes.answer__header} >
                <h2>QUESTION</h2>
                <div>
                    <p>{question[0]?.description}</p>
                </div>
                <h3>Answer from the Community</h3>
            </div>

            <div>
                {
                answers?.map((singleAnswer) => (
                    <AnswerCard
                        key = {singleAnswer.answerid}
                        userid = {singleAnswer.username}
                        answer ={singleAnswer.answer}
                    />
                    ))
                }
            </div>
            <form 
                className = {classes.answer__form__container} 
                onSubmit={handleSubmit}
            >
                {isVisible && <div className = {classes.hide__text}>Answer posted successfully</div>}
                <textarea ref = {answerDom} id="comment" name="comment" rows="4" cols="50" required></textarea>
                <button className = {classes.submit__answer__btn}type="submit">Post Answer</button>
            </form>
            
        </Layout>
    );
}

export default QuesWithAns;
