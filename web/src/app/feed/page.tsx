import ProfileView from "@/components/feed/ProfileView";
import type { FeedUserType, User } from "@/types/types";
import axios from "axios";
import React, { Suspense } from "react";

async function getFeedUsers() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/feed/getFeedUsers`
    );

    return res;
  } catch (err) {
    console.error("error fetching feed data", err);
  }
}

export default async function Page() {
  const users = await getFeedUsers();

  return (
    <div className="flex gap-4 flex-wrap p-4">
      <Suspense fallback={<div>Loading...</div>}>
        {users?.data.map((user:FeedUserType) => {
          return <ProfileView user={user} key={user.id} />;
        })}
      </Suspense>
    </div>
  );
}
