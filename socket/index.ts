import http from "http";
import { socketioConnection } from "./webRTC";
import express from 'express';
const app = express();
export const httpServer = http.createServer(app);
import { connectMongo } from "./mongoose/connectMongo";
import { Server } from "socket.io";


export const io = new Server(httpServer, { path: "/socket" });

app.get('/socket',(req)=>{
console.log("getting req at socket uri",req)
})
httpServer.listen(8080, () => {
  console.log("server is listening on port 8080");
  connectMongo();
  socketioConnection()
});
