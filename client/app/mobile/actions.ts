"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerRanking(formData: FormData) {
  const name = formData.get("input") as string;

  if (!name) {
    throw new Error("Name is required");
  }

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    throw new Error("User ID cookie is missing");
  }

  const authUrl = process.env.REGISTER_RANKING_API_URL;
  if (!authUrl) {
    console.error("Environment variable USER_AUTH_API_URL is not defined");
    redirect("/mobile/?error=server_config_error");
  }

  try {
    const res = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, id: userId }),
    });

    if (!res.ok) {
      console.error("Server responded with an error:", res.statusText);
      redirect("/mobile/?error=server_error");
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  }

  console.log(`Posted Name to Server: ${name} for User ID: ${userId}`);
}

export async function sendAnswerToServer(unicode: string) {
  const cookieStore = await cookies();
  const userIDCookie = cookieStore.get("user_id");
  const questionIndexCookie = cookieStore.get("question_index");

  if (!userIDCookie || !questionIndexCookie) {
    console.error("[サーバー] Cookieが見つかりません。");
    redirect("/mobile/?error=cookie_missing");
  }

  const combinedData = {
    kanji_unicode: unicode,
    user_id: userIDCookie.value,
    questionIndex: questionIndexCookie.value,
  };
  console.log("SendData:", combinedData);

  const authUrl = process.env.SEND_ANSWER_API_URL;
  if (!authUrl) {
    console.error("Environment variable USER_AUTH_API_URL is not defined");
    redirect("/mobile/?error=server_config_error");
  }

  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(combinedData),
  });
  if (!res.ok) {
    console.error("Server responded with an error:", res.statusText);
    redirect("/mobile/?error=server_error");
  }

  return await res.json();
}

export async function saveIndexToCookie(formData: FormData) {
  const number = formData.get("input") as string;

  if (!number) {
    throw new Error("Number is required");
  }

  const cookieStore = await cookies();

  cookieStore.set("question_index", number, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 120,
  });

  console.log(`Updated Index: ${number}`);
}
