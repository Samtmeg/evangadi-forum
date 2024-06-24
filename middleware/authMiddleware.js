import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

function authMiddleware (req, res, next){
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Invalid authorization"})
    }

    const accesToken = authHeader.split(' ')[1]
        
    try {
        const {username, userid, firstname, lastname} = jwt.verify(accesToken, process.env.JWT_SECRET)
        req.user = {username, userid, firstname, lastname}
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Invalid authorization"})
    }
    
}

export default authMiddleware