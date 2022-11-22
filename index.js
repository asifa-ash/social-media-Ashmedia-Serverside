import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'

const app = express();


// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));


dotenv.config();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=> app.listen(PORT,()=> console.log(`server connectd port: ${process.env.PORT}`))).
catch((error)=> console.log(error))


app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/post', PostRoute)   
app.use('/posts', PostRoute) 
app.use('/postsre', PostRoute)    
app.use('/pos', PostRoute)  
app.use('/rpost', PostRoute) 
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)