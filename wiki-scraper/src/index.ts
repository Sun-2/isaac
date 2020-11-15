import { getItemData } from './scraping/getItemData';
import { generateTags } from './tagging';
import { toFirebase } from './output/toFirebase';
import { promises as fsp } from 'fs';
import { tagsPath } from './const';
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
        default: 'firebase' as Target,
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
      ).filter(([name]) => Boolean(itemData[name])) as any) {
        for (const tag of tags) {
          const formattedTag = tag.trim().toLowerCase();
          if (mergedTags[formattedTag] === undefined)
            mergedTags[formattedTag] = [];

          if (!mergedTags[formattedTag].includes(name))
            mergedTags[formattedTag].push(name);
        }
      }

      const sortedTags = Object.entries(mergedTags)
        .sort(([nameA], [nameB]) => (nameA > nameB ? 1 : -1))
        .map(([tag, items]) => ({ tag, items }));

      await toFirebase({ items: itemData, tags: sortedTags });
    },
  )
  .demandCommand().argv;
