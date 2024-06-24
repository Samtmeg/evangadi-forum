import dbconnection from "../db/dbConfig.js"
import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"
import google from "googleapis"

import { db } from "../db/firebase.js"
import { QuerySnapshot } from "firebase/firestore"

var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: process.env.MYEMAIL_USERNAME,
        pass: process.env.MYEMAIL_PASSWORD
    }
});

// async function register(req,res) {
//     const {username, firstname, lastname, email, password} = req.body;
//     if (!email || !password || !firstname || !lastname || !username){
//         return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide all required information"})
//     }

//     try{ 

//         const snapshot = await db.collection('users')
//             .where('email', '==', email)
//             .where('username', '==', username)
//             .get()

//         //check if user is already registered
//         if (!snapshot.empty) {
//             console.log('user exists.');
//             return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'user is already registered' });
//         }

//         // validate password length
//         if(password.length<=8){
//             return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 charcters"})
//         }

//         // encrypt the password
//         const salt = await bcrypt.genSalt()
//         const hashedpassword = await bcrypt.hash(password, salt)

//         //add user to firestore db
//         await db.collection('users').add({
//             username: username,
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             password: hashedpassword
//         })

//         const nsnapshot = await db.collection('users')
//         .where('email', '==', email)
//         .get()

//         const nsnapshotId = nsnapshot.docs[0].id

//         const docRef = db.collection('users').doc(nsnapshotId)

//         //update the db with the new password and remove the reset token
//         docRef.update({
//             userid: nsnapshotId,
//         })

//         return res.status(StatusCodes.CREATED).json({msg:"user registered successfully"})

//     }catch(err) {
//         console.error('Error getting user:', err);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error registering user' });
//     };
// }

// async function login(req,res) {
    
//     const {email, password} = req.body;
//     console.log({email, password})

//     if (!email || !password ){
//         return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please enter all required fields"})
//     }

//     try{
//         const snapshot = await db.collection('users')
//         .where('email', '==', email)
//         .get()
        
//         if (snapshot.empty) {
//             console.log('No matching documents.');
//             return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
//         }

//         // Assuming there's only one user with the specified email
//         const user = snapshot.docs[0].data();
//         const docId = snapshot.docs[0].id

//         console.log("user password", user.password)
    
//         //Verify password
//         const isMatch = await bcrypt.compare(password, user.password)
//         if(!isMatch){
//             return res.status(StatusCodes.BAD_REQUEST).json({msg:"Incorrect password"})
//         }

//         //Prepare user data for JWT token
//         const {username, userid, firstname, lastname}  = user

//         //Create JWT token
//         const accessToken = jwt.sign({username, userid, firstname, lastname},process.env.JWT_SECRET, {expiresIn:"1d"})

//         return res.status(StatusCodes.OK).json({msg:"user login successful", snapshot: docId, accessToken, username, firstname, lastname})
//         }
//         catch(err)  {
//             console.error('Error getting user:', err);
//             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error retrieving user' });
//         };
// }

// async function checkUser(req,res) {
//     console.log(req)
//     const username = req.user.username
//     const userid = req.user.userid
//     const firstname = req.user.firstname
//     const lastname = req.user.lastname
//     return res.status(StatusCodes.OK).json({msg:"valid user",username, userid, firstname, lastname})
// }

// async function forgotPassword (req, res) {
//     const {email} = req.body;
//     console.log("req.body:", req.body)
//     console.log("email:", email)

//     if (!email ){
//         return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide your email"})
//     }
//     try {

//         const snapshot = await db.collection('users')
//         .where('email', '==', email)
//         .get()

//         //check if user is already registered
//         if (snapshot.empty) {
//             console.log('user exists.');
//             return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'user is not registered' });
//         }

//         //Get the document ID
//         const docRef = db.collection('users').doc(snapshot.docs[0].id)

//         //create a token for resetting password
//         const resetToken = crypto.randomBytes(20).toString('hex');
//         const rtExpiryDate = Date.now() + 600000;

//         console.log("resetToken", resetToken)
//         console.log("rtExpiryDate", rtExpiryDate)

//         //update the db with the reset token
//         docRef.update({
//             resetToken: resetToken
//         })

//         // Define email content
//         const mailOptions = {
//             from: 'api@demomailtrap.com',
//             to: email,
//             subject: 'Password Reset request',
//             text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
//             + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//             + `http://localhost:5173/reset/${resetToken}\n\n`
//             + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//         };
//         // Send email
//         transporter.sendMail(mailOptions, (err, info) => {
//             console.log('Email sent successfully!');
//             return res.status(StatusCodes.OK).json(info)
//         });

//     } catch (err) {
//         console.log(err.message)
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
//         }
// }

// async function resetPassword (req, res) {
//     const {resetToken, newPassword} = req.body;
//     console.log("req.body:", req.body)
//     console.log(newPassword)
    
//     //check new password satisifies length criteria
//     if(newPassword.length<=8){
//         return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 charcters"})
//     }
    
//     try {
//         //Check user exists using the resetToken

//         const snapshot = await db.collection('users')
//         .where('resetToken', '==', resetToken)
//         .get()

//         if (snapshot.empty){
//             return res.status(StatusCodes.BAD_REQUEST).json({msg:"reset link is not recognized"})
//         }
        
//         //Get the document ID
//         const docRef = db.collection('users').doc(snapshot.docs[0].id)

//         // encrypt the password
//         const salt = await bcrypt.genSalt()
//         const hashednewPassword = await bcrypt.hash(newPassword, salt)

//         //update the db with the new password and remove the reset token
//         docRef.update({
//             password: hashednewPassword,
//             resetToken: ""
//         })

//         console.log("new hashedpassowrd:",  hashednewPassword)

//         return res.status(StatusCodes.CREATED).json({msg:"password reset successfully"})

//     } catch (err) {
//         console.log(err.message)
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
//     }
// }

// async function getUsername (req,res) {
//     const {userid} = req.query;
//     if (!userid ){
//         return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide userid"})
//     }

//     try {
//         const [username] = await dbconnection.query("SELECT u.username FROM users u JOIN answers o ON u.userid = o.userid WHERE o.userid = (?)", userid )
//         return res.status(StatusCodes.OK).json(username)
//     } catch (err) {
//         console.log(err.message)
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
//     }
// }

// Start of mysql using functions

async function register(req,res) {
    const {username, firstname, lastname, email, password} = req.body;
    if (!email || !password || !firstname || !lastname || !username){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide all required information"})
    }

    try{
        const [user] = await dbconnection.query("SELECT username, userid FROM users where username= ? or email = ?", [username,email])
        console.log(user);

        if (user.length>0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already registered"})
        }

        if(password.length<=8){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 charcters"})
        }
        // encrypt the password
        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(password, salt)
        
        await dbconnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)", [username, firstname, lastname, email, hashedpassword])
        
        return res.status(StatusCodes.CREATED).json({msg:"user registered successfully"})

    }catch(err){
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}

async function login(req,res) {
    
    const {email, password} = req.body;
    console.log({email, password})

    if (!email || !password ){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please enter all required fields"})
    }
    try {
        const [user] = await dbconnection.query("SELECT username, userid, firstname, lastname, password FROM users where email = ?", [email])
        
        if (user.length==0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid credential"})
        }

        //Verify password
        const isMatch = await bcrypt.compare(password, user[0].password)
        if(!isMatch){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"Incorrect password"})
        }

        const username = user[0].username
        const userid = user[0].userid
        const firstname = user[0].firstname
        const lastname = user[0].lastname
        const accessToken = jwt.sign({username, userid, firstname, lastname},process.env.JWT_SECRET, {expiresIn:"1d"})
        return res.status(StatusCodes.OK).json({msg:"user login successful", accessToken, username, firstname, lastname})

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
    
}

async function checkUser(req,res) {
    console.log(req)
    const username = req.user.username
    const userid = req.user.userid
    const firstname = req.user.firstname
    const lastname = req.user.lastname
    return res.status(StatusCodes.OK).json({msg:"valid user",username, userid, firstname, lastname})
}

async function forgotPassword (req, res) {
    const {email} = req.body;
    const resetTokens = {};
    console.log("req.body:", req.body)
    console.log("email:", email)

    if (!email ){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide your email"})
    }
    try {
        const [user] = await dbconnection.query("SELECT username FROM users where email = ?", email)

        if (user.length==0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"user is not registered"})
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const rtExpiryDate = Date.now() + 600000;

        console.log("resetToken", resetToken)
        console.log("rtExpiryDate", rtExpiryDate)

        await dbconnection.query("UPDATE users SET resetToken = ? where email = ?", [resetToken, email])

        // Define email content
        const mailOptions = {
            from: 'api@demomailtrap.com',
            to: email,
            subject: 'Password Reset request',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
            + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
            + `http://localhost:5173/reset/${resetToken}\n\n`
            + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        // Send email
        transporter.sendMail(mailOptions, (err, info) => {
            console.log('Email sent successfully!');
            return res.status(StatusCodes.OK).json(info)
        });

    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
        }
}

async function resetPassword (req, res) {
    const {resetToken, newPassword} = req.body;
    console.log("req.body:", req.body)
    console.log(newPassword)
    
    //check new password satisifies length criteria
    if(newPassword.length<=8){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 charcters"})
    }
    
    try {
        //Check user exists using the resetToken
        const [ruser] = await dbconnection.query("SELECT username FROM users where resetToken = ?", resetToken)

        console.log("ruser:",ruser)

        if (ruser.length==0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"user is not registered"})
        }
        
        const rusername = ruser[0].username
        console.log("rusername:", rusername)

        // encrypt the password
        const salt = await bcrypt.genSalt()
        const hashednewPassword = await bcrypt.hash(newPassword, salt)

        //updade the password to new. Reset the token to Null
        await dbconnection.query("UPDATE users SET password = ?, resetToken = ? where username = ?", [hashednewPassword,  null, rusername])

        return res.status(StatusCodes.CREATED).json({msg:"password reset successfully"})

    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}

async function getUsername (req,res) {
    const {userid} = req.query;
    if (!userid ){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide userid"})
    }

    try {
        const [username] = await dbconnection.query("SELECT u.username FROM users u JOIN answers o ON u.userid = o.userid WHERE o.userid = (?)", userid )
        return res.status(StatusCodes.OK).json(username)
    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong. please try later"})
    }
}

export {register, login, checkUser, getUsername, forgotPassword, resetPassword};