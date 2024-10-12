import User from "../models/user.model";

const UserController = {
    getUser: async (req,res)=>{
        try{
        const newUser = await User.create(req.body)
        return res.status(201).json(newUser)}
        catch(err){
            return response.status(400).json(err)
        }
    }
}