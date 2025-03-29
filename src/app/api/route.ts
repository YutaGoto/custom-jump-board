export const dynamic = "force-static";

export async function GET() {
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

  console.log(res);
  const data = await res.json();

  console.log(data);

  return Response.json({ data });
}
