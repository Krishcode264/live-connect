import http from "http";
import { socketioConnection } from "./webRTC";
import dotenv from "dotenv";
import express from "express";
const app = express();
export const httpServer = http.createServer(app);
import { connectMongo } from "./mongoose/connectMongo";
import { Server } from "socket.io";
import { authRouter } from "./api/auth";
import cors from "cors";
import bodyParser from "body-parser";
import checkTokenValidity from "./middlewares/authenticate_jwt";
import { feedRouter } from "./api/feed";
import uploadRouter from "./api/uploads";
import createGraphqlServer from "./graphql/index";
import { expressMiddleware } from "@apollo/server/express4";

export const io = new Server(httpServer, { path: "/socket" });

async function init() {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use("/graphql", expressMiddleware(await createGraphqlServer()));
  app.get("/socket", (req) => {});
  app.post("/validateToken", checkTokenValidity);
  app.use("/auth", authRouter);
  app.use("/feed", feedRouter);
  app.use("/uploads", uploadRouter);
  
  app.get("/userPreferencesState", (req, res) => {
    res.send("success");
  });
  httpServer.listen(process.env.PORT || 8080, () => {
    // console.log("server is listening on port 8080");
    connectMongo();
    socketioConnection();
  });
}
init();
