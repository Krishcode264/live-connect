"use client"
import React from 'react'
import { useAuth } from '@/hooks/useAuth';
import AuthNav from '@/components/profile/auth_nav';
import Loading from '@/components/basic/loading';
import { useRecoilValue } from 'recoil';
import { userBasicInfoState } from '@/store/atoms/user-atom';
import { ChatBar } from '@/components/messageView/ChatBar';
import { MessageTemplate, ChatHeadContainer } from '.';




const DetailedChatView=()=>{
  const { profile } = useRecoilValue(userBasicInfoState);
  return (
    <div className=" w-full  bg-slate-200  hidden flex-col gap-3 sm:justify-between p-2  h-full sm:flex">
      <div className="   flex-1 ">
        <MessageTemplate
          src={profile}
          user="Dan Swartz"
          msg="hello how are you "
        />
        <MessageTemplate
          src="https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg"
          user="someone"
          msg="i am good , what about you ? "
        />
      </div>
      <ChatBar />
    </div>
  );
}

const Page = () => {
// const {isLoading,isValid}=useAuth()
// if (isLoading) <Loading/>
    return (
      <div className='h-full'>
        <h1>messages </h1>
        {/* {!isValid.status && !isLoading ? (
          <AuthNav text="you need to authenticate to see your friend's messages" />
        ) : (
          <div className='flex h-full border '>
          
            <ChatHeadContainer />
            <DetailedChatView />
          </div>
        )} */}
      </div>
    );
}

export default Page