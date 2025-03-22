import { getRecentProjects } from '@/actions/project'
import { onAuthenticateUser } from '@/actions/user'
import AppSideBar from '@/components/global/app-sidebar'
import UpperInfoBar from '@/components/global/upper-info-bar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = async ({ children }: Props) => {
    const recentProjects = await getRecentProjects()
    const checkUser = await onAuthenticateUser()
    
    if (!checkUser.user) {
        console.log("logging from layout")
        redirect('/sign-in')
    }

    return <SidebarProvider>
        {checkUser.user && <AppSideBar recentProjects={recentProjects.data || []} user={checkUser.user} ></AppSideBar>}
        <SidebarInset>
            <UpperInfoBar user={checkUser.user}/>
                
                {children}
                
           
        </SidebarInset>
    </SidebarProvider>
}

export default layout