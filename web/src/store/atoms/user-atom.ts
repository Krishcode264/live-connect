"use client";
import { UserSchemaType } from "../../types/types";
import { atom } from "recoil";

// Basic user info
export const userBasicInfoState = atom({
  key: "user-basic-info-state",
  default: {
    name: '',
    id: '',
    email: '',
    age: 0,
    gender: '',
    user_name: '',
    profile_photo: '',
    fetched:false,
  }
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
