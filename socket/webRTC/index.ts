import { Candidate, Offer, User, type UserSchemaType } from "../types/types";
import { Socket } from "socket.io";
import {
  findUserById
} from "../mongoose/mongo_helpers/helper";
import { io } from "..";
import { UserData } from "../mongoose/model/userModel";

export function socketioConnection() {
  io.on("connection", async (socket: Socket) => {
    console.log("user connected", socket.id);
    UserData.find(
      {
        isConnected: true,
        socketID: { $ne: socket.id },
      },
      "name id"
    ).then((activeUsers) => {
      socket.emit("activeUsers", activeUsers);
    });

    socket.on("newUserConnected", async (user: User) => {
      console.log("new user connected", user);

      UserData.findOneAndUpdate(
        { id: user.id },
        { socketID: socket.id, isConnected: true },
        { new: true }
      ).then((data) => {
        const { name, id } = user;
        socket.broadcast.emit("newUserConnected", { name, id });
      });
    });

    //user disconnetion

    socket.on("disconnect", () => {
      UserData.findOneAndUpdate(
        { socketID: socket.id },
        { socketID: "", isConnected: false },
        { new: true }
      ).then((data): any => {
        if (data) {
          console.log("user dissconnected ", data);

          socket.broadcast.emit("userDisconnected", {
            name: data.name,
            id: data.id,
          });
        }
      });
    });

    //making RTCP handshake
    socket.on(
      "receivedOfferForRTC",
      async ({ createdOffer: offer, requestedUser, user }: Offer) => {
        console.log("got   step 1 : got offer ", requestedUser, user);
        if (requestedUser) {
          findUserById(requestedUser.id).then((socketID) => {
            if (socketID) {
              io.to(socketID).emit("receivedOfferForRTC", {
                user,
                offer,
              });
            }
          });
        }
      }
    );

    socket.on("handshaketoRTC", (data: User) => {
      console.log(data, "data from ahndshake with create answer from client ");
    });
    socket.on(
      "getCreateAnswerFromRequestedUser",
      async ({ answer, receivedUser }: Offer) => {
        console.log("getting create answer from req user", receivedUser);
        if (receivedUser) {
          findUserById(receivedUser.id).then((socketID) => {
            if (socketID) {
              io.to(socketID).emit("receivedAnswerToRTC", {
                answer,
                receivedUser,
              });

              console.log("received answer", socketID);
            }
          });
        }
      }
    );
    socket.on(
      "candidate",
      async ({ candidate, persontoHandshake, user }: Candidate) => {
        console.log(
          "got candidate",
          "person to send :",
          persontoHandshake,
          "person who sent it",
          user
        );
        findUserById(persontoHandshake.id).then((socketID) => {
          if (socketID) {
            io.to(socketID).emit("candidate", { candidate, user });
            console.log("received  target user to send candidate");
          }
        });
      }
    );
  });
}
