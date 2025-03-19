import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";


const AuthCallback = async () => {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    redirect("/dashboard");
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    redirect("/sign-in");
  }

  return null; // Return null since the redirect happens anyway
};

export default AuthCallback;
