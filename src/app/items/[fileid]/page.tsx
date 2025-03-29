import { notFound } from "next/navigation";

import { Detail } from "@/components/pages/Detail";
import type { SteamApiResponse } from "@/types/SteamApiResponse";

type Props = {
  params: Promise<{ fileid: string }>;
};

export default async function Page({ params }: Props) {
  const { fileid } = await params;
  const data = await getData(fileid);
  const detailData = data.response.publishedfiledetails[0];

  if (
    !detailData ||
    detailData.app_name !== "Jump King" ||
    !detailData.tags.some((tag) => tag.tag === "Level")
  ) {
    notFound();
  }

  return <Detail fileid={fileid} detailData={detailData} />;
}

const getData = async (fileid: string): Promise<SteamApiResponse> => {
  const url =
    "https://api.steampowered.com/IPublishedFileService/GetDetails/v1/";
  const params = new URLSearchParams();
  params.append("key", process.env.STEAM_WEB_API_KEY!);
  params.append("publishedfileids[0]", fileid);

  const res = await fetch(`${url}?${params}`);
  const data = await res.json();
  return data;
};
