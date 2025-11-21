import { cookies } from "next/headers";
import { InputForm } from "../_components/InputForm";
import { registerUser } from "../actions";

export default async function Mobile() {
  return (
    <div>
      <InputForm onSubmitAction={registerUser} buttonText="名前を入力" />
    </div>
  );
}
