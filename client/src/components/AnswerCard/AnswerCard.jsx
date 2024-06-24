import classes from './answercard.module.css'
import Avatar from '@mui/material/Avatar';

const AnswerCard = (answer) => {
    return (
        <div className = {classes.main__container}>
            <div  className = {classes.user__img__container}>
                <div>
                <Avatar src="/broken-image.jpg" />
                </div>
                <div>{answer.userid}</div>
            </div>
            <div className = {classes.answer__container}><p>{answer.answer}</p></div>
        </div>
    );
}

export default AnswerCard;
