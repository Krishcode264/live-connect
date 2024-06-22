import { User } from "../../types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import CallIcon from "@mui/icons-material/Call";
import { connectedUsersState } from "../../store/atoms/socket-atom";
import { guestState } from "../../store/atoms/guest-atom";
import { peerConnectionState } from "../../store/selectors/pc-selector";
import { userInfoState } from "@/store/selectors/user-selector";
import { useContext } from "react";
import SocketContext from "@/context/context";
import { callState } from "@/store/atoms/calling-state";
import { Icon } from "@mui/material";

const CallStateIcon = () => {
  const callingState = useRecoilValue(callState);
  return (
    <div className="flex items-center justify-center p-1">
      {callingState !== "default" && <p>{callingState}</p>}
      {callingState === "default" && <CallIcon />}
      {callingState === "calling" && <CallIcon className="" />}
    </div>
  );
};

const UserDetail = ({ id, name }: User) => {
  const [{ persontoHandshake }, setPersontoHandshake] =
    useRecoilState(guestState);
  const socket = useContext(SocketContext);
  const peerConnection = useRecoilValue(peerConnectionState);
  const user = useRecoilValue(userInfoState);
  const [callingState, setCallingState] = useRecoilState(callState);
  const createOffer = async () => {
    try {
      const createdOffer = await peerConnection?.createOffer();
      await peerConnection?.setLocalDescription(createdOffer);
      return createdOffer;
    } catch (error) {
      // Handle the error if needed
      console.error("Error creating offer:", error);
      throw error; // Optional: rethrow the error to propagate it
    }
  };

  const emitUserRequestForVideoCall = async (
    requestedUser: User
  ): Promise<void> => {
    console.log(socket, "soxket from emit user req ");
    setCallingState("calling");
    const createdOffer = await createOffer();
    setPersontoHandshake(() => ({ persontoHandshake: requestedUser }));
    // console.log("guest from emituserrequest", persontoHandshake);
    if (socket !== null && createdOffer) {
      console.log("socket is preset: here is offer ", createdOffer);
      socket.emit("receivedOfferForRTC", { createdOffer, requestedUser, user });
    }
  };

  return (
    <section
      key={id}
      className="bg-gradient-to-r from-indigo-800 to-black mb:w-full sm:w-[50%] xl:w-[30%]  rounded-lg items-center text-white flex justify-between w-full m-auto p-1"
    >
      <h2 className="text-lg">{name}</h2>

      <button
        className="p-1 bg-emerald-600 rounded-l "
        disabled={persontoHandshake?.id === id}
        onClick={() => {
          emitUserRequestForVideoCall({ name, id });
        }}
      >
        {persontoHandshake?.id === id ? <CallStateIcon /> : <CallIcon />}
      </button>
    </section>
  );
};

const RenderConnectedUsers = () => {
  const { connectedUsers } = useRecoilValue(connectedUsersState);
  const {id}=useRecoilValue(userInfoState)
  return connectedUsers.map((connecteduser: User): JSX.Element | null => {
    if(connecteduser.id===id){
      return null;
    }
    return (
      <UserDetail
        name={connecteduser.name}
        key={connecteduser.id}
        id={connecteduser.id}
      />
    );
  });
};

export default RenderConnectedUsers;
