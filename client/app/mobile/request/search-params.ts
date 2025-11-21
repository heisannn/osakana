import { parseAsString, createLoader } from "nuqs/server";

export const searchParams = {
  nfcId: parseAsString.withDefault(""),
  result: parseAsString.withDefault(""),
  error: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(searchParams);
