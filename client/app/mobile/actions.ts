"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("input") as string;
  if (!name) {
    throw new Error("Name is required");
  }

  const cookieStore = await cookies();

  // ToDo : Httpリクエスト
  // レスポンスからUUIDを取得する想定
  const uuid = "response dummy";

  cookieStore.set("user_id", uuid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 3,
  });

  console.log(`Registered User: ${name}, ${uuid}`);
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
