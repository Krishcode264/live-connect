import { getUser } from '@/utils/fechers'
import React from 'react'

 const Page =async ({params}:{params:{id:string}}) => {
const userdata=await getUser(params.id)
console.log(userdata)
  return (
    <div>page para{params.id}
    {userdata?.name}
    </div>
  )
}

export default Page