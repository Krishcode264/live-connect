"use client";
import { UserSchemaType } from "../../types/types";
import { atom } from "recoil";
export interface UserBasicInfo {
  name: string;
  id: string;
  email: string;
  age: number;
  gender: string;
  user_name: string;
  profile: string;
  fetched: boolean;
}
// Basic user info
export const userBasicInfoState = atom<UserBasicInfo>({
  key: "user-basic-info-state",
  default: {
    name: "",
    id: "",
    email: "",
    age: 0,
    gender: "",
    user_name: "",
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
