import { addItemToTag } from './addItemToTag';
import { ItemData, ItemsDataMap } from '@isaac-item-browser/shared';

/**
 * These tags will be omitted.
 */
const tagBlacklist = ['', "'", 's'];

/**
 * A regex that splits an item's name into tags.
 */
const tagDelimiter = /[ -.:_\/]/;

/**
 * Generate tags from these fields.
 */
const wordTagSource = ['quote', 'displayName'];

const getTagsForItem = (item: ItemData) => {
  return wordTagSource
    .map(source =>
      item[source]
        .toString()
        .split(tagDelimiter)
        .filter(x => !tagBlacklist.includes(x)),
    )
    .reduce((acc, curr) => acc.concat(curr), [] as any[]);
};

export const generateTags = (itemDataMap: ItemsDataMap) => {
  const tags: { [tag: string]: string[] } = {};

  for (const item of Object.values(itemDataMap)) {
    const tagsForItem = getTagsForItem(item);
    for (const tag of tagsForItem) {
      addItemToTag(tags, name, tag);
    }
  }

  return tags;
};
