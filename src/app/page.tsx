import LevelCard from "@/app/components/LevelCard";
import { apiBase } from "@/lib/apiBase";
import type { Level } from "@/types/Level";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page() {
  const baseUrl = await apiBase();
  const data = await fetch(`${baseUrl}/api/items`);
  const levels: Level[] = await data.json();

  return (
    <main className="responsive">
      <h5>Levels</h5>
      <div className="grid">
        {levels.map((level) => (
          <div key={level.publishedfileid} className="s12 m6 l3">
            <LevelCard
              fileid={level.publishedfileid}
              tags={level.levelCategories.map(
                (levelCategory) => levelCategory.category?.name,
              )}
              title={level.title}
              description={level.fileDescription}
              image={
                level.image ||
                "https://community.fastly.steamstatic.com/public/images/sharedfiles/steam_workshop_default_image.png"
              }
            />
          </div>
        ))}
      </div>
    </main>
  );
}
