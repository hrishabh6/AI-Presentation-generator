import { getRecentProjects } from '@/actions/project'
import { onAuthenticateUser } from '@/actions/user'
import AppSideBar from '@/components/global/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

type Props = {
    children : React.ReactNode
}

const layout = async ({children}: Props) => {
    const recentProjects = await getRecentProjects()
    const checkUser = await onAuthenticateUser()

    if(!checkUser.user) {
        // redirect('/sign-in')
    }

  return <SidebarProvider>
        {checkUser.user && <AppSideBar recentProjects={recentProjects.data || []} user={checkUser.user} ></AppSideBar>}
  </SidebarProvider>
}

export default layout