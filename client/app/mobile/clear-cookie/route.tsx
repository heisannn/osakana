import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
  cookieStore.delete("answer_number");

  redirect("/mobile?error=cookies_cleared");
}
