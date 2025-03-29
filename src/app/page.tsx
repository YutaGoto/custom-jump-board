import type { SteamApiResponse } from "@/types/SteamApiResponse";

import LevelCard from "@/components/LevelCard";

export default async function Page() {
  const data = await getData();
  const filteredData = data.response.publishedfiledetails.filter((file) =>
    file.tags?.some((tag) => tag.tag === "Level"),
  );

  return (
    <main className="responsive">
      <h5>Levels</h5>
      <div className="grid">
        {filteredData.map((file) => (
          <div key={file.publishedfileid} className="s12 m6 l3">
            <LevelCard
              fileid={file.publishedfileid}
              tags={file.tags.map((tag) => tag.display_name)}
              title={file.title}
              description={file.file_description}
              image={
                file.preview_url ||
                "https://community.fastly.steamstatic.com/public/images/sharedfiles/steam_workshop_default_image.png"
              }
            />
          </div>
        ))}
      </div>
    </main>
  );
}

const getData = async (): Promise<SteamApiResponse> => {
  const url =
    "https://api.steampowered.com/IPublishedFileService/QueryFiles/v1/";
  const params = new URLSearchParams({
    key: process.env.STEAM_WEB_API_KEY!,
    query_type: "1",
    page: "1",
    cursor: "*",
    numperpage: "100",
    creator_appid: "",
    appid: "1061090",
    requiredtags: "Level",
    match_all_tags: "false",
    // excludedtags: "",
    // required_flags: "",
    // omitted_flags: "",
    search_text: "",
    filetype: "0",
    child_publishedfileid: "0",
    // days: "",
    // include_recent_votes_only: "",
    totalonly: "false",
    ids_only: "false",
    return_vote_data: "false",
    return_tags: "true",
    return_kv_tags: "true",
    return_previews: "true",
    return_children: "false",
    return_short_description: "ture",
    return_for_sale_data: "false",
    return_playtime_stats: "false",
  });

  const res = await fetch(`${url}?${params.toString()}`);
  const data = await res.json();
  return data;
};
