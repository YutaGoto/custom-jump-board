import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;

  const level = await prisma.level.findUnique({
    where: {
      publishedfileid: fileId,
    },
    select: {
      id: true,
      publishedfileid: true,
      title: true,
      fileDescription: true,
      creator: true,
      url: true,
      image: true,
      levelCategories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  return NextResponse.json(level);
}
