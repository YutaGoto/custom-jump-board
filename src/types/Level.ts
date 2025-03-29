import type {
  Category,
  LevelCategory,
  Level as PrismaLevel,
} from "@prisma/client";

export type Level = PrismaLevel & {
  levelCategories: (LevelCategory & { category: Category })[];
};
