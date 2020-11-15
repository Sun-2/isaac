import { ItemData, TagMap } from '@isaac-item-browser/shared';

export class TagManager {
  /**
   * Tags to be omitted.
   */
  tagBlacklist = ['', "'", 's'];

  /**
   * A regex that splits an item's name into tags.
   */
  tagDelimiter = /[ -.:_\/]/;

  /**
   * Generate tags from these fields.
   */
  wordTagSource: (keyof ItemData)[] = ['quote', 'displayName'];

  tags: { [tag: string]: Set<string> } = {};

  /**
   * Register an item's tags basing on its data.
   * @param item
   */
  smartRegisterItem(item: ItemData) {
    this.ensureSetExists(item.internalName);
    this.wordTagSource
      .map(source =>
        item[source]
          .toString()
          .split(this.tagDelimiter)
          .filter(x => !this.tagBlacklist.includes(x)),
      )
      .flat()
      .map(tag => this.tags[item.internalName].add(tag));
  }

  registerTagForItem(itemName: string, tag: string) {
    this.ensureSetExists(itemName);
    this.tags[itemName].add(tag);
  }

  getTagsForItem(itemName: string) {
    this.ensureSetExists(itemName);
    return [...this.tags[itemName]];
  }

  getAllTags(): TagMap {
    return Object.entries(this.tags).reduce(
      (acc, [itemName, itemData]) => {
        acc[itemName] = [...itemData];
        return acc;
      },
      {} as TagMap,
    );
  }

  private ensureSetExists(itemName: string) {
    this.tags[itemName] = this.tags[itemName] || new Set();
  }
}
