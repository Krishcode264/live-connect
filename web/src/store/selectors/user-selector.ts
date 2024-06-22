import { userBasicInfoState } from "../atoms/user-atom";
import { selector } from "recoil";
import {User} from "../../types/types"
import { UserSchemaType } from "../../types/types";
export const userInfoState=selector({
    key:"user-info-selector",
    get:({get})=>{
        const { name, id } = get(userBasicInfoState);
        return {name,id}
    }
})

export const updateUser = selector({
  key: "updateUser",
  get: ({ get }) => get(userBasicInfoState),
  set: ({ set }, newuser) => set(userBasicInfoState, newuser),
});