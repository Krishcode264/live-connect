"use client";
import { UserSchemaType } from "../../types/types";
import { atom } from "recoil";
import { PhotoType } from "../../types/types";
export interface UserBasicInfo {
  name: string;
  id: string;
  age: number;
  email:string;
  gender: string;
  profile: string;
  fetched: boolean;
}


export const userBasicInfoState = atom<UserBasicInfo>({
  key: "user-basic-info-state",
  default: {
    name: "",
    id: "",
    age: 0,
    gender: "",
    email:"",
    profile: "",
    fetched: false,
  },
});

// User connectivity status
export const userConnectivityState = atom({
  key: "user-connectivity-state",
  default: {
    isConnected: false,
    socketID: '',
  }
});

// User interests and preferences
export const userPreferencesState = atom({
  key: "user-preferences-state",
  default: {
    country: '',
    interests: [],
    pronouns: [],
    sexuality: '',
    languages_speak: [],
    languages_learning: [],
    countries_wish_to_visit: [],
    fetched:false
  }
});

//user photos 
export const UserPhotosState=atom<PhotoType[]|[]>({
  key:"user-photos-state",
  default:[]
})