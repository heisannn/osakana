"use server";

import { cookies } from "next/headers";

export async function registerUser(uuid: string) {
  if (!uuid) {
    throw new Error("uuid is required");
  }

  const cookieStore = await cookies();

  cookieStore.set("user_id", uuid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 3,
  });

  console.log(`Registered User: ${uuid}`);
}

export async function saveDataToCookie(formData: FormData) {
  const number = formData.get("input") as string;

  if (!number) {
    throw new Error("Number is required");
  }

  const cookieStore = await cookies();

  cookieStore.set("user_number", number, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 120,
  });

  console.log(`Updated Number: ${number}`);
}
