import dbconnection from "../db/dbConfig.js"
import generateUniqueId from "generate-unique-id"
import { StatusCodes } from "http-status-codes"

import { db } from "../db/firebase.js"
import { QuerySnapshot } from "firebase/firestore"

async function allQuestions (req, res) {
    
    try {
        // const [questions] = await dbconnection.query("SELECT userid, questionid, title, description FROM questions")

        const snapshot = await db.collection('questions').get()
        const questions = []
        snapshot.docs.forEach(doc => {questions.push(doc.data())})

        return res.status(StatusCodes.OK).json(questions)
    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}


async function submitQuestion (req, res) {
    const {title, description, tag} = req.body;
    const userid = req.user.userid
    try {

        var newqnid = generateUniqueId();
        const qnid = await dbconnection.query("SELECT title FROM questions where questionid = ?", newqnid)
        while (newqnid === qnid){
            newqnid = generateUniqueId();
        }

        
        //add user to firestore db
        await db.collection('questions').add({
            userid: userid,
            title: title,
            description: description,
            tag: tag,
        })

        return res.status(StatusCodes.CREATED).json({msg:"question added successfully"})
        
    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}

// async function allQuestions (req, res) {
    
//     try {
//         // const [questions] = await dbconnection.query("SELECT userid, questionid, title, description FROM questions")
//         const [questions] = await dbconnection.query("SELECT t1.*, t2.username FROM questions t1 LEFT JOIN users t2 ON t1.userid = t2.userid")
//         return res.status(StatusCodes.OK).json(questions)
//     } catch (err) {
//         console.log(err.message)
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
//     }
// }

async function goToQuestion (req, res) {
    const {questionid} = req.query
        
    try {
        const [question] = await dbconnection.query("SELECT userid, questionid, title, description FROM questions where questionid = ?", questionid )
        return res.status(StatusCodes.OK).json(question)
    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}

// async function submitQuestion (req, res) {
//     const {title, description, tag} = req.body;
//     const userid = req.user.userid
//     try {
        
//         var newqnid = generateUniqueId();
//         const qnid = await dbconnection.query("SELECT title FROM questions where questionid = ?", newqnid)
//         while (newqnid === qnid){
//             newqnid = generateUniqueId();
//         }

//         await dbconnection.query("INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?,?,?,?,?)", [newqnid, userid, title, description, tag]) 

//         return res.status(StatusCodes.CREATED).json({msg:"question added successfully"})
        
//     } catch (err) {
//         console.log(err.message)
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
//     }
// }

export {allQuestions, goToQuestion, submitQuestion};
