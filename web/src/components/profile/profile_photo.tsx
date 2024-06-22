import React from 'react'
import profilepic from '../../images/profile.jpg'
import Image from 'next/image';
 


const ProfilePic = ({size}:{size?:number}) => {
console.log(size)

  return (
    <div
      className={`rounded-full   mx-auto w-12  h-12`}
      // className={`rounded-full   w-[64px] h-[64px] xl:w-[94px] xl:h-[94px] mx-auto w-[${size}px]  h-[${size}px]`}
    >
      <Image
        className="w-full h-full rounded-full"
        src={profilepic}
        alt="profile pic"
      />
    </div>
  );
}

export default ProfilePic;