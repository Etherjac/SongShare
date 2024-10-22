import {Schema,model}from 'mongoose'

const SongSchema = new Schema({
    songName:{
        type:String,
        required:[true,'field is required']
    },
    songArtist:{
        type:String,
        required:[true,'song artist is requiered']
    },
    songGenre:{
        type:String,
        required:[true,'']
    },
    //join users to song.
    userID:{
        //ObjectID is just a mongo type.
        type:Schema.Types.ObjectId,
        ref:'User',//the model reference(model name)
        required:[true, "user ID is required"]
    },
    userName:{
        type:Schema.Types.String,
        ref:'User',
        requiered:[true,"song needs a user who shared it"]
    }
    
},{timestamps:true})

const Song = model("Song",SongSchema)
export default Song