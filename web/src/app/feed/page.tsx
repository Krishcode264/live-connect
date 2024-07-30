import ProfileView from "@/components/feed/ProfileView";
import type { FeedUserType, User } from "@/types/types";
import { getFeedUsers } from "@/utils/fechers";
import React, {  Suspense } from "react";
  export const revalidate = 10;

 
export default async function Page() {

  const users = await getFeedUsers();
  console.log(users,"useres")
  return (
    <div className="flex gap-4 flex-wrap p-4">
      <Suspense fallback={<div>Loading...</div>}>

        {users.length>0 ? users.map((user: FeedUserType) => {
          return <ProfileView user={user} key={user.id} />;
        }):(<h3> something went wrong from our side </h3>)}
      </Suspense>
    </div>
  );
}
