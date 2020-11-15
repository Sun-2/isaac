import stringHash from 'string-hash';
import { firestore } from '../utils/firestore';
import {ItemData, TagMap} from '@isaac-item-browser/shared';

/* Since Firebase's document size limit is around 1MB and our item data weighs more, we'll split it equally into multiple buckets by hashing the item name. */
export const toFirebase = async ({
  items,
  tags,
}: {
  items: { [itemName: string]: ItemData };
  tags: TagMap;
}) => {
  if (items) {
    let itemsUploaded = 0;

    const itemAmount = Object.keys(items).length;

    for (const [name, data] of Object.entries(items) as any) {
      const docName = Math.abs(stringHash(name) % 10).toString();

      await firestore
        .collection('items-batch')
        .doc(docName)
        .set({ [name]: data }, { merge: true });

      console.debug(
        `Item ID ${
          data.id
        } was uploaded to Firebase. ${++itemsUploaded}/${itemAmount}`,
      );
    }
  }

  if (tags) {
    await firestore.collection('tags').doc('index').set({ tags });
    console.debug('Uploaded tags.');
  }
};
