import axios from "axios";
import { cache } from "react";

export const getFeedUsers = cache(async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/feed/getFeedUsers`
    );

    return res.data;
  } catch (err) {
    console.error("error fetching feed data");
    return [];
  }
});

export const getUser=cache(async(id:string)=>{
  try{
const res = await axios.get(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/feed/getUser`,{params:{id}});
return res.data
  }catch(err){

    console.log("somethingwent wrong with fethching the user ")
    return null;
  }
})