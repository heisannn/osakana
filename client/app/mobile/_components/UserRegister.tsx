"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../actions";

export function UserRegistrar() {
  const router = useRouter();

  useEffect(() => {
    const initUser = async () => {
      try {
        await registerUser();
        router.refresh();
      } catch (e) {
        console.error("登録失敗", e);
      }
    };
    initUser();
  }, [router]);

  return (
    <div style={{ padding: "1rem" }}>
      <p>ユーザー登録処理中...</p>
    </div>
  );
}
