import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;

  const level = await prisma.level.findUnique({
    where: {
      publishedfileid: fileId,
    },
  });

  return NextResponse.json({ level });
}
