"use client"
import React, { useEffect, useMemo } from 'react'
import ProfilePic from '../profile/profile_photo';
import Link from 'next/link';
import ChatIcon from "@mui/icons-material/Chat";
import { Icon } from '@mui/material';
import StreamIcon from '@mui/icons-material/Stream';
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { verifyGoogleAuthUser } from '@/actions/authActions';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/selectors/user-selector';
import { userBasicInfoState } from '@/store/atoms/user-atom';
import type { ReactJSXElement } from 'node_modules/@emotion/react/types/jsx-namespace';


const generateSideBarOptions=(options:{name:string,icon:ReactJSXElement}[])=>{
return options.map((option)=>{

    return (
      <Link
       key={option.name}
        href={`/${option.name.toLocaleLowerCase().split(" ").join("-")}`}
        className=" rounded-xl  hover:bg-slate-100 hover:cursor-pointer p-2 active:bg-slate-100"
      >
        <button className=" w-full  h-auto flex gap-2 items-center   mx-auto  ">
          {option.icon}

          <p className=' hidden md:block'> {option.name}</p>
        </button>
      </Link>
    );
})
}

const Sidebarheader=()=>{

  const user =useRecoilValue(userBasicInfoState);
console.log("user rendered ",user)
  return (
    <>
    
          <ProfilePic size={16} iconSize={50} src={user.profile} />
    
      <h3 className="text-center sm:text-xl text-blue-600 font-bold">
        {user.name}
      </h3>
    </>
  );
}



const SideBar = () => {


 const icons = useMemo(
   () => [
     { name: "Messages", icon: <ChatIcon /> },
     { name: "Feed", icon: <StreamIcon /> },
     { name: "Rooms", icon: <GroupsIcon /> },
     { name: "My Profile", icon: <AccountCircleIcon /> },
     { name: "Settings", icon: <SettingsIcon /> },
   ],
   []
 );
 

  return (
    <div className="rounded-lg h-[90%] w-[8%]   md:w-[15%] sm:p-2 flex flex-col   justify-start  ">

      <Sidebarheader/>
      <div className="flex flex-col gap-2 text-center  text-l mt-12  w-full  mx-auto">
        {generateSideBarOptions(icons)}
      </div>
    </div>
  );
}

export default SideBar