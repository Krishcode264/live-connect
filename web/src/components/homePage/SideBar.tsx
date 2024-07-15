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


const generateSideBarOptions=(options:string[],icon: React.JSX.Element[] | (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined)[])=>{
return options.map((option:string,index)=>{

    return (
      <Link
      key={option}
        href={`/${option.toLocaleLowerCase().split(" ").join("-")}`}
        className=" rounded-xl  hover:bg-slate-100 hover:cursor-pointer p-2 active:bg-slate-100"
      >
        <button className=" w-full  h-auto flex gap-2 items-center   mx-auto  ">
          {icon[index]}

          <p className=' hidden md:block'> {option}</p>
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

const sideBarOptions = useMemo(()=>["Messages", "Feed","Rooms", "My Profile", "Settings"],[]);
 const icons = useMemo(
   () => [
     <ChatIcon />,
     <StreamIcon />,
     <GroupsIcon />,
     <AccountCircleIcon />,
     <SettingsIcon />,
   ],
   []
 );
 
console.log("sidebar rendered")
  return (
    <div className="rounded-lg h-[90%] w-[8%]   md:w-[15%] sm:p-2 flex flex-col   justify-start  ">
      {/* {user.profile ? (
        <>
          <ProfilePic size={12} src={user.profile} />
        </>
      ) : (
        <AccountCircleIcon className="mx-auto text-[50px] border-none hover:cursor-pointer" />
      )}{" "}
      <h3 className="text-center sm:text-xl text-blue-600 font-bold">
        {user.name}
      </h3> */}
      <Sidebarheader/>
      <div className="flex flex-col gap-2 text-center  text-l mt-12  w-full  mx-auto">
        {generateSideBarOptions(sideBarOptions, icons)}
      </div>
    </div>
  );
}

export default SideBar