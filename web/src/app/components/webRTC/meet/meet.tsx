"use client";
import { User } from "../../../types/types";
import { Offer } from "../../../types/types";
import { Candidate } from "../../../types/types";
import React, { useEffect } from "react";
import WebrtcConnection from "../webrtc-connection";
import { UserForm } from "../user-form";
import RenderConnectedUsers from "../user-detail";
import Call from "../call/call";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { guestState } from "../../../store/atoms/guest-atom";
import { userInfoState } from "../../../store/selectors/user-selector";
import SocketContext from "../../../context/context";
import { connectedUsersState } from "../../../store/atoms/socket-atom";
import { showComponentState } from "../../../store/atoms/show-component";
import { offerState, pcState } from "../../../store/atoms/pc-atom";
import { useSocket } from "../hooks/useSocket";
import { usePeerConnection } from "../hooks/usePeerConnection";
import AuthNav from "../../profile/auth_nav";
export interface OfferSdp {
  sdp?: string;
  type: "offer";
}
type ConnectedUsers = User[] | [];
export function Meet() {
  const user = useRecoilValue(userInfoState);
  const [{ persontoHandshake }, setPersontoHandshake] =
    useRecoilState(guestState);
  const setOffer = useSetRecoilState(offerState);
  const [{ connectedUsers }, setConnectedUsers] =
    useRecoilState(connectedUsersState);
  const [showComponent, setShowComponent] = useRecoilState(showComponentState);
  const { showCall, showform, showWebrtcConnection } = showComponent;
  const { socket } = useSocket();
  const peerConnection = usePeerConnection();
  const setPeerConnection = useSetRecoilState(pcState);
  useEffect(() => {
    if (socket && peerConnection) {
      console.log("i dont know why running ")
      setPeerConnection((prev) => ({ ...prev, peerConnection }));
      setShowComponent((prev) => ({ ...prev, showWebrtcConnection: true }));
    }
    return(()=>{
      console.log("socket dissconnected from meet.tsx")
      socket?.disconnect();
            setPeerConnection((prev) => ({ ...prev, peerConnection:null }));
            setShowComponent((prev) => ({
              ...prev,
              showWebrtcConnection: false,
            }));
    })
  }, [socket, peerConnection]);

  //ice candidate exchnage
  if (peerConnection) {
    peerConnection.onicecandidate = (event) => {
      // console.log("onicecandidate event is running");
      if (peerConnection.remoteDescription) {
        // console.log("actul ice candidates shared now ");
        if (event.candidate && socket !== null) {
          const candidate = event.candidate;
          socket.emit("candidate", { candidate, persontoHandshake, user });
          console.log("candidate  sent ");
        }
      }
    };
  }

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("socket connection established");
        socket.emit("newUserConnected", user);
        setShowComponent({
          showCall,
          showform,
          showWebrtcConnection: !showWebrtcConnection,
        });
        // setShowWEBrtcConnection((prev) => !prev);
        socket.on("activeUsers", (activeUsers: ConnectedUsers) => {
          setConnectedUsers((prev) => ({
            ...prev,
            connectedUsers: activeUsers,
          }));
        });
      });
      socket.on("newUserConnected", (newUserData: User) => {
        // console.log(connectedUsers, newUserData);
        setConnectedUsers(({ connectedUsers }) => {
          if (connectedUsers.length === 0) {
            return { connectedUsers: [newUserData] };
          }
          return { connectedUsers: [...connectedUsers, newUserData] };
        });
      });
      socket.on("userDisconnected", (disconncetdUserdata: User) => {
        setConnectedUsers(({ connectedUsers }) => ({
          connectedUsers: connectedUsers.filter(
            (userinconnection) => userinconnection.id !== disconncetdUserdata.id
          ),
        }));
      });

      socket.on(
        "receivedOfferForRTC",
        ({ user: receivedUser, offer: offerreceived }: Offer) => {
          console.log(
            "updatation of persontohandshake at socket event ",
            receivedUser
          );
          console.log(offerreceived, "offer from receive offer for rtc");
          setOffer({ offer: offerreceived });
          setPersontoHandshake({ persontoHandshake: receivedUser });
          setShowComponent({
            showCall: true,
            showform,
            showWebrtcConnection,
          });

          //send back localdescription.createanswer to client via socket event
        }
      );
      socket.on("receivedAnswerToRTC", async ({ answer }: Offer) => {
        if(peerConnection?.remoteDescription){
          return
        }
        await peerConnection?.setRemoteDescription(answer);
      });
      socket.on("candidate", async ({ candidate }: Candidate) => {

        console.log("getting ice candidate from guest");
        if (peerConnection?.remoteDescription) {
          try {
            await peerConnection.addIceCandidate(candidate);
          } catch (error) {
            // Handle the error if the ice candidate couldn't be added
            console.error("Error adding ice candidate:", error);
          }
        }

        // }
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      <div className=" w-full">
        {!user.id && <AuthNav />}
        {showCall && <Call />}
        {socket && (
          <>
            <div className="flex flex-col mx-auto gap-2 p-6 rounded-lg ">
              {connectedUsers.length > 0 ? (
                <RenderConnectedUsers />
              ) : (
                <h3 className="text-sky-200 text-xl">
                  there is no one joined this room
                </h3>
              )}
            </div>
            <WebrtcConnection />
          </>
        )}
      </div>
    </SocketContext.Provider>
  );
}
