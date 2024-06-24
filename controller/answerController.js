import dbconnection from "../db/dbConfig.js"
import generateUniqueId from "generate-unique-id"
import { StatusCodes } from "http-status-codes"

async function getAnswers (req, res) {
    
    const {questionid} = req.query
    console.log(questionid)
    try {
        const [answers] = await dbconnection.query("SELECT t1.*, t2.username FROM answers t1 LEFT JOIN users t2 ON t1.userid = t2.userid where questionid = (?)", questionid)
        // const [answers] = await dbconnection.query("SELECT answerid, userid, answer FROM answers where questionid = (?)", questionid)
        return res.status(StatusCodes.OK).json(answers)
    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}

async function postAnswer (req, res) {
    const {userid, questionid, answer} = req.body;
    try {
        await dbconnection.query("INSERT INTO answers (userid, questionid, answer) VALUES (?,?,?)", [userid, questionid, answer]) 

        return res.status(StatusCodes.CREATED).json({msg:"Thanks for the submission"})
        
    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}

export {getAnswers, postAnswer};