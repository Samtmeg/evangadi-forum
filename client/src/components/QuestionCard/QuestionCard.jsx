import React, {useContext} from 'react';
import classes from './questioncard.module.css'
import Avatar from '@mui/material/Avatar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useNavigate} from "react-router-dom"

function QuestionCard (question){
    const navigate = useNavigate()
    
    return (
        <div onClick={() => navigate(`/question/${question.questionid}`)} className = {classes.qn__container}>
            <div  className = {classes.qn__img__container}>
                <div>
                <Avatar src="/broken-image.jpg" sx={{ width: 56, height: 56 }} />
                </div>
                <div>{question.userid}</div>
            </div>
            <div className = {classes.qn__title__container}><p>{question.title}</p></div>
            <div className = {classes.qn__lnk__container}>
                <ChevronRightIcon sx={{ fontSize: 50 }}/>
            </div>
        </div>
    );
}

export default QuestionCard;
