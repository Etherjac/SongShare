import Song from "../models/song.model.js";
import jwt from "jsonwebtoken"
const SongController = {
     create: async (req,res)=>{
        try{
            const decodedToken = jwt.decode(req.cookies.userToken, {complete:true})//gets data on the token
            console.log(decodedToken)
            const userID = decodedToken.payload.userID// gets userID from token
            const userName = decodedToken.payload.userName
            const newSong = {...req.body, userID,userName}//form inputs with added userID
            // console.log(newSong)
            const song = await Song.create(newSong)
            return res.status(201).json(song);}
        catch(er){return res.status(500).json(er)}
        },
    getSongs: async (req,res)=>{
        try{

            const songs = await Song.find();
            // console.log(songs)
            return res.status(200).json(songs);}
        catch(er){return res.status(500).json(er)}
        },
    getSong: async (req,res)=>{
        try{
            const currentSong = await Song.findById(req.params._id)
            return res.status(200).json(currentSong);}
            catch(er){return res.status(500).json(er)}
    },
    

    updateSong: async (req,res)=>{
        try{
            const options = {
                new: true,
                runValidators: true}
            const updatedSong = await Song.findByIdAndUpdate(req.params._id, req.body, options)
    
                res.json(updatedSong)
            }
            catch(error){
                console.log(error)
                res.status(400).json(error)}
        },

        deleteSong: async (req,res)=>{
            try{
                const deletedSong = await Song.findByIdAndDelete(req.params._id)
                res.json(deletedSong)}
                catch(er){console.log(er);
                    res.status(400).json(er)}
                }
            }
        
        
    
    

    
    
    
export default SongController