import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./request/search-params";
import { InputForm } from "./_components/InputForm";
import { AuthGuard } from "./_components/AuthGuard";
import { saveDataToCookie } from "./actions";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function StatusMessage({ searchParams }: PageProps) {
  const { error } = await loadSearchParams(searchParams);
  if (error) {
    return (
      <p style={{ color: "red", border: "1px solid red", padding: "1rem" }}>
        {error}
      </p>
    );
  }
  return null;
}

export default async function Mobile() {
  return (
    //<AuthGuard>
    <div>
      <StatusMessage searchParams={Promise.resolve({} as SearchParams)} />
      <InputForm onSubmitAction={saveDataToCookie} buttonText="数字を入力" />
    </div>
    //</AuthGuard>
  );
}
