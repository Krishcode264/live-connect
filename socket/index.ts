import http from "http";
import { socketioConnection } from "./webRTC";
import express from 'express';
const app = express();
export const httpServer = http.createServer(app);
import { connectMongo } from "./mongoose/connectMongo";
import { Server } from "socket.io";
import { signupRouter } from "./api/signup";
import cors from 'cors'
import bodyParser from "body-parser";
export const io = new Server(httpServer, { path: "/socket" });
app.use(cors())
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());
   app.use(express.json())
app.get('/socket',(req)=>{
console.log("getting req at socket uri",req)
})
app.use("/signup",signupRouter)
httpServer.listen(8080, () => {
  console.log("server is listening on port 8080");
  connectMongo();
  socketioConnection()
});
