"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function clearUserCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
  cookieStore.delete("user_number");
  redirect("/mobile?error=cookies_cleared");
}

export async function postUserNameToServer(formData: FormData) {
  const name = formData.get("input") as string;

  if (!name) {
    throw new Error("Name is required");
  }

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    throw new Error("User ID cookie is missing");
  }

  // ToDo : Httpリクエスト
  console.log(`Posted Name to Server: ${name} for User ID: ${userId}`);
}

export async function sendAnswerToServer(nfcId: string) {
  const cookieStore = await cookies();
  const userIDCookie = cookieStore.get("user_id");
  const userNumberCookie = cookieStore.get("user_number");

  if (!userIDCookie || !userNumberCookie) {
    console.error("[サーバー] Cookieが見つかりません。");
    redirect("/mobile/?error=cookie_missing");
  }

  const combinedData = {
    nfcId: nfcId,
    userId: userIDCookie.value,
    userNumber: userNumberCookie.value,
  };
  console.log("SendData:", combinedData);

  // ToDo : Httpリクエスト
  // レスポンスのモック
  // 50%の確率でisCorrectがtrueになるようにする
  // comboは固定で10にする
  const response = new Response(
    JSON.stringify({ result: { isCorrect: Math.random() < 0.5, combo: 10 } }),
    {
      status: 200,
    },
  );

  return await response.json();
}

export async function registerUser() {
  const cookieStore = await cookies();

  // ToDo : Httpリクエスト
  // レスポンスからUUIDを取得する想定
  const uuid = "response dummy";

  cookieStore.set("user_id", uuid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 3,
  });

  console.log(`Registered User: ${uuid}`);
}

export async function saveNumberToCookie(formData: FormData) {
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
