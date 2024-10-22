import User from "../models/user.model.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const UserController = {
    registerUser: async (req,res)=>{//
        try{
            const potentialUser = await User.findOne({"email":req.body.email})
            if(potentialUser){
                res.status(400).json({"message":"email already exists please login"})
            }


            const newUser = await User.create(req.body)
            let userName = newUser.firstName + " " + newUser.lastName
            console.log(userName)
            // {expiresIn:"2h"}
            
            const userToken = jwt.sign({"userID":newUser._id,"userName":userName},process.env.SECRET_KEY)
            res.status(201).cookie("userToken", userToken,{httpOnly:true}).json(newUser)
        }
        catch(er){
            console.log('catch')
            console.log(er)
            return res.status(400).json(er)}
    },
    loginUser: async (req,res)=>{
        
            //email check
            const user = await User.findOne({"email":req.body.email})// finding if the input email matches in database
            if(user===null){//if email is not in collection DB then send error
                return res.sendStatus(400)
            }
            //password check
            // if we find email we have access to user
            const correctPW = await bcrypt.compare(req.body.password, user.password)
            if(!correctPW){
                return res.sendStatus(400)
            }
            //make user token
            const userToken = jwt.sign({"userID":user._id,"userName":user.firstName + " " + user.lastName}, process.env.SECRET_KEY)
            console.log(userToken)
            res.status(201).cookie('userToken',userToken,{httpOnly:true}).json(user)
            
        },

    logoutUser: async (req,res)=>{
            res.clearCookie('userToken');
            res.sendStatus(200);},
    



    getUser: async (req,res)=>{
        try{
            const decodedToken = jwt.decode(req.cookies.userToken, {complete:true})//gets data on the token
            console.log(decodedToken)
            const userID = decodedToken.payload.userID
            const user = await User.findById(userID)
            res.json(user)
        }
        catch(er){return res.status(400).json(er)}
    }
}
export default UserController