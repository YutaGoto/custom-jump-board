import { headers } from "next/headers";

export const apiBase = async () => {
  const headersData = headers();
  const host = (await headersData).get("host");
  const protocol =
    ((await headersData).get("x-forwarded-proto") ??
    host?.startsWith("localhost"))
      ? "http"
      : "https";
  return `${protocol}://${host}`;
};
