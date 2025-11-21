import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export async function AuthGuard({ children }: AuthGuardProps) {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("user_id");

  if (!uuid) {
    redirect("/mobile/register");
  }

  return <>{children}</>;
}
