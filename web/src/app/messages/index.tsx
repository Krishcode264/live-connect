import ProfilePic from "@/components/profile/profile_photo";

export const ChatHead = () => {
  return (
    <div className="flex  gap-3 bg-slate-400 hover:bg-slate-400 hover:cursor-pointer p-2 rounded-md items-center justify-start min-w-24 ">
      <div
        className="rounded-full   w-8  h-8"
        // className={`rounded-full   w-[64px] h-[64px] xl:w-[94px] xl:h-[94px] mx-auto w-[${size}px]  h-[${size}px]`}
      >
        <ProfilePic
          iconSize={30}
          size={8}
          src="https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg"
        />
      </div>
      <h2 className="text-xl font-semibold text-slate-600">someone</h2>
    </div>
  );
};

export const ChatHeadContainer = () => {
  return (
    <div className="p-3 overflow-y-auto bg-slate-500 flex flex-col gap-2  shadow-slate-400 w-[100%] sm:w-[50%] md:w-[40%]  lg:w-[30%] xl:w-[25%]">
      <ChatHead />
      <ChatHead />
    </div>
  );
};

export const MessageTemplate = ({
  user,
  msg,
  src,
}: {
  src: string;
  user: string;
  msg: string;
}) => {
  return (
    <div className="flex  gap-3 hover:bg-slate-200  p-2 rounded-md items- justify-start min-w-24 ">
      <div
        className="rounded-full   w-8  h-8"
        // className={`rounded-full   w-[64px] h-[64px] xl:w-[94px] xl:h-[94px] mx-auto w-[${size}px]  h-[${size}px]`}
      >
        <ProfilePic size={8} src={src} iconSize={35} />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-3 flex-row">
          <h4 className="  text-slate-700 font-semibold">{user}</h4>
          <span className="text-slate-400 text-[15px]">1/07/2024 4:30 pm </span>
        </div>

        <p>{msg}</p>
      </div>
    </div>
  );
};
