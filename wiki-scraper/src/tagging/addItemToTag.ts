export const addItemToTag = (tagObj, item, tag: string) => {
  tag = tag.trim().toLowerCase();
  if (tagObj[tag] === undefined) tagObj[tag] = [];

  if (!tagObj[tag].includes(item)) tagObj[tag].push(item);
};
