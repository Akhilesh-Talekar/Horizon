import AuthForm from '@/components/AuthForm';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Signin = async () => {
  
  return (
    <section className='flex justify-center size-full max-sm:px-6'>
      <AuthForm type={"sign-in"}/>
    </section>
  )
}

export default Signin;
