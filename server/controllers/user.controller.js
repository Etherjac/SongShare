import User from "../models/user.model.js";

const UserController = {
   
    createUser: async (req,res)=>{
        try{
            console.log("try")
            console.log(req.body)
            const newUser = await User.create(req.body)
            return res.status(201).json(newUser)
        }
        catch(er){
            console.log('catch')
            console.log(er)
            return res.status(400).json(er)}
    }
}
export default UserController