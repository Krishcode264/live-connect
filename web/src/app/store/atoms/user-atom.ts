"use client";
import { UserSchemaType } from "../../types/types";
import { atom } from "recoil";

export const userState = atom({
  key: "user-state",
  default: {
    name:'',
    id: "",
    email:"",
    isConnected: false,
    country: "",
    intrests: [],
    age: 0,
    gender: "",
    socketID: "",
  }
});
