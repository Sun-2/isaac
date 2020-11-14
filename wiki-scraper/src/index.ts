import { getItemData } from './scraping';
import { generateTags } from './tagging';
import { toFirebase } from './output/toFirebase';
import { promises as fsp } from 'fs';
import { tagsPath } from './const';
import { addItemToTag } from './tagging/addItemToTag';
import yargs, { Arguments } from 'yargs';

export type Target = 'firebase';

yargs
  .command(
    'fetch',
    'Fetch complete data for all wiki items.',
    builder => {
      builder.option('target', {
        alias: 't',
        description: 'The output for fetched data.',
        choices: ['firebase'] as Target[],
        default: 'firebase',
      });
    },
    async (handler: Arguments<{ target: Target }>) => {
      const itemData = await getItemData();

      const autoTags = generateTags(itemData);

      const mergedTags = { ...autoTags };

      // merge tags
      const customTags = JSON.parse(
        await fsp.readFile(tagsPath, { encoding: 'utf8' }),
      );
      for (const [name, { tags }] of Object.entries(
        customTags,
      ).filter(([name]) => !!itemData[name]) as any) {
        for (const tag of tags) {
          addItemToTag(mergedTags, name, tag);
        }
      }

      const sortedTags = Object.entries(mergedTags)
        .sort(([nameA], [nameB]) => (nameA > nameB ? 1 : -1))
        .map(([tag, items]) => ({ tag, items }));

      await toFirebase({ itemData, tags: sortedTags });
    },
  )
  .demandCommand().argv;
