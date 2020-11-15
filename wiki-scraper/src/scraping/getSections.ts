import cheerio from 'cheerio';
import { prepare } from './prepare';
import { fetchRetry } from '../utils/fetchRetry';
import { Section } from '@isaac-item-browser/shared';

/**
 * Extract sections ("Effects", "Notes", "Trivia" etc.) for an item.
 * @param href The URL of the item.
 */
export const getSections = async (href: string) => {
  const resp = await fetchRetry(href);
  const text = await resp.text();

  const $ = cheerio.load(text);
  prepare($);

  // Maps wiki's inconsistent section names to names we want to use
  const sections: { [wikiSectionCode: string]: Section } = {
    Effects: 'Effects',
    Effect: 'Effects',
    Notes: 'Notes',
    Interactions: 'Interactions',
    Synergies: 'Synergies',
    Trivia: 'Trivia',
    Tips: 'Tips',
  };

  const result: Partial<Record<Section, string>> = {};

  for (const [wikiSectionCode, sectionDisplayName] of Object.entries(
    sections,
  )) {
    const html = await extractSection($, wikiSectionCode);

    if (!html) continue;
    result[sectionDisplayName] = html;
  }
  return result as Record<Section, string>;
};

/**
 * Extract a single section as unsanitized HTML.
 * @param $ The cheerio root object with an item's HTML loaded.
 * @param sectionName The section's name.
 */
const extractSection = ($: cheerio.Root, sectionName: string) => {
  const sectionChildren = $(`#${sectionName}`)
    .first()
    .parent()
    .nextUntil('h2, table');
  if (!sectionChildren.length) return undefined;
  return $.html(sectionChildren);
};
