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
