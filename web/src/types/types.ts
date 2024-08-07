import type { Schema } from "zod";

export type User = {
  name: string;
  id: string;
   profile?:"string"
};

export type Offer = {
  user: User;
  offer?: { sdp?: string; type: "offer" };
  offercreated?: { sdp?: string; type: "offer" };
  answer: { sdp?: string; type: "answer" };
  requestedUser?: User;
  receivedUser?: User;
};
export type Candidate = {
  candidate: RTCIceCandidate;
  persontoHandshake: User;

  user: User;
};

export type UserSchemaType = {
  name: string;
  createdAt: Date;
  id?: string;
  socketID?: string;
  email?:string;
  isConnected: boolean;
  country?: string;
  intrests?: string[];
  age?: number;
  gender?: string;
};
export type PhotoType = {
  imageUrl: string;
  uploadedAt?: Date;
  likes?: [string];
  _id:string
};
 export  interface FeedUserType {
    name: string;
    id: string;
    _id?: string;
    age: number;
    profile:string;
    location: string;
    photos: PhotoType[];
  }