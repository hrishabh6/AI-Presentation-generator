
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";


type Props = {
  children: React.ReactNode;
};

const Layout =  async ({ children }: Props) => {
  
  const {userId} = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  

  return <div className="w-full min-h-screen">{children}</div>;
};

export default Layout;


