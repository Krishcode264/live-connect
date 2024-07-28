import React from 'react'
import profilepic from '../../images/profile.jpg'
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { userBasicInfoState, type UserBasicInfo } from '@/store/atoms/user-atom';
 import defaultUserProfile from '@/images/user-profile.png'
import AccountCircle from '@mui/icons-material/AccountCircle';

const ProfilePic = ({size,src,iconSize}:{size?:number,iconSize?:number,src:string}) => {

  return (
    <div
      className={`rounded-full  mx-auto  w-${size}  h-${size}`}
      // className={`rounded-full   w-[64px] h-[64px] xl:w-[94px] xl:h-[94px] mx-auto w-[${size}px]  h-[${size}px]`}
    >
      {src ? (
        <Image
          className="w-full h-full rounded-full "
          src={src || defaultUserProfile}
          alt="profile pic"
          width={size}
          height={size}
          unoptimized={true}
        />
      ) : (
       
          <AccountCircle
            sx={{ fontSize:iconSize }}
            className="mx-auto  border-none "
          />
      
      )}
    </div>
  );
}

export default ProfilePic;