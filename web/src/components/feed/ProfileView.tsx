"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import k1 from "@/images/k1.jpg";
import k2 from "@/images/k2.jpg";
import k3 from "@/images/k3.jpg";
import k4 from "@/images/profile.jpg";
import ProfilePic from "@/images/duf.webp";


const UserInfo=({name,age,location})=>{
  return (

      <div className="absolute p-1 text-slate-100 font-semibold  bottom-0 left-0 translate-x-2">
        <p>
          {name} , <span>{age}</span>

        </p>
        <h1>{location}</h1>
      </div>

  );
}

export const PhotosPopup = ({user}) => {
  const photosArray = [user?.profile];
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex === photosArray.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {photosArray[index] ? (
        <Image
          className="w-full h-full rounded-xl"
          src={photosArray[index]}
          width={40}
          height={40}
          alt="photo"
        />
      ) : (
        <Image
            src={ProfilePic}
            width={100}
            height={100}
            className="w-full h-full rounded-xl" alt={""}        />
      )}
      <div className=" bg-gradient-to-b hover:cursor-pointer hover:from-black/0  via-black/50  to-black/70 hover:to-black/100  absolute w-full h-full z-10  rounded-xl inset-0">
        {<UserInfo name={user.name} age={user.age} location={user.location} />}
      </div>
    </div>
  );
};

const ProfileView = ({user}) => {
  const handleProfileViewClick=()=>{
    console.log("profile view clicked",user.id)
  }
  return (
    <div onClick={handleProfileViewClick} className="w-60 border   h-60 rounded-xl   ">
      <PhotosPopup user={user} />
    </div>
  );
};

export default ProfileView;
