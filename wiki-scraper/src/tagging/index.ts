import { addItemToTag } from "./addItemToTag";

const getTagsForItem = (item) => {
  const tagBlacklist = ["", "'", "s"];
  const tagDelimiter = /[ -.:_\/]/;

  const wordTagSource = ["quote", "displayName"];

  return wordTagSource
    .map((source) =>
      item[source]
        .toString()
        .split(tagDelimiter)
        .filter((x) => !tagBlacklist.includes(x))
    )
    .reduce((acc, curr) => acc.concat(curr), [] as any[]);
};

export const generateTags = (itemData) => {
  const tags: { [tag: string]: string[] } = {};

  for (const [name, data] of Object.entries(itemData)) {
    const tagsForItem = getTagsForItem(data);
    for (const tag of tagsForItem) {
      addItemToTag(tags, name, tag);
    }
  }

  return tags;
};
