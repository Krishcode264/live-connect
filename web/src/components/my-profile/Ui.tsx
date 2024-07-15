"use client"
import { buttonBaseClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ClearIcon from "@mui/icons-material/Clear";

export const InfoTemplate=({property,value}:{property:string,value:string|number})=>{

 const [defaultvalue,setDefaultValue]=useState(value)

    useEffect(() => {
      setDefaultValue(value);
    }, [value]);
    return(
        <div className='p-2  w-full md:w-[50%]'>
            <h1 className='m-0 text-slate-900 my-1 font-semibold'>{property}</h1>
            <input type="text" value={defaultvalue} onChange={(e)=>setDefaultValue(()=>e.target.value)} />
        </div>
    )
}

export const InfoTemplateWithOptions=({property,value,options}:{property:string,value:string|number,options:string[]})=>{
    return(
        <div className='p-2  w-full md:w-[50%]'>
            <h1 className='m-0 text-slate-900 my-1 font-semibold'>{property}</h1>
            <select className='w-full  text-lg p-2 outline outline-1 outline-slate-200 rounded-xl text-slate-400' value={value}>
                {options.map((option,index)=>(
                    <option key={index} className='p-4' value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
export const generateSinglet = (intrests: string[],editable?:boolean) => {

  return intrests.map((intrest) => {

    return (
      <span key ={intrest}className=" flex group relative  text-slate-900 hover: rounded-xl bg-slate-100 hover:cursor-pointer ">
        {editable && (
          <button className="group/btn  hidden absolute bottom-6 right-0 group-hover:block  ">
            <ClearIcon className="group-hover/btn:text-red-500" />
          </button>
        )}
        <p className='p-1 m-1 text-l'> {intrest}</p>
      </span>
    );
  });
};



export const InfoTemplateWithIntrests=({intrests}:{intrests:string[]})=>{
    return <div className='flex gap-4 p-1 flex-wrap  items-baseline'>{generateSinglet(intrests,true)}
     <span className='border p-2 rounded-xl'>
        <input type="text" placeholder='Add New' className='text-l'  />
        <button className='bg-blue-500 rounded-xl text-l hover:text-slate-100 p-1 text-slate-300 px-3'>Add</button>
     </span>
    </div>;

}