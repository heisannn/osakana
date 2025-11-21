import { cookies } from "next/headers";
import { NameInputField } from "./_components/input-field";

export default async function Mobile() {
  const cookieStore = await cookies();
  const user_uuid = cookieStore.get("user_uuid");

  return (
    <div>
      <NameInputField />
    </div>
  );
}
