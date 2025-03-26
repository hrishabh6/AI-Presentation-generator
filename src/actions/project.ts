"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

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
    return { status: 500, error: "Internal Server error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
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
      take: 5,
    });

    if (projects.length === 0) {
      return { status: 404, error: "No projects found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.log("❌ Error in getRecentProjects", error);
    return { status: 500, error: "Internal Server error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
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
    });

    if (!updatedProject) {
      return { status: 404, error: "Project not found" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("❌ Error in recoverProject", error);
    return { status: 500, error: "Internal Server error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
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
    });

    if (!updatedProject) {
      return { status: 404, error: "Project not found" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("❌ Error in deleteProject", error);
    return { status: 500, error: "Internal Server error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Title and outlines are required" };
    }

    const allOutlines = outlines.map((outline) => outline.title);

    const checkUser = await onAuthenticateUser()
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const project = await client.project.create({
      data : {
        title,
        outlines: allOutlines,
        createdAt : new Date(),
        updatedAt : new Date(),
        userId : checkUser.user.id
      }
    })

    if(!project) {
      return { status: 500, error: "Error in creating project" };
    }

    return { status: 200, data: project };

  } catch (error) {
    console.log("❌ Error in createProject", error);
    return { status: 500, error: "Internal Server error" };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    
    const checkUser = await onAuthenticateUser()
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const project = await client.project.findFirst({
      where: {
        id: projectId
      }
    })

    if(!project) {
      return { status: 404, error: "Project not found" };
    }
    return { status: 200, data: project };

  } catch (error) {
    console.log("❌ Error in getProjectById", error);
    return { status: 500, error: "Internal Server error" };
    
  }
}

export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
      if(!slides || !projectId) {
        return { status: 400, error: "Slides are required" };
      }

      const updateProject = await client.project.update({
        where: {
          id: projectId
        },
        data: {
          slides,
          
        }
      })

      if(!updateProject) {
        return { status: 500, error: "Error in updating project" };
      }

      return { status: 200, data: updateProject };

  } catch (error) {
    console.log("❌ Error in updateSlides", error);
    return { status: 500, error: "Internal Server error" };
  } 
}

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    if(!projectId || !theme) {
      return { status: 400, error: "ProjectId and theme are required" };
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId
      },
      data : {
        themeName : theme
      }
    })

    if(!updatedProject) {
      return { status: 500, error: "Error in updating theme" };
    }

    return { status: 200, data: updatedProject };


  } catch (error) {
    console.log("❌ Error in updateTheme", error);
    return { status: 500, error: "Internal Server error" };
    
  }
}