import type {  Types } from "mongoose";

export type User = {
  name: string;
  id: string;
};

export type Offer = {
  user: User;
  offer?: { sdp?: string; type: "offer" };
  createdOffer?: { sdp?: string; type: "offer" };
  answer: { sdp?: string; type: "answer" };
  requestedUser?: User;
  receivedUser?: User;
};
export type Candidate = {
  candidate: RTCIceCandidate;
  persontoHandshake: User;
  user: User;
};
type ObjectId = Types.ObjectId;
export type UserSchemaType = {
  name: string;
  createdAt: Date;
  id?:string;
  socketID: string;
  isConnected: boolean;
  country?: string;
  intrests?: string[];
  age?: number;
  gender?: string;
  profile?:string;
  email:string;
};
export type photoSchematype = {
  key: string;
  imageUrl: string;
  uploader: ObjectId;
  uploadedAt?: Date;
  urlExpirationTime: Date;
  likes?: [ObjectId];
};