import { cookies } from "next/headers";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./search-params";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function sendDataToServer(combinedData: any) {
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

export default async function ProcessPage({ searchParams }: PageProps) {
  const { nfcId } = await loadSearchParams(searchParams);

  const cookieStore = await cookies();
  const userIDCookie = cookieStore.get("user_id");
  const userNumberCookie = cookieStore.get("user_number");

  if (!userIDCookie || !userNumberCookie) {
    console.error("[サーバー] Cookieが見つかりません。");
    redirect("/mobile/?error=session_expired");
  }

  const requestPayload = {
    nfcId: nfcId,
    userId: userIDCookie.value,
    userNumber: userNumberCookie.value,
  };

  let apiResponse;
  try {
    apiResponse = await sendDataToServer(requestPayload);
  } catch (apiError) {
    console.error("[サーバー] APIへのデータ送信に失敗しました。", apiError);
    redirect("/mobile/?error=api_failed");
  }

  console.log("[サーバー] 処理完了。メインページにリダイレクトします。");
  const isCorrect = apiResponse.result?.isCorrect ?? false;
  const combo = apiResponse.result?.combo ?? 0;
  redirect(`/mobile/?result=${isCorrect},combo=${combo}`);
}
