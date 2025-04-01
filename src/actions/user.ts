"use server"
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    console.log(user)
    if (!user) {
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        PurchasedProjects: {
          select: {
            id: true,
          },
        },
      },
    });

    if(userExist) {
        return { status: 200, user: userExist };
    }

    const newUser = await client.user.create({
        data : {
            clerkId : user.id,
            email : user.emailAddresses[0].emailAddress,
            name: user.firstName + " " + user.lastName,
            profileImage : user.imageUrl,
            subscription : true

        }
    })

    if(newUser) {
        return { status: 200, user: newUser };
    }
    return { status: 404 };
  } catch (error) {
    console.log("❌ Error in onAuthenticateUser", error);
    return { status: 500 , error : "Internal Server error" };
  }
};
