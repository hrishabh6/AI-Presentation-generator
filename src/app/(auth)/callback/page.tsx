import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'


const AuthCallbackPage = async () => {
    const auth = await onAuthenticateUser()

    if(auth.status === 200 || auth.status === 201) {
        redirect("/dashboard")
        console.log(auth.user)
    } else if (auth.status === 403 || auth.status === 404 || auth.status === 500) {
        redirect("/sign-in")

    }
  
}

export default AuthCallbackPage
