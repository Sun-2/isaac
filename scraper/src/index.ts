import { getItemData } from "./scraping";
import { generateTags } from "./tagging";
import { toFirebase } from "./output/toFirebase";
import { promises as fsp } from "fs";
import path from "path";
import { tagsPath } from "./const";
import { addItemToTag } from "./tagging/addItemToTag";

(async () => {
  const itemData = await getItemData();

  const autoTags = generateTags(itemData);

  const mergedTags = { ...autoTags };

  // merge tags
  const customTags = JSON.parse(
    await fsp.readFile(tagsPath, { encoding: "utf8" })
  );
  for (const [name, { tags }] of Object.entries(customTags).filter(
    ([name]) => !!itemData[name]
  ) as any) {
    for (const tag of tags) {
      addItemToTag(mergedTags, name, tag);
    }
  }

  const sortedTags = Object.entries(mergedTags)
    .sort(([nameA], [nameB]) => (nameA > nameB ? 1 : -1))
    .map(([tag, items]) => ({ tag, items }));

  await toFirebase({ itemData, tags: sortedTags });
})();
