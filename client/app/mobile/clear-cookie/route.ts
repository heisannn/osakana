import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
  cookieStore.delete("question_index");

  cookieStore.set("question_index", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 120,
  });

  redirect("/mobile");
}
