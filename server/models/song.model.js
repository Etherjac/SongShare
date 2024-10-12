import {Schema,model}from 'mongoose'

const SongSchema = new Schema({
    songName:{
        type:String,
        required:[true,'field is required']
    },
    songArtist:{
        type:String,
        required:[true,'son artist is requiered']
    },
    songGenre:{
        type:String,
        required:[true,'']
    }
    
},{timestamps:true})

const Song = model("Song",SongSchema)
export default Song