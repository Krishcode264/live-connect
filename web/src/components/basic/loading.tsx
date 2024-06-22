import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
  return (
    <div className=' h-full flex items-center justify-center  text-rose-500 '>
<CircularProgress sx={{ color: "red", width: "100px", height: "100px" }} />
    </div>
  )
}

export default Loading