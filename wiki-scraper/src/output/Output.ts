import {
  ItemData,
  ItemsDataMap,
  TagMap,
} from '@isaac-item-browser/shared';

export type Output = (args: {
  items: ItemsDataMap;
  tags: TagMap;
}) => Promise<void>;
