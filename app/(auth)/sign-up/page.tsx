import AuthForm from '@/components/AuthForm';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Signup =  () => {
  
  return (
    <section className='flex justify-center size-full max-sm:px-6'>
      <AuthForm type={"sign-up"}/>
    </section>
  )
}

export default Signup;
