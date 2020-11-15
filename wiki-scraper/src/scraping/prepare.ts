import cheerio from 'cheerio';
import { baseUrl } from '../const';

/**
 * Sanitizes an item's scrapped HTML and prepares it for usage in the item browser.
 * @param $ The cheerio root object holding the scrapped HTML
 */
export const prepare = ($: cheerio.Root) => {
  $('script').remove();

  $('*').each((i, node) => {
    for (const attribKey of Object.keys(node.attribs)) {
      const attribsWhitelist = [
        'href',
        'alt',
        'src',
        'class',
        'title',
        'width',
        'height',
        'decoding',
        'id',
        'target',
      ];

      if (!attribsWhitelist.includes(attribKey))
        delete node.attribs[attribKey];
    }
  });

  $('img').each((i, node) => {
    // Image links have some extraneous params at the end (size etc), let's replace them with links to main versions of the images
    const match = node.attribs.src.match(/^.*latest/);
    if (match) node.attribs.src = match[0];
    node.attribs.referrerPolicy = 'no-referrer'; // The server doesn't answer otherwise
  });

  $('a').each(function (this: any, i, node) {
    node.attribs.target = '_blank';
    const href = $(this).attr('href');

    // Change relative links to absolute ones
    if (href && !href.match(/^http/))
      $(this).attr('href', baseUrl + $(this).attr('href'));
  });
};
