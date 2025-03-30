import { PrismaClient } from '@prisma/client'
import levels from './levels.json'

const prisma = new PrismaClient()

async function main() {
  const filteredData = levels.filter(
    (file: any) => file.tags?.some((tag: any) => tag.tag === "Level")
  );

  console.log(`Found ${filteredData.length} levels to process`);

  for (const level of filteredData) {
    try {
      // Create or update the level
      const createdLevel = await prisma.level.upsert({
        where: { publishedfileid: level.publishedfileid } as any,
        update: {
          title: level.title,
          fileDescription: level.file_description,
          creator: level.creator,
          url: level.url,
          image: level.preview_url,
        },
        create: {
          publishedfileid: level.publishedfileid,
          title: level.title,
          fileDescription: level.file_description,
          creator: level.creator,
          url: level.url,
          image: level.preview_url,
        },
      });

      console.log(`Processed level: ${level.title}`);

      // Process tags if they exist
      if (level.tags && level.tags.length > 0) {
        // Delete existing tags for this level
        await prisma.levelCategory.deleteMany({
          where: { levelId: createdLevel.id }
        });

        // Create or update tags and create level-tag relationships
        for (const tagData of level.tags) {
          const category = await prisma.category.upsert({
            where: { name: tagData.tag },
            update: {},
            create: { name: tagData.tag }
          });

          await prisma.levelCategory.create({
            data: {
              levelId: createdLevel.id,
              categoryId: category.id
            }
          });
        }
        console.log(`Processed ${level.tags.length} tags for level: ${level.title}`);
      }
    } catch (error) {
      console.error(`Error processing level ${level.title}:`, error);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Seed completed successfully');
  })
  .catch(async (e) => {
    console.error('Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
