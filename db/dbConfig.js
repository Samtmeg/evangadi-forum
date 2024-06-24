import mysql2 from "mysql2"
import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config()


// const dbconnection = mysql2.createPool({
//     host:"localhost",
//     database:"evangadi-forum",
//     user:"evangadi-admin",
//     password:"123456",
//     connectionLimit:10
// })
// console.log(process.env.USER) 

//production 
// const dbconnection = mysql2.createPool({
//     host:process.env.MYSQL_HOST,
//     database:process.env.MYSQL_DATABASE,
//     user:process.env.MYSQL_USER,
//     password:process.env.MYSQL_PASSWORD,
    // waitForConnections: true,
    // connectTimeout: 30000,  
    // connectionLimit: 10,
    // queueLimit: 0
// })

// const dbconnection = mysql2.createPool({
// 	user: process.env.USER,
// 	database: process.env.DATABASE,
// 	host: "193.203.166.103",
// 	password: process.env.PASSWORD,
// 	connectionLimit:10,
// });

const dbconnection = mysql2.createPool({
    connectionLimit: 10, // Set the maximum number of connections in the pool
    host: "185.28.21.52",
    user: "u202703025_sam_forum",
    database: "u202703025_ev_forum",
    password: "o+6Xg!|D",
});

export default dbconnection.promise()