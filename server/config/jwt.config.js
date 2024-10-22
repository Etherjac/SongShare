import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET_KEY


export default function authenticate (req,res,next){
    jwt.verify(req.cookies.userToken,SECRET,(er,payload)=>{
            if(er){res.status(401).json({verified:false})
        }
    else{
        console.log("line 10", payload)
        next()
        }})}