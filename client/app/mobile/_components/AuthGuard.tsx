"use client";

import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export async function AuthGuard(
  { children }: AuthGuardProps,
  { uuid }: { uuid?: string },
) {
  if (!uuid) {
    redirect("/mobile/register");
  }

  return <>{children}</>;
}
