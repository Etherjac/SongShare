import {Schema,model}from "mongoose"

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true, 'first name is required'],
        minlength:[2,'first name needs at least 2 characters'],
        maxlength:[40,'cant exceed 40 characters']
    },
    lastName:{
        type:String,
        minlength:[2,'first name needs at least 2 characters'],
        maxlength:[40,'cant exceed 40 characters']
    },
    email:{
        type:String,
        required:[true,'field is required'],
},
    password:{
        type:String,
        required:[true,'field is requieed']
    },
    
},{timestamps:true})

const User = model("User", UserSchema)
export default User