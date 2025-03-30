import { notFound } from "next/navigation";

import { Detail } from "@/app/components/features/Detail";
import { apiBase } from "@/lib/apiBase";
import type { Level } from "@/types/Level";

type Props = {
  params: Promise<{ fileid: string }>;
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page({ params }: Props) {
  const { fileid } = await params;

  const baseUrl = await apiBase();
  const data = await fetch(`${baseUrl}/api/items/${fileid}`);
  const detailData: Level = await data.json();

  return <Detail fileid={fileid} detailData={detailData} />;
}
