import {SignUp } from '@clerk/nextjs'
import React from 'react'

const Signup = () => {
  return (
    <SignUp forceRedirectUrl={'/dashboard'}/>
  )
}

export default Signup
