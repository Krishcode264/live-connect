import React from 'react'

const page = () => {
  return (
    <div className="border rounded-lg w-[50%] mx-auto mt-8 p-2 ">
      <h4></h4>
      <form action="" className="flex flex-col rounded-lg gap-4">
        <input type="text p-2" placeholder="Enter your name" className="p-2 rounded-lg" />
        <input type="email" placeholder="enter email" className="p-2 rounded-lg" />
      </form>
    </div>
  );
}

export default page