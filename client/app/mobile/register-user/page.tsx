import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterUser() {
  const cookieStore = await cookies();
  let user_id = null;

  const authUrl = process.env.REGISTER_USER_API_URL;

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
    });

    if (res.ok) {
      const data = await res.json();
      user_id = data.user_id;
    } else {
      console.error(`API Error: ${res.status}`);
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  }

  if (!user_id) {
    return (
      <div>
        <h1>Error Registering User</h1>
      </div>
    );
  }

  cookieStore.set("user_id", user_id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 3,
  });

  if (!cookieStore.get("user_id")) {
    console.error("Failed to set user_id cookie");
    throw new Error("Failed to set cookie");
  }

  console.log(`Registered User: ${user_id}`);
  redirect("/mobile");
}
