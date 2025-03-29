import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const levels = await prisma.level.findMany({
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

  return NextResponse.json(levels);
}
