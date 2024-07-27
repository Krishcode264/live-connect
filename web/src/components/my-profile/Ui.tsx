"use client";
import { buttonBaseClasses } from "@mui/material";
import React, { useEffect, useRef, useState, type ReactNode } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import Image, { type StaticImageData } from "next/image";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { convertImageTo64bitString } from "@/utils/helpers/helper";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/selectors/user-selector";

export const InfoTemplate = ({
  property,
  value,
}: {
  property: string;
  value: string | number;
}) => {
  const [defaultvalue, setDefaultValue] = useState("wewfhgehjg");

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);
  return (
    <div className="p-2  w-full md:w-[50%]">
      <h1 className="m-0 text-slate-900 my-1 font-semibold">{property}</h1>
      <input
        type="text"
        value={defaultvalue}
        onChange={(e) => setDefaultValue(() => e.target.value)}
      />
    </div>
  );
};

export const InfoTemplateWithOptions = ({
  property,
  value,
  options,
}: {
  property: string;
  value: string | number;
  options: string[];
}) => {
  return (
    <div className="p-2  w-full md:w-[50%]">
      <h1 className="m-0 text-slate-900 my-1 font-semibold">{property}</h1>
      <select
        className="w-full  text-lg p-2 outline outline-1 outline-slate-200 rounded-xl text-slate-400"
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} className="p-4" value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export const generateSinglet = (intrests: string[], editable?: boolean) => {
  return intrests.map((intrest) => {
    return (
      <span
        key={intrest}
        className=" flex group relative  text-slate-900 hover: rounded-xl bg-slate-100 hover:cursor-pointer "
      >
        {editable && (
          <button className="group/btn  hidden absolute bottom-6 right-0 group-hover:block  ">
            <ClearIcon className="group-hover/btn:text-red-500" />
          </button>
        )}
        <p className="p-1 m-1 text-l"> {intrest}</p>
      </span>
    );
  });
};

export const InfoTemplateWithIntrests = ({
  intrests,
}: {
  intrests: string[];
}) => {
  return (
    <div className="flex gap-4 p-1 flex-wrap  items-baseline">
      {generateSinglet(intrests, true)}
      <span className="border p-2 rounded-xl">
        <input type="text" placeholder="Add New" className="text-l" />
        <button className="bg-blue-500 rounded-xl text-l hover:text-slate-100 p-1 text-slate-300 px-3">
          Add
        </button>
      </span>
    </div>
  );
};

export const UploadPhoto = () => {
  const addPhotoRef = useRef(null);
  const { id } = useRecoilValue(userInfoState);

  const handleAddIconClick = () => {
    if (addPhotoRef.current) {
      addPhotoRef?.current?.click();
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: any = e.target.files;
      if (files[0]) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/uploads/getPresignedUrl`,
          { params: { id, fileName: files[0].name, type: files[0].type } }
        );
        const { url, key } = res.data;
        console.log(url, key,"key and url from server");
        const sendTos3 = await axios.put(url, files[0]);
        console.log(sendTos3);
        const isSave = await axios.get(
          `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/uploads/success`,
          { params: { key,id } }
        );
        console.log(isSave.data);
      }
    } catch (err) {
      console.log("image upload failed", err);
    }
  };
  return (
    <div>
      <button className="w-full h-full flex p-4 justify-center items-center flex-col shadow-lg bg-slate-200 rounded-xl hover:scale-110">
        <AddIcon
          onClick={handleAddIconClick}
          className="hover:cursor-pointer "
          sx={{ fontSize: "50px" }}
        />
        <p>Add photo</p>
      </button>
      <input
        onChange={(e) => handleUploadPhoto(e)}
        ref={addPhotoRef}
        type="file"
        name=""
        id=""
        className="w-full h-full  hover:cursor-pointer hidden"
      />
    </div>
  );
};

export const ImageGallary = ({
  imagearray,
}: {
  imagearray: string[] | StaticImageData[];
}) => {
  const ImageComponent = ({ url }: { url: string | StaticImageData }) => {
    return (
      <div className="w-[240px] md:w-[150px]  " >
        <Image
          src={url}
          alt="photo"
          width={50}
          quality={100}
          height={50}
          className="w-full h-full rounded-xl bg-contain"
        ></Image>
      </div>
    );
  };

  function renderPhotos(arr: string[] | StaticImageData[]) {
    return arr.map((url) => {
      return <ImageComponent url={url}  />;
    });
  }
  return (
    <div className="flex flex-wrap w-full justify-around gap-2 border p-2 bg-slate-300 rounded-lg">
      {renderPhotos(imagearray)}
      <UploadPhoto />
    </div>
  );
};
