import React from 'react'
import profilepic from '../../images/profile.jpg'
import Image from 'next/image';
 
const ProfilePic = () => {
  return (
    <div className="rounded-full border w-40 h-40">

  <Image className='w-full h-full rounded-full' src={profilepic} alt='profile pic'/>
    </div>
  );
}

export default ProfilePic;