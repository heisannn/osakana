import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./request/search-params";
import { Keypad } from "./_components/keypad";
import { Combo } from "./_components/combo";
import styles from "./style.module.scss";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function StatusMessage({ searchParams }: PageProps) {
  const { error } = await loadSearchParams(searchParams);
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
  return null;
}

export default async function Mobile({ searchParams }: PageProps) {
  const { combo } = await loadSearchParams(searchParams);

  const cookieStore = await cookies();
  const userIDCookie = cookieStore.get("user_id");
  if (!userIDCookie) {
    redirect("/mobile/register-user");
  }
  if (!userIDCookie?.value) {
    console.error("User ID cookie is missing");
    return (
      <div className={styles.container}>
        <p className={styles.error}>{"userID_missing"}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <StatusMessage searchParams={searchParams} />
      <Combo combo={combo} />
      <Keypad />
    </div>
  );
}
