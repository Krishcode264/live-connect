import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useRef, useState } from "react";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SendIcon from "@mui/icons-material/Send";
export const ChatBar = () => {

  return (
    <div className="bg-slate-300 p-3 rounded-md  gap-2 shadow-sm sm:w-[90%] mx-auto  shadow-slate-400 flex ">
      <AddCircleIcon className="hover:text-slate-600 hover:cursor-pointer mt-3 text-3xl" />
      <SearchBox />
      <SendIcon className="hover:text-slate-600 hover:cursor-pointer mt-3 text-3xl" />
      <div className="flex gap-2 ml-auto  mt-3 ">
        <AddReactionIcon className="hover:text-slate-600 hover:cursor-pointer text-3xl " />
        <GifBoxIcon className="hover:text-slate-600 hover:cursor-pointer  text-3xl " />
      </div>
    </div>
  );
};


const SearchBox=()=>{
    const [value,setValue]=useState("")
    const textareaRef=useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
 if (textareaRef.current ) {
   // Adjust height based on scrollHeight
   textareaRef.current.style.height = "auto";
   console.log(textareaRef.current.scrollHeight);
   textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
 }
    },[value])

    const handleTextAreaHeight = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValue(event.target.value);
    };
   
    return (
      <div className="w-[70%] md:w-[75%]  ">
        <textarea
          ref={textareaRef}
          className="p-2 w-full holder_color  text-xl resize-none outline-none  overflow-hidden bg-inherit text-slate-800"
          rows={1}
          value={value}
          placeholder="Message @Tibo"
          onChange={handleTextAreaHeight}
        
        />
      </div>
    );
}

