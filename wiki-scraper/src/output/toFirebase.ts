import stringHash from 'string-hash';
import { firestore } from '../utils/firestore';

/* Since Firebase's document size limit is around 1MB and our item data weighs more, we'll split it equally into multiple buckets by hashing the item name. */

export const toFirebase = async ({ itemData, tags }) => {
  if (itemData) {
    let itemsUploaded = 0;
    const itemAmount = Object.keys(itemData).length;
    for (const [name, data] of Object.entries(itemData) as any) {
      await Promise.all([
        //batch upload to buckets
        firestore
          .collection('items-batch')
          .doc(Math.abs(stringHash(name) % 10).toString())
          .set({ [name]: data }, { merge: true })
          .then(() => {
            console.log(
              `Item ID ${
                data.id
              } was uploaded to Firebase. ${++itemsUploaded}/${itemAmount}`,
            );
          }),

        // single upload
        firestore.collection('items').doc(name).set(data),
      ]);
    }
  }

  if (tags) {
    await firestore.collection('tags').doc('index').set({ tags });
  }
};
