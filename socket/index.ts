import http from "http";
import { socketioConnection } from "./webRTC";
// JavaScript
import dotenv from 'dotenv'
import express from 'express';
const app = express();
export const httpServer = http.createServer(app);
import { connectMongo } from "./mongoose/connectMongo";
import { Server } from "socket.io";
import { authRouter } from "./api/auth";
import cors from 'cors'
import bodyParser from "body-parser";
import checkTokenValidity from "./middlewares/authenticate_jwt";
export const io = new Server(httpServer, { path: "/socket" });
app.use(cors())
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());
   app.use(express.json())
app.get('/socket',(req)=>{
console.log("getting req at socket uri",req)
})
app.post("/validateToken",checkTokenValidity)
app.use("/auth",authRouter)
app.get('/userPreferencesState',(req,res)=>{
console.log("req getting for user data ")
console.log(req)
res.send("success");
})
httpServer.listen(process.env.PORT||8080, () => {
  console.log("server is listening on port 8080");
  connectMongo();
  socketioConnection()
});
