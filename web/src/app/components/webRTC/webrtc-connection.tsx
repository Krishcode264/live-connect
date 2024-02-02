import React, { useEffect } from "react";
import { useState } from "react";
import MediaStream from "./MediaStream/media-stream";
import MediaStreamGuest from "./MediaStream/media-stream-guest";
import CameraIcon from "@mui/icons-material/Camera";
import MicIcon from "@mui/icons-material/Mic";
import { useRecoilState, useRecoilValue } from "recoil";
import { peerConnectionState } from "../../store/selectors/pc-selector";
import { remoteStreamState } from "../../store/selectors/media-state-selector";
import { useSetRecoilState } from "recoil";
import { mediaStreamState } from "../../store/atoms/media-stream-atom";
import { showComponentState } from "../../store/atoms/show-component";
import { useMediaPermissionAccess } from "./hooks/useMediaPermissionAccess";

const WebrtcConnection = () => {
  const [tracksAdded, setTracksAdded] = useState(false);
  const peerConnection = useRecoilValue(peerConnectionState);
  const [remoteStream, setRemoteStream] = useRecoilState(remoteStreamState);
  const [{ mediaStream }, setMediaStreamAll] = useRecoilState(mediaStreamState);
  const setShowComponent = useSetRecoilState(showComponentState);
  const { video, audio } = useMediaPermissionAccess();

  const getUserMediaStream = () => {
    const setDefaultdisabledTracks = (stream: MediaStream) => {
      stream.getTracks().forEach((track) => {
        track.enabled = false;
        peerConnection?.addTrack(track, stream);
      });
  
      console.log("stream after track.enable=false ", stream.getTracks());
      setMediaStreamAll((prev) => ({
        ...prev,
        mediaStream: stream,
        video: false,
        audio: false,
      }));

      setTracksAdded(() => true);
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setDefaultdisabledTracks(stream);
      })
      .catch((err) => {
        throw err;
      });
  };
  useEffect(() => {
    console.log(video, audio);
    if (audio === "granted" || video === "granted") {
      getUserMediaStream();
    }
  }, [audio, video]);

  useEffect(() => {
    if (peerConnection) {
      peerConnection.ontrack = (e: RTCTrackEvent) => {
        const rm = e.streams[0];
        console.log("remote strem ontract event", rm);
        if (rm) {
          setRemoteStream(rm);
        }
      };
    }
  }, [peerConnection]);

  return (
    <div className="">
      {tracksAdded ? (
        <div className="flex bg-gradient-to-br sm:flex-row  flex-col  w-full from-black to-slate-800  min-h-44 sm:min-h-96  h-fit  gap-2 justify-between items-end ">
          <div className="rounded-lg  p-2 mr-auto">
      
            {mediaStream && (
              <MediaStream/>
            )}
          </div>
          {remoteStream && (
            <div className="  rounded-lg  p-2 mr-auto">
            
              <MediaStreamGuest />
            </div>
          )}
        </div>
      ) : (
        <div className="  text-slate-400 bg-slate-600 p-6 w-3/5 md:w-1/2 m-auto flex flex-col items-center rounded-xl relative top-40">
          <p className="text-xl text-slate-400">
          we need acces to your camera and microphone
          </p>
          <div className="m-auto">
            <CameraIcon sx={{ fontSize: "33px" }} />
            <MicIcon sx={{ fontSize: "33px" }} />
          </div>
          <button
            className="p-1  bg-slate-500 hover:border border-gray-200  mt-4 text-xl font-semibold rounded-lg"
            onClick={getUserMediaStream}
          >
            Grant access
          </button>
        </div>
      )}
    </div>
  );
};

export default WebrtcConnection;
