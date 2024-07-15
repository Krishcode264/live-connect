import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import AuthNav from '@/components/profile/auth_nav';
const page =async () => {
const session=await auth();

  return <div>{(!session?.user)&& <AuthNav/>} friends page</div>;
}

export default page