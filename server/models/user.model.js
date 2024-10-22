import {Schema,model}from "mongoose"
import validator from "validator"
// import validate from "mongoose-validator"
import mongooseUniqueValidator from "mongoose-unique-validator"
import bcrypt from 'bcrypt'
//destructure from validator
const {isEmail } = validator

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true, 'first name is required'],
        minlength:[2,'first name needs at least 2 characters'],
        maxlength:[40,'cant exceed 40 characters']
    },
    lastName:{
        type:String,
        required:[true, 'last name is required'],
        minlength:[2,'first name needs at least 2 characters'],
        maxlength:[40,'cant exceed 40 characters']
    },
    email:{
        type:String,
        required:[true,'field is required'],
        validate:[isEmail, "not a valid email"],
        unique:[true,"email is already in use"]
    },
    password:{
        type:String,
        required:[true,'field is required']
        
    },
  
},{timestamps:true})
// UserSchema.plugin(validate)
//middleware
UserSchema.plugin(mongooseUniqueValidator)

UserSchema.virtual('confirm')// getting from form 
.get(function(){this._confirm}) // this gets value
.set(function(value){this._confirm = value})

UserSchema.pre('validate', function (next){
    if (this.password !== this._confirm){
        this.invalidate('confirm','passwords dont match')//document.invalidate(path, message) path is name of field
    }next();
})

UserSchema.pre('save',function (next){
    bcrypt.hash(this.password,10)//num is for salt
    .then((hash)=>{
        this.password = hash
        next()})
    })


const User = model('User', UserSchema)

export default User











































