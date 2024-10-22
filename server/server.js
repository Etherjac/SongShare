import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import dbConnect from "./config/mongoose.config.js";
import SpotifyWebApi from 'spotify-web-api-node';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.routes.js';
import songRoutes from './routes/song.routes.js'
// const cookieParser = require('cookie-parser');
// ...
// // Change the app.use(cors()) to the one below
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


const app = express();
dotenv.config();
//middleware 
app.use(cors({credentials: true, origin: 'http://localhost:5173'})) // allows your app to read cookies with each req, res
app.use(bodyParser.json())
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json(), express.urlencoded({extended: true}));

app.use('/api',userRoutes)
app.use('/api',songRoutes)

const PORT = process.env.PORT;

dbConnect()
app.listen(PORT, () => console.log(`listening on port:${PORT}`));




// app.post('/login', (req,res)=>{
//     const code = req.body.code//get the code from the front passing up

// // create new api for spotify with parameters in a object with credentials.

//     const spotifyApi = new SpotifyWebApi({
//         redirectUri:'http://localhost:5173/users/main',
//         clientId:'e3174151cfef45ac8335f1cb0a25c1e0',
//         clientSecret:'20030b6d36594678897a0720d4c842de'
//     })
// //using authorizationCodeGrant() we pass in the code. then we get data back in response with accesstoken, refreshtoken, and expiresin.
//     spotifyApi
//     .authorizationCodeGrant(code)
//     .then(data=>res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in
//     })
//     .catch((er)=>{
//         console.log(er)
//         res.sendStatus(400)
//     }))
// })
