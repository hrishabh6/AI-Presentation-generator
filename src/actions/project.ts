"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";

export const getAllProjects = async () => {
  try {
    const checkUser: { status: number; user?: { id: string } } =
      await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No projects found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.log("❌ Error in onAuthenticateUser", error);
    return { status: 500, error : "Internal Server error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser()
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }
    const projects = await client.project.findMany({
      where:{
        userId: checkUser.user.id,
        isDeleted: false
      },
      orderBy:{
        updatedAt: 'desc'
      },
      take: 5
    })

    if(projects.length === 0) {
      return {status: 404, error: "No projects found"}
    }

    return {status: 200, data: projects}

  } catch (error) {
    console.log("❌ Error in getRecentProjects", error);
    return { status: 500, error : "Internal Server error" };
  }
}

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser()
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    })

    if (!updatedProject) {
      return { status: 404, error: "Project not found" };
    }

    return { status: 200, data: updatedProject };

  } catch (error) {
    console.log("❌ Error in recoverProject", error);
    return { status: 500, error : "Internal Server error" };
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser()
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    })

    if (!updatedProject) {
      return { status: 404, error: "Project not found" };
    }

    return { status: 200, data: updatedProject };

  } catch (error) {
    console.log("❌ Error in deleteProject", error);
    return { status: 500, error : "Internal Server error" };
  }
}